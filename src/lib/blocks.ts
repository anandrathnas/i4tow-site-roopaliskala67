// Blocks-as-data contract. This is the single source of truth shared by:
//   - the content collection schema (src/content.config.ts)
//   - the React render layer (src/components/blocks.tsx)
//   - the i4tow editor + /__preview harness (sends these objects via postMessage)
//
// Each block is a plain JSON object with a `kind` discriminator, so it
// serializes into frontmatter and renders identically in build and preview.

export interface HeroBlock {
  kind: 'hero';
  eyebrow?: string;
  heading: string;
  subheading?: string;
  /** Optional background image URL (e.g. a GitHub Pages gallery image). */
  image?: string;
  cta?: { label: string; href: string };
}

export interface RichTextBlock {
  kind: 'richText';
  heading?: string;
  /** Markdown string rendered to HTML by the render layer. */
  markdown: string;
}

export interface GalleryBlock {
  kind: 'gallery';
  heading?: string;
  /** i4tow album id; images resolved at build (manifest) and rendered with blur-up. */
  albumId: string;
  items?: { src: string; alt?: string; thumbHash?: string; width?: number; height?: number }[];
}

/** Image carousel on one side, a short story on the other. */
export interface MediaStoryBlock {
  kind: 'mediaStory';
  heading: string;
  story: string;
  imageSide?: 'left' | 'right';
  images: { src: string; alt?: string }[];
}

export interface FeatureGridBlock {
  kind: 'featureGrid';
  heading?: string;
  features: { title: string; body: string; icon?: string }[];
}

export interface CtaBlock {
  kind: 'cta';
  heading: string;
  body?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
}

/** Bespoke art-directed scrollytelling story (dev-built, not freely WYSIWYG). */
export interface ScrollytellingBlock {
  kind: 'scrollytelling';
  steps: { heading: string; body?: string; image?: string }[];
}

export type Block =
  | HeroBlock
  | RichTextBlock
  | GalleryBlock
  | MediaStoryBlock
  | FeatureGridBlock
  | CtaBlock
  | ScrollytellingBlock;

export type BlockKind = Block['kind'];
