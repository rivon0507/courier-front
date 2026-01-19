import { Component, inject, Inject } from '@angular/core';

import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ReceptionItem } from '../reception/reception-datasource';


@Component({
  selector: 'app-reception-form',
  templateUrl: './reception-form.component.html',
  styleUrl: './reception-form.component.css',
  imports: [
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule
  ]
})
export class ReceptionFormComponent {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<ReceptionFormComponent>);

  receptionForm = this.fb.group({
    dateReception: [null as string | null, Validators.required],
    expediteur: [null as string | null, Validators.required],
    reference: [null as string | null, Validators.required]
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: ReceptionItem | null) {
    if (data) {
      this.receptionForm.patchValue(data);
    }
  }

  onSubmit(): void {
    if (this.receptionForm.valid) {
      this.dialogRef.close(this.receptionForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
