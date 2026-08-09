type ResponsiveHeroImageProps = {
  alt?: string;
  className?: string;
  pictureClassName?: string;
  priority?: boolean;
  sizes?: string;
};

const avifSources = [
  "/assets/rtnw-hero-640.avif 640w",
  "/assets/rtnw-hero-800.avif 800w",
  "/assets/rtnw-hero-960.avif 960w",
  "/assets/rtnw-hero-1280.avif 1280w",
  "/assets/rtnw-hero-1672.avif 1672w",
].join(", ");

const webpSources = [
  "/assets/rtnw-hero-640.webp 640w",
  "/assets/rtnw-hero-800.webp 800w",
  "/assets/rtnw-hero-960.webp 960w",
  "/assets/rtnw-hero-1280.webp 1280w",
  "/assets/rtnw-hero-1672.webp 1672w",
].join(", ");

export default function ResponsiveHeroImage({
  alt = "",
  className,
  pictureClassName = "responsive-hero-picture",
  priority = true,
  sizes = "100vw",
}: Readonly<ResponsiveHeroImageProps>) {
  return (
    <picture className={pictureClassName}>
      <source type="image/avif" srcSet={avifSources} sizes={sizes} />
      <source type="image/webp" srcSet={webpSources} sizes={sizes} />
      <img
        className={className}
        src="/assets/rtnw-hero-1280.webp"
        width="1672"
        height="941"
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding={priority ? "sync" : "async"}
        alt={alt}
      />
    </picture>
  );
}
