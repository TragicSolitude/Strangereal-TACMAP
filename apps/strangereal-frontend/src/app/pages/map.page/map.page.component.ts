import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapBasicComponent } from '../../components/map-basic/map-basic.component';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
    standalone: true,
    imports: [CommonModule, MapBasicComponent],
    providers: [DialogService],
    templateUrl: './map.page.component.html',
    styleUrls: ['./map.page.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapPageComponent {
    @HostBinding('class')
    class = 'page';
}
