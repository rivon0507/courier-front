import { Component, computed, inject, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardLgImage,
  MatCardSubtitle,
  MatCardTitle
} from '@angular/material/card';
import { MatDivider } from '@angular/material/list';
import { MatError, MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatTooltip } from '@angular/material/tooltip';
import { NgOptimizedImage } from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SessionStore } from '@core/session/session.store';
import { toObservable } from '@angular/core/rxjs-interop';
import { filter, take } from 'rxjs';
import { safeNext } from '@core/utils';

@Component({
  selector: 'app-register-page',
  imports: [
    MatButton,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardLgImage,
    MatCardSubtitle,
    MatCardTitle,
    MatDivider,
    MatError,
    MatFormField,
    MatIcon,
    MatInput,
    MatLabel,
    MatProgressSpinner,
    MatTooltip,
    NgOptimizedImage,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './register.page.html',
  styleUrl: './register.page.css',
})
export class RegisterPage implements OnInit {
  private fb = inject(FormBuilder);
  private sessionStore = inject(SessionStore);
  private router = inject(Router);
  private authSuccess$ = toObservable(this.sessionStore.isAuthenticated).pipe(
    filter(status => status),
    take(1)
  );
  private next = inject(ActivatedRoute).snapshot.queryParamMap.get("next");

  registering = computed(() => this.sessionStore.activity() === "register");
  registerError = computed(() => this.sessionStore.error());

  registerForm = this.fb.group(
    {
      displayName: ['', [Validators.required, Validators.maxLength(80), Validators.pattern(/[^\\p{Cntrl}\n\r\t]+/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      passwordConfirm: ['']
    },
    {validators: [passwordMismatchValidator]}
  );

  ngOnInit (): void {
    this.sessionStore.clearError();
    this.authSuccess$.subscribe(() => this.router.navigateByUrl(safeNext(this.next, "/home")));
    this.registerForm.valueChanges.subscribe(
      () => this.sessionStore.clearError()
    );
  }

  onSubmit (): void {
    this.sessionStore.register({
      displayName: this.registerForm.value.displayName!,
      email: this.registerForm.value.email!,
      password: this.registerForm.value.password!
    });
  }
}

const passwordMismatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const confirm = control.get('passwordConfirm');
  return password && confirm && password.value !== confirm.value ? {passwordMismatch: true} : null;
}
