import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
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
} from '@ng-icons/lucide';
import { StoreService } from '../../core/services/store.service';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmInputImports } from '@spartan-ng/helm/input';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, NgIcon, HlmButtonImports, HlmInputImports],
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
    }),
  ],
  templateUrl: './settings.html',
})
export class SettingsComponent {
  protected readonly store = inject(StoreService);

  // Active settings tab
  protected readonly activeTab = signal<'profile' | 'addresses' | 'notifications' | 'security'>('profile');

  // Profile Form state
  protected profile = {
    fullName: 'Aniket Sharma',
    email: 'aniket.sharma@example.com',
    phone: '+91 98765 43210',
    city: 'Mumbai, Maharashtra',
  };

  // Notification toggles
  protected notifications = {
    orderUpdates: true,
    promotions: true,
    whatsappAlerts: false,
    newsletter: true,
  };

  // Saved Addresses
  protected addresses = [
    {
      id: 'addr-1',
      tag: 'Home',
      name: 'Aniket Sharma',
      street: '402, Horizon Heights, Linking Road, Bandra West',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400050',
      phone: '+91 98765 43210',
      isDefault: true,
    },
    {
      id: 'addr-2',
      tag: 'Office',
      name: 'Aniket Sharma',
      street: 'Tower B, Tech Park, Mindspace, Malad West',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400064',
      phone: '+91 98765 43210',
      isDefault: false,
    },
  ];

  protected setTab(tab: 'profile' | 'addresses' | 'notifications' | 'security'): void {
    this.activeTab.set(tab);
  }

  protected saveProfile(): void {
    this.store.showToast('Profile information updated successfully!', 'success');
  }

  protected saveNotifications(): void {
    this.store.showToast('Notification preferences saved!', 'success');
  }

  protected setDefaultAddress(id: string): void {
    this.addresses = this.addresses.map((a) => ({
      ...a,
      isDefault: a.id === id,
    }));
    this.store.showToast('Default delivery address updated.', 'info');
  }
}

