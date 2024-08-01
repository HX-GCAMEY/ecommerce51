import { Injectable } from '@nestjs/common';

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: boolean;
  imgUrl: string;
};

@Injectable()
export class ProductsRepository {
  private products: Product[] = [
    {
      id: 1,
      name: 'Laptop',
      description: 'High-performance laptop with Intel Core i7 processor',
      price: 999.99,
      stock: true,
      imgUrl: 'https://example.com/laptop.jpg',
    },
    {
      id: 2,
      name: 'Smartphone',
      description: 'Latest smartphone with dual-camera setup',
      price: 699.99,
      stock: true,
      imgUrl: 'https://example.com/smartphone.jpg',
    },
    {
      id: 3,
      name: 'Headphones',
      description: 'Wireless headphones with noise cancellation feature',
      price: 199.99,
      stock: false,
      imgUrl: 'https://example.com/headphones.jpg',
    },
    {
      id: 4,
      name: 'Smartwatch',
      description: 'Fitness tracker smartwatch with heart rate monitor',
      price: 149.99,
      stock: true,
      imgUrl: 'https://example.com/smartwatch.jpg',
    },
    {
      id: 5,
      name: 'Wireless Mouse',
      description: 'Ergonomic wireless mouse with adjustable DPI',
      price: 29.99,
      stock: true,
      imgUrl: 'https://example.com/mouse.jpg',
    },
    {
      id: 6,
      name: 'Keyboard',
      description: 'Mechanical gaming keyboard with RGB lighting',
      price: 79.99,
      stock: true,
      imgUrl: 'https://example.com/keyboard.jpg',
    },
    {
      id: 7,
      name: 'Monitor',
      description: '27-inch 4K monitor with IPS panel',
      price: 399.99,
      stock: true,
      imgUrl: 'https://example.com/monitor.jpg',
    },
    {
      id: 8,
      name: 'Printer',
      description:
        'Wireless all-in-one printer with scanning and copying capabilities',
      price: 149.99,
      stock: false,
      imgUrl: 'https://example.com/printer.jpg',
    },
    {
      id: 9,
      name: 'External Hard Drive',
      description: 'Portable external hard drive with 1TB storage capacity',
      price: 79.99,
      stock: true,
      imgUrl: 'https://example.com/hard-drive.jpg',
    },
    {
      id: 10,
      name: 'Gaming Chair',
      description:
        'Ergonomic gaming chair with adjustable armrests and lumbar support',
      price: 199.99,
      stock: true,
      imgUrl: 'https://example.com/gaming-chair.jpg',
    },
  ];

  getProducts() {
    return this.products;
  }
}
