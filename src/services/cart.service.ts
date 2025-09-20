import { Injectable } from '@nestjs/common';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

@Injectable()
export class CartService {
  private items: CartItem[] = [];

  addItem(item: Omit<CartItem, 'id' | 'quantity'>): void {
    const existingItem = this.items.find((i) => i.name === item.name);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.items.push({
        id: Math.random().toString(36).substr(2, 9),
        ...item,
        quantity: 1,
      });
    }
  }

  removeItem(itemId: string): void {
    this.items = this.items.filter((item) => item.id !== itemId);
  }

  getItems(): CartItem[] {
    return [...this.items];
  }

  clear(): void {
    this.items = [];
  }

  getSubtotal(): number {
    return this.items.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  // This method will be implemented during TDD demo
  calculateTotal(): number {
    // TODO: Implement with tax calculation
    throw new Error('Method not implemented');
  }
}
