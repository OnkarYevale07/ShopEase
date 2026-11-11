import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideHouse,
  lucideLayoutGrid,
  lucideFlame,
  lucideZap,
  lucidePackage,
  lucideHeart,
  lucideSettings,
  lucideShoppingBag,
  lucidePanelLeft,
  lucideSun,
  lucideMoon,
} from '@ng-icons/lucide';
import { HlmSidebarImports, HlmSidebarService } from '@spartan-ng/helm/sidebar';
import { StoreService } from '../../../core/services/store.service';

@Component({
  imports: [RouterLink, RouterLinkActive, NgIcon, HlmSidebarImports],
  providers: [
    provideIcons({
      lucideHouse,
      lucideLayoutGrid,
      lucideFlame,
      lucideZap,
      lucidePackage,
      lucideHeart,
      lucideSettings,
      lucideShoppingBag,
      lucidePanelLeft,
      lucideSun,
      lucideMoon,
    }),
  ],
  selector: 'app-sidebar',
  styleUrl: './sidebar.css',
  templateUrl: './sidebar.html',
})
export class Sidebar {
  protected readonly sidebarService = inject(HlmSidebarService);
  protected readonly store = inject(StoreService);

  // ShopEase brand matching reference image
  protected readonly company = {
    name: 'ShopEase',
    branch: 'Online Store',
    logoIcon: 'lucideShoppingBag',
  };

  protected onLogoClick(): void {
    if (this.sidebarService.state() === 'collapsed') {
      this.sidebarService.setOpen(true);
    }
  }

  protected toggleSidebar(): void {
    this.sidebarService.toggleSidebar();
  }

  protected readonly _items = [
    {
      title: 'Home',
      url: '/dashboard',
      icon: 'lucideHouse',
    },
    {
      title: 'Categories',
      url: '/categories',
      icon: 'lucideLayoutGrid',
    },
    {
      title: 'Trending',
      url: '/trending',
      icon: 'lucideFlame',
    },
    {
      title: 'Flash Deals',
      url: '/flash-deals',
      icon: 'lucideZap',
    },
    {
      title: 'Orders',
      url: '/orders',
      icon: 'lucidePackage',
    },
    {
      title: 'Wishlist',
      url: '/wishlist',
      icon: 'lucideHeart',
    },
  ];

  protected readonly footerItems = [
    {
      title: 'Settings',
      url: '/settings',
      icon: 'lucideSettings',
    },
  ];
}
