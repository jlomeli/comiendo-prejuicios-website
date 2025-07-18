export interface FAQItem {
  question: string;
  answer: string;
  category: 'getting-started' | 'services-approach' | 'practical-concerns';
}

export interface FAQProps {
  title: string;
  subtitle: string;
  faqs: FAQItem[];
} 