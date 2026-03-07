import { Component, effect, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { Envoi, EnvoiPiece } from '@domains/envoi/envoi.model';
import { TranslocoService } from "@jsverse/transloco";
import { EnvoiStore } from "@domains/envoi/envoi.store";
import { EnvoiFormComponent } from "@features/envoi/components/envoi-form";
import { PiecesFormComponent } from "@shared/components/pieces-form";

/**
 * t(envoi.dialog.title.view, envoi.dialog.title.create, envoi.dialog.title.edit)
 */
type DialogMode = "view" | "create" | "edit";

type PiecesForm = {
  [K in keyof EnvoiPiece]: FormControl<EnvoiPiece[K] | null>;
};

@Component({
  selector: 'app-envoi-panel',
  templateUrl: './envoi-panel.component.html',
  styleUrl: './envoi-panel.component.css',
  imports: [
    MatDialogModule,
    ReactiveFormsModule,
    EnvoiFormComponent,
    PiecesFormComponent
  ]
})
export class EnvoiPanelComponent implements OnInit {
  public data: { mode?: DialogMode, envoi: Envoi | null } = inject(MAT_DIALOG_DATA);
  protected envoi = this.data.envoi;
  protected mode: DialogMode = "view";
  protected title: string;
  protected envoiStore = inject(EnvoiStore);
  private fb = inject(FormBuilder);
  envoiForm = this.fb.group({
    id: [null as number | null],
    dateEnvoi: [null as string | null, Validators.required],
    destinataire: [null as string | null, Validators.required],
    reference: [null as string | null, Validators.required],
    observation: [null as string | null]
  });
  piecesForm = this.fb.array<FormGroup<PiecesForm>>([]);
  private t = inject(TranslocoService);

  constructor() {
    if (this.envoi) {
      this.envoiForm.patchValue(this.envoi);
    }
    this.title = this.t.translate('envoi.dialog.title.view', {ref: this.envoi?.reference ?? ''});

    effect(() => {
      const pieces = this.envoiStore.pieces();
      if (pieces != null) {
        this.piecesForm.clear();
        pieces.forEach(p => this.piecesForm.push(this.formForPiece(p)));
      }
    });
  }

  ngOnInit(): void {
    if (this.envoi) this.envoiStore.selectEnvoi(this.envoi.id);
  }

  private formForPiece(piece: EnvoiPiece) {
    return this.fb.group({
      id: [piece.id],
      nature: [piece.nature, Validators.required],
      quantite: [piece.quantite, [Validators.required, Validators.min(1)]]
    });
  }
}
