import crypto from 'crypto';
import * as trpc from '@trpc/server';
import { prisma } from '../../db/client';
import { z } from 'zod';

export const appRouter = trpc.router()
  .query('login', {
    input: (z.object({username: z.string(), password: z.string()})),
    async resolve(req) {
      const data = await prisma.user.findFirst({
        where: {
          username: req.input.username,
          password: crypto.createHash("sha256").update(req.input.password.toString()).digest("hex")
        },
        select: {
          id: true,
          name: true
        }
      });

      return data;
    }
  })

// export type definition of API
export type AppRouter = typeof appRouter;