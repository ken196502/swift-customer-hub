export interface Permission {
  id: number;
  customerNumber: string;
  customerName: string;
  departments: string[];
  visibleContent: string[];
  visibleProducts: string[];
}
