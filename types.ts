export interface ProductData {
  name: string;
  shortHeadline: string;
  keyBenefits: string[];
  targetAudience: string;
  brandTone: string;
  seoKeywords: string[];
  colorPalette: string[];
  availableAssets: string;
  currentOffer?: string;
  productUrl?: string;
}

export interface DesignBrief {
  conceptualIdea: string;
  visualStyle: string;
  suggestedFonts: string[];
  appliedColorPalette: string[];
  recommendedComposition: string;
  accessibilityRules: string[];
  finalDeliverables: {
    feed: string;
    storiesReelsTikTok: string;
    thumbnail: string;
  };
}

export interface AIPrompt {
  name: string;
  text: string;
  negativePrompt: string;
}

export interface VideoPrompt {
  name: string;
  description: string;
  audio: string;
  textOverlay: { text: string; timing: string }[];
}

export interface MarketingCopy {
  shortHooks: string[];
  longEmotionalCopy: string;
  testimonialVersion: string;
  lightHumorVersion: string;
  directCTA: string;
  shortAdHeadline: string;
  hashtags: string[];
}

export interface ABVariant {
  headline: string;
  suggestedImage: string;
  copy: string;
  cta: string;
  keyDifference: string;
}

export interface TestingStrategy {
  targetCTR: string;
  baseMetrics: string;
  scaleKillGuide: string;
  recommendedDuration: string;
  changeBasedOnMetrics: string;
}

export interface TechnicalChecklist {
  dimensionsByNetwork: string[];
  recommendedFormats: string[];
  qualityCompression: string;
  exportGuidelines: string;
  accessibilityNotes: string;
}

export interface MarketingKit {
  designBrief: DesignBrief;
  imagePrompts: AIPrompt[];
  videoPrompts: VideoPrompt[];
  marketingCopy: MarketingCopy;
  abVariants: ABVariant[];
  testingStrategy: TestingStrategy;
  technicalChecklist: TechnicalChecklist;
}
