import { NextResponse } from 'next/server';
import { PrismaClient, Role } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/route';
import { z } from 'zod';

const prisma = new PrismaClient();
const OrgSchema = z.object({ name: z.string().min(2, 'A szervezet neve túl rövid!').max(50, 'Túl hosszú név!') });

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !session.userId) {
    return NextResponse.json({ error: 'Nincs jogosultság!' }, { status: 401 });
  }
  const user = await prisma.user.findUnique({ where: { id: session.userId } });
  if (!user || user.hasOnboarded) {
    return NextResponse.json({ error: 'Ez a művelet csak első bejelentkezéskor végezhető el!' }, { status: 400 });
  }
  const body = await req.json();
  const parsed = OrgSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.errors[0]?.message || 'Érvénytelen adat!' }, { status: 400 });
  }
  const org = await prisma.organization.create({
    data: {
      name: parsed.data.name,
      memberships: {
        create: {
          userId: user.id,
          role: Role.LANDLORD,
        }
      }
    },
  });
  await prisma.user.update({ where: { id: user.id }, data: { hasOnboarded: true } });
  return NextResponse.json({ success: true, org: org.id });
}
