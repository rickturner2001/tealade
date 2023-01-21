import { z } from "zod";
import { env } from "../../../env/server.mjs";
import { CJResponseListProducts } from "../../../types.js";
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
});
