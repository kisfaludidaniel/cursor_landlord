import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { z } from 'zod';

const prisma = new PrismaClient();

const RegisterSchema = z.object({
  email: z.string().email('Érvénytelen e-mail cím!'),
  password: z.string().min(8, 'A jelszónak legalább 8 karakter hosszúnak kell lennie!'),
  passwordConfirm: z.string()
});

export async function POST(req: Request) {
  const data = await req.json();
  const parsed = RegisterSchema.safeParse(data);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.errors[0]?.message || 'Érvénytelen adat!' }, { status: 400 });
  }
  const { email, password, passwordConfirm } = parsed.data;
  if (password !== passwordConfirm) {
    return NextResponse.json({ error: 'A jelszavak nem egyeznek!' }, { status: 400 });
  }
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json({ error: 'Ez az e-mail cím már regisztrált!' }, { status: 400 });
  }
  const passwordHash = await bcrypt.hash(password, 10);
  await prisma.user.create({
    data: {
      email,
      passwordHash,
      hasOnboarded: false,
    },
  });
  return NextResponse.json({ success: true });
}
