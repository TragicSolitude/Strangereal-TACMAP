import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MarkerRepository } from './marker-repository';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule
    ],
    providers: [MarkerRepository],
    exports: []
})
export class DataAccessApiModule {}
