import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { Reception } from '@domains/reception/reception.model';
import { TranslocoService } from "@jsverse/transloco";

/**
 * t(reception.dialog.title.view, reception.dialog.title.create, reception.dialog.title.edit)
 */
type DialogMode = "view" | "create" | "edit";

@Component({
  selector: 'app-reception-panel',
  templateUrl: './reception-panel.component.html',
  styleUrl: './reception-panel.component.css',
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
export class ReceptionPanelComponent {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<ReceptionPanelComponent>);
  private t = inject(TranslocoService);
  public data: { mode: DialogMode, reception: Reception | null } = inject(MAT_DIALOG_DATA);
  protected mode = this.data.mode;
  protected reception = this.data.reception;
  protected title: string;
  protected readOnly = this.mode == "view";

  receptionForm = this.fb.group({
    dateReception: [null as string | null, Validators.required],
    expediteur: [null as string | null, Validators.required],
    reference: [null as string | null, Validators.required],
    pieces: [[]]
  });

  constructor() {
    if (this.reception && (this.mode == "view" || this.mode == "edit")) {
      this.receptionForm.patchValue(this.reception);
    } else {
      this.mode = "create";
    }
    this.title = this.t.translate(`reception.dialog.title.${this.mode}`, {ref: this.reception?.reference});
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
