import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideShoppingBag,
  lucideMail,
  lucideLock,
  lucideEye,
  lucideEyeOff,
  lucideArrowRight,
  lucideShieldCheck,
  lucideCheck,
  lucideSun,
  lucideMoon,
  lucideArrowLeft,
} from '@ng-icons/lucide';
import { StoreService } from '../../../core/services/store.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, NgIcon],
  providers: [
    provideIcons({
      lucideShoppingBag,
      lucideMail,
      lucideLock,
      lucideEye,
      lucideEyeOff,
      lucideArrowRight,
      lucideShieldCheck,
      lucideCheck,
      lucideSun,
      lucideMoon,
      lucideArrowLeft,
    }),
  ],
  templateUrl: './login.html',
})
export class LoginComponent {
  private readonly router = inject(Router);
  protected readonly store = inject(StoreService);

  protected email = 'aniket.sharma@example.com';
  protected password = 'password123';
  protected rememberMe = true;
  protected showPassword = signal<boolean>(false);
  protected isLoading = signal<boolean>(false);
  protected errorMessage = signal<string>('');

  protected togglePassword(): void {
    this.showPassword.update((v) => !v);
  }

  protected fillDemoCredentials(): void {
    this.email = 'aniket.sharma@example.com';
    this.password = 'password123';
    this.store.showToast('Demo credentials filled!', 'info');
  }

  protected onSubmit(): void {
    if (!this.email || !this.password) {
      this.errorMessage.set('Please provide both email address and password.');
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');

    setTimeout(() => {
      this.isLoading.set(false);
      const success = this.store.login(this.email, this.password);
      if (success) {
        this.router.navigate(['/dashboard']);
      }
    }, 600);
  }

  protected socialLogin(provider: string): void {
    this.store.login(`${provider.toLowerCase()}.user@shopease.com`, undefined, `${provider} Shopper`);
    this.router.navigate(['/dashboard']);
  }
}

