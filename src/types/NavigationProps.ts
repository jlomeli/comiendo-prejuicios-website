export interface NavItem {
  label: string;
  href: string;
  icon?: string;
  ariaLabel?: string;
}

export interface NavigationProps {
  items: NavItem[];
  logo?: {
    src: string;
    alt: string;
  };
} 