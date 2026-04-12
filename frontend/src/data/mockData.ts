export interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  image: string;
  featured?: boolean;
  trending?: boolean;
}

export interface Magazine {
  id: string;
  title: string;
  issue: string;
  date: string;
  coverImage: string;
  pdfUrl?: string;
}

export const categories = [
  "Startup",
  "Business",
  "Founder Stories",
  "PR Features",
  "Technology",
  "Finance",
];

export const articles: Article[] = [
  {
    id: "1",
    title: "How Indian Startups Are Redefining Global Innovation",
    excerpt: "A deep dive into the new wave of Indian founders building world-class products from India.",
    category: "Startup",
    author: "Priya Sharma",
    date: "2025-04-05",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=80",
    featured: true,
    trending: true,
  },
  {
    id: "2",
    title: "The Rise of D2C Brands in India's Consumer Market",
    excerpt: "Direct-to-consumer brands are disrupting traditional retail with digital-first strategies.",
    category: "Business",
    author: "Rahul Mehta",
    date: "2025-04-03",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80",
    trending: true,
  },
  {
    id: "3",
    title: "From Garage to Unicorn: The Journey of Meesho's Founder",
    excerpt: "An exclusive interview with the founder who turned a small idea into a billion-dollar company.",
    category: "Founder Stories",
    author: "Anita Desai",
    date: "2025-04-01",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
    featured: true,
  },
  {
    id: "4",
    title: "PR Strategies That Helped Brands Go Viral in 2025",
    excerpt: "Learn the media strategies top brands used to dominate headlines this year.",
    category: "PR Features",
    author: "Vikram Singh",
    date: "2025-03-28",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80",
  },
  {
    id: "5",
    title: "AI Revolution: How Indian Tech Companies Are Leading the Way",
    excerpt: "India's tech ecosystem is emerging as a global leader in AI innovation and deployment.",
    category: "Technology",
    author: "Neha Kapoor",
    date: "2025-03-25",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80",
    trending: true,
  },
  {
    id: "6",
    title: "The Fintech Boom: Reshaping India's Financial Landscape",
    excerpt: "How fintech startups are democratizing access to financial services across India.",
    category: "Finance",
    author: "Arjun Patel",
    date: "2025-03-22",
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&q=80",
  },
];

export const magazines: Magazine[] = [
  {
    id: "1",
    title: "OneBusiness India",
    issue: "April 2025 Edition",
    date: "2025-04-01",
    coverImage: "",
  },
  {
    id: "2",
    title: "OneBusiness India",
    issue: "March 2025 Edition",
    date: "2025-03-01",
    coverImage: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&q=80",
  },
  {
    id: "3",
    title: "OneBusiness India",
    issue: "February 2025 Edition",
    date: "2025-02-01",
    coverImage: "https://images.unsplash.com/photo-1504711434969-e33886168d4c?w=400&q=80",
  },
];
