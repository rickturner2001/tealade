import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
export const productRouter = createTRPCRouter({
  // Products
  registerProduct: publicProcedure
    .input(
      z.object({
        pid: z.string(),
        name: z.string(),
        description: z.string(),
        variants: z
          .object({
            vid: z.string(),
            price: z.number(),
            name: z.string(),
            image: z.string(),
            height: z.number(),
            width: z.number(),
          })
          .array(),
        defaultThumbnail: z.string(),
        imageSet: z.string().array(),
        shipments: z
          .object({ courier: z.string(), est: z.string(), price: z.number() })
          .array(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.product.create({
        data: {
          pid: input.pid,
          defaultThumbnail: input.defaultThumbnail,
          isImport: true,
          description: input.description,
          name: input.name,
          imageSet: input.imageSet,
          variants: {
            createMany: {
              data: input.variants.map((variant) => {
                return {
                  price: variant.price,
                  variantName: variant.name,
                  height: variant.height,
                  width: variant.width,
                  vid: variant.vid,
                  thumbnail: variant.image,
                };
              }),
            },
          },
          shipments: {
            createMany: {
              data: input.shipments.map((shipment) => {
                return {
                  cost: shipment.price,
                  courier: shipment.courier,
                  est: shipment.est,
                };
              }),
            },
          },
        },
      });
    }),

  deleteProduct: publicProcedure
    .input(z.object({ pid: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.product.delete({
        where: {
          pid: input.pid,
        },
      });
    }),

  getAllProducts: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.product.findMany();
  }),

  getAllImportedProducts: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.product.findMany({
      where: {
        isImport: true,
      },
      include: {
        tags: true,
        variants: true,
        shipments: true,
      },
    });
  }),

  // Tags
  addNewTag: publicProcedure
    .input(z.object({ label: z.string(), pid: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.productTag.create({
        data: {
          label: input.label,
          productId: input.pid,
        },
      });
    }),

  deleteTag: publicProcedure
    .input(z.object({ label: z.string(), pid: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.productTag.delete({
        where: {
          label_productId: {
            label: input.label,
            productId: input.pid,
          },
        },
      });
    }),

  // Categories

  // Categories Queries
  getAllCategories: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.category.findMany({});
  }),
  // Categories Mutations
  blukCreateNewCategory: publicProcedure
    .input(z.object({ label: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.category.createMany({
        data: {
          label: input.label,
        },
      });
    }),

  createNewSubCategory: publicProcedure
    .input(z.object({ label: z.string(), category: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.subCategory.createMany({
        data: {
          categoryLabel: input.category,
          label: input.label,
        },
      });
    }),
});
