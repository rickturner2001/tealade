import { createTRPCRouter } from "./trpc";
import { productRouter } from "./routers/products";
import { cjApiRouter } from "./routers/cjAPI";
import { sectionRouter } from "./routers/sections";
import { discountRouter } from "./routers/discounts";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  products: productRouter,
  cjApi: cjApiRouter,
  sections: sectionRouter,
  discounts: discountRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
