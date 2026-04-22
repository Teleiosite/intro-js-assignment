import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const registerSchema = z.object({
  schoolName: z.string().min(3),
  schoolSlug: z.string().min(3),
  adminName: z.string().min(2),
  adminEmail: z.string().email(),
  adminPassword: z.string().min(8),
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  const parsed = registerSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message }, { status: 400 });
  }

  // Placeholder response for implementation scaffold.
  return NextResponse.json({
    success: true,
    organization: {
      name: parsed.data.schoolName,
      slug: parsed.data.schoolSlug,
    },
  });
}
