interface BrandProps {
  className: string;
  primaryColor: string;
  secondaryColor: string;
}

export default function Brand({ className, primaryColor, secondaryColor }: BrandProps) {
  return (
    <svg className={className} viewBox="0 0 176 176" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M105.6 70.4H140.8H176V140.8V176L140.8 140.8L140.8 105.6L105.6 70.4Z" className={secondaryColor} />
      <path
        d="M140.8 0H70.4C31.5192 0 0 31.5192 0 70.4C0 109.281 31.5192 140.8 70.4 140.8H140.8L105.6 105.6L88 105.6C68.5596 105.6 52.8 89.8404 52.8 70.4C52.8 50.9596 68.5596 35.2 88 35.2H176L140.8 0Z"
        className={primaryColor}
      />
    </svg>
  );
}
