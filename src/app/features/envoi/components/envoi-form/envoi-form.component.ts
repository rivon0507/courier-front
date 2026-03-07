import { Component, computed, input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { Envoi } from "@domains/envoi/envoi.model";
import { MatDatepicker, MatDatepickerInput, MatDatepickerToggle } from "@angular/material/datepicker";
import { MatError, MatFormField, MatInput, MatLabel, MatSuffix } from "@angular/material/input";

export type EnvoiForm = {
  [K in keyof Envoi]: FormControl<Envoi[K] | null>;
};

type FormMode = "view" | "edit" | "create";

@Component({
  selector: 'app-envoi-form',
  imports: [
    ReactiveFormsModule,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    MatSuffix
  ],
  templateUrl: './envoi-form.component.html',
  styleUrl: './envoi-form.component.css',
})
export class EnvoiFormComponent {
  form = input.required<FormGroup<EnvoiForm>>();
  mode = input<FormMode>("create");
  protected readOnly = computed(() => this.mode() === "view");
}
