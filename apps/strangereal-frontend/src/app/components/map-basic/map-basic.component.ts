import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContextMenuModule } from 'primeng/contextmenu';
import { Marker } from '../../../types/marker';
import * as D3 from 'd3';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MarkerDetailsComponent } from '../marker-details/marker-details.component';
import { MarkerType } from '@strangereal/util-constants';
import { MarkerRepository } from '@strangereal/data-access-api';
import { filter, firstValueFrom, tap } from 'rxjs';

/**
 * The bounds for how much you can zoom in/out of the map
 */
const ZOOM_LIMIT = [1, 24] as [number, number];
/**
 * The maximum "size" that markers should scale to. They will remain the same
 * size relative to the screen at all zoom levels *greater* than this value. At
 * zoom levels less than or equal to this value, the markers should remain the
 * same size relative to the map itself.
 */
const MARKER_ZOOM_LIMIT = 8;
/**
 * The square width/height of the marker bounding boxes
 */
const MARKER_SIZE = 180;

/**
 * From https://stackoverflow.com/a/47347813
 */
function centerScale(boundingBox: DOMRect, k: number): string {
    const zoomDelta = 1 / k;
    const cx = boundingBox.x + (boundingBox.width / 2);
    const cy = boundingBox.y + (boundingBox.height / 2);
    const zx = cx - zoomDelta * cx;
    const zy = cy - zoomDelta * cy;

    return `matrix(${zoomDelta}, 0, 0, ${zoomDelta}, ${zx}, ${zy})`;
}

@Component({
    selector: 'strangereal-map-basic',
    standalone: true,
    imports: [CommonModule, ContextMenuModule],
    providers: [DialogService],
    templateUrl: './map-basic.component.html',
    styleUrls: ['./map-basic.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapBasicComponent implements AfterViewInit, OnInit {
    Allegiance = MarkerType.Allegiance;

    @ViewChild('container', { static: true })
    containerRef!: ElementRef<HTMLElement>;

    @ViewChild('tooltip', { static: true })
    tooltipRef!: ElementRef<HTMLElement>;

    markers!: WeakMap<SVGUseElement, Marker>;

    // TODO Maybe turn this into a modal kind of thing?
    currentAllegiance: MarkerType.Allegiance | undefined = undefined;

    private tooltip!: D3.Selection<HTMLElement, unknown, null, unknown>;
    private map!: D3.Selection<HTMLElement, unknown, null, unknown>;
    private overlay!: D3.Selection<SVGGElement, unknown, null, unknown>;
    private baseElement!: SVGGElement;
    private mapElement!: HTMLElement;
    private dialog: DynamicDialogRef | undefined;
    private lastMarker: (Marker & { id?: number }) | undefined;

    constructor(private readonly dialogService: DialogService,
                private readonly markerRepository: MarkerRepository) {}

    ngOnInit(): void {
        if (!this.markers) {
            this.markers = new WeakMap();
        }
    }

    ngAfterViewInit(): void {
        const container = D3.select(this.containerRef.nativeElement);
        const node = container.node();
        if (node === null) {
            throw new Error('Target element not initialized');
        }

        this.tooltip = D3.select(this.tooltipRef.nativeElement);

        // Load map
        D3.svg('assets/map.svg')
            .then(xml => {
                node.appendChild(xml.documentElement);

                const map = container.select<HTMLElement>('svg');
                this.map = map;
                this.initializeMap(map);

                return this.markerRepository.getAll();
            })
            .then(markers => {
                for (const marker of markers) {
                    this.addMarker(marker);
                }
            });
    }

    @HostListener('document:keydown', ['$event'])
    onKeyDown(event: KeyboardEvent): void {
        if (this.dialog) {
            // Don't want to change modes while the dialog is open and the user
            // is typing
            return;
        }

        switch (event.code) {
            case 'KeyF':
                this.currentAllegiance = MarkerType.Allegiance.Friendly;
                break;
            case 'KeyH':
                this.currentAllegiance = MarkerType.Allegiance.Hostile;
                break;
            case 'KeyN':
                this.currentAllegiance = MarkerType.Allegiance.Neutral;
                break;
            case 'KeyU':
                this.currentAllegiance = MarkerType.Allegiance.Unknown;
                break;
            case 'KeyR':
                if (!event.ctrlKey && this.lastMarker) {
                    const newMarker = {...this.lastMarker,
                        x: this.lastMarker.x + 8,
                        y: this.lastMarker.y + 8
                    };
                    const node = this.addMarker(newMarker);
                    this.lastMarker = newMarker;
                    this.markers.set(node, newMarker);

                    this.markerRepository.create(newMarker).then(id => {
                        newMarker.id = id;
                        node.classList.remove('pending');
                    });
                }
                break;
            case 'ControlLeft':
            case 'ControlRight':
            case 'ShiftLeft':
            case 'ShiftRight':
            case 'AltLeft':
            case 'AltRight':
                // Modifier keys are a no-op
                break;
            case 'Escape': // Escape
            default:
                this.currentAllegiance = undefined;
                break;
        }
    }

    private initializeMap(map: D3.Selection<HTMLElement, unknown, null, unknown>): void {
        const mapElement = map.node();
        if (!mapElement) {
            throw new Error('Map not initialized');
        }

        this.mapElement = mapElement;
        this.overlay = map.append('g').attr('id', 'overlay');

        const baseElement = map.selectChild<SVGGElement>('g#background').node();
        if (!baseElement) {
            throw new Error('Base layer not initialized');
        }

        this.baseElement = baseElement;

        map.on('click', e => this.onClick(e));

        // Initialize zoom against map
        const viewBox = mapElement.getAttribute('viewBox');
        if (!viewBox) {
            throw new Error('No viewbox on map element');
        }
        const [x0, y0, x1, y1] = viewBox.split(/[,\s]/).map(Number);
        const zoom = D3.zoom<HTMLElement, unknown>()
            .scaleExtent(ZOOM_LIMIT)
            .translateExtent([[x0, y0], [x1, y1]])
            .on('zoom', e => this.onZoom(e));
        map.call(zoom);
    }

    private onZoom(event: D3.D3ZoomEvent<Element, unknown>): void {
        const transform = event.transform.toString();

        this.map.selectChildren('g').attr('transform', transform);

        const scale = Math.max(event.transform.k, MARKER_ZOOM_LIMIT);
        this.overlay.selectAll<SVGUseElement, unknown>('use').each(function () {
            // TODO See if it's possible to use a more optimized calculation
            // since these are all squares anyways
            const boundingBox = this.getBBox();
            this.setAttribute('transform', centerScale(boundingBox, scale));
        });
    }

    private async onClick(event: Event): Promise<void> {
        const [x, y] = D3.pointer(event, this.baseElement);
        const allegiance = this.currentAllegiance;

        this.currentAllegiance = undefined;
        this.dialog = this.dialogService.open(MarkerDetailsComponent, {
            data: { x, y, allegiance },
            header: 'Add a New Point of Interest',
            width: '28em',
            closeOnEscape: true
        });

        const marker = await firstValueFrom(this.dialog.onClose);
        this.dialog = undefined;
        if (!marker) {
            return;
        }

        const node = this.addMarker(marker);
        this.lastMarker = marker;
        this.markers.set(node, marker);

        const id = await this.markerRepository.create(marker);
        marker.id = id;
        node.classList.remove('pending');
    }

    private addMarker(marker: Marker & { id?: number }): SVGUseElement {
        const { x, y, type } = marker;
        const figure = this.overlay.append('use')
            .attr('xlink:href', `/assets/symbology-sprite.svg#symbology-${type}`)
            .attr('x', x - MARKER_SIZE / 2)
            .attr('y', y - MARKER_SIZE / 2)
            .attr('width', MARKER_SIZE)
            .attr('height', MARKER_SIZE)
            .classed('pending', true)
            // .attr('transform', centerScale(boundingBox, this.currentScale))
            // .attr('transform-origin', 'center')
            .on('mouseover', event => {
                this.tooltip.style('display', 'block');
                D3.select(event.target).style('stroke', 'black');
            })
            .on('mousemove', event => {
                const tooltipContent = [] as string[];
                if (marker.name) {
                    tooltipContent.push(`<b>${marker.name}</b>`);
                }

                tooltipContent.push(MarkerType.toString(type));

                const [x, y] = D3.pointer(event, this.containerRef.nativeElement);
                this.tooltip
                    .html(tooltipContent.join('<br>'))
                    .style('transform', `translate(${x + 24}px, ${y}px)`);
            })
            .on('mouseleave', event => {
                this.tooltip.style('display', 'none');
                D3.select(event.target).style('stroke', 'none');
            });
            // TODO click handler that opens dialog to edit or delete

        const node = figure.node();
        if (!node) {
            figure.remove();
            throw new Error('Failed to place marker onto the map');
        }

        { // Initial transform
            const boundingBox = node.getBBox();
            // TODO figure out how to get the event target and use that instead
            const k = Math.max(D3.zoomTransform(this.mapElement).k, MARKER_ZOOM_LIMIT);
            figure.attr('transform', centerScale(boundingBox, k));
        }

        const callback = (event: D3.D3DragEvent<SVGUseElement, unknown, unknown>) => {
            const boundingBox = node.getBBox();
            const k = Math.max(D3.zoomTransform(this.mapElement).k, MARKER_ZOOM_LIMIT);

            const [x, y] = D3.pointer(event, this.baseElement);
            marker.x = x;
            marker.y = y;
            figure.attr('x', x - (MARKER_SIZE / 2))
                  .attr('y', y - (MARKER_SIZE / 2))
                  .attr('transform', centerScale(boundingBox, k));

            if (event.type === 'end' && marker.id) {
                node.classList.add('pending');
                this.markerRepository.updatePosition(marker.id, x, y).then(() => {
                    node.classList.remove('pending');
                });
            }
        };
        figure.call(D3.drag<SVGUseElement, unknown>()
            .filter(event => event.shiftKey && !event.button)
            .on('drag', callback)
            .on('end', callback));

        return node;
    }
}
