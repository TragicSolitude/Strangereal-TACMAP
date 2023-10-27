import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
    selector: 'strangereal-login',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        InputTextModule,
        ButtonModule
    ],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
    public readonly formGroup: FormGroup;

    constructor(form: FormBuilder,
                public readonly dialogRef: DynamicDialogRef,
                public readonly config: DynamicDialogConfig) {
        this.formGroup = form.group({
            username: form.control<string | null>(null, [Validators.required])
        });
    }

    submit(): void {
        this.formGroup.markAsDirty();

        if (this.formGroup.valid) {
            const { username } = this.formGroup.value;

            // TODO Login and update auth state

            this.dialogRef.close();
        }
    }
}
