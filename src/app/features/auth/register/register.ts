import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideShoppingBag,
  lucideUser,
  lucideMail,
  lucidePhone,
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
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, NgIcon],
  providers: [
    provideIcons({
      lucideShoppingBag,
      lucideUser,
      lucideMail,
      lucidePhone,
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
  templateUrl: './register.html',
})
export class RegisterComponent {
  private readonly router = inject(Router);
  protected readonly store = inject(StoreService);

  protected fullName = '';
  protected email = '';
  protected phone = '';
  protected password = '';
  protected agreeTerms = true;

  protected showPassword = signal<boolean>(false);
  protected isLoading = signal<boolean>(false);
  protected errorMessage = signal<string>('');

  protected togglePassword(): void {
    this.showPassword.update((v) => !v);
  }

  protected onSubmit(): void {
    if (!this.fullName || !this.email || !this.password) {
      this.errorMessage.set('Please fill in your name, email, and password.');
      return;
    }

    if (!this.agreeTerms) {
      this.errorMessage.set('Please agree to the Terms of Service to continue.');
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');

    setTimeout(() => {
      this.isLoading.set(false);
      const success = this.store.register(this.fullName, this.email, this.password, this.phone);
      if (success) {
        this.router.navigate(['/dashboard']);
      }
    }, 600);
  }

  protected socialRegister(provider: string): void {
    this.store.register(`New ${provider} User`, `${provider.toLowerCase()}.user@shopease.com`);
    this.router.navigate(['/dashboard']);
  }
}

