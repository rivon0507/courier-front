import { Component, effect, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { Reception, ReceptionPiece } from '@domains/reception/reception.model';
import { TranslocoService } from "@jsverse/transloco";
import { ReceptionFormComponent } from "@features/reception/components/reception-form";
import { ReceptionStore } from "@domains/reception/reception.store";
import { ReceptionPiecesFormComponent } from "@features/reception/components/reception-pieces-form";

/**
 * t(reception.dialog.title.view, reception.dialog.title.create, reception.dialog.title.edit)
 */
type DialogMode = "view" | "create" | "edit";

type PiecesForm = {
  [K in keyof ReceptionPiece]: FormControl<ReceptionPiece[K] | null>;
};

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
    ReactiveFormsModule,
    ReceptionFormComponent,
    ReceptionPiecesFormComponent
  ]
})
export class ReceptionPanelComponent implements OnInit {
  public data: { mode: DialogMode, reception: Reception | null } = inject(MAT_DIALOG_DATA);
  protected reception = this.data.reception;
  protected mode = this.data.mode;
  protected title: string;
  private fb = inject(FormBuilder);
  receptionForm = this.fb.group({
    id: [null as number | null],
    dateReception: [null as string | null, Validators.required],
    expediteur: [null as string | null, Validators.required],
    reference: [null as string | null, Validators.required],
  });
  piecesForm = this.fb.array<FormGroup<PiecesForm>>([
    this.fb.group({
      id: [null as number | null],
      nature: [null as string | null, Validators.required],
      quantite: [null as number | null, [Validators.required, Validators.min(1)]]
    })
  ]);
  private t = inject(TranslocoService);
  protected receptionStore = inject(ReceptionStore);
  private dialogRef = inject(MatDialogRef<ReceptionPanelComponent>);

  constructor() {
    if (this.reception && (this.mode == "view" || this.mode == "edit")) {
      this.receptionForm.patchValue(this.reception);
    } else {
      this.mode = "create";
    }
    this.title = this.t.translate(`reception.dialog.title.${this.mode}`, {ref: this.reception?.reference});

    effect(() => {
      const pieces = this.receptionStore.pieces();
      if (this.mode != "create" && pieces != null) {
        this.piecesForm.clear();
        pieces.forEach(p => this.piecesForm.push(this.formForPiece(p)));
      }
    });
  }

  ngOnInit(): void {
    if (this.reception) this.receptionStore.selectReception(this.reception.id);
  }

  onSubmit(): void {
    if (this.receptionForm.valid) {
      this.dialogRef.close({...this.receptionForm.value, pieces: []});
    }
  }

  private formForPiece(piece: ReceptionPiece) {
    return this.fb.group({
      id: [piece.id],
      nature: [piece.nature, Validators.required],
      quantite: [piece.quantite, [Validators.required, Validators.min(1)]]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
