import type { NavigationProps } from '../types/NavigationProps';

export const navigationConfig: NavigationProps = {
  items: [
    { 
      label: 'About',
      href: '#about',
      ariaLabel: 'About section'
    },
    {
      label: 'Services',
      href: '#services',
      ariaLabel: 'Our services'
    },
    {
      label: 'Testimonials',
      href: '#testimonials',
      ariaLabel: 'Client testimonials'
    },
    {
      label: 'Insurance',
      href: '#insurance',
      ariaLabel: 'Insurance information'
    },
    {
      label: 'Contact',
      href: '#contact',
      ariaLabel: 'Contact us'
    }
  ]
}; 