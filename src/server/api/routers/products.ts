import { createTRPCRouter, publicProcedure } from "../trpc";
export const productRouter = createTRPCRouter({
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

  getStoreProductsCount: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.product.count({
      where: {
        isStore: true,
      },
    });
  }),

  getAllDiscountedProducts: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.product.findMany({
      take: 8,
      where: {
        discountId: {
          not: null,
        },
      },
      include: {
        discount: true,
        category: true,
        variants: true,
        sections: true,
        shipments: true,
      },
    });
  }),

  getLatestUpdatedProducts: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.product.findMany({
      take: 8,
      orderBy: {
        updatedAt: "desc",
      },
      include: {
        discount: true,
        category: true,
        variants: true,
        sections: true,
        shipments: true,
      },
    });
  }),
});
