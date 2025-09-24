export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export class CartService {
  private items: CartItem[] = [];

  addItem(item: Omit<CartItem, 'id' | 'quantity'>): void {
    const existingItem = this.items.find((i) => i.name === item.name);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.items.push({
        id: Math.random().toString(36).substring(2, 11),
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

  // Basic implementation for main branch stability
  // Will be replaced during TDD Demo 3 with proper tax calculation
  calculateTotal(): number {
    // TODO: Implement with 7% tax calculation during demo
    return this.getSubtotal();
  }
}
