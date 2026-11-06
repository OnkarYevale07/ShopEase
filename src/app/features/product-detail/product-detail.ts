import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideArrowLeft,
  lucideArrowRight,
  lucideChevronRight,
  lucideHeart,
  lucideShoppingCart,
  lucideStar,
  lucideTruck,
  lucideShieldCheck,
  lucideRotateCcw,
  lucideBadgeCheck,
  lucidePlus,
  lucideMinus,
  lucideShare2,
  lucideSparkles,
  lucideCheck,
  lucideShoppingBag,
} from '@ng-icons/lucide';
import { Product, StoreService } from '../../core/services/store.service';
import { HlmButtonImports } from '@spartan-ng/helm/button';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, NgIcon, HlmButtonImports],
  providers: [
    provideIcons({
      lucideArrowLeft,
      lucideArrowRight,
      lucideChevronRight,
      lucideHeart,
      lucideShoppingCart,
      lucideStar,
      lucideTruck,
      lucideShieldCheck,
      lucideRotateCcw,
      lucideBadgeCheck,
      lucidePlus,
      lucideMinus,
      lucideShare2,
      lucideSparkles,
      lucideCheck,
      lucideShoppingBag,
    }),
  ],
  templateUrl: './product-detail.html',
})
export class ProductDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  protected readonly store = inject(StoreService);

  // Extract route param :id
  private readonly paramId = toSignal(
    this.route.paramMap.pipe(map((params) => params.get('id') ?? ''))
  );

  // Current product signal
  protected readonly product = computed<Product | undefined>(() => {
    const id = this.paramId();
    if (!id) return undefined;
    return this.store.getProductById(id);
  });

  // Selected quantity
  protected readonly quantity = signal<number>(1);

  // Added animation state
  protected readonly isJustAdded = signal<boolean>(false);

  // Related products from same category or trending
  protected readonly relatedProducts = computed<Product[]>(() => {
    const current = this.product();
    if (!current) return this.store.allProducts().slice(0, 4);

    const sameCategory = this.store
      .allProducts()
      .filter((p) => p.category === current.category && p.id !== current.id);

    if (sameCategory.length >= 4) {
      return sameCategory.slice(0, 4);
    }

    const fallback = this.store
      .allProducts()
      .filter((p) => p.id !== current.id);
    return fallback.slice(0, 4);
  });

  protected isWishlisted(id: string): boolean {
    return this.store.isWishlisted(id);
  }

  protected toggleWishlist(product: Product, event?: Event): void {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
    this.store.toggleWishlist(product);
  }

  protected incrementQty(): void {
    this.quantity.update((q) => Math.min(q + 1, 10));
  }

  protected decrementQty(): void {
    this.quantity.update((q) => Math.max(q - 1, 1));
  }

  protected addToCart(): void {
    const p = this.product();
    if (!p) return;

    this.store.addToCart(p, this.quantity());
    this.isJustAdded.set(true);
    setTimeout(() => this.isJustAdded.set(false), 2000);
  }

  protected buyNow(): void {
    const p = this.product();
    if (!p) return;

    this.store.addToCart(p, this.quantity());
    this.store.openCart();
  }

  protected copyShareLink(): void {
    navigator.clipboard?.writeText(window.location.href);
    this.store.showToast('Product link copied to clipboard!', 'info');
  }
}

