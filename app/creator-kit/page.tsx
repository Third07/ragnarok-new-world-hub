/* eslint-disable @next/next/no-img-element -- Direct image URLs are intentional downloadable creator assets. */
import type { Metadata } from "next";
import Link from "next/link";
import assetPreviews from "../../public/creator-assets/catalog/previews.json";
import assetSummary from "../../public/creator-assets/catalog/summary.json";
import { creatorCards } from "../creator-card";
import AssetLibrary, { type CreatorAsset, type CreatorAssetSummary } from "./AssetLibrary";
import styles from "./creator-kit.module.css";

const canonical = "https://rtnw.online/creator-kit/";
const usageUrl = `${canonical}#usage`;
const catalogSummary = assetSummary as CreatorAssetSummary;
const catalogPreviews = assetPreviews as Record<string, CreatorAsset[]>;
const representativeGameAssets = catalogSummary.categories.flatMap((category) => {
  const asset = catalogPreviews[category.id]?.[0];
  return asset ? [asset] : [];
});

const logoAssets = [
  {
    name: "RTNW Hub crest — PNG",
    description: "512 × 512 transparent-friendly channel icon for profiles, watermarks, and video corners.",
    href: "/icon-512.png",
    downloadName: "rtnw-hub-crest-512.png",
    meta: "PNG · 512 × 512",
    width: 512,
    height: 512,
  },
  {
    name: "RTNW Hub crest — SVG",
    description: "Editable vector crest that stays sharp at any size.",
    href: "/assets/creator-kit/rtnw-hub-crest.svg",
    downloadName: "rtnw-hub-crest.svg",
    meta: "SVG · vector",
    width: 512,
    height: 512,
  },
  {
    name: "Horizontal RTNW Hub wordmark",
    description: "Wide transparent logo for video descriptions, channel art, overlays, and credits.",
    href: "/assets/creator-kit/rtnw-hub-wordmark.svg",
    downloadName: "rtnw-hub-horizontal-wordmark.svg",
    meta: "SVG · 1600 × 440",
    width: 1600,
    height: 440,
  },
  {
    name: "Video lower third",
    description: "Transparent lower-third bar with RTNW Hub identification and website credit.",
    href: "/assets/creator-kit/rtnw-hub-video-lower-third.svg",
    downloadName: "rtnw-hub-video-lower-third.svg",
    meta: "SVG · 1600 × 260",
    width: 1600,
    height: 260,
  },
  {
    name: "Transparent thumbnail frame",
    description: "A 16:9 border and credit overlay that can sit above your own gameplay screenshot.",
    href: "/assets/creator-kit/rtnw-thumbnail-frame.svg",
    downloadName: "rtnw-transparent-thumbnail-frame.svg",
    meta: "SVG · 1280 × 720",
    width: 1280,
    height: 720,
  },
] as const;

const faqs = [
  {
    question: "Can I download RTNW skill, card, weapon, monster, pet, and map images?",
    answer: "Yes. The searchable game-reference library provides direct downloads for every unique image currently indexed by RTNW Hub. These files remain subject to the rights and usage rules of their respective game owners; RTNW Hub does not grant a new license for them.",
  },
  {
    question: "Can I use these RTNW graphics in a monetized video?",
    answer: "Yes. RTNW Hub-created logos, cards, and overlays on this page may be used in monetized videos, thumbnails, livestreams, and social posts when the creator credits RTNW Hub and links to rtnw.online.",
  },
  {
    question: "Are these official Ragnarok: The New World assets?",
    answer: "No. RTNW Hub is an independent fan-made project. The downloads on this page are original RTNW Hub branding and templates, not an official Gravity press kit or publisher endorsement.",
  },
  {
    question: "Can I edit the thumbnail templates?",
    answer: "Yes. Creators may crop, resize, add gameplay screenshots, replace the sample title, and add their own channel identity while retaining a readable RTNW Hub credit.",
  },
  {
    question: "Does this permission cover game characters, cards, and screenshots?",
    answer: "No. Game names, characters, logos, artwork, card images, screenshots, icons, and trademarks remain the property of their respective owners and are not relicensed by RTNW Hub.",
  },
] as const;

export const metadata: Metadata = {
  title: "RTNW Creator Asset Library: Skills, Cards & Weapons",
  description:
    "Search and download Ragnarok: The New World skill images, card art, weapon and equipment icons, monsters, pets, maps, RTNW Hub logos, and thumbnail templates.",
  alternates: { canonical: "/creator-kit/" },
  keywords: [
    "Ragnarok The New World creator kit",
    "Ragnarok The New World skill images",
    "Ragnarok The New World card images",
    "Ragnarok The New World weapon images",
    "Ragnarok New World thumbnail",
    "RTNW logo",
    "RTNW build card",
    "Ragnarok The New World video graphics",
  ],
  openGraph: {
    type: "website",
    url: "/creator-kit/",
    title: "RTNW Creator Asset Library — Skills, Cards, Weapons & Templates",
    description: "Search thousands of indexed game images and download original RTNW Hub creator templates.",
    images: [
      {
        url: "/creator-assets/high-wizard-build/",
        width: 1280,
        height: 720,
        alt: "Ragnarok: The New World High Wizard build video thumbnail template",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RTNW Creator Asset Library — Images & Templates",
    description: "Search skill, card, equipment, monster, pet, and map images plus RTNW Hub creator graphics.",
    images: ["/creator-assets/high-wizard-build/"],
  },
};

export default function CreatorKitPage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${canonical}#webpage`,
        url: canonical,
        name: "RTNW Creator Asset Library: Skills, Cards, Weapons and Templates",
        description: metadata.description,
        isPartOf: { "@id": "https://rtnw.online/#website" },
        inLanguage: "en",
        about: catalogSummary.categories.map((category) => ({
          "@type": "Thing",
          name: category.label,
          description: category.description,
        })),
        associatedMedia: representativeGameAssets.map((asset) => ({
          "@type": "ImageObject",
          name: asset.name,
          contentUrl: `https://rtnw.online${asset.image}`,
          encodingFormat: asset.image.endsWith(".svg") ? "image/svg+xml" : "image/webp",
          creditText: "Indexed by RTNW Hub; rights belong to the respective game owner.",
        })),
        primaryImageOfPage: {
          "@type": "ImageObject",
          contentUrl: "https://rtnw.online/creator-assets/high-wizard-build/",
          name: "Ragnarok: The New World High Wizard build thumbnail template",
          caption: "Free 1280 by 720 High Wizard build thumbnail from the RTNW Hub Creator Kit.",
          creator: { "@type": "Organization", name: "RTNW Hub" },
          creditText: "RTNW Hub — rtnw.online",
          copyrightNotice: "RTNW Hub",
          license: usageUrl,
          acquireLicensePage: usageUrl,
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "RTNW Hub", item: "https://rtnw.online/" },
          { "@type": "ListItem", position: 2, name: "Creator Kit", item: canonical },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
    ],
  };

  return (
    <div className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <a className="skip-link" href="#creator-kit-content">Skip to creator downloads</a>

      <main id="creator-kit-content">
        <section className={styles.hero} aria-labelledby="creator-kit-title">
          <div className={styles.heroCopy}>
            <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
              <Link href="/">RTNW Hub</Link><span aria-hidden="true">/</span><span>Creator Kit</span>
            </nav>
            <p className={styles.eyebrow}>{catalogSummary.total.toLocaleString()} indexed images + original creator pack</p>
            <h1 id="creator-kit-title">Build the video.<br /><em>Keep the art ready.</em></h1>
            <p className={styles.lead}>
              Search every image currently indexed by RTNW Hub—including skills, cards, weapons,
              equipment, monsters, pets, and maps—then download original thumbnails and overlays too.
            </p>
            <div className={styles.heroActions}>
              <a className={styles.primaryAction} href="#game-assets">Browse all game assets <span aria-hidden="true">↓</span></a>
              <a className={styles.secondaryAction} href="#thumbnail-cards">RTNW templates <span aria-hidden="true">→</span></a>
            </div>
            <p className={styles.heroNote}>Independent fan resource · On-demand asset loading · Direct image downloads</p>
          </div>

          <div className={styles.heroCanvas} aria-label="High Wizard thumbnail template preview">
            <span className={styles.canvasLabel}>16:9 creator board</span>
            <img
              src="/creator-assets/high-wizard-build/"
              alt="Ragnarok: The New World High Wizard build thumbnail template"
              width="1280"
              height="720"
              fetchPriority="high"
            />
            <span className={`${styles.handle} ${styles.handleTopLeft}`} aria-hidden="true" />
            <span className={`${styles.handle} ${styles.handleTopRight}`} aria-hidden="true" />
            <span className={`${styles.handle} ${styles.handleBottomLeft}`} aria-hidden="true" />
            <span className={`${styles.handle} ${styles.handleBottomRight}`} aria-hidden="true" />
          </div>
        </section>

        <section className={`${styles.section} ${styles.librarySection}`} id="game-assets" aria-labelledby="game-assets-title">
          <div className={styles.sectionHeading}>
            <div>
              <p className={styles.sectionKicker}>Game reference image vault</p>
              <h2 id="game-assets-title">Skills, cards, weapons—and every indexed image.</h2>
            </div>
            <p>
              Search {catalogSummary.total.toLocaleString()} unique images across seven collections. The page loads only
              a small preview first; full categories appear when you search, filter, or request more.
            </p>
          </div>

          <div className={styles.assetRightsNotice}>
            <strong>Before downloading:</strong> game images are provided as reference links for guides, reviews,
            commentary, and fan content. Their owners retain all rights, and RTNW Hub cannot grant permission for reuse.
          </div>

          <AssetLibrary summary={catalogSummary} previews={catalogPreviews} />
        </section>

        <section className={styles.section} id="thumbnail-cards" aria-labelledby="thumbnail-title">
          <div className={styles.sectionHeading}>
            <div>
              <p className={styles.sectionKicker}>Ready-made cards</p>
              <h2 id="thumbnail-title">Start with the topics people already search.</h2>
            </div>
            <p>
              These original 1280 × 720 cards prioritize class builds, maps, and MVP guides—the visual
              topics creators can turn into useful videos, walkthroughs, and explainers.
            </p>
          </div>

          <div className={styles.cardGrid}>
            {creatorCards.map((card) => (
              <figure className={styles.assetCard} key={card.slug}>
                <a className={styles.cardPreview} href={`/creator-assets/${card.slug}/`} aria-label={`Open full-size ${card.title} creator card`}>
                  <img
                    src={`/creator-assets/${card.slug}/`}
                    alt={`${card.eyebrow} ${card.title} video thumbnail card`}
                    width="1280"
                    height="720"
                    loading="lazy"
                    decoding="async"
                  />
                </a>
                <figcaption>
                  <span className={styles.assetMeta}>PNG · 1280 × 720</span>
                  <h3>{card.title.replace("YOUR VIDEO TITLE", "Blank creator template")}</h3>
                  <p>{card.subtitle}</p>
                  <div className={styles.assetActions}>
                    <a className={styles.downloadAction} href={`/creator-assets/${card.slug}/`} download={card.downloadName}>Download PNG</a>
                    <a className={styles.textAction} href={card.relatedHref}>Related resource <span aria-hidden="true">→</span></a>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className={`${styles.section} ${styles.logoSection}`} id="logos" aria-labelledby="logos-title">
          <div className={styles.sectionHeading}>
            <div>
              <p className={styles.sectionKicker}>Logo and overlay pack</p>
              <h2 id="logos-title">Channel marks that stay sharp.</h2>
            </div>
            <p>Use PNG for quick placement. Use SVG when you need to resize, recolor, or edit the vector in Canva, Figma, or another design app.</p>
          </div>

          <div className={styles.logoGrid}>
            {logoAssets.map((asset) => (
              <article className={styles.logoCard} key={asset.name}>
                <a className={styles.logoPreview} href={asset.href} aria-label={`Open full-size ${asset.name}`}>
                  <img
                    src={asset.href}
                    alt={asset.name}
                    width={asset.width}
                    height={asset.height}
                    loading="lazy"
                    decoding="async"
                  />
                </a>
                <div>
                  <span className={styles.assetMeta}>{asset.meta}</span>
                  <h3>{asset.name}</h3>
                  <p>{asset.description}</p>
                  <a className={styles.downloadAction} href={asset.href} download={asset.downloadName}>Download asset</a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className={`${styles.section} ${styles.usageSection}`} id="usage" aria-labelledby="usage-title">
          <div className={styles.usageIntro}>
            <p className={styles.sectionKicker}>Two kinds of creator resources</p>
            <h2 id="usage-title">Original templates are free—with a clear credit.</h2>
            <p>
              This permission applies only to RTNW Hub logos, thumbnail cards, and overlays in the original
              creator pack. Add the following credit to your description, caption, or visible credits:
            </p>
            <code>Graphics: RTNW Hub — https://rtnw.online/creator-kit/</code>
          </div>

          <div className={styles.ruleGrid}>
            <article className={styles.allowed}>
              <span>Allowed</span>
              <ul>
                <li>Videos, thumbnails, livestreams, and social posts</li>
                <li>Monetized creator content</li>
                <li>Cropping, resizing, adding titles, and combining with your own gameplay</li>
                <li>Using the RTNW Hub crest as a source or reference credit</li>
              </ul>
            </article>
            <article className={styles.notAllowed}>
              <span>Not allowed</span>
              <ul>
                <li>Reselling or repackaging the files as your own asset pack</li>
                <li>Claiming RTNW Hub or publisher endorsement</li>
                <li>Using the graphics for scams, impersonation, or fake download buttons</li>
                <li>Treating this permission as a license for official game artwork or trademarks</li>
              </ul>
            </article>
            <article className={styles.referenceAssets}>
              <span>Game reference images</span>
              <p>
                Skill, card, weapon, equipment, monster, pet, map, UI, and other game images in the searchable
                library are not covered by the RTNW Hub permission above. Follow the publisher’s rules and the
                requirements of the platform where you publish.
              </p>
            </article>
          </div>

          <p className={styles.rightsNote}>
            Ragnarok: The New World and related game names, characters, logos, artwork, cards, icons,
            screenshots, and trademarks belong to their respective owners. The game-reference library is an
            indexing convenience, not a rights transfer. Read the full <a href="/disclaimer/">fan-site disclaimer</a>.
          </p>
        </section>

        <section className={`${styles.section} ${styles.faqSection}`} aria-labelledby="creator-faq-title">
          <p className={styles.sectionKicker}>Creator kit FAQ</p>
          <h2 id="creator-faq-title">Before you publish.</h2>
          <div className={styles.faqList}>
            {faqs.map((faq) => (
              <details key={faq.question}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
