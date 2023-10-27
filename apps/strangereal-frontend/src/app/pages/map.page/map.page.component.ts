import { ChangeDetectionStrategy, Component, HostBinding, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapBasicComponent } from '../../components/map-basic/map-basic.component';
import { DialogService } from 'primeng/dynamicdialog';
import { LoginComponent } from '../../components/login/login.component';

@Component({
    standalone: true,
    imports: [CommonModule, MapBasicComponent],
    providers: [DialogService],
    templateUrl: './map.page.component.html',
    styleUrls: ['./map.page.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapPageComponent implements OnInit {
    @HostBinding('class')
    class = 'page';

    // TODO use environment variable or something
    mapboxToken = '';

    constructor(private readonly dialogService: DialogService) {}

    ngOnInit(): void {
        // TODO make this an actual auth check
        const dialog = this.dialogService.open(LoginComponent, {
            header: 'Login',
            width: '28em',
            closeOnEscape: true,
            modal: true
        });
    }
}
