import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideZap,
  lucideStar,
  lucideHeart,
  lucideShoppingCart,
  lucideArrowRight,
  lucideClock,
  lucideSparkles,
} from '@ng-icons/lucide';
import { Product, StoreService } from '../../core/services/store.service';

@Component({
  imports: [CommonModule, RouterLink, NgIcon],
  providers: [
    provideIcons({
      lucideZap,
      lucideStar,
      lucideHeart,
      lucideShoppingCart,
      lucideArrowRight,
      lucideClock,
      lucideSparkles,
    }),
  ],
  selector: 'app-flash-deals',
  templateUrl: './flash-deals.html',
})
export class FlashDeals implements OnInit, OnDestroy {
  protected readonly store = inject(StoreService);
  protected readonly addedProducts = signal<Record<string, boolean>>({});

  // Real-time ticking countdown
  protected readonly countdown = signal<{ hours: string; minutes: string; seconds: string }>({
    hours: '08',
    minutes: '19',
    seconds: '44',
  });
  private _interval: any = null;

  // Curated Flash Deals with claim progress
  protected readonly deals = signal<
    {
      product: Product;
      claimedPercent: number;
    }[]
  >([
    {
      product: {
        id: 'flash-1',
        title: 'True Wireless Earbuds with ANC',
        category: 'Electronics',
        price: 999,
        originalPrice: 1999,
        discountPercent: 50,
        rating: 4.5,
        reviewsCount: '4.7k',
        image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&auto=format&fit=crop&q=80',
        description: 'Dual-mic noise cancellation, 32 hours battery, IPX5 waterproof.',
      },
      claimedPercent: 82,
    },
    {
      product: {
        id: 'trend-1',
        title: 'Studio Wireless Headphones',
        category: 'Electronics',
        price: 2799,
        originalPrice: 3999,
        discountPercent: 30,
        rating: 4.5,
        reviewsCount: '2.8k',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=80',
      },
      claimedPercent: 64,
    },
    {
      product: {
        id: 'trend-2',
        title: 'Smart Watch Pro Retina',
        category: 'Accessories',
        price: 4499,
        originalPrice: 5999,
        discountPercent: 25,
        rating: 4.6,
        reviewsCount: '1.9k',
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=80',
      },
      claimedPercent: 91,
    },
    {
      product: {
        id: 'trend-3',
        title: 'Streetwear Canvas Sneakers',
        category: 'Fashion',
        price: 1499,
        originalPrice: 2499,
        discountPercent: 40,
        rating: 4.4,
        reviewsCount: '3.2k',
        image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&auto=format&fit=crop&q=80',
      },
      claimedPercent: 77,
    },
  ]);

  ngOnInit(): void {
    let totalSecs = 8 * 3600 + 19 * 60 + 44;
    this._interval = setInterval(() => {
      if (totalSecs > 0) {
        totalSecs--;
        const h = Math.floor(totalSecs / 3600);
        const m = Math.floor((totalSecs % 3600) / 60);
        const s = totalSecs % 60;
        this.countdown.set({
          hours: h.toString().padStart(2, '0'),
          minutes: m.toString().padStart(2, '0'),
          seconds: s.toString().padStart(2, '0'),
        });
      }
    }, 1000);
  }

  ngOnDestroy(): void {
    if (this._interval) {
      clearInterval(this._interval);
    }
  }

  protected isWishlisted(id: string): boolean {
    return this.store.isWishlisted(id);
  }

  protected toggleWishlist(product: Product, event: Event): void {
    event.stopPropagation();
    event.preventDefault();
    this.store.toggleWishlist(product);
  }

  protected grabDeal(product: Product, event: Event): void {
    event.stopPropagation();
    event.preventDefault();
    this.store.addToCart(product);

    this.addedProducts.update((m) => ({ ...m, [product.id]: true }));
    setTimeout(() => {
      this.addedProducts.update((m) => ({ ...m, [product.id]: false }));
    }, 1400);
  }
}

