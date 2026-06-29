/**
 * Analytics event name constants
 * Pattern: <category>_<action> (snake_case)
 */

// Section visibility events
export const EVENTS = {
  // Section tracking
  SECTION_VIEWED: "section_viewed",

  // Scroll tracking
  SCROLL_DEPTH_REACHED: "scroll_depth_reached",

  // Form tracking
  FORM_VIEWED: "form_viewed",
  FORM_FIELD_FOCUSED: "form_field_focused",
  FORM_AUDIENCE_SELECTED: "form_audience_selected",
  FORM_VALIDATION_ERROR: "form_validation_error",
  FORM_SUBMIT_SUCCESS: "form_submit_success",
  FORM_SUBMIT_ERROR: "form_submit_error",

  // Navigation tracking
  NAV_MENU_OPENED: "nav_menu_opened",
  NAV_LINK_CLICKED: "nav_link_clicked",

  // Content engagement
  GLOSSARY_TERM_VIEWED: "glossary_term_viewed",
  THESIS_SECTION_READ: "thesis_section_read",
  FAQ_EXPANDED: "faq_expanded",

  // External links
  EXTERNAL_LINK_CLICKED: "external_link_clicked",

  // Errors
  API_ERROR: "api_error",
} as const;

// Section IDs for tracking
export const SECTIONS = {
  // Homepage sections
  HERO: "hero",
  VALUE: "value",
  PROJECTS: "projects",
  HELIOS: "helios",
  AGENTS: "agents",
  SECURITY: "security",
  COMMITMENTS: "commitments",
  CONTACT: "contact",
  // For Founders page sections
  FOR_FOUNDERS_HERO: "for_founders_hero",
  FOR_FOUNDERS_WHO: "for_founders_who",
  FOR_FOUNDERS_CONTRIBUTES: "for_founders_contributes",
  FOR_FOUNDERS_KEEPS: "for_founders_keeps",
  FOR_FOUNDERS_FAQ: "for_founders_faq",
  // For Investors page sections
  FOR_INVESTORS_HERO: "for_investors_hero",
  FOR_INVESTORS_OPCO: "for_investors_opco",
  FOR_INVESTORS_VALUATION: "for_investors_valuation",
  FOR_INVESTORS_SIDECAR: "for_investors_sidecar",
  FOR_INVESTORS_METRICS: "for_investors_metrics",
  // For Partners page sections
  FOR_PARTNERS_HERO: "for_partners_hero",
  FOR_PARTNERS_WHO: "for_partners_who",
  FOR_PARTNERS_CASES: "for_partners_cases",
  FOR_PARTNERS_CONFIDENTIALITY: "for_partners_confidentiality",
  // Thesis page sections
  THESIS_HERO: "thesis_hero",
  THESIS_WHY_NOW: "thesis_why_now",
  THESIS_AGENTIC: "thesis_agentic",
  THESIS_WEDGES: "thesis_wedges",
  THESIS_MUST_BE_TRUE: "thesis_must_be_true",
  // Studio Model page sections
  STUDIO_HERO: "studio_hero",
  STUDIO_TWO_LEDGER: "studio_two_ledger",
  STUDIO_INCUBATION: "studio_incubation",
  STUDIO_FOUNDER_FIRST: "studio_founder_first",
} as const;

// Form fields for tracking
export const FORM_FIELDS = {
  NAME: "name",
  EMAIL: "email",
  COMPANY: "company",
  LINKEDIN: "linkedin",
  MESSAGE: "message",
} as const;

// Audience types
export const AUDIENCE_TYPES = {
  FOUNDER: "founder",
  INVESTOR: "investor",
  PARTNER: "partner",
  OPERATOR: "operator",
} as const;

export type EventName = (typeof EVENTS)[keyof typeof EVENTS];
export type SectionId = (typeof SECTIONS)[keyof typeof SECTIONS];
export type FormField = (typeof FORM_FIELDS)[keyof typeof FORM_FIELDS];
export type AudienceType = (typeof AUDIENCE_TYPES)[keyof typeof AUDIENCE_TYPES];
