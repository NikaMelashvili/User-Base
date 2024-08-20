import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `<div class="container-login">
    <form [formGroup]="loginFormGroup" (ngSubmit)="login()">
      <div class="mb-3">
        <label for="email" class="form-label">Email address</label>
        <input
          type="email"
          class="form-control"
          id="email"
          formControlName="email"
          placeholder="name@example.com"
        />
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input
          type="password"
          class="form-control"
          id="password"
          formControlName="password"
          placeholder="Password"
        />
      </div>
      <div class="mb-3">
        <button type="submit" class="btn btn-primary mb-3">Submit</button>
      </div>
    </form>
  </div> `,
  styles: [
    `
      .container-login {
        padding-top: 20px;
      }
    `,
  ],
})
export class LoginComponent implements OnInit {
  loginFormGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.loginFormGroup = this.formBuilder.group({
      email: [''],
      password: [''],
    });
  }
  login() {
    throw new Error('Method not implemented.');
  }
}
