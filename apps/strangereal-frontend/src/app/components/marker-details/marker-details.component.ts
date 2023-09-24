import { AfterViewChecked, AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { Dropdown, DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import * as MarkerType from '../../../types/marker-type';
import { AutoFocusModule } from 'primeng/autofocus';

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
        const { x, y } = config.data;
        if (typeof x === 'undefined' || typeof y === 'undefined') {
            throw new Error('Coordinates must be provided for marker details');
        }

        this.formGroup = form.group({
            type: form.control<Entry<MarkerType.Type> | null>(null, [Validators.required]),
            name: form.control<string | null>(null)
        });

        const allegiance = config.data.allegiance as MarkerType.Allegiance | undefined;
        const markerTypes = MarkerType.forAllegiance(allegiance).map(type => ({
            name: MarkerType.toString(type),
            value: type
        }));

        this.markerTypes = markerTypes;
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
            const { type, name } = this.formGroup.value;
            const { x, y } = this.config.data;
            const marker = { x, y, name, type: type.value };

            this.dialogRef.close(marker);
        }
    }
}
