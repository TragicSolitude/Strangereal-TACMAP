import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';

@Component({
    standalone: true,
    imports: [
        NxWelcomeComponent,
        RouterModule,
        MenubarModule
    ],
    selector: 'strangereal-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent {
    title = 'strangereal-frontend';

    navigationMenu: MenuItem[] = [
        {title: 'Test',
         label: 'Covfefe',
         command() { console.log('clicked') }}
    ];
}
