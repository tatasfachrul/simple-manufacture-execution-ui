export interface BatchTypes {
  id: string;
  product: string;
  targetQty: number;
  uom: string;
  status: string;
  startTime: string | null;
  endTime: string | null;
  operator: string;
  lot: string;
  yieldQty: number;
  scrapQty?: number;
}

export interface ProductionLotTypes {
  lots: Array<ProductionLotDetailTypes>;
}

export interface ProductionLotDetailTypes {
  lot: string;
  product: string;
  yield: number;
  inputs: ProductionMaterialsTypes[];
}

export interface ProductionMaterialsTypes {
  id: number;
  material: string;
  qty: number;
}
