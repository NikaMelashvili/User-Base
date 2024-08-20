import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { SignUp } from '../../common/sign-up';

@Component({
  selector: 'app-sign-up',
  template: `
    <div class="container-sign-up">
      <form [formGroup]="signUpFormGroup" (ngSubmit)="signUp()">
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
          <label for="formFile" class="form-label">Profile Picture</label>
          <input
            class="form-control"
            type="file"
            id="formFile"
            formControlName="profilePicture"
          />
        </div>
        <div class="mb-3">
          <button type="submit" class="btn btn-primary mb-3">Submit</button>
        </div>
      </form>
    </div>
  `,
  styles: [
    `
      .container-sign-up {
        padding-top: 20px;
      }
    `,
  ],
  standalone: true,
  imports: [HttpClientModule, ReactiveFormsModule],
})
export class SignUpComponent {
  signUpFormGroup!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.signUpFormGroup = this.formBuilder.group({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      profilePicture: new FormControl('', [Validators.required]),
    });
  }

  signUp() {
    const user = new SignUp();
    user.email = this.signUpFormGroup.get('email')?.value;
    user.password = this.signUpFormGroup.get('password')?.value;
    user.profileImageBase64 = this.signUpFormGroup.get('profilePicture')?.value;

    this.authService.userRegister(user).subscribe(
      (response) => {
        console.log('Registration successful', response.token);
      },
      (error) => {
        console.error('Registration failed', error);
      }
    );
  }
}
