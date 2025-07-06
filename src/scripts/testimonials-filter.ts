import { gsap } from 'gsap';

interface FilterState {
  role?: string;
  rating?: number;
  sortBy: 'date' | 'rating';
  sortOrder: 'asc' | 'desc';
}

class TestimonialsManager {
  private container: HTMLElement;
  private cards: HTMLElement[];
  private filterState: FilterState;
  private activeFilters: Set<string>;

  constructor() {
    this.container = document.querySelector('.testimonials-grid') as HTMLElement;
    this.cards = Array.from(document.querySelectorAll('.testimonial-card'));
    this.filterState = {
      sortBy: 'date',
      sortOrder: 'desc'
    };
    this.activeFilters = new Set();

    this.initializeFilters();
    this.initializeSorting();
    this.initializePagination();
  }

  private initializeFilters(): void {
    // Role filter
    const roleFilter = document.querySelector('.role-filter') as HTMLSelectElement;
    if (roleFilter) {
      roleFilter.addEventListener('change', (e) => {
        const role = (e.target as HTMLSelectElement).value;
        this.filterState.role = role === 'all' ? undefined : role;
        this.updateActiveFilters('role', role);
        this.applyFilters();
      });
    }

    // Rating filter
    const ratingFilter = document.querySelector('.rating-filter') as HTMLSelectElement;
    if (ratingFilter) {
      ratingFilter.addEventListener('change', (e) => {
        const rating = parseInt((e.target as HTMLSelectElement).value);
        this.filterState.rating = isNaN(rating) ? undefined : rating;
        this.updateActiveFilters('rating', rating.toString());
        this.applyFilters();
      });
    }
  }

  private initializeSorting(): void {
    const sortSelect = document.querySelector('.sort-select') as HTMLSelectElement;
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        const [sortBy, sortOrder] = (e.target as HTMLSelectElement).value.split('-');
        this.filterState.sortBy = sortBy as 'date' | 'rating';
        this.filterState.sortOrder = sortOrder as 'asc' | 'desc';
        this.applyFilters();
      });
    }
  }

  private initializePagination(): void {
    const itemsPerPage = 6;
    const totalPages = Math.ceil(this.cards.length / itemsPerPage);
    
    if (totalPages > 1) {
      this.createPaginationControls(totalPages, itemsPerPage);
    }
  }

  private createPaginationControls(totalPages: number, itemsPerPage: number): void {
    const paginationContainer = document.querySelector('.pagination-controls');
    if (!paginationContainer) return;

    // Clear existing controls
    paginationContainer.innerHTML = '';

    // Previous button
    const prevButton = document.createElement('button');
    prevButton.classList.add('pagination-btn', 'prev');
    prevButton.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
      </svg>
    `;

    // Next button
    const nextButton = document.createElement('button');
    nextButton.classList.add('pagination-btn', 'next');
    nextButton.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
      </svg>
    `;

    let currentPage = 1;

    const updatePagination = () => {
      const startIdx = (currentPage - 1) * itemsPerPage;
      const endIdx = startIdx + itemsPerPage;

      this.cards.forEach((card, idx) => {
        if (idx >= startIdx && idx < endIdx) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });

      // Update button states
      prevButton.disabled = currentPage === 1;
      nextButton.disabled = currentPage === totalPages;

      // Animate visible cards
      gsap.from(this.cards.slice(startIdx, endIdx), {
        opacity: 0,
        y: 20,
        duration: 0.4,
        stagger: 0.1,
        clearProps: 'all'
      });
    };

    prevButton.addEventListener('click', () => {
      if (currentPage > 1) {
        currentPage--;
        updatePagination();
      }
    });

    nextButton.addEventListener('click', () => {
      if (currentPage < totalPages) {
        currentPage++;
        updatePagination();
      }
    });

    paginationContainer.appendChild(prevButton);
    paginationContainer.appendChild(nextButton);

    // Initial pagination
    updatePagination();
  }

  private updateActiveFilters(type: string, value: string): void {
    const filterKey = `${type}-${value}`;
    
    if (value === 'all' || value === '') {
      this.activeFilters.delete(filterKey);
    } else {
      this.activeFilters.add(filterKey);
    }

    this.updateActiveFiltersDisplay();
  }

  private updateActiveFiltersDisplay(): void {
    const activeFiltersContainer = document.querySelector('.active-filters');
    if (!activeFiltersContainer) return;

    activeFiltersContainer.innerHTML = '';

    this.activeFilters.forEach(filter => {
      const [type, value] = filter.split('-');
      const filterTag = document.createElement('span');
      filterTag.classList.add('filter-tag');
      filterTag.innerHTML = `
        ${type}: ${value}
        <button class="remove-filter" data-filter="${filter}">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </button>
      `;

      filterTag.querySelector('.remove-filter')?.addEventListener('click', () => {
        this.activeFilters.delete(filter);
        this.updateActiveFiltersDisplay();
        this.applyFilters();
      });

      activeFiltersContainer.appendChild(filterTag);
    });
  }

  private applyFilters(): void {
    const filteredCards = this.cards.filter(card => {
      let matches = true;

      if (this.filterState.role) {
        matches = matches && card.getAttribute('data-role') === this.filterState.role;
      }

      if (this.filterState.rating) {
        matches = matches && parseInt(card.getAttribute('data-rating') || '0') >= this.filterState.rating;
      }

      return matches;
    });

    // Sort cards
    filteredCards.sort((a, b) => {
      const aValue = this.filterState.sortBy === 'date' 
        ? new Date(a.getAttribute('data-date') || '').getTime()
        : parseInt(a.getAttribute('data-rating') || '0');
      
      const bValue = this.filterState.sortBy === 'date'
        ? new Date(b.getAttribute('data-date') || '').getTime()
        : parseInt(b.getAttribute('data-rating') || '0');

      return this.filterState.sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
    });

    // Animate and reposition cards
    gsap.to(this.cards, {
      opacity: 0,
      y: 20,
      duration: 0.3,
      stagger: 0.05,
      onComplete: () => {
        // Hide non-matching cards
        this.cards.forEach(card => {
          card.style.display = filteredCards.includes(card) ? '' : 'none';
        });

        // Show and animate matching cards
        gsap.to(filteredCards, {
          opacity: 1,
          y: 0,
          duration: 0.3,
          stagger: 0.05,
          clearProps: 'all'
        });
      }
    });
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new TestimonialsManager();
}); 