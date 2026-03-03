import { Component, computed, input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { Reception } from "@domains/reception/reception.model";
import { MatDatepicker, MatDatepickerInput, MatDatepickerToggle } from "@angular/material/datepicker";
import { MatError, MatFormField, MatInput, MatLabel, MatSuffix } from "@angular/material/input";

type ReceptionForm = {
  [K in keyof Reception]: FormControl<Reception[K] | null>;
};

type FormMode = "view" | "edit" | "create";

@Component({
  selector: 'app-reception-form',
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
  templateUrl: './reception-form.component.html',
  styleUrl: './reception-form.component.css',
})
export class ReceptionFormComponent {
  form = input.required<FormGroup<ReceptionForm>>();
  mode = input<FormMode>("create");
  protected readOnly = computed(() => this.mode() === "view");
}
