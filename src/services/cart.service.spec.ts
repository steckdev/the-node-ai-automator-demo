import { Test, TestingModule } from '@nestjs/testing';
import { CartService } from './cart.service';

describe('CartService', () => {
  let service: CartService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CartService],
    }).compile();

    service = module.get<CartService>(CartService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('addItem', () => {
    it('should add a new item to the cart', () => {
      service.addItem({ name: 'Book', price: 10 });

      const items = service.getItems();
      expect(items).toHaveLength(1);
      expect(items[0].name).toBe('Book');
      expect(items[0].price).toBe(10);
      expect(items[0].quantity).toBe(1);
    });

    it('should increase quantity if item already exists', () => {
      service.addItem({ name: 'Book', price: 10 });
      service.addItem({ name: 'Book', price: 10 });

      const items = service.getItems();
      expect(items).toHaveLength(1);
      expect(items[0].quantity).toBe(2);
    });
  });

  describe('removeItem', () => {
    it('should remove item from cart', () => {
      service.addItem({ name: 'Book', price: 10 });
      const items = service.getItems();
      const itemId = items[0].id;

      service.removeItem(itemId);

      expect(service.getItems()).toHaveLength(0);
    });
  });

  describe('getSubtotal', () => {
    it('should calculate subtotal correctly', () => {
      service.addItem({ name: 'Book', price: 10 });
      service.addItem({ name: 'Pen', price: 5 });
      service.addItem({ name: 'Book', price: 10 }); // Should increase quantity

      const subtotal = service.getSubtotal();
      expect(subtotal).toBe(25); // (10 * 2) + (5 * 1)
    });
  });

  describe('calculateTotal', () => {
    // These tests are commented out for main branch stability
    // Uncomment during TDD Demo 3 to show Red-Green-Refactor cycle
    // it('should calculate total with 7% tax', () => {
    //   service.addItem({ name: 'Book', price: 10 });
    //
    //   const total = service.calculateTotal();
    //   expect(total).toBe(10.7); // 10 + (10 * 0.07)
    // });
    // it('should calculate total with tax for multiple items', () => {
    //   service.addItem({ name: 'Book', price: 10 });
    //   service.addItem({ name: 'Pen', price: 5 });
    //
    //   const total = service.calculateTotal();
    //   expect(total).toBe(16.05); // 15 + (15 * 0.07)
    // });
    // it('should return 0 for empty cart', () => {
    //   const total = service.calculateTotal();
    //   expect(total).toBe(0);
    // });
  });

  describe('clear', () => {
    it('should clear all items from cart', () => {
      service.addItem({ name: 'Book', price: 10 });
      service.addItem({ name: 'Pen', price: 5 });

      service.clear();

      expect(service.getItems()).toHaveLength(0);
      expect(service.getSubtotal()).toBe(0);
    });
  });
});
