export interface TestimonialImage {
  src: string;
  alt: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  image: TestimonialImage;
  rating: number;
  date: string;
}

export interface TestimonialsProps {
  testimonials: Testimonial[];
}

export interface FilterState {
  role?: string;
  rating?: number;
  sortBy: 'date' | 'rating';
  sortOrder: 'asc' | 'desc';
}

export interface PaginationState {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
}
