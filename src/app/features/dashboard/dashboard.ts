import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, computed, inject, signal } from '@angular/core';
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
  lucideZap,
  lucideArrowRight,
  lucideChevronLeft,
  lucideChevronRight,
  lucideTruck,
  lucideShieldCheck,
  lucideRotateCcw,
  lucideBadgeCheck,
  lucideShoppingBag,
  lucideEye,
  lucideCheck,
  lucidePlus,
  lucideMinus,
  lucideX,
} from '@ng-icons/lucide';
import { Product, StoreService } from '../../core/services/store.service';

export interface CategoryItem {
  id: string;
  name: string;
  icon: string;
  bgColor: string;
  textColor: string;
}

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
      lucideZap,
      lucideArrowRight,
      lucideChevronLeft,
      lucideChevronRight,
      lucideTruck,
      lucideShieldCheck,
      lucideRotateCcw,
      lucideBadgeCheck,
      lucideShoppingBag,
      lucideEye,
      lucideCheck,
      lucidePlus,
      lucideMinus,
      lucideX,
    }),
  ],
  selector: 'app-dashboard',
  styleUrl: './dashboard.css',
  templateUrl: './dashboard.html',
})
export class Dashboard implements OnInit, OnDestroy {
  protected readonly store = inject(StoreService);

  // Added button feedback tracking
  protected readonly addedProducts = signal<Record<string, boolean>>({});

  // Quick View Modal
  protected readonly quickViewProduct = signal<Product | null>(null);
  protected readonly quickViewQuantity = signal<number>(1);

  // Live Countdown timer matching reference image (12h 34m 22s)
  protected readonly countdown = signal<{ hours: string; minutes: string; seconds: string }>({
    hours: '12',
    minutes: '34',
    seconds: '22',
  });
  private _timerInterval: any = null;

  // Hero carousel slides
  protected readonly activeSlide = signal<number>(0);
  protected readonly slides = [
    {
      badge: 'Big Shopping Days',
      title: 'Up to 70% Off',
      subtitle: 'On Fashion, Electronics, Home & More',
      ctaText: 'Shop Now',
      ctaUrl: '#trending',
    },
    {
      badge: 'Mega Tech Fest',
      title: 'Next-Gen Audio & Gear',
      subtitle: 'Smart Watches, ANC Headphones & Accessories',
      ctaText: 'Explore Tech',
      ctaUrl: '#flash-deals',
    },
    {
      badge: 'Exclusive Drop',
      title: 'Autumn Fashion Trends',
      subtitle: 'Discover Hoodies, Designer Fragrances & Streetwear',
      ctaText: 'Discover Collection',
      ctaUrl: '#new-arrivals',
    },
  ];

  // 9 Categories matching reference image
  protected readonly categories: CategoryItem[] = [
    {
      id: 'cat-fashion',
      name: 'Fashion',
      icon: 'lucideShirt',
      bgColor: 'bg-purple-100/80',
      textColor: 'text-purple-700',
    },
    {
      id: 'cat-electronics',
      name: 'Electronics',
      icon: 'lucideLaptop',
      bgColor: 'bg-blue-100/80',
      textColor: 'text-blue-700',
    },
    {
      id: 'cat-home',
      name: 'Home & Living',
      icon: 'lucideArmchair',
      bgColor: 'bg-emerald-100/80',
      textColor: 'text-emerald-700',
    },
    {
      id: 'cat-beauty',
      name: 'Beauty',
      icon: 'lucideSparkles',
      bgColor: 'bg-pink-100/80',
      textColor: 'text-pink-700',
    },
    {
      id: 'cat-accessories',
      name: 'Accessories',
      icon: 'lucideWatch',
      bgColor: 'bg-amber-100/80',
      textColor: 'text-amber-700',
    },
    {
      id: 'cat-sports',
      name: 'Sports & Fitness',
      icon: 'lucideDumbbell',
      bgColor: 'bg-violet-100/80',
      textColor: 'text-violet-700',
    },
    {
      id: 'cat-toys',
      name: 'Toys & Games',
      icon: 'lucideGamepad2',
      bgColor: 'bg-orange-100/80',
      textColor: 'text-orange-700',
    },
    {
      id: 'cat-books',
      name: 'Books & Stationery',
      icon: 'lucideBookOpen',
      bgColor: 'bg-indigo-100/80',
      textColor: 'text-indigo-700',
    },
    {
      id: 'cat-automotive',
      name: 'Automotive',
      icon: 'lucideCar',
      bgColor: 'bg-sky-100/80',
      textColor: 'text-sky-700',
    },
  ];

  // Master Trending Products
  protected readonly trendingProducts: Product[] = [
    {
      id: 'trend-1',
      title: 'Wireless Headphones',
      category: 'Electronics',
      price: 2799,
      originalPrice: 3999,
      discountPercent: 30,
      rating: 4.5,
      reviewsCount: '2.8k',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=80',
      description: 'Ultra-low latency audio, 40mm dynamic drivers, padded memory foam headband.',
      inStock: true,
    },
    {
      id: 'trend-2',
      title: 'Smart Watch Pro',
      category: 'Accessories',
      price: 4499,
      originalPrice: 5999,
      discountPercent: 25,
      rating: 4.6,
      reviewsCount: '1.9k',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=80',
      description: 'Sleek aluminum frame, always-on Retina display, heart-rate tracking, GPS.',
      inStock: true,
    },
    {
      id: 'trend-3',
      title: 'Casual Sneakers',
      category: 'Fashion',
      price: 1499,
      originalPrice: 2499,
      discountPercent: 40,
      rating: 4.4,
      reviewsCount: '3.2k',
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&auto=format&fit=crop&q=80',
      description: 'All-day comfort with responsive cushioning and modern lavender streetwear highlights.',
      inStock: true,
    },
    {
      id: 'trend-4',
      title: 'Laptop Backpack',
      category: 'Accessories',
      price: 1199,
      originalPrice: 1499,
      discountPercent: 20,
      rating: 4.5,
      reviewsCount: '1.1k',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format&fit=crop&q=80',
      description: 'Water-resistant ballistic nylon, dedicated 16" laptop sleeve, USB pass-through port.',
      inStock: true,
    },
  ];

  // Flash Deals Featured Item
  protected readonly flashDealProduct: Product = {
    id: 'flash-1',
    title: 'True Wireless Earbuds',
    category: 'Electronics',
    price: 999,
    originalPrice: 1999,
    discountPercent: 50,
    rating: 4.5,
    reviewsCount: '4.7k',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&auto=format&fit=crop&q=80',
    description: 'Deep bass, crystal clear dual-mic calls, compact pocket case with 32h total playback.',
    inStock: true,
  };

  // Master New Arrivals
  protected readonly newArrivals: Product[] = [
    {
      id: 'new-1',
      title: 'Classic Hoodie',
      category: 'Fashion',
      price: 1699,
      originalPrice: 1999,
      rating: 4.4,
      reviewsCount: '320',
      image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=500&auto=format&fit=crop&q=80',
      description: 'Heavyweight organic cotton fleece with ribbed cuffs and relaxed unisex silhouette.',
      inStock: true,
    },
    {
      id: 'new-2',
      title: 'Eau de Parfum',
      category: 'Beauty',
      price: 2499,
      originalPrice: 2999,
      rating: 4.6,
      reviewsCount: '1.2k',
      image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=500&auto=format&fit=crop&q=80',
      description: 'Subtle blend of French lavender, white musk, and bergamot for enduring day elegance.',
      inStock: true,
    },
    {
      id: 'new-3',
      title: 'Polarized Sunglasses',
      category: 'Accessories',
      price: 1299,
      originalPrice: 1699,
      rating: 4.5,
      reviewsCount: '890',
      image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&auto=format&fit=crop&q=80',
      description: 'UV400 anti-glare polarized lenses with sturdy lightweight matte acetate frame.',
      inStock: true,
    },
    {
      id: 'new-4',
      title: 'Table Lamp',
      category: 'Home & Living',
      price: 999,
      originalPrice: 1299,
      rating: 4.4,
      reviewsCount: '560',
      image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&auto=format&fit=crop&q=80',
      description: 'Warm ambient glow, tactile dimmer switch, handcrafted ceramic fluted base.',
      inStock: true,
    },
  ];

  // Live Filtering Signals
  public readonly filteredTrendingProducts = computed(() => {
    const q = this.store.searchQuery().toLowerCase();
    const cat = this.store.selectedCategory();

    return this.trendingProducts.filter((product) => {
      const matchesSearch =
        !q ||
        product.title.toLowerCase().includes(q) ||
        product.category.toLowerCase().includes(q);
      const matchesCategory =
        cat === 'All' || product.category.toLowerCase() === cat.toLowerCase();
      return matchesSearch && matchesCategory;
    });
  });

  public readonly filteredNewArrivals = computed(() => {
    const q = this.store.searchQuery().toLowerCase();
    const cat = this.store.selectedCategory();

    return this.newArrivals.filter((product) => {
      const matchesSearch =
        !q ||
        product.title.toLowerCase().includes(q) ||
        product.category.toLowerCase().includes(q);
      const matchesCategory =
        cat === 'All' || product.category.toLowerCase() === cat.toLowerCase();
      return matchesSearch && matchesCategory;
    });
  });

  public readonly hasActiveFilters = computed(() => {
    return this.store.searchQuery() !== '' || this.store.selectedCategory() !== 'All';
  });

  ngOnInit(): void {
    this.startCountdownTimer();
  }

  ngOnDestroy(): void {
    if (this._timerInterval) {
      clearInterval(this._timerInterval);
    }
  }

  private startCountdownTimer(): void {
    let totalSeconds = 12 * 3600 + 34 * 60 + 22;

    this._timerInterval = setInterval(() => {
      if (totalSeconds > 0) {
        totalSeconds--;
        const h = Math.floor(totalSeconds / 3600);
        const m = Math.floor((totalSeconds % 3600) / 60);
        const s = totalSeconds % 60;
        this.countdown.set({
          hours: h.toString().padStart(2, '0'),
          minutes: m.toString().padStart(2, '0'),
          seconds: s.toString().padStart(2, '0'),
        });
      }
    }, 1000);
  }

  protected nextSlide(): void {
    this.activeSlide.update((i) => (i + 1) % this.slides.length);
  }

  protected prevSlide(): void {
    this.activeSlide.update((i) => (i - 1 + this.slides.length) % this.slides.length);
  }

  protected goToSlide(index: number): void {
    this.activeSlide.set(index);
  }

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

    this.addedProducts.update((state) => ({ ...state, [product.id]: true }));
    setTimeout(() => {
      this.addedProducts.update((state) => ({ ...state, [product.id]: false }));
    }, 1400);
  }

  protected onCategoryClick(categoryName: string): void {
    if (this.store.selectedCategory() === categoryName) {
      this.store.setSelectedCategory('All');
    } else {
      this.store.setSelectedCategory(categoryName);
    }
  }

  protected clearFilters(): void {
    this.store.clearSearchQuery();
    this.store.setSelectedCategory('All');
  }

  // Quick View Modal
  protected openQuickView(product: Product, event: Event): void {
    event.stopPropagation();
    event.preventDefault();
    this.quickViewProduct.set(product);
    this.quickViewQuantity.set(1);
  }

  protected closeQuickView(): void {
    this.quickViewProduct.set(null);
  }

  protected adjustQuickViewQuantity(delta: number): void {
    this.quickViewQuantity.update((q) => Math.max(1, q + delta));
  }

  protected quickViewAddToCart(): void {
    const product = this.quickViewProduct();
    if (product) {
      this.store.addToCart(product, this.quickViewQuantity());
      this.closeQuickView();
    }
  }
}
