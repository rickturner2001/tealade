export type Language = "english" | "italian";

export type CJResponseListProducts = {
  code: number;
  result: boolean;
  message: string;
  data:
    | undefined
    | {
        pageNum: number;
        pageSize: number;
        total: number;
        list: CjProduct[];
      };
  requestId: string;
};

export type CjProduct = {
  pid: string;
  productName: string;
  productNameEn: string;
  productSku: string;
  productImage: string;
  productWeight: number;
  productType: null;
  productUnit: string;
  sellPrice: number;
  categoryId: string;
  categoryName: string;
  sourceFrom: number;
  remark: string;
  createTime: null;
};
