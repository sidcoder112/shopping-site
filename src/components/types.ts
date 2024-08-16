// src/types.ts

// Define the Product type to match your application's needs
export interface Product {
    id: number;
    title: string;
    price: number;
    category: string;
    description: string;
    image: string;
    rating: {
      rate: number;
      count: number;
    };
    quantity?: number; // Optional, if not always present
  }
  
  // Define any other types you need here
  