import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MarkerRepository } from './marker-repository';
import { AuthRepository } from './auth-repository';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule
    ],
    providers: [MarkerRepository, AuthRepository],
    exports: []
})
export class DataAccessApiModule {}
