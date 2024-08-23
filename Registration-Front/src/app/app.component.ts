import { Component } from '@angular/core';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, LandingPageComponent],
  template: `
    <div class="container-fluid p-0">
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">UserBase</a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav me-auto">
              <li class="nav-item">
                <a class="nav-link active" routerLink="login" href="#">Login</a>
              </li>
              <li class="nav-item">
                <a class="nav-link active" routerLink="signup" href="#"
                  >Sign-Up</a
                >
              </li>
            </ul>
            <ul class="navbar-nav">
              <li class="nav-item ms-auto profile-btn">
                <button
                  class="btn btn-outline-success me-2"
                  type="button"
                  [routerLink]="['/profile', userId]"
                >
                  Profile
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <app-landing-page></app-landing-page>
    </div>
  `,
  styles: [``],
})
export class AppComponent {
  title = 'Registration-Front';

  userId: number = 0;
}
