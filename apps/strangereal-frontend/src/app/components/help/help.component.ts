import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelModule } from 'primeng/panel';

@Component({
    selector: 'strangereal-help',
    standalone: true,
    imports: [CommonModule, PanelModule],
    templateUrl: './help.component.html',
    styleUrls: ['./help.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HelpComponent {}
