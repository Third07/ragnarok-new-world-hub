function optimizedToolIcon(icon: string, extension: "avif" | "webp") {
  const filename = icon.split("/").pop()?.replace(/\.webp$/, "") ?? "tool";
  return `/assets/home-icons/${filename}-96.${extension}`;
}

export default function HomeToolIcon({ icon }: Readonly<{ icon: string }>) {
  return (
    <picture className="home-tool-picture">
      <source srcSet={optimizedToolIcon(icon, "avif")} type="image/avif" />
      <img
        src={optimizedToolIcon(icon, "webp")}
        width="96"
        height="96"
        loading="lazy"
        decoding="async"
        alt=""
      />
    </picture>
  );
}
