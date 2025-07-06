export interface Testimonial {
  quote: string;
  author: string;
  role?: string;
  image: {
    src: string;
    alt: string;
  };
  rating: number; // 1-5 stars
  date?: string;
}

export interface TestimonialsProps {
  testimonials: Testimonial[];
}
