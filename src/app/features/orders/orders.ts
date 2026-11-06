import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucidePackage,
  lucideTruck,
  lucideCheckCircle2,
  lucideClock,
  lucideShoppingBag,
  lucideArrowRight,
  lucideRefreshCw,
  lucideFileText,
  lucideChevronRight,
  lucideAlertCircle,
} from '@ng-icons/lucide';
import { StoreService, Order, Product } from '../../core/services/store.service';
import { HlmButtonImports } from '@spartan-ng/helm/button';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, RouterLink, NgIcon, HlmButtonImports],
  providers: [
    provideIcons({
      lucidePackage,
      lucideTruck,
      lucideCheckCircle2,
      lucideClock,
      lucideShoppingBag,
      lucideArrowRight,
      lucideRefreshCw,
      lucideFileText,
      lucideChevronRight,
      lucideAlertCircle,
    }),
  ],
  templateUrl: './orders.html',
})
export class OrdersComponent {
  protected readonly store = inject(StoreService);

  // Status Filter Signal
  protected readonly selectedFilter = signal<'All' | 'Processing' | 'Shipped' | 'Out for Delivery' | 'Delivered'>('All');

  protected readonly filterTabs: Array<'All' | 'Processing' | 'Shipped' | 'Out for Delivery' | 'Delivered'> = [
    'All',
    'Processing',
    'Shipped',
    'Out for Delivery',
    'Delivered',
  ];

  // Filtered orders list
  protected readonly filteredOrders = computed(() => {
    const filter = this.selectedFilter();
    const orders = this.store.orders();
    if (filter === 'All') return orders;
    return orders.filter((o) => o.status === filter);
  });

  protected setFilter(filter: 'All' | 'Processing' | 'Shipped' | 'Out for Delivery' | 'Delivered'): void {
    this.selectedFilter.set(filter);
  }

  // Calculate order total
  protected getOrderTotal(order: Order): number {
    return order.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }

  // Get status badge styling
  protected getStatusClass(status: Order['status']): string {
    switch (status) {
      case 'Delivered':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Out for Delivery':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Shipped':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Processing':
      default:
        return 'bg-purple-50 text-purple-700 border-purple-200';
    }
  }

  // Step progress tracker helper (0 to 3)
  protected getStatusStep(status: Order['status']): number {
    switch (status) {
      case 'Processing':
        return 0;
      case 'Shipped':
        return 1;
      case 'Out for Delivery':
        return 2;
      case 'Delivered':
        return 3;
      default:
        return 0;
    }
  }

  // Buy Again / Reorder
  protected reorderItem(product: Product, event: Event): void {
    event.stopPropagation();
    this.store.addToCart(product, 1);
  }
}

