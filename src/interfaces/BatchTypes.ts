export interface BatchTypes {
  id: string;
  product: string;
  targetQty: number;
  uom: string;
  status: string;
  startTime: string | null;
  endTime: string | null;
  operator?: string;
  lot?: string;
  yieldQty?: number;
  scrapQty?: number;
}
