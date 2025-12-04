export interface CategoryScore {
  category: string;
  confidence: number; // 0 to 100
}

export interface ClassificationResult {
  primaryCategory: string;
  allCategories: CategoryScore[];
  tags: string[];
  summary: string;
  sentiment: 'Positive' | 'Neutral' | 'Negative';
}

export enum AppView {
  DASHBOARD = 'DASHBOARD',
  CLASSIFIER = 'CLASSIFIER',
  PRICING = 'PRICING',
  API_DOCS = 'API_DOCS'
}

export interface PricingPlan {
  name: string;
  price: string;
  articles: string;
  features: string[];
  recommended?: boolean;
}