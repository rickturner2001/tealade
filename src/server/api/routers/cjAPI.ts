import { z } from "zod";
import { env } from "../../../env/server.mjs";
import {
  CJResponseListProducts,
  CjResponseProductSpecifics,
  CJShippingResponse,
} from "../../../types.js";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const cjApiRouter = createTRPCRouter({
  getListProducts: publicProcedure
    .input(z.object({}))
    .query(async ({ input }) => {
      const response = await fetch(
        `https://developers.cjdropshipping.com/api2.0/v1/product/list`,
        {
          headers: {
            "CJ-Access-Token": env.CJ_TOKEN,
          },
        }
      );

      const cjJsonresponse: CJResponseListProducts = await response.json();
      return cjJsonresponse;
    }),

  // Send a request to the CjAPI
  requestProductByID: publicProcedure
    .input(z.object({ pid: z.string() }))
    .query(async ({ input }) => {
      const response = await fetch(
        `https://developers.cjdropshipping.com/api2.0/v1/product/query?pid=${input.pid}`,
        {
          headers: {
            "CJ-Access-Token": env.CJ_TOKEN,
          },
        }
      );

      const cjJsonresponse: CjResponseProductSpecifics = await response.json();
      return cjJsonresponse;
    }),

  requestShipmentByVid: publicProcedure
    .input(z.object({ vid: z.string() }))
    .query(async ({ input }) => {
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
                vid: input.vid,
              },
            ],
          }),
        }
      );

      const jsonResponse: CJShippingResponse = await response.json();
      return jsonResponse;
    }),
});
