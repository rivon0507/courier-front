import { Component, computed, inject, OnInit } from '@angular/core';
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
import { SessionStore } from '@core/session/session.store';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatIcon } from '@angular/material/icon';
import { Credentials } from '@core/session/session.model';
import { filter, take } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';

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
    MatTooltip,
    MatProgressSpinner,
    MatIcon
  ],
  templateUrl: './login.page.html',
  styleUrl: './login.page.css',
})
export class LoginPage implements OnInit {
  private fb = inject(FormBuilder);
  private sessionStore = inject(SessionStore);
  private router = inject(Router);
  private authSuccess$ = toObservable(this.sessionStore.isAuthenticated).pipe(
    filter(status => status),
    take(1)
  );

  loggingIn = computed(() => this.sessionStore.activity() === "login");
  loginError = computed(() => this.sessionStore.error());

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  constructor () {
    this.authSuccess$.subscribe(() => this.router.navigateByUrl("/home"))
  }

  ngOnInit (): void {
    this.loginForm.valueChanges.subscribe(
      () => this.sessionStore.clearError()
    );
  }

  onSubmit (): void {
    this.sessionStore.login(<Credentials>this.loginForm.value);
  }
}
