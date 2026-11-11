import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideFlame,
  lucideStar,
  lucideHeart,
  lucideShoppingCart,
  lucideArrowRight,
  lucideTrendingUp,
  lucideSparkles,
  lucideCheck,
  lucidePlus,
  lucideMinus,
} from '@ng-icons/lucide';
import { Product, StoreService } from '../../core/services/store.service';

@Component({
  imports: [CommonModule, RouterLink, NgIcon],
  providers: [
    provideIcons({
      lucideFlame,
      lucideStar,
      lucideHeart,
      lucideShoppingCart,
      lucideArrowRight,
      lucideTrendingUp,
      lucideSparkles,
      lucideCheck,
      lucidePlus,
      lucideMinus,
    }),
  ],
  selector: 'app-trending',
  templateUrl: './trending.html',
})
export class Trending {
  protected readonly store = inject(StoreService);
  protected readonly activeFilter = signal<'all' | 'electronics' | 'fashion' | 'beauty'>('all');
  protected readonly addedProducts = signal<Record<string, boolean>>({});

  public readonly trendingList = computed(() => {
    let list = this.store.allProducts().filter((p) => (p.discountPercent ?? 0) >= 20 || p.rating >= 4.5);
    const filter = this.activeFilter();
    if (filter !== 'all') {
      list = list.filter((p) => p.category.toLowerCase().includes(filter));
    }
    return list;
  });

  protected isWishlisted(id: string): boolean {
    return this.store.isWishlisted(id);
  }

  protected toggleWishlist(product: Product, event: Event): void {
    event.stopPropagation();
    event.preventDefault();
    this.store.toggleWishlist(product);
  }

  protected addToCart(product: Product, event: Event): void {
    event.stopPropagation();
    event.preventDefault();
    this.store.addToCart(product);

    this.addedProducts.update((m) => ({ ...m, [product.id]: true }));
    setTimeout(() => {
      this.addedProducts.update((m) => ({ ...m, [product.id]: false }));
    }, 1400);
  }
}

