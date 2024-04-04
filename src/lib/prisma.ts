import { env } from '@/env/environment';
import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient({
  log: env.NODE_ENV === 'development' ? ['query'] : [],
});
