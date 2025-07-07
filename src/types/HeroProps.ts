export interface HeroImage {
  src: string;
  alt: string;
}

export interface HeroProps {
  title: string;
  subtitle: string;
  image: HeroImage;
}
