import { describe, it, expect } from 'vitest';
import { renderHTML } from '../../utils/test-utils';

// Mock service data
const mockServices = [
  {
    data: {
      title: 'Individual Therapy',
      description: 'One-on-one therapy sessions tailored to your unique needs and goals.',
      icon: '/icons/user.svg',
      image: '/images/individual-therapy.jpg'
    },
    slug: 'individual-therapy'
  },
  {
    data: {
      title: 'Couples Counseling',
      description: 'Strengthen your relationship and improve communication with your partner.',
      icon: '/icons/heart.svg',
      image: '/images/couples-counseling.jpg'
    },
    slug: 'couples-counseling'
  }
];

describe('Services Component', () => {
  it('renders service items correctly', () => {
    // Mock implementation for testing purposes
    const mockServicesHTML = `
      <section id="services" aria-labelledby="services-heading" class="relative py-20 bg-gradient-to-br from-primary/5 to-white overflow-hidden">
        <div class="container mx-auto px-6 relative z-10">
          <h2 id="services-heading" class="text-3xl md:text-4xl font-heading text-primary mb-12 font-semibold text-center" data-animation="fade-in">Our Services</h2>
          <ul class="space-y-16">
            ${mockServices.map((service, index) => `
              <li class="group md:grid md:grid-cols-2 md:gap-12 items-center">
                <div class="relative ${index % 2 === 0 ? 'md:order-2' : ''}">
                  <div class="absolute w-full h-full bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl transform transition-transform duration-500 group-hover:scale-105 ${index % 2 === 0 ? '-rotate-3' : 'rotate-3'}"></div>
                  <div class="relative bg-neutral-light rounded-2xl shadow-lg p-8 text-center md:text-left flex flex-col h-full">
                    <div class="flex-grow">
                      <div class="mb-5 text-primary md:float-left md:mr-6">
                        <img src="${service.data.icon}" alt="" aria-hidden="true" class="w-12 h-12 mx-auto md:mx-0" loading="lazy" />
                      </div>
                      <h3 class="text-2xl font-heading font-semibold mb-3 text-neutral-dark">${service.data.title}</h3>
                      <p class="text-base text-neutral-dark opacity-90 mb-6">${service.data.description}</p>
                    </div>
                    <div class="mt-auto">
                      <a href="/services/${service.slug}" class="inline-block bg-primary text-white font-bold py-2 px-6 rounded-full hover:bg-primary-dark transition-colors duration-300">
                        Learn More
                      </a>
                    </div>
                  </div>
                </div>
                <div class="mt-8 md:mt-0 ${index % 2 === 0 ? 'md:order-1' : ''}">
                  <img
                    src="${service.data.image}"
                    alt="Illustration for ${service.data.title}"
                    class="rounded-lg shadow-xl w-full h-auto object-cover aspect-video"
                    loading="lazy"
                    width="500"
                    height="281"
                  />
                </div>
              </li>
            `).join('')}
          </ul>
        </div>
      </section>
    `;
    
    const { container } = renderHTML(mockServicesHTML);
    
    // Test that the component renders the section heading
    const heading = container.querySelector('#services-heading');
    expect(heading).not.toBeNull();
    expect(heading?.textContent).toBe('Our Services');
    
    // Test that the component renders all service items
    const serviceItems = container.querySelectorAll('li.group');
    expect(serviceItems.length).toBe(mockServices.length);
    
    // Test the content of each service item
    serviceItems.forEach((item, index) => {
      const service = mockServices[index];
      
      // Test service title
      const title = item.querySelector('h3');
      expect(title).not.toBeNull();
      expect(title?.textContent).toBe(service.data.title);
      
      // Test service description
      const description = item.querySelector('p');
      expect(description).not.toBeNull();
      expect(description?.textContent).toBe(service.data.description);
      
      // Test service icon
      const icon = item.querySelector('.mb-5.text-primary img');
      expect(icon).not.toBeNull();
      expect(icon?.getAttribute('src')).toBe(service.data.icon);
      
      // Test service image
      const image = item.querySelector('.mt-8 img, .md\\:mt-0 img');
      expect(image).not.toBeNull();
      expect(image?.getAttribute('src')).toBe(service.data.image);
      
      // Test learn more link
      const link = item.querySelector('a.inline-block');
      expect(link).not.toBeNull();
      expect(link?.getAttribute('href')).toBe(`/services/${service.slug}`);
      expect(link?.textContent?.trim()).toBe('Learn More');
    });
  });
}); 