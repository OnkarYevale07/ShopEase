import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
  lucideThumbsUp,
  lucideMessageSquare,
  lucideSend,
  lucideX,
} from '@ng-icons/lucide';
import { Product, ProductReview, StoreService } from '../../core/services/store.service';
import { HlmButtonImports } from '@spartan-ng/helm/button';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, NgIcon, HlmButtonImports],
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
      lucideThumbsUp,
      lucideMessageSquare,
      lucideSend,
      lucideX,
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

  // Persisted In-Cart State Check
  protected readonly isInCart = computed<boolean>(() => {
    const p = this.product();
    return p ? this.store.isInCart(p.id) : false;
  });

  protected readonly cartQuantity = computed<number>(() => {
    const p = this.product();
    return p ? this.store.getCartQuantity(p.id) : 0;
  });

  // Selected quantity for adding
  protected readonly quantity = signal<number>(1);

  // Added feedback state
  protected readonly isJustAdded = signal<boolean>(false);

  // Reviews State
  protected readonly productReviews = computed<ProductReview[]>(() => {
    const p = this.product();
    if (!p) return [];
    return this.store.getProductReviews(p.id);
  });

  // Write Review Drawer / Form Toggle
  protected readonly isWriteReviewOpen = signal<boolean>(false);
  protected newRating = signal<number>(0);
  protected newTitle = '';
  protected newAuthor = this.store.currentUser()?.fullName ?? '';
  protected newComment = '';

  // Related products
  protected readonly relatedProducts = computed<Product[]>(() => {
    const current = this.product();
    if (!current) return this.store.allProducts().slice(0, 4);

    const sameCategory = this.store
      .allProducts()
      .filter((p) => p.category === current.category && p.id !== current.id);

    if (sameCategory.length >= 4) {
      return sameCategory.slice(0, 4);
    }

    const fallback = this.store.allProducts().filter((p) => p.id !== current.id);
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

  protected updateInCartQty(delta: number): void {
    const p = this.product();
    if (!p) return;
    this.store.updateQuantity(p.id, delta);
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

    if (!this.isInCart()) {
      this.store.addToCart(p, this.quantity());
    }
    this.store.openCart();
  }

  protected copyShareLink(): void {
    navigator.clipboard?.writeText(window.location.href);
    this.store.showToast('Product link copied to clipboard!', 'info');
  }

  // Reviews methods
  protected toggleWriteReview(): void {
    const opening = !this.isWriteReviewOpen();
    this.isWriteReviewOpen.set(opening);
    if (opening) {
      this.newRating.set(0);
      this.newTitle = '';
      this.newComment = '';
      this.newAuthor = this.store.currentUser()?.fullName ?? '';
    }
  }

  protected setRating(stars: number): void {
    this.newRating.set(stars);
  }

  protected submitReview(): void {
    const p = this.product();
    if (!p) return;

    if (this.newRating() === 0) {
      this.store.showToast('Please select a star rating by tapping on the stars.', 'error');
      return;
    }

    if (!this.newTitle.trim() || !this.newComment.trim()) {
      this.store.showToast('Please provide both a review headline and comment.', 'error');
      return;
    }

    this.store.addReview({
      productId: p.id,
      author: this.newAuthor.trim() || 'Verified Shopper',
      rating: this.newRating(),
      title: this.newTitle.trim(),
      comment: this.newComment.trim(),
      verifiedPurchase: true,
    });

    this.newRating.set(0);
    this.newTitle = '';
    this.newComment = '';
    this.isWriteReviewOpen.set(false);
  }

  protected likeReview(reviewId: string): void {
    this.store.likeReview(reviewId);
  }
}
