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
  status: 'Processing' | 'Shipped' | 'Out for Delivery' | 'Delivered' | 'Cancelled';
  items: CartItem[];
  total: number;
  estimatedDelivery: string;
  trackingNumber: string;
  createdAt?: number;
  canCancelUntil?: number;
  cancelReason?: string;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  timeAgo: string;
  timestamp: number;
  read: boolean;
  type: 'order' | 'deal' | 'account' | 'promo';
  linkUrl?: string;
}

export interface ToastNotification {
  text: string;
  type: 'success' | 'info' | 'error';
}

export interface UserAddress {
  id: string;
  tag: 'Home' | 'Work' | 'Other';
  name: string;
  phone: string;
  street: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

export interface UserProfile {
  fullName: string;
  email: string;
  phone: string;
  avatarUrl?: string;
  gender?: 'Male' | 'Female' | 'Other' | 'Prefer not to say';
  birthDate?: string;
  memberSince: string;
  loyaltyPoints: number;
}

export interface ProductReview {
  id: string;
  productId: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
  helpfulCount: number;
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
      id: 'SE-99402',
      date: 'Today, Just now',
      status: 'Processing',
      createdAt: Date.now() - 5 * 60 * 1000, // 5 mins ago
      canCancelUntil: Date.now() + 25 * 60 * 1000, // 25 mins left to cancel!
      items: [
        {
          product: {
            id: 'trend-2',
            title: 'Smart Watch Pro',
            category: 'Electronics',
            price: 4499,
            originalPrice: 5999,
            rating: 4.6,
            reviewsCount: '1.9k',
            image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=80',
          },
          quantity: 1,
        },
      ],
      total: 4499,
      estimatedDelivery: 'Tomorrow by 5:00 PM',
      trackingNumber: 'TRK-99402-PRIORITY',
    },
    {
      id: 'SE-98214',
      date: 'Nov 04, 2026',
      status: 'Out for Delivery',
      createdAt: Date.now() - 2 * 24 * 60 * 60 * 1000,
      canCancelUntil: Date.now() - 24 * 60 * 60 * 1000,
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
      createdAt: Date.now() - 8 * 24 * 60 * 60 * 1000,
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

  // Notifications State
  public readonly notifications = signal<AppNotification[]>([
    {
      id: 'notif-1',
      title: 'Order Dispatched (#SE-98214)',
      message: 'Your order is out for delivery with our ShopEase Express courier. Arriving today!',
      timeAgo: '15m ago',
      timestamp: Date.now() - 15 * 60 * 1000,
      read: false,
      type: 'order',
      linkUrl: '/orders',
    },
    {
      id: 'notif-2',
      title: 'Flash Deal Alert 🔥',
      message: 'True Wireless Earbuds are now 50% off! Grab yours before the countdown ends.',
      timeAgo: '1h ago',
      timestamp: Date.now() - 60 * 60 * 1000,
      read: false,
      type: 'deal',
      linkUrl: '/flash-deals',
    },
    {
      id: 'notif-3',
      title: 'Welcome to ShopEase! 🎉',
      message: '150 Loyalty Coins have been added to your profile rewards wallet.',
      timeAgo: '1d ago',
      timestamp: Date.now() - 24 * 60 * 60 * 1000,
      read: true,
      type: 'account',
      linkUrl: '/settings',
    },
    {
      id: 'notif-4',
      title: 'Wishlist Item Price Drop 🏷️',
      message: '"Classic Hoodie" from your wishlist is now on limited-time discount.',
      timeAgo: '2d ago',
      timestamp: Date.now() - 48 * 60 * 60 * 1000,
      read: true,
      type: 'promo',
      linkUrl: '/wishlist',
    },
  ]);

  public readonly unreadNotificationCount = computed(
    () => this.notifications().filter((n) => !n.read).length
  );

  // Theme Management (Light / Dark Mode)
  private readonly _theme = signal<'light' | 'dark'>(this.getInitialTheme());
  public readonly theme = this._theme.asReadonly();
  public readonly isDarkMode = computed(() => this._theme() === 'dark');

  private getInitialTheme(): 'light' | 'dark' {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem('shopease-theme') as 'light' | 'dark' | null;
      if (saved === 'dark' || saved === 'light') {
        if (typeof document !== 'undefined') {
          document.documentElement.classList.toggle('dark', saved === 'dark');
          document.documentElement.setAttribute('data-theme', saved);
        }
        return saved;
      }
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        if (typeof document !== 'undefined') {
          document.documentElement.classList.add('dark');
          document.documentElement.setAttribute('data-theme', 'dark');
        }
        return 'dark';
      }
    }
    return 'light';
  }

  private readonly _searchQuery = signal<string>('');
  private readonly _selectedCategory = signal<string>('All');
  private readonly _isCartOpen = signal<boolean>(false);
  private readonly _isWishlistOpen = signal<boolean>(false);
  private readonly _selectedProduct = signal<Product | null>(null);
  private readonly _toast = signal<ToastNotification | null>(null);
  private readonly _orderCompleted = signal<boolean>(false);
  private _toastTimeout: any = null;

  // User Profile & Authentication State
  private readonly _currentUser = signal<UserProfile | null>({
    fullName: 'Aniket Sharma',
    email: 'aniket.sharma@example.com',
    phone: '+91 98765 43210',
    gender: 'Male',
    birthDate: '1998-05-14',
    memberSince: 'August 2024',
    loyaltyPoints: 450,
  });
  public readonly currentUser = this._currentUser.asReadonly();
  public readonly isLoggedIn = computed(() => !!this._currentUser());

  // User Delivery Addresses
  public readonly addresses = signal<UserAddress[]>([
    {
      id: 'addr-1',
      tag: 'Home',
      name: 'Aniket Sharma',
      phone: '+91 98765 43210',
      street: '402, Horizon Heights, Linking Road',
      landmark: 'Near Starbucks, Bandra West',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400050',
      isDefault: true,
    },
    {
      id: 'addr-2',
      tag: 'Work',
      name: 'Aniket Sharma',
      phone: '+91 98765 43210',
      street: 'Tower B, 7th Floor, Mindspace IT Park',
      landmark: 'Next to Inorbit Mall, Malad West',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400064',
      isDefault: false,
    },
  ]);

  // Product Reviews State
  public readonly reviews = signal<ProductReview[]>([
    {
      id: 'rev-1',
      productId: 'trend-1',
      author: 'Rahul Verma',
      rating: 5,
      date: '2 days ago',
      title: 'Amazing sound clarity and deep bass!',
      comment:
        'Been using these headphones for 2 weeks now. Active noise cancellation works like magic during my daily commute, and the battery lasts over 30 hours. Highly recommended for music lovers.',
      verifiedPurchase: true,
      helpfulCount: 24,
    },
    {
      id: 'rev-2',
      productId: 'trend-1',
      author: 'Priya Sundaram',
      rating: 4,
      date: '1 week ago',
      title: 'Comfortable fit, super premium build',
      comment:
        'The memory foam earcups are comfortable even during long 5-hour Zoom meetings. Pairing with multiple devices is seamless.',
      verifiedPurchase: true,
      helpfulCount: 16,
    },
    {
      id: 'rev-3',
      productId: 'trend-1',
      author: 'Vikram Mehta',
      rating: 5,
      date: '3 weeks ago',
      title: 'Value for money deal!',
      comment:
        'Grabbed this on sale for ₹2,799 and it easily rivals headphones twice the price. Fast charging is a lifesaver.',
      verifiedPurchase: true,
      helpfulCount: 9,
    },
    {
      id: 'rev-4',
      productId: 'trend-2',
      author: 'Neha Kapoor',
      rating: 5,
      date: '4 days ago',
      title: 'Stunning display & very accurate heart rate sensor',
      comment:
        'The always-on Retina display is bright outdoors in direct sunlight. Notification syncing with my phone is instant. Battery lasts almost 2 full days.',
      verifiedPurchase: true,
      helpfulCount: 31,
    },
    {
      id: 'rev-5',
      productId: 'trend-3',
      author: 'Aman Joshi',
      rating: 4,
      date: '6 days ago',
      title: 'Super lightweight & stylish sneakers',
      comment:
        'Sole cushioning is responsive and the purple accents match my everyday outfits. True to size!',
      verifiedPurchase: true,
      helpfulCount: 12,
    },
    {
      id: 'rev-6',
      productId: 'deal-1',
      author: 'Sneha Patel',
      rating: 5,
      date: 'Yesterday',
      title: 'Best earbuds under ₹1,000!',
      comment:
        'Crazy value at ₹999 flash deal! The bass punch is surprisingly good, case is compact and battery backup easily gives 20+ hours with the case.',
      verifiedPurchase: true,
      helpfulCount: 42,
    },
  ]);

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

  // Cart Status Helpers (Persisted Cart State)
  public isInCart(productId: string): boolean {
    return this._cartItems().some((i) => i.product.id === productId);
  }

  public getCartQuantity(productId: string): number {
    return this._cartItems().find((i) => i.product.id === productId)?.quantity ?? 0;
  }

  // Reviews helpers
  public getProductReviews(productId: string): ProductReview[] {
    const matching = this.reviews().filter((r) => r.productId === productId);
    if (matching.length > 0) return matching;

    return [
      {
        id: `gen-1-${productId}`,
        productId,
        author: 'Verified Customer',
        rating: 5,
        date: '3 days ago',
        title: 'Exceeded expectations!',
        comment: 'Very happy with the build quality and fast delivery. Arrived securely packed within 48 hours.',
        verifiedPurchase: true,
        helpfulCount: 8,
      },
      {
        id: `gen-2-${productId}`,
        productId,
        author: 'Amit Roy',
        rating: 4,
        date: '1 week ago',
        title: 'Great product and authentic quality',
        comment: 'Original product as described in the specifications. Works smoothly and totally worth the price.',
        verifiedPurchase: true,
        helpfulCount: 5,
      },
    ];
  }

  public addReview(review: Omit<ProductReview, 'id' | 'date' | 'helpfulCount'>): void {
    const newRev: ProductReview = {
      ...review,
      id: `rev-${Date.now()}`,
      date: 'Just now',
      helpfulCount: 0,
    };
    this.reviews.update((list) => [newRev, ...list]);
    this.showToast('Thank you! Your review was submitted successfully.', 'success');
  }

  public likeReview(reviewId: string): void {
    this.reviews.update((list) =>
      list.map((r) => (r.id === reviewId ? { ...r, helpfulCount: r.helpfulCount + 1 } : r))
    );
    this.showToast('Marked as helpful.', 'info');
  }

  // Auth management
  public login(email: string, password?: string, fullName?: string): boolean {
    const derivedName = fullName || (email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1));
    this._currentUser.set({
      fullName: derivedName,
      email,
      phone: '+91 98765 43210',
      gender: 'Male',
      birthDate: '1998-05-14',
      memberSince: 'November 2026',
      loyaltyPoints: 100,
    });
    this.showToast(`Welcome back, ${derivedName}!`, 'success');
    return true;
  }

  public register(fullName: string, email: string, password?: string, phone?: string): boolean {
    this._currentUser.set({
      fullName,
      email,
      phone: phone || '+91 98765 00000',
      memberSince: 'November 2026',
      loyaltyPoints: 150,
    });
    this.showToast(`Account created! Welcome to ShopEase, ${fullName}!`, 'success');
    return true;
  }

  public logout(): void {
    this._currentUser.set(null);
    this.showToast('You have been signed out.', 'info');
  }

  // Profile and Address helpers
  public updateProfile(updated: Partial<UserProfile>): void {
    const current = this._currentUser();
    if (!current) return;
    this._currentUser.set({ ...current, ...updated });
    this.showToast('Profile information saved!', 'success');
  }

  public addAddress(address: Omit<UserAddress, 'id'>): void {
    const newAddr: UserAddress = {
      ...address,
      id: `addr-${Date.now()}`,
    };
    if (address.isDefault) {
      this.addresses.update((list) => list.map((a) => ({ ...a, isDefault: false })));
    }
    this.addresses.update((list) => [newAddr, ...list]);
    this.showToast('New delivery address added!', 'success');
  }

  public deleteAddress(id: string): void {
    this.addresses.update((list) => list.filter((a) => a.id !== id));
    this.showToast('Address removed.', 'info');
  }

  public setDefaultAddress(id: string): void {
    this.addresses.update((list) =>
      list.map((a) => ({ ...a, isDefault: a.id === id }))
    );
    this.showToast('Default address updated.', 'info');
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

  // Notifications management
  public markNotificationAsRead(id: string): void {
    this.notifications.update((list) =>
      list.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  }

  public markAllNotificationsAsRead(): void {
    this.notifications.update((list) => list.map((n) => ({ ...n, read: true })));
    this.showToast('All notifications marked as read.', 'info');
  }

  public removeNotification(id: string): void {
    this.notifications.update((list) => list.filter((n) => n.id !== id));
  }

  public clearAllNotifications(): void {
    this.notifications.set([]);
    this.showToast('Cleared all notifications.', 'info');
  }

  public addNotification(
    notif: Omit<AppNotification, 'id' | 'timestamp' | 'read' | 'timeAgo'>
  ): void {
    const newNotif: AppNotification = {
      ...notif,
      id: `notif-${Date.now()}`,
      timestamp: Date.now(),
      read: false,
      timeAgo: 'Just now',
    };
    this.notifications.update((list) => [newNotif, ...list]);
  }

  // Order Cancellation management
  public canCancelOrder(order: Order): boolean {
    if (order.status !== 'Processing') return false;
    if (!order.canCancelUntil) return true;
    return Date.now() < order.canCancelUntil;
  }

  public getRemainingCancelMinutes(order: Order): number {
    if (!order.canCancelUntil) return 30;
    const diff = order.canCancelUntil - Date.now();
    return Math.max(0, Math.ceil(diff / (60 * 1000)));
  }

  public cancelOrder(orderId: string, reason = 'Changed my mind'): boolean {
    const order = this.orders().find((o) => o.id === orderId);
    if (!order || order.status === 'Cancelled') return false;

    this.orders.update((list) =>
      list.map((o) =>
        o.id === orderId
          ? {
              ...o,
              status: 'Cancelled',
              cancelReason: reason,
            }
          : o
      )
    );

    // Add alert notification
    this.addNotification({
      title: `Order Cancelled (#${order.id})`,
      message: `Your cancellation request was confirmed. Full refund of ₹${order.total.toLocaleString()} will be credited in 3-5 business days.`,
      type: 'order',
      linkUrl: '/orders',
    });

    this.showToast(`Order #${order.id} has been cancelled.`, 'info');
    return true;
  }

  // Checkout flow
  public checkout(): void {
    if (this._cartItems().length === 0) return;

    const orderId = `SE-${Math.floor(10000 + Math.random() * 90000)}`;
    const now = Date.now();
    const canCancelDuration = 30 * 60 * 1000; // 30 minutes cancellation window

    // Create a new order in order history
    const newOrder: Order = {
      id: orderId,
      date: 'Today, Just now',
      status: 'Processing',
      createdAt: now,
      canCancelUntil: now + canCancelDuration,
      items: [...this._cartItems()],
      total: this.cartTotal(),
      estimatedDelivery: 'In 2-3 business days',
      trackingNumber: `TRK-${Math.floor(10000 + Math.random() * 90000)}-EXP`,
    };

    this.orders.update((list) => [newOrder, ...list]);
    this._isCartOpen.set(false);
    this._orderCompleted.set(true);

    // Push notification for order confirmation
    this.addNotification({
      title: `Order Placed Successfully (#${orderId})`,
      message: `We've received your order of ₹${newOrder.total.toLocaleString()}. You can cancel it within 30 minutes if needed.`,
      type: 'order',
      linkUrl: '/orders',
    });

    this.clearCart();
    this.showToast('Order placed successfully! Check your Orders tab.', 'success');
  }

  public closeOrderSuccess(): void {
    this._orderCompleted.set(false);
  }

  // Theme Actions
  public setTheme(newTheme: 'light' | 'dark', showToastNotification = true): void {
    this._theme.set(newTheme);
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('dark', newTheme === 'dark');
      document.documentElement.setAttribute('data-theme', newTheme);
    }
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('shopease-theme', newTheme);
    }
    if (showToastNotification) {
      this.showToast(`Switched to ${newTheme === 'dark' ? 'Dark' : 'Light'} Mode`, 'info');
    }
  }

  public toggleTheme(): void {
    const nextTheme = this._theme() === 'light' ? 'dark' : 'light';
    this.setTheme(nextTheme);
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
