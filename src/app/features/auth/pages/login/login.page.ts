import { Component, inject } from '@angular/core';
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardLgImage,
  MatCardSubtitle,
  MatCardTitle
} from '@angular/material/card';
import { NgOptimizedImage } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatError, MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatDivider } from '@angular/material/list';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'app-login-page',
  imports: [
    MatCardContent,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle,
    NgOptimizedImage,
    FormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatError,
    MatButton,
    MatCardLgImage,
    MatDivider,
    MatTooltip
  ],
  templateUrl: './login.page.html',
  styleUrl: './login.page.css',
})
export class LoginPage {
  private fb = inject(FormBuilder);
  loginForm = this.fb.group({
    email: [null as string | null, [Validators.required, Validators.email]],
    password: [null as string | null, Validators.required]
  });

  onSubmit (): void {

  }
}
