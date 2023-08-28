import { AfterViewInit, ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as MapboxGl from 'mapbox-gl';
import { isEmpty } from 'lodash';

@Component({
    selector: 'strangereal-map',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapComponent implements OnInit, AfterViewInit {
    @Input()
    token!: string;

    containerId!: string;
    map: MapboxGl.Map | undefined;

    ngOnInit() {
        if (isEmpty(this.token)) {
            throw new Error('Access token is required');
        }

        this.containerId = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString();
    }

    ngAfterViewInit() {
        this.map = new MapboxGl.Map({
            container: this.containerId,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [-74.5, 40],
            zoom: 9,
            accessToken: this.token
        });
    }
}
