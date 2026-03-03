import { Component, computed, input } from '@angular/core';
import { ReceptionPiece } from "@domains/reception/reception.model";
import { FormArray, FormControl, FormGroup } from "@angular/forms";

type PiecesForm = {
  [K in keyof ReceptionPiece]: FormControl<ReceptionPiece[K] | null>;
};

type FormMode = "view" | "edit" | "create";

@Component({
  selector: 'app-reception-pieces-form',
  imports: [],
  templateUrl: './reception-pieces-form.component.html',
  styleUrl: './reception-pieces-form.component.css',
})
export class ReceptionPiecesFormComponent {
  public form = input.required<FormArray<FormGroup<PiecesForm>>>();
  public mode = input<FormMode>("create");
  protected readOnly = computed(() => this.mode() === "view");
  protected readonly formControls = computed(() => this.form().controls);
}
