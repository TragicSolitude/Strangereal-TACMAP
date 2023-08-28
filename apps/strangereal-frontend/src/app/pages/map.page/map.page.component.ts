import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from '../../components/map/map.component';

@Component({
    standalone: true,
    imports: [CommonModule, MapComponent],
    templateUrl: './map.page.component.html',
    styleUrls: ['./map.page.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapPageComponent {
    // TODO use environment variable or something
    mapboxToken = '';
}
