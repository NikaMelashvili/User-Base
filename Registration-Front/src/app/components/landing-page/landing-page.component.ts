import { Component } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from "../navigation/navigation.component";

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    LoginComponent,
    SignUpComponent,
    CommonModule,
    RouterOutlet,
    RouterLink,
    NavigationComponent
],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css',
})
export class LandingPageComponent {}
