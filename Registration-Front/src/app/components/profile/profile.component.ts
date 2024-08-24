import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserResponseDTO } from '../../common/user-response-dto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="user">
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
    this.loadUserProfile(email);
  }

  loadUserProfile(email: string) {
    this.authService.loadUserProfile(email).subscribe((response) => {
      this.user = response;
    });
  }
}
