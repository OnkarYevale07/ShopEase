import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideSettings,
  lucideUser,
  lucideMapPin,
  lucideBell,
  lucideShieldCheck,
  lucideCreditCard,
  lucideChevronRight,
  lucideCheck,
  lucideSave,
  lucidePlus,
  lucideTrash2,
  lucideX,
  lucideHome,
  lucideBriefcase,
  lucideCoins,
  lucideSparkles,
  lucideLock,
} from '@ng-icons/lucide';
import { StoreService, UserAddress } from '../../core/services/store.service';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmInputImports } from '@spartan-ng/helm/input';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule, NgIcon, HlmButtonImports, HlmInputImports],
  providers: [
    provideIcons({
      lucideSettings,
      lucideUser,
      lucideMapPin,
      lucideBell,
      lucideShieldCheck,
      lucideCreditCard,
      lucideChevronRight,
      lucideCheck,
      lucideSave,
      lucidePlus,
      lucideTrash2,
      lucideX,
      lucideHome,
      lucideBriefcase,
      lucideCoins,
      lucideSparkles,
      lucideLock,
    }),
  ],
  templateUrl: './settings.html',
})
export class SettingsComponent {
  protected readonly store = inject(StoreService);

  // Active settings tab
  protected readonly activeTab = signal<'profile' | 'addresses' | 'notifications' | 'security'>('profile');

  // Address Modal State
  protected readonly isAddAddressOpen = signal<boolean>(false);

  // Form Model for New Address
  protected newAddress = {
    tag: 'Home' as 'Home' | 'Work' | 'Other',
    name: '',
    phone: '',
    street: '',
    landmark: '',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '',
    isDefault: false,
  };

  // Editable Profile Form (synced from store)
  protected profileForm = {
    fullName: this.store.currentUser()?.fullName ?? 'Aniket Sharma',
    email: this.store.currentUser()?.email ?? 'aniket.sharma@example.com',
    phone: this.store.currentUser()?.phone ?? '+91 98765 43210',
    gender: this.store.currentUser()?.gender ?? 'Male',
    birthDate: this.store.currentUser()?.birthDate ?? '1998-05-14',
  };

  // Notification toggles
  protected notifications = {
    orderUpdates: true,
    promotions: true,
    whatsappAlerts: false,
    newsletter: true,
  };

  // Password change state
  protected passwordForm = {
    current: '',
    newPass: '',
    confirmPass: '',
  };

  protected setTab(tab: 'profile' | 'addresses' | 'notifications' | 'security'): void {
    this.activeTab.set(tab);
  }

  protected saveProfile(): void {
    this.store.updateProfile({
      fullName: this.profileForm.fullName,
      email: this.profileForm.email,
      phone: this.profileForm.phone,
      gender: this.profileForm.gender as any,
      birthDate: this.profileForm.birthDate,
    });
  }

  protected openAddAddressModal(): void {
    const user = this.store.currentUser();
    this.newAddress = {
      tag: 'Home',
      name: user?.fullName ?? '',
      phone: user?.phone ?? '',
      street: '',
      landmark: '',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '',
      isDefault: this.store.addresses().length === 0,
    };
    this.isAddAddressOpen.set(true);
  }

  protected closeAddAddressModal(): void {
    this.isAddAddressOpen.set(false);
  }

  protected saveNewAddress(): void {
    if (!this.newAddress.name || !this.newAddress.street || !this.newAddress.pincode) {
      this.store.showToast('Please fill in recipient name, street address, and PIN code.', 'error');
      return;
    }

    this.store.addAddress({
      tag: this.newAddress.tag,
      name: this.newAddress.name,
      phone: this.newAddress.phone || '+91 98765 43210',
      street: this.newAddress.street,
      landmark: this.newAddress.landmark,
      city: this.newAddress.city,
      state: this.newAddress.state,
      pincode: this.newAddress.pincode,
      isDefault: this.newAddress.isDefault,
    });

    this.isAddAddressOpen.set(false);
  }

  protected deleteAddress(id: string, event: Event): void {
    event.stopPropagation();
    this.store.deleteAddress(id);
  }

  protected setDefaultAddress(id: string): void {
    this.store.setDefaultAddress(id);
  }

  protected saveNotifications(): void {
    this.store.showToast('Notification preferences saved successfully!', 'success');
  }

  protected changePassword(): void {
    if (!this.passwordForm.newPass || this.passwordForm.newPass.length < 6) {
      this.store.showToast('New password must be at least 6 characters long.', 'error');
      return;
    }
    if (this.passwordForm.newPass !== this.passwordForm.confirmPass) {
      this.store.showToast('Passwords do not match.', 'error');
      return;
    }

    this.passwordForm = { current: '', newPass: '', confirmPass: '' };
    this.store.showToast('Account password updated securely!', 'success');
  }
}
