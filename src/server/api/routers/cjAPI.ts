import { z } from "zod";
import {
  requestProductById,
  requestProductList,
  requestShipmentByVid,
} from "../../../functions";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const cjApiRouter = createTRPCRouter({
  getListProducts: publicProcedure
    .input(
      z.object({
        pageNum: z.number(),
        perPage: z.number(),
        categoryKeyword: z.string().nullable(),
      })
    )
    .query(async ({ input }) => {
      return await requestProductList(
        input.perPage,
        input.pageNum,
        input.categoryKeyword
      );
    }),

  // Send a request to the CjAPI
  requestProductByID: publicProcedure
    .input(z.object({ pid: z.string() }))
    .query(async ({ input }) => {
      return await requestProductById(input.pid);
    }),

  requestShipmentByVid: publicProcedure
    .input(z.object({ vid: z.string() }))
    .query(async ({ input }) => {
      return await requestShipmentByVid(input.vid);
    }),

  blindProductRegistration: publicProcedure
    .input(z.object({ pid: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const productData = await requestProductById(input.pid);

      if (productData.data) {
        const shipmentData = await requestShipmentByVid(
          productData.data.variants[0].vid
        );
        if (shipmentData.data) {
          const product = productData.data;
          const shipments = shipmentData.data;
          return await ctx.prisma.product.create({
            data: {
              pid: product.pid,
              defaultThumbnail: product.productImageSet[0],
              isImport: true,
              description: product.description,
              name: product.entryNameEn,
              imageSet: product.productImageSet,
              variants: {
                createMany: {
                  data: product.variants.map((variant) => {
                    return {
                      price: variant.variantSellPrice,
                      variantName: variant.variantNameEn,
                      height: variant.variantHeight,
                      width: variant.variantWidth,
                      vid: variant.vid,
                      thumbnail: variant.variantImage,
                    };
                  }),
                },
              },
              shipments: {
                createMany: {
                  data: shipments.map((shipment) => {
                    return {
                      cost: shipment.logisticPrice,
                      courier: shipment.logisticName,
                      est: shipment.logisticAging,
                    };
                  }),
                },
              },
            },
          });
        }
      }
    }),
});
