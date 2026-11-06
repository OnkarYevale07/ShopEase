import { CommonModule } from '@angular/common';
import { Component, HostListener, computed, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideShoppingBag,
  lucideShoppingCart,
  lucideHeart,
  lucideSearch,
  lucideLayoutGrid,
  lucideChevronDown,
  lucideUser,
  lucidePanelLeft,
  lucideX,
  lucidePlus,
  lucideMinus,
  lucideTrash2,
  lucideCheckCircle,
  lucideArrowRight,
  lucideTruck,
  lucideShieldCheck,
  lucideRotateCcw,
  lucideSlidersHorizontal,
  lucideSparkles,
  lucidePackage,
  lucideSettings,
  lucideZap,
  lucideFlame,
  lucideStar,
} from '@ng-icons/lucide';
import { HlmSidebarImports } from '@spartan-ng/helm/sidebar';
import { Product, StoreService } from '../../core/services/store.service';
import { Sidebar } from './sidebar/sidebar';

export interface SearchPageSuggestion {
  title: string;
  subtitle: string;
  url: string;
  category?: string;
  icon: string;
}

@Component({
  imports: [CommonModule, RouterOutlet, RouterLink, Sidebar, HlmSidebarImports, NgIcon],
  providers: [
    provideIcons({
      lucideShoppingBag,
      lucideShoppingCart,
      lucideHeart,
      lucideSearch,
      lucideLayoutGrid,
      lucideChevronDown,
      lucideUser,
      lucidePanelLeft,
      lucideX,
      lucidePlus,
      lucideMinus,
      lucideTrash2,
      lucideCheckCircle,
      lucideArrowRight,
      lucideTruck,
      lucideShieldCheck,
      lucideRotateCcw,
      lucideSlidersHorizontal,
      lucideSparkles,
      lucidePackage,
      lucideSettings,
      lucideZap,
      lucideFlame,
      lucideStar,
    }),
  ],
  selector: 'app-main-layout',
  styleUrl: './main-layout.css',
  templateUrl: './main-layout.html',
})
export class MainLayout {
  protected readonly store = inject(StoreService);
  private readonly router = inject(Router);

  protected readonly isAccountOpen = signal<boolean>(false);
  protected readonly isMobileSearchOpen = signal<boolean>(false);
  protected readonly isSearchFocused = signal<boolean>(false);

  // Searchable Application Navigation Destinations
  private readonly searchablePages: SearchPageSuggestion[] = [
    { title: 'Home', subtitle: 'Browse showcase banners, trending & new arrivals', url: '/dashboard', icon: 'lucideShoppingBag' },
    { title: 'Categories Explorer', subtitle: 'Explore full catalog across 9 departments', url: '/categories', icon: 'lucideLayoutGrid' },
    { title: 'Trending Products', subtitle: 'Hottest picks & top rated popular items', url: '/trending', icon: 'lucideFlame' },
    { title: 'Flash Deals', subtitle: 'Lightning discounts & real-time countdown deals', url: '/flash-deals', icon: 'lucideZap' },
    { title: 'My Orders', subtitle: 'Track shipments, view order history & re-order', url: '/orders', icon: 'lucidePackage' },
    { title: 'My Wishlist', subtitle: 'Saved favorite items & dream collection', url: '/wishlist', icon: 'lucideHeart' },
    { title: 'Account Settings', subtitle: 'Manage profile, saved addresses & notifications', url: '/settings', icon: 'lucideSettings' },
    { title: 'Fashion Collection', subtitle: 'Clothing, streetwear & apparel', url: '/categories', category: 'Fashion', icon: 'lucideLayoutGrid' },
    { title: 'Electronics & Gadgets', subtitle: 'Headphones, watches, laptops & gear', url: '/categories', category: 'Electronics', icon: 'lucideLayoutGrid' },
    { title: 'Home & Living', subtitle: 'Furniture, lights & decor items', url: '/categories', category: 'Home & Living', icon: 'lucideLayoutGrid' },
    { title: 'Beauty & Fragrances', subtitle: 'Perfumes, skincare & cosmetics', url: '/categories', category: 'Beauty', icon: 'lucideLayoutGrid' },
    { title: 'Accessories', subtitle: 'Backpacks, smartwatches, sunglasses & more', url: '/categories', category: 'Accessories', icon: 'lucideLayoutGrid' },
    { title: 'Sports & Fitness', subtitle: 'Active fitness equipment & gym accessories', url: '/categories', category: 'Sports & Fitness', icon: 'lucideLayoutGrid' },
    { title: 'Toys & Games', subtitle: 'Plush toys, games & kids collections', url: '/categories', category: 'Toys & Games', icon: 'lucideLayoutGrid' },
    { title: 'Books & Stationery', subtitle: 'Notebooks, paper goods & journals', url: '/categories', category: 'Books & Stationery', icon: 'lucideLayoutGrid' },
    { title: 'Automotive Accessories', subtitle: 'Car gear, maintenance & travel items', url: '/categories', category: 'Automotive', icon: 'lucideLayoutGrid' },
  ];

  // Matching Products computed
  protected readonly matchingProducts = computed<Product[]>(() => {
    const q = this.store.searchQuery().toLowerCase().trim();
    if (!q) return [];
    return this.store
      .allProducts()
      .filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          (p.description && p.description.toLowerCase().includes(q))
      )
      .slice(0, 5);
  });

  // Matching Pages computed
  protected readonly matchingPages = computed<SearchPageSuggestion[]>(() => {
    const q = this.store.searchQuery().toLowerCase().trim();
    if (!q) return [];
    return this.searchablePages
      .filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.subtitle.toLowerCase().includes(q) ||
          (p.category && p.category.toLowerCase().includes(q))
      )
      .slice(0, 4);
  });

  // Whether dropdown should show
  protected readonly showSuggestions = computed<boolean>(() => {
    return this.isSearchFocused() && this.store.searchQuery().trim().length > 0;
  });

  protected onSearchFocus(): void {
    this.isSearchFocused.set(true);
  }

  protected onSearchBlur(): void {
    // Small timeout to allow click event on suggestion items to register before closing
    setTimeout(() => {
      this.isSearchFocused.set(false);
    }, 200);
  }

  protected onSearchInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.store.setSearchQuery(input.value);
    this.isSearchFocused.set(true);
  }

  protected selectProduct(productId: string): void {
    this.isSearchFocused.set(false);
    this.store.clearSearchQuery();
    this.router.navigate(['/product', productId]);
  }

  protected selectPage(suggestion: SearchPageSuggestion): void {
    this.isSearchFocused.set(false);
    this.store.clearSearchQuery();
    if (suggestion.category) {
      this.store.setSelectedCategory(suggestion.category);
    }
    this.router.navigateByUrl(suggestion.url);
  }

  protected onSearchEnter(): void {
    const products = this.matchingProducts();
    if (products.length > 0) {
      this.selectProduct(products[0].id);
      return;
    }
    const pages = this.matchingPages();
    if (pages.length > 0) {
      this.selectPage(pages[0]);
      return;
    }
    this.router.navigate(['/categories']);
    this.isSearchFocused.set(false);
  }

  protected toggleAccount(): void {
    this.isAccountOpen.update((v) => !v);
  }

  protected selectCategory(category: string): void {
    this.store.setSelectedCategory(category);
    this.router.navigate(['/categories']);
  }

  protected toggleMobileSearch(): void {
    this.isMobileSearchOpen.update((v) => !v);
  }

  @HostListener('document:click', ['$event'])
  protected onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('[data-dropdown="search"]')) {
      this.isSearchFocused.set(false);
    }
    if (!target.closest('[data-dropdown="account"]')) {
      this.isAccountOpen.set(false);
    }
  }
}
