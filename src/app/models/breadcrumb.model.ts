export interface BreadcrumbModel {
  id?: number;
  label?: string;
  name?: string;
  slug?: string;
  url?: string;
  isActive?: boolean;

  // Backward-compatible alias used in templates
  Id?: number;
}
