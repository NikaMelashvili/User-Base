import { Component } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from '../profile/profile.component';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [
    LoginComponent,
    SignUpComponent,
    CommonModule,
    RouterOutlet,
    RouterLink,
    NavigationComponent,
    ProfileComponent,
  ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css',
})
export class NavigationComponent {
  userId: number = 0;
}
