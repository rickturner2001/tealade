import { Input } from "postcss";
import { env } from "./env/server.mjs";
import {
  CJResponseListProducts,
  CjResponseProductSpecifics,
  CJShippingResponse,
} from "./types.js";

export const requestShipmentByVid = async (vid: string) => {
  const response = await fetch(
    "https://developers.cjdropshipping.com/api2.0/v1/logistic/freightCalculate",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "CJ-Access-Token": env.CJ_TOKEN,
      },
      body: JSON.stringify({
        startCountryCode: "CN",
        endCountryCode: "IT",
        products: [
          {
            quantity: 1,
            vid: vid,
          },
        ],
      }),
    }
  );

  const jsonResponse = (await response.json()) as CJShippingResponse;
  return jsonResponse;
};

export const requestProductById = async (pid: string) => {
  const response = await fetch(
    `https://developers.cjdropshipping.com/api2.0/v1/product/query?pid=${pid}`,
    {
      headers: {
        "CJ-Access-Token": env.CJ_TOKEN,
      },
    }
  );

  const cjJsonresponse = (await response.json()) as CjResponseProductSpecifics;
  return cjJsonresponse;
};

export const requestProductList = async (
  perPage: number,
  pageNum: number,
  categoryKeyword: string | null = null
) => {
  const response = await fetch(
    `https://developers.cjdropshipping.com/api2.0/v1/product/list?pageNum=${pageNum}&pageSize=${perPage}${
      categoryKeyword ? `&categoryKeyword=${categoryKeyword}` : ""
    }`,
    {
      headers: {
        "Content-Type": "application/json",
        "CJ-Access-Token": env.CJ_TOKEN,
      },
    }
  );

  const cjJsonresponse = (await response.json()) as CJResponseListProducts;
  return cjJsonresponse;
};
