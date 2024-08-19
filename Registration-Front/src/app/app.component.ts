import { Component } from '@angular/core';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { RouterOutlet, RouterLink } from '@angular/router';
import { NavigationComponent } from './components/navigation/navigation.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    LandingPageComponent,
    NavigationComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Registration-Front';

  userId: number = 0;
}
