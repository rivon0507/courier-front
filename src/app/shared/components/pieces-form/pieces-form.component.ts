import { Component, computed, input } from '@angular/core';
import { FormArray, FormControl, FormGroup } from "@angular/forms";

export interface PieceFormValue {
  id: number;
  nature: string;
  quantite: number;
}

type PiecesForm = {
  [K in keyof PieceFormValue]: FormControl<PieceFormValue[K] | null>;
};

type FormMode = "view" | "edit" | "create";

@Component({
  selector: 'app-pieces-form',
  imports: [],
  templateUrl: './pieces-form.component.html',
  styleUrl: './pieces-form.component.css',
})
export class PiecesFormComponent {
  public form = input.required<FormArray<FormGroup<PiecesForm>>>();
  public pieces = input.required<PieceFormValue[] | null>();
  public mode = input<FormMode>("create");
  protected readOnly = computed(() => this.mode() === "view");
  protected readonly formControls = computed(() => this.form().controls);
}
