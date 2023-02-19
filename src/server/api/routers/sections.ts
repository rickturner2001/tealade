import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
  adminProcedure,
} from "../trpc";

export const sectionRouter = createTRPCRouter({
  createSectionWithProducts: adminProcedure
    .input(
      z.object({
        label: z.string(),
        thumbnail: z.string(),
        pids: z.string().array(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.shopSection.create({
        data: {
          label: input.label,
          thumbnail: input.thumbnail,
          products: {
            connect: input.pids.map((pid) => {
              return { pid };
            }),
          },
        },
      });
    }),

  addProductsToSection: adminProcedure
    .input(z.object({ sid: z.string(), pids: z.string().array() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.shopSection.update({
        where: {
          id: input.sid,
        },
        data: {
          products: {
            connect: input.pids.map((pid) => {
              return { pid };
            }),
          },
        },
      });
    }),

  changeSectionThumbnail: adminProcedure
    .input(z.object({ sid: z.string(), thumbnail: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.shopSection.update({
        where: {
          id: input.sid,
        },
        data: {
          thumbnail: input.thumbnail,
        },
      });
    }),

  changeSectionNameAndThumbnail: adminProcedure
    .input(
      z.object({ thumbnail: z.string(), label: z.string(), sid: z.string() })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.shopSection.update({
        where: {
          id: input.sid,
        },
        data: {
          label: input.label,
          thumbnail: input.thumbnail,
        },
      });
    }),

  removeProductsFromSection: adminProcedure
    .input(z.object({ sid: z.string(), pids: z.string().array() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.shopSection.update({
        where: {
          id: input.sid,
        },
        data: {
          products: {
            disconnect: input.pids.map((pid) => {
              return { pid };
            }),
          },
        },
      });
    }),

  deleteSection: adminProcedure
    .input(z.object({ sid: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.shopSection.delete({
        where: {
          id: input.sid,
        },
      });
    }),

  removeItemsFromSection: adminProcedure
    .input(z.object({ pid: z.string(), sid: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.shopSection.update({
        where: {
          id: input.sid,
        },
        data: {
          products: {
            disconnect: { pid: input.pid },
          },
        },
      });
    }),

  // Read only
  getAllSesctions: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.shopSection.findMany();
  }),

  getSectionById: publicProcedure
    .input(z.object({ sid: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.shopSection.findUnique({
        where: {
          id: input.sid,
        },
        include: {
          products: {
            include: {
              discount: true,
              variants: true,
            },
          },
        },
      });
    }),

  getSectionCount: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.shopSection.count();
  }),
});
