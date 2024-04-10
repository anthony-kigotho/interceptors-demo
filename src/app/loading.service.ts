import { Injectable } from '@angular/core';

@Injectable()
export class LoadingService {
  private loading = false;

  showLoadingSpinner() {
    this.loading = true;
    console.log('Loading spinner shown'); // Log when loading spinner is shown
    // Logic to show loading spinner UI element
  }

  hideLoadingSpinner() {
    this.loading = false;
    console.log('Loading spinner hidden'); // Log when loading spinner is hidden
    // Logic to hide loading spinner UI element
  }

  isLoading(): boolean {
    return this.loading;
  }
}