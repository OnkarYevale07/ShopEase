import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideHeart,
  lucideShoppingCart,
  lucideTrash2,
  lucideChevronRight,
  lucideStar,
  lucideSparkles,
  lucideArrowRight,
} from '@ng-icons/lucide';
import { StoreService, Product } from '../../core/services/store.service';
import { HlmButtonImports } from '@spartan-ng/helm/button';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, RouterLink, NgIcon, HlmButtonImports],
  providers: [
    provideIcons({
      lucideHeart,
      lucideShoppingCart,
      lucideTrash2,
      lucideChevronRight,
      lucideStar,
      lucideSparkles,
      lucideArrowRight,
    }),
  ],
  templateUrl: './wishlist.html',
})
export class WishlistComponent {
  protected readonly store = inject(StoreService);

  protected removeFromWishlist(product: Product, event: Event): void {
    event.stopPropagation();
    this.store.toggleWishlist(product);
  }

  protected moveToCart(product: Product, event: Event): void {
    event.stopPropagation();
    this.store.addToCart(product, 1);
    this.store.toggleWishlist(product);
  }

  protected addToCart(product: Product, event: Event): void {
    event.stopPropagation();
    this.store.addToCart(product, 1);
  }

  protected moveAllToCart(): void {
    const items = this.store.wishlistedProducts();
    if (items.length === 0) return;
    for (const product of items) {
      this.store.addToCart(product, 1);
      this.store.toggleWishlist(product);
    }
    this.store.showToast(`Moved ${items.length} item(s) to Cart!`, 'success');
  }

  protected clearWishlist(): void {
    const items = [...this.store.wishlistedProducts()];
    for (const product of items) {
      this.store.toggleWishlist(product);
    }
  }
}

