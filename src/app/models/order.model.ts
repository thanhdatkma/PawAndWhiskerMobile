export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  total: number;
  status: string;
  items: any[];
}
