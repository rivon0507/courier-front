import { Component } from '@angular/core';
import { MatCard, MatCardContent } from '@angular/material/card';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth',
  imports: [
    MatCard,
    MatCardContent,
    RouterOutlet
  ],
  templateUrl: './auth.layout.html',
  styleUrl: './auth.layout.css',
})
export class AuthLayout {

}
