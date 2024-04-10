import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  getAuthToken(): string {
    // Logic to retrieve authentication token
    return 'your_auth_token_here';
  }
}