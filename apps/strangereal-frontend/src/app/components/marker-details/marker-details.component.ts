import { AfterViewChecked, AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { Dropdown, DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AutoFocusModule } from 'primeng/autofocus';
import { MarkerType } from '@strangereal/util-constants';

import * as _ from 'lodash';

interface Entry<T> {
    name: string;
    value: T;
}

@Component({
    selector: 'strangereal-marker-details',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        InputTextModule,
        DropdownModule,
        ButtonModule,
        AutoFocusModule
    ],
    templateUrl: './marker-details.component.html',
    styleUrls: ['./marker-details.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarkerDetailsComponent implements AfterViewInit {
    readonly MarkerType = MarkerType;

    @ViewChild('typeDropdown', { static: true })
    dropdown!: Dropdown;

    public readonly formGroup: FormGroup;
    public readonly markerTypes: Array<Entry<MarkerType.Type> | null>;

    constructor(form: FormBuilder,
                public readonly dialogRef: DynamicDialogRef,
                public readonly config: DynamicDialogConfig) {
        if (typeof config.data !== 'object' || config.data === null) {
            throw new Error('Initial details must be provided');
        }
        const { x, y, name, type } = config.data;
        if (typeof x === 'undefined' || typeof y === 'undefined') {
            throw new Error('Coordinates must be provided for marker details');
        }

        const allegiance = config.data.allegiance as MarkerType.Allegiance | undefined;
        const markerTypes = MarkerType.forAllegiance(allegiance).map(type => ({
            name: MarkerType.toString(type),
            value: type
        }));

        this.markerTypes = markerTypes;
        this.formGroup = form.group({
            type: form.control<Entry<MarkerType.Type> | null>(null, [Validators.required]),
            name: form.control<string | null>(name || null)
        });

        if (type) {
            const entry = {
                name: MarkerType.toString(type),
                value: type
            };

            if (!markerTypes.find(({ value }) => value === type)) {
                markerTypes.unshift(entry);
            }

            this.formGroup.controls['type'].setValue(entry);
        }
    }

    ngAfterViewInit(): void {
        // Needs to be delayed slightly so it's positioned correctly after the
        // short dialog animation
        setTimeout(() => this.dropdown.show(), 100);
    }

    // TODO figure out how to submit when enter is pressed in the form but not
    // when the dropdown is visible
    //
    // @HostListener('document:keydown.enter', ['$event'])
    // onKeydownEnter(_event: KeyboardEvent): void {
    //     this.submit();
    // }

    submit(): void {
        this.formGroup.markAsDirty();

        if (this.formGroup.valid) {
            let { name } = this.formGroup.value;
            if (_.isEmpty(name)) {
                name = null;
            }

            const { type } = this.formGroup.value;
            const { x, y } = this.config.data;
            const marker = { x, y, name, type: type.value };

            this.dialogRef.close(marker);
        }
    }
}
