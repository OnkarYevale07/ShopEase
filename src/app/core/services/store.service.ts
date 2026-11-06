import { Injectable, computed, signal } from '@angular/core';

export interface Product {
  id: string;
  title: string;
  category: string;
  price: number;
  originalPrice: number;
  discountPercent?: number;
  rating: number;
  reviewsCount: string;
  image: string;
  description?: string;
  inStock?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  status: 'Processing' | 'Shipped' | 'Out for Delivery' | 'Delivered';
  items: CartItem[];
  total: number;
  estimatedDelivery: string;
  trackingNumber: string;
}

export interface ToastNotification {
  text: string;
  type: 'success' | 'info' | 'error';
}

export interface StoreCategory {
  id: string;
  name: string;
  icon: string;
  iconName: string;
  bgColor: string;
  textColor: string;
}

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  // 9 Categories matching reference image
  public readonly categories: StoreCategory[] = [
    {
      id: 'cat-fashion',
      name: 'Fashion',
      icon: '👗',
      iconName: 'lucideShirt',
      bgColor: 'bg-purple-100/80',
      textColor: 'text-purple-700',
    },
    {
      id: 'cat-electronics',
      name: 'Electronics',
      icon: '💻',
      iconName: 'lucideLaptop',
      bgColor: 'bg-blue-100/80',
      textColor: 'text-blue-700',
    },
    {
      id: 'cat-home',
      name: 'Home & Living',
      icon: '🛋️',
      iconName: 'lucideArmchair',
      bgColor: 'bg-emerald-100/80',
      textColor: 'text-emerald-700',
    },
    {
      id: 'cat-beauty',
      name: 'Beauty',
      icon: '💄',
      iconName: 'lucideSparkles',
      bgColor: 'bg-pink-100/80',
      textColor: 'text-pink-700',
    },
    {
      id: 'cat-accessories',
      name: 'Accessories',
      icon: '⌚',
      iconName: 'lucideWatch',
      bgColor: 'bg-amber-100/80',
      textColor: 'text-amber-700',
    },
    {
      id: 'cat-sports',
      name: 'Sports & Fitness',
      icon: '🏋️',
      iconName: 'lucideDumbbell',
      bgColor: 'bg-indigo-100/80',
      textColor: 'text-indigo-700',
    },
    {
      id: 'cat-toys',
      name: 'Toys & Games',
      icon: '🧸',
      iconName: 'lucideGamepad2',
      bgColor: 'bg-orange-100/80',
      textColor: 'text-orange-700',
    },
    {
      id: 'cat-books',
      name: 'Books & Stationery',
      icon: '📚',
      iconName: 'lucideBookOpen',
      bgColor: 'bg-cyan-100/80',
      textColor: 'text-cyan-700',
    },
    {
      id: 'cat-automotive',
      name: 'Automotive',
      icon: '🚗',
      iconName: 'lucideCar',
      bgColor: 'bg-rose-100/80',
      textColor: 'text-rose-700',
    },
  ];
  // Master Product Catalog
  public readonly allProducts = signal<Product[]>([
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
      description: 'All-day comfort with responsive cushioning and modern streetwear highlights.',
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
    {
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
    },
    {
      id: 'new-1',
      title: 'Classic Hoodie',
      category: 'Fashion',
      price: 1699,
      originalPrice: 1999,
      discountPercent: 15,
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
      discountPercent: 16,
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
      discountPercent: 23,
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
      discountPercent: 23,
      rating: 4.4,
      reviewsCount: '560',
      image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&auto=format&fit=crop&q=80',
      description: 'Warm ambient glow, tactile dimmer switch, handcrafted ceramic fluted base.',
      inStock: true,
    },
    {
      id: 'prod-10',
      title: 'Cast Iron Dumbbell Set',
      category: 'Sports & Fitness',
      price: 1899,
      originalPrice: 2599,
      discountPercent: 27,
      rating: 4.7,
      reviewsCount: '940',
      image: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=500&auto=format&fit=crop&q=80',
      description: 'Non-slip grip neoprene coated dumbbell weights for home fitness & muscle building.',
      inStock: true,
    },
    {
      id: 'prod-11',
      title: 'Wireless Gaming Controller',
      category: 'Toys & Games',
      price: 2199,
      originalPrice: 2999,
      discountPercent: 26,
      rating: 4.6,
      reviewsCount: '1.5k',
      image: 'https://images.unsplash.com/photo-1592840496694-26d035b52b48?w=500&auto=format&fit=crop&q=80',
      description: 'Ergonomic dual-vibration wireless gamepad compatible with PC, mobile & consoles.',
      inStock: true,
    },
    {
      id: 'prod-12',
      title: 'Hardcover Journal & Pen Set',
      category: 'Books & Stationery',
      price: 799,
      originalPrice: 999,
      discountPercent: 20,
      rating: 4.8,
      reviewsCount: '620',
      image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&auto=format&fit=crop&q=80',
      description: '120gsm bleed-proof ivory paper, ribbon bookmark, with matching metallic rollerball pen.',
      inStock: true,
    },
  ]);

  // Pre-populated cart items (matching initial badge 3)
  private readonly _cartItems = signal<CartItem[]>([
    {
      product: {
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
      quantity: 1,
    },
    {
      product: {
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
      quantity: 1,
    },
    {
      product: {
        id: 'trend-3',
        title: 'Casual Sneakers',
        category: 'Fashion',
        price: 1499,
        originalPrice: 2499,
        discountPercent: 40,
        rating: 4.4,
        reviewsCount: '3.2k',
        image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&auto=format&fit=crop&q=80',
        description: 'All-day comfort with responsive cushioning and modern streetwear highlights.',
        inStock: true,
      },
      quantity: 1,
    },
  ]);

  // Wishlist set of product IDs
  private readonly _wishlistIds = signal<Set<string>>(new Set(['trend-1', 'new-2']));
  public readonly wishlistIds = this._wishlistIds.asReadonly();

  // Mock Orders History
  public readonly orders = signal<Order[]>([
    {
      id: 'SE-98214',
      date: 'Nov 04, 2026',
      status: 'Out for Delivery',
      items: [
        {
          product: {
            id: 'trend-1',
            title: 'Wireless Headphones',
            category: 'Electronics',
            price: 2799,
            originalPrice: 3999,
            rating: 4.5,
            reviewsCount: '2.8k',
            image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=80',
          },
          quantity: 1,
        },
      ],
      total: 2799,
      estimatedDelivery: 'Today by 6:00 PM',
      trackingNumber: 'TRK-98214-EXPRESS',
    },
    {
      id: 'SE-87429',
      date: 'Oct 28, 2026',
      status: 'Delivered',
      items: [
        {
          product: {
            id: 'new-2',
            title: 'Eau de Parfum',
            category: 'Beauty',
            price: 2499,
            originalPrice: 2999,
            rating: 4.6,
            reviewsCount: '1.2k',
            image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=500&auto=format&fit=crop&q=80',
          },
          quantity: 1,
        },
        {
          product: {
            id: 'trend-4',
            title: 'Laptop Backpack',
            category: 'Accessories',
            price: 1199,
            originalPrice: 1499,
            rating: 4.5,
            reviewsCount: '1.1k',
            image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format&fit=crop&q=80',
          },
          quantity: 1,
        },
      ],
      total: 3698,
      estimatedDelivery: 'Delivered on Oct 31',
      trackingNumber: 'TRK-87429-DELIVERED',
    },
  ]);

  private readonly _searchQuery = signal<string>('');
  private readonly _selectedCategory = signal<string>('All');
  private readonly _isCartOpen = signal<boolean>(false);
  private readonly _isWishlistOpen = signal<boolean>(false);
  private readonly _selectedProduct = signal<Product | null>(null);
  private readonly _toast = signal<ToastNotification | null>(null);
  private readonly _orderCompleted = signal<boolean>(false);
  private _toastTimeout: any = null;

  // Readonly Signals
  public readonly cartItems = this._cartItems.asReadonly();
  public readonly searchQuery = this._searchQuery.asReadonly();
  public readonly selectedCategory = this._selectedCategory.asReadonly();
  public readonly isCartOpen = this._isCartOpen.asReadonly();
  public readonly isWishlistOpen = this._isWishlistOpen.asReadonly();
  public readonly selectedProduct = this._selectedProduct.asReadonly();
  public readonly toast = this._toast.asReadonly();
  public readonly orderCompleted = this._orderCompleted.asReadonly();

  // Computed Cart Metrics
  public readonly cartCount = computed(() =>
    this._cartItems().reduce((total, item) => total + item.quantity, 0),
  );

  public readonly cartSubtotal = computed(() =>
    this._cartItems().reduce((total, item) => total + item.product.price * item.quantity, 0),
  );

  public readonly cartShipping = computed(() => {
    const subtotal = this.cartSubtotal();
    if (subtotal === 0) return 0;
    return subtotal >= 499 ? 0 : 99;
  });

  public readonly cartTotal = computed(() => this.cartSubtotal() + this.cartShipping());

  public readonly wishlistCount = computed(() => this._wishlistIds().size);

  public readonly wishlistedProducts = computed(() => {
    const ids = this._wishlistIds();
    return this.allProducts().filter((p) => ids.has(p.id));
  });

  // Cart Management
  public addToCart(product: Product, quantity = 1): void {
    const current = [...this._cartItems()];
    const existingIndex = current.findIndex((item) => item.product.id === product.id);

    if (existingIndex > -1) {
      current[existingIndex] = {
        ...current[existingIndex],
        quantity: current[existingIndex].quantity + quantity,
      };
    } else {
      current.push({ product, quantity });
    }

    this._cartItems.set(current);
    this.showToast(`"${product.title}" added to your cart!`, 'success');
  }

  public updateQuantity(productId: string, delta: number): void {
    const current = [...this._cartItems()];
    const existingIndex = current.findIndex((item) => item.product.id === productId);

    if (existingIndex > -1) {
      const newQty = current[existingIndex].quantity + delta;
      if (newQty <= 0) {
        this.removeFromCart(productId);
      } else {
        current[existingIndex] = {
          ...current[existingIndex],
          quantity: newQty,
        };
        this._cartItems.set(current);
      }
    }
  }

  public removeFromCart(productId: string): void {
    const item = this._cartItems().find((i) => i.product.id === productId);
    this._cartItems.set(this._cartItems().filter((i) => i.product.id !== productId));
    if (item) {
      this.showToast(`Removed "${item.product.title}" from cart.`, 'info');
    }
  }

  public clearCart(): void {
    this._cartItems.set([]);
  }

  // Product Lookup
  public getProductById(id: string): Product | undefined {
    return this.allProducts().find((p) => p.id === id);
  }

  // Wishlist Management
  public isWishlisted(id: string): boolean {
    return this._wishlistIds().has(id);
  }

  public toggleWishlist(product: Product): void {
    const updated = new Set(this._wishlistIds());
    if (updated.has(product.id)) {
      updated.delete(product.id);
      this.showToast(`Removed from Wishlist.`, 'info');
    } else {
      updated.add(product.id);
      this.showToast(`Added "${product.title}" to Wishlist!`, 'success');
    }
    this._wishlistIds.set(updated);
  }

  // Search & Filters
  public setSearchQuery(query: string): void {
    this._searchQuery.set(query.trim());
  }

  public clearSearchQuery(): void {
    this._searchQuery.set('');
  }

  public setSelectedCategory(category: string): void {
    this._selectedCategory.set(category);
    this.showToast(`Filter: ${category}`, 'info');
  }

  // Drawers & Modals
  public openCart(): void {
    this._isCartOpen.set(true);
  }

  public closeCart(): void {
    this._isCartOpen.set(false);
  }

  public openWishlist(): void {
    this._isWishlistOpen.set(true);
  }

  public closeWishlist(): void {
    this._isWishlistOpen.set(false);
  }

  public openQuickView(product: Product): void {
    this._selectedProduct.set(product);
  }

  public closeQuickView(): void {
    this._selectedProduct.set(null);
  }

  // Checkout flow
  public checkout(): void {
    if (this._cartItems().length === 0) return;

    // Create a new order in order history
    const newOrder: Order = {
      id: `SE-${Math.floor(10000 + Math.random() * 90000)}`,
      date: 'Today',
      status: 'Processing',
      items: [...this._cartItems()],
      total: this.cartTotal(),
      estimatedDelivery: 'In 2-3 business days',
      trackingNumber: `TRK-${Math.floor(10000 + Math.random() * 90000)}-EXP`,
    };

    this.orders.update((list) => [newOrder, ...list]);
    this._isCartOpen.set(false);
    this._orderCompleted.set(true);
    this.clearCart();
    this.showToast('Order placed successfully! Check your Orders tab.', 'success');
  }

  public closeOrderSuccess(): void {
    this._orderCompleted.set(false);
  }

  // Toast System
  public showToast(text: string, type: 'success' | 'info' | 'error' = 'success'): void {
    if (this._toastTimeout) {
      clearTimeout(this._toastTimeout);
    }
    this._toast.set({ text, type });
    this._toastTimeout = setTimeout(() => {
      this._toast.set(null);
    }, 2800);
  }

  public dismissToast(): void {
    this._toast.set(null);
  }
}
