export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: number;
  numReviews: number;
}

export const products: Product[] = [
  // Electronics
  {
    id: 1,
    name: 'Wireless Noise-Cancelling Headphones',
    price: 1999.99,
    description: 'Premium wireless headphones with active noise cancellation.',
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
    rating: 4.8,
    numReviews: 125
  },
  {
    id: 2,
    name: 'Smart Watch Pro',
    price: 3499.99,
    description: 'Advanced smartwatch with health monitoring and GPS.',
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&h=300&fit=crop',
    rating: 4.7,
    numReviews: 98
  },
  {
    id: 3,
    name: '4K Ultra HD Smart TV',
    price: 12999.99,
    description: '65-inch 4K smart TV with HDR and built-in streaming.',
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=400&h=300&fit=crop',
    rating: 4.9,
    numReviews: 156
  },
  {
    id: 4,
    name: 'Gaming Laptop',
    price: 24999.99,
    description: 'High-performance gaming laptop with RTX graphics.',
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&h=300&fit=crop',
    rating: 4.7,
    numReviews: 102
  },
  {
    id: 5,
    name: 'Wireless Earbuds',
    price: 1499.99,
    description: 'True wireless earbuds with premium sound quality.',
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=300&fit=crop',
    rating: 4.6,
    numReviews: 89
  },
  {
    id: 51,
    name: 'Portable Power Bank',
    price: 499.99,
    description: '20000mAh high-capacity power bank with fast charging.',
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&h=300&fit=crop',
    rating: 4.6,
    numReviews: 89
  },
  {
    id: 52,
    name: 'Wireless Keyboard and Mouse',
    price: 899.99,
    description: 'Ergonomic wireless keyboard and mouse combo.',
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=300&fit=crop',
    rating: 4.5,
    numReviews: 67
  },

  // Fashion
  {
    id: 6,
    name: 'Designer Denim Jacket',
    price: 899.99,
    description: 'Classic denim jacket with modern styling.',
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=400&h=300&fit=crop',
    rating: 4.7,
    numReviews: 98
  },
  {
    id: 7,
    name: 'Leather Crossbody Bag',
    price: 1299.99,
    description: 'Genuine leather crossbody bag with multiple compartments.',
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=400&h=300&fit=crop',
    rating: 4.6,
    numReviews: 89
  },
  {
    id: 8,
    name: 'Premium Sneakers',
    price: 1599.99,
    description: 'Comfortable and stylish premium sneakers.',
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop',
    rating: 4.8,
    numReviews: 125
  },
  {
    id: 9,
    name: 'Silk Scarf',
    price: 449.99,
    description: 'Elegant silk scarf with artistic print.',
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1584030373081-f37b7bb4fa8e?w=400&h=300&fit=crop',
    rating: 4.6,
    numReviews: 89
  },
  {
    id: 10,
    name: 'Designer Sunglasses',
    price: 2499.99,
    description: 'Premium designer sunglasses with UV protection.',
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=300&fit=crop',
    rating: 4.7,
    numReviews: 98
  },

  // Home & Living
  {
    id: 11,
    name: 'Smart Home Hub',
    price: 1999.99,
    description: 'Central control for all your smart home devices.',
    category: 'Home & Living',
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=400&h=300&fit=crop',
    rating: 4.8,
    numReviews: 125
  },
  {
    id: 12,
    name: 'Luxury Bedding Set',
    price: 2499.99,
    description: 'Premium cotton bedding set with duvet cover.',
    category: 'Home & Living',
    image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&h=300&fit=crop',
    rating: 4.9,
    numReviews: 156
  },
  {
    id: 13,
    name: 'Modern Coffee Table',
    price: 3999.99,
    description: 'Contemporary design coffee table with storage.',
    category: 'Home & Living',
    image: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=400&h=300&fit=crop',
    rating: 4.7,
    numReviews: 98
  },
  {
    id: 14,
    name: 'Air Purifier',
    price: 2999.99,
    description: 'HEPA air purifier for cleaner indoor air.',
    category: 'Home & Living',
    image: 'https://images.unsplash.com/photo-1585157603581-55b2f7513ef0?w=400&h=300&fit=crop',
    rating: 4.6,
    numReviews: 89
  },
  {
    id: 15,
    name: 'Designer Floor Lamp',
    price: 1799.99,
    description: 'Modern floor lamp with adjustable lighting.',
    category: 'Home & Living',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=300&fit=crop',
    rating: 4.8,
    numReviews: 125
  },

  // Sports & Outdoors
  {
    id: 16,
    name: 'Mountain Bike',
    price: 8999.99,
    description: 'Professional mountain bike with premium components.',
    category: 'Sports & Outdoors',
    image: 'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=400&h=300&fit=crop',
    rating: 4.9,
    numReviews: 156
  },
  {
    id: 17,
    name: 'Yoga Mat Set',
    price: 599.99,
    description: 'Complete yoga mat set with accessories.',
    category: 'Sports & Outdoors',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop',
    rating: 4.7,
    numReviews: 98
  },
  {
    id: 18,
    name: 'Camping Tent',
    price: 2999.99,
    description: '4-person waterproof camping tent.',
    category: 'Sports & Outdoors',
    image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=400&h=300&fit=crop',
    rating: 4.6,
    numReviews: 89
  },
  {
    id: 19,
    name: 'Tennis Racket Pro',
    price: 1499.99,
    description: 'Professional grade tennis racket.',
    category: 'Sports & Outdoors',
    image: 'https://images.unsplash.com/photo-1617083934555-ac7b4d0c8be2?w=400&h=300&fit=crop',
    rating: 4.8,
    numReviews: 125
  },
  {
    id: 20,
    name: 'Fitness Tracker',
    price: 999.99,
    description: 'Advanced fitness and activity tracker.',
    category: 'Sports & Outdoors',
    image: 'https://images.unsplash.com/photo-1557166983-5939644443b7?w=400&h=300&fit=crop',
    rating: 4.7,
    numReviews: 98
  },

  // Books & Stationery
  {
    id: 21,
    name: 'Premium Notebook Set',
    price: 399.99,
    description: 'Set of 3 premium leather-bound notebooks.',
    category: 'Books & Stationery',
    image: 'https://images.unsplash.com/photo-1531346680769-a1e9e8e294aa?w=400&h=300&fit=crop',
    rating: 4.8,
    numReviews: 125
  },
  {
    id: 22,
    name: 'Fountain Pen',
    price: 799.99,
    description: 'Luxury fountain pen with ink set.',
    category: 'Books & Stationery',
    image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=400&h=300&fit=crop',
    rating: 4.7,
    numReviews: 98
  },
  {
    id: 23,
    name: 'Art Supply Kit',
    price: 1299.99,
    description: 'Complete professional art supply kit.',
    category: 'Books & Stationery',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&h=300&fit=crop',
    rating: 4.9,
    numReviews: 156
  },
  {
    id: 24,
    name: 'Desk Organizer Set',
    price: 449.99,
    description: 'Modern desk organizer with accessories.',
    category: 'Books & Stationery',
    image: 'https://images.unsplash.com/photo-1544247341-88564837642f?w=400&h=300&fit=crop',
    rating: 4.7,
    numReviews: 98
  },
  {
    id: 25,
    name: 'Reading Light',
    price: 299.99,
    description: 'Adjustable LED reading light.',
    category: 'Books & Stationery',
    image: 'https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?w=400&h=300&fit=crop',
    rating: 4.8,
    numReviews: 125
  },

  // Beauty & Personal Care
  {
    id: 26,
    name: 'Skincare Set',
    price: 1499.99,
    description: 'Premium skincare collection.',
    category: 'Beauty & Personal Care',
    image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=400&h=300&fit=crop',
    rating: 4.9,
    numReviews: 156
  },
  {
    id: 27,
    name: 'Hair Styling Kit',
    price: 2499.99,
    description: 'Professional hair styling tools set.',
    category: 'Beauty & Personal Care',
    image: 'https://images.unsplash.com/photo-1522338140262-f46f5913618a?w=400&h=300&fit=crop',
    rating: 4.8,
    numReviews: 125
  },
  {
    id: 28,
    name: 'Electric Toothbrush',
    price: 899.99,
    description: 'Smart electric toothbrush with UV sanitizer.',
    category: 'Beauty & Personal Care',
    image: 'https://images.unsplash.com/photo-1559591937-abc3a5d51b93?w=400&h=300&fit=crop',
    rating: 4.7,
    numReviews: 98
  },
  {
    id: 29,
    name: 'Perfume Collection',
    price: 3999.99,
    description: 'Set of luxury fragrances.',
    category: 'Beauty & Personal Care',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=300&fit=crop',
    rating: 4.8,
    numReviews: 125
  },
  {
    id: 30,
    name: 'Makeup Brush Set',
    price: 799.99,
    description: 'Professional makeup brush collection.',
    category: 'Beauty & Personal Care',
    image: 'https://images.unsplash.com/photo-1515688594390-b649af70d282?w=400&h=300&fit=crop',
    rating: 4.7,
    numReviews: 98
  },

  // Jewelry & Accessories
  {
    id: 31,
    name: 'Diamond Pendant',
    price: 9999.99,
    description: '18K gold pendant with natural diamond.',
    category: 'Jewelry & Accessories',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=300&fit=crop',
    rating: 4.9,
    numReviews: 156
  },
  {
    id: 32,
    name: 'Luxury Watch',
    price: 15999.99,
    description: 'Swiss-made automatic luxury watch.',
    category: 'Jewelry & Accessories',
    image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400&h=300&fit=crop',
    rating: 4.8,
    numReviews: 125
  },
  {
    id: 33,
    name: 'Pearl Necklace',
    price: 4999.99,
    description: 'Cultured pearl necklace with silver clasp.',
    category: 'Jewelry & Accessories',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=300&fit=crop',
    rating: 4.7,
    numReviews: 98
  },
  {
    id: 34,
    name: 'Designer Wallet',
    price: 1299.99,
    description: 'Premium leather designer wallet.',
    category: 'Jewelry & Accessories',
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&h=300&fit=crop',
    rating: 4.8,
    numReviews: 125
  },
  {
    id: 35,
    name: 'Silver Bracelet Set',
    price: 899.99,
    description: 'Set of sterling silver bracelets.',
    category: 'Jewelry & Accessories',
    image: 'https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=400&h=300&fit=crop',
    rating: 4.7,
    numReviews: 98
  },

  // Food & Beverages
  {
    id: 36,
    name: 'Gourmet Coffee Set',
    price: 799.99,
    description: 'Premium coffee beans collection.',
    category: 'Food & Beverages',
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=300&fit=crop',
    rating: 4.9,
    numReviews: 156
  },
  {
    id: 37,
    name: 'Wine Collection',
    price: 4999.99,
    description: 'Curated collection of premium wines.',
    category: 'Food & Beverages',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&h=300&fit=crop',
    rating: 4.8,
    numReviews: 125
  },
  {
    id: 38,
    name: 'Chocolate Gift Box',
    price: 599.99,
    description: 'Luxury chocolate assortment.',
    category: 'Food & Beverages',
    image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=400&h=300&fit=crop',
    rating: 4.7,
    numReviews: 98
  },
  {
    id: 39,
    name: 'Tea Collection',
    price: 449.99,
    description: 'Premium loose leaf tea selection.',
    category: 'Food & Beverages',
    image: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400&h=300&fit=crop',
    rating: 4.8,
    numReviews: 125
  },
  {
    id: 40,
    name: 'Spice Gift Set',
    price: 349.99,
    description: 'Gourmet spice collection.',
    category: 'Food & Beverages',
    image: 'https://images.unsplash.com/photo-1532336414038-cf19250c5757?w=400&h=300&fit=crop',
    rating: 4.7,
    numReviews: 98
  },

  // Toys & Games
  {
    id: 41,
    name: 'Board Game Collection',
    price: 1299.99,
    description: 'Set of premium strategy board games.',
    category: 'Toys & Games',
    image: 'https://images.unsplash.com/photo-1632501641765-e568d28b0015?w=400&h=300&fit=crop',
    rating: 4.9,
    numReviews: 156
  },
  {
    id: 42,
    name: 'Remote Control Drone',
    price: 2999.99,
    description: 'Professional camera drone with 4K recording.',
    category: 'Toys & Games',
    image: 'https://images.unsplash.com/photo-1579829366248-204fe8413f31?w=400&h=300&fit=crop',
    rating: 4.8,
    numReviews: 125
  },
  {
    id: 43,
    name: 'Educational Robot Kit',
    price: 1499.99,
    description: 'Programmable robot building kit.',
    category: 'Toys & Games',
    image: 'https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=400&h=300&fit=crop',
    rating: 4.7,
    numReviews: 98
  },
  {
    id: 44,
    name: 'Art & Craft Set',
    price: 699.99,
    description: 'Complete children\'s art and craft kit.',
    category: 'Toys & Games',
    image: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=400&h=300&fit=crop',
    rating: 4.8,
    numReviews: 125
  },
  {
    id: 45,
    name: 'Musical Instrument Set',
    price: 899.99,
    description: 'Children\'s musical instruments collection.',
    category: 'Toys & Games',
    image: 'https://images.unsplash.com/photo-1619558041249-0523903712e1?w=400&h=300&fit=crop',
    rating: 4.9,
    numReviews: 156
  },

  // Pet Supplies
  {
    id: 46,
    name: 'Luxury Pet Bed',
    price: 999.99,
    description: 'Premium memory foam pet bed.',
    category: 'Pet Supplies',
    image: 'https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?w=400&h=300&fit=crop',
    rating: 4.8,
    numReviews: 125
  },
  {
    id: 47,
    name: 'Automatic Pet Feeder',
    price: 1499.99,
    description: 'Smart automatic pet food dispenser.',
    category: 'Pet Supplies',
    image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=400&h=300&fit=crop',
    rating: 4.7,
    numReviews: 98
  },
  {
    id: 48,
    name: 'Pet Grooming Kit',
    price: 799.99,
    description: 'Professional pet grooming tools set.',
    category: 'Pet Supplies',
    image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=400&h=300&fit=crop',
    rating: 4.9,
    numReviews: 156
  },
  {
    id: 49,
    name: 'Interactive Pet Toys',
    price: 449.99,
    description: 'Set of interactive toys for pets.',
    category: 'Pet Supplies',
    image: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=400&h=300&fit=crop',
    rating: 4.7,
    numReviews: 98
  },
  {
    id: 50,
    name: 'Pet Travel Carrier',
    price: 899.99,
    description: 'Premium airline-approved pet carrier.',
    category: 'Pet Supplies',
    image: 'https://images.unsplash.com/photo-1549298240-0d8e60513026?w=400&h=300&fit=crop',
    rating: 4.8,
    numReviews: 125
  },

  // Add new products for categories with less than 5 items
  {
    id: 53,
    name: 'Gourmet Pasta Set',
    price: 449.99,
    description: 'Artisanal Italian pasta collection with sauces.',
    category: 'Food & Beverages',
    image: 'https://images.unsplash.com/photo-1516100882582-96c3a05fe590?w=400&h=300&fit=crop',
    rating: 4.7,
    numReviews: 45
  },
  {
    id: 54,
    name: 'Premium Olive Oil Set',
    price: 299.99,
    description: 'Selection of extra virgin olive oils from different regions.',
    category: 'Food & Beverages',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=300&fit=crop',
    rating: 4.6,
    numReviews: 38
  },
  {
    id: 55,
    name: 'Luxury Cat Tower',
    price: 1299.99,
    description: 'Multi-level cat tower with scratching posts and beds.',
    category: 'Pet Supplies',
    image: 'https://images.unsplash.com/photo-1587559045816-8b0a54d4c598?w=400&h=300&fit=crop',
    rating: 4.8,
    numReviews: 72
  },
  {
    id: 56,
    name: 'Smart Pet Camera',
    price: 899.99,
    description: 'Wi-Fi pet camera with treat dispenser and two-way audio.',
    category: 'Pet Supplies',
    image: 'https://images.unsplash.com/photo-1583511655826-05700d52f4d9?w=400&h=300&fit=crop',
    rating: 4.7,
    numReviews: 63
  }
]; 