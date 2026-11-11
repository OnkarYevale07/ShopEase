import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideShirt,
  lucideLaptop,
  lucideArmchair,
  lucideSparkles,
  lucideWatch,
  lucideDumbbell,
  lucideGamepad2,
  lucideBookOpen,
  lucideCar,
  lucideStar,
  lucideHeart,
  lucideShoppingCart,
  lucideSlidersHorizontal,
  lucideArrowRight,
  lucideCheck,
  lucidePlus,
  lucideMinus,
} from '@ng-icons/lucide';
import { Product, StoreService } from '../../core/services/store.service';

@Component({
  imports: [CommonModule, RouterLink, NgIcon],
  providers: [
    provideIcons({
      lucideShirt,
      lucideLaptop,
      lucideArmchair,
      lucideSparkles,
      lucideWatch,
      lucideDumbbell,
      lucideGamepad2,
      lucideBookOpen,
      lucideCar,
      lucideStar,
      lucideHeart,
      lucideShoppingCart,
      lucideSlidersHorizontal,
      lucideArrowRight,
      lucideCheck,
      lucidePlus,
      lucideMinus,
    }),
  ],
  selector: 'app-categories',
  templateUrl: './categories.html',
})
export class Categories {
  protected readonly store = inject(StoreService);
  protected readonly selectedCategory = signal<string>('All');
  protected readonly sortBy = signal<'featured' | 'low-to-high' | 'high-to-low' | 'rating'>('featured');
  protected readonly addedProducts = signal<Record<string, boolean>>({});

  protected readonly categoryPills = [
    { name: 'All', icon: 'lucideSlidersHorizontal' },
    { name: 'Fashion', icon: 'lucideShirt' },
    { name: 'Electronics', icon: 'lucideLaptop' },
    { name: 'Home & Living', icon: 'lucideArmchair' },
    { name: 'Beauty', icon: 'lucideSparkles' },
    { name: 'Accessories', icon: 'lucideWatch' },
    { name: 'Sports & Fitness', icon: 'lucideDumbbell' },
    { name: 'Toys & Games', icon: 'lucideGamepad2' },
    { name: 'Books & Stationery', icon: 'lucideBookOpen' },
  ];

  public readonly filteredProducts = computed(() => {
    let list = this.store.allProducts();
    const cat = this.selectedCategory();
    const q = this.store.searchQuery().toLowerCase();

    if (cat !== 'All') {
      list = list.filter((p) => p.category.toLowerCase() === cat.toLowerCase());
    }

    if (q) {
      list = list.filter(
        (p) => p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q),
      );
    }

    const sort = this.sortBy();
    if (sort === 'low-to-high') {
      return [...list].sort((a, b) => a.price - b.price);
    } else if (sort === 'high-to-low') {
      return [...list].sort((a, b) => b.price - a.price);
    } else if (sort === 'rating') {
      return [...list].sort((a, b) => b.rating - a.rating);
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

