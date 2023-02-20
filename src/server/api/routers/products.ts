import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  adminProcedure,
  protectedProcedure,
} from "../trpc";
export const productRouter = createTRPCRouter({
  // Products
  registerProduct: adminProcedure
    .input(
      z.object({
        pid: z.string(),
        name: z.string(),
        description: z.string(),
        categoryId: z.string(),
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

        categoryName: z.string(),
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
          category: {
            connectOrCreate: {
              where: {
                cid: input.categoryId,
              },
              create: {
                cid: input.categoryId,
                label: input.categoryName,
              },
            },
          },
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

  deleteProduct: adminProcedure
    .input(z.object({ pid: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.product.delete({
        where: {
          pid: input.pid,
        },
      });
    }),

  setProductToEdit: adminProcedure
    .input(z.object({ pid: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.product.update({
        where: {
          pid: input.pid,
        },
        data: {
          isStore: false,
          isImport: true,
        },
      });
    }),

  getAllProducts: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.product.findMany();
  }),

  getAllStoreProducts: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.product.findMany({
      where: {
        isStore: true,
      },
      include: {
        sections: true,
        tags: true,
        discount: true,
        variants: {
          orderBy: {
            price: "asc",
          },
        },
      },
    });
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

  removeDiscountByProductId: adminProcedure
    .input(z.object({ pid: z.string(), did: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.product.update({
        where: {
          pid: input.pid,
        },
        data: {
          discount: {
            disconnect: true,
          },
        },
      });
    }),

  // Tags
  addNewTag: adminProcedure
    .input(z.object({ label: z.string(), pid: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.productTag.create({
        data: {
          label: input.label,
          productId: input.pid,
        },
      });
    }),

  deleteTag: adminProcedure
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
  getAllCategoriesWithProductCount: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.category.findMany({
      include: {
        products: {
          include: {
            _count: true,
          },
        },
      },
    });
  }),

  // Categories Queries
  getAllCategories: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.category.findMany({});
  }),
  // Categories Mutations
  blukCreateNewCategory: adminProcedure
    .input(z.object({ label: z.string().array(), ids: z.string().array() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.category.createMany({
        data: input.label.map((label, idx) => {
          return { label: label, cid: input.ids[idx] as string };
        }),
      });
    }),

  finalizeProductListing: adminProcedure
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
        imageSet: z.string().array(),
        sectionId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.product.update({
        where: {
          pid: input.pid,
        },
        data: {
          description: input.description,
          imageSet: input.imageSet,
          defaultThumbnail: input.imageSet[0],
          isImport: false,
          sections:
            input.sectionId === ""
              ? undefined
              : {
                  connect: {
                    id: input.sectionId,
                  },
                },
          isStore: true,
          name: input.name,
          variants: {
            deleteMany: {},
            createMany: {
              data: input.variants.map((variant) => {
                return {
                  height: variant.height,
                  price: variant.price,
                  thumbnail: variant.image,
                  variantName: variant.name,
                  vid: variant.vid,
                  width: variant.width,
                };
              }),
            },
          },
        },
      });
    }),

  getImportedProductsCount: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.product.count({
      where: {
        isImport: true,
      },
    });
  }),
  getStoreProductsCount: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.product.count({
      where: {
        isStore: true,
      },
    });
  }),
});
