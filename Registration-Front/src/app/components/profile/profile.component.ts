import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserResponseDTO } from '../../common/user-response-dto';
import { CommonModule } from '@angular/common';
import { getTokenFromCookie } from '../../utils/cookie';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="user">
      <h2>User profile</h2>
      <h2>{{ user.email }}</h2>
      <img
        [src]="'data:image/png;base64,' + user.profilePicture"
        alt="Profile Picture"
      />
    </div>
  `,
  styles: [``],
})
export class ProfileComponent implements OnInit {
  user!: UserResponseDTO;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    const email = this.authService.currentUserEmail;
    if (this.authService.currentUserEmail) {
      this.loadUserProfile(email);
    } else {
      console.error('User email is not set.');
    }
  }

  loadUserProfile(email: string) {
    this.authService.loadUserProfile(email).subscribe(
      (response) => {
        this.user = response;
        console.log('response: ' + response);
      },
      (error) => {
        console.error("Couldn't load user profile. " + error);
      }
    );
  }
}
