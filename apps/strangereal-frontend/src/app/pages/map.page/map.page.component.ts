import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapBasicComponent } from '../../components/map-basic/map-basic.component';

@Component({
    standalone: true,
    imports: [CommonModule, MapBasicComponent],
    templateUrl: './map.page.component.html',
    styleUrls: ['./map.page.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapPageComponent {
    // TODO use environment variable or something
    mapboxToken = '';
}
