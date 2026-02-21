import { NextResponse } from "next/server";
import { createHash } from "crypto";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-admin";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await requireAdmin();
  const { id } = await params;
  if (!id) {
    return NextResponse.json(
      { ok: false, error: "Missing page id." },
      { status: 400 }
    );
  }

  const session = await getServerSession(authOptions);
  const body = await request.json().catch(() => null);
  const content = body?.content ?? null;
  const label = typeof body?.label === "string" ? body.label : null;

  const contentHash =
    content === null
      ? "empty"
      : createHash("sha256")
          .update(JSON.stringify(content))
          .digest("hex");

  let latestRevisionHash: string | null = null;
  let revisionAvailable = true;

  const revisionClient = (prisma as typeof prisma & { pageRevision?: typeof prisma.pageRevision })
    .pageRevision;

  if (revisionClient) {
    try {
      const latestRevision = await revisionClient.findFirst({
        where: { pageId: id },
        orderBy: { createdAt: "desc" },
        select: { contentHash: true },
      });
      latestRevisionHash = latestRevision?.contentHash ?? null;
    } catch (error) {
      revisionAvailable = false;
    }
  } else {
    revisionAvailable = false;
  }

  const shouldCreateRevision =
    revisionAvailable && latestRevisionHash !== contentHash;

  try {
    await prisma.page.update({
      where: { id },
      data: { content },
    });
  } catch (error) {
    const isMissingColumn =
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2022";
    return NextResponse.json(
      {
        ok: false,
        error: isMissingColumn
          ? "Column Page.content is missing. Run prisma migrations."
          : "Failed to save page content.",
      },
      { status: 500 }
    );
  }

  if (shouldCreateRevision && content !== null && revisionClient) {
    try {
      await revisionClient.create({
        data: {
          pageId: id,
          authorId: session?.user?.id ?? null,
          content,
          contentHash,
          label,
        },
      });
    } catch (error) {
      revisionAvailable = false;
    }
  }

  return NextResponse.json({
    ok: true,
    revisionSaved: shouldCreateRevision && revisionAvailable,
    revisionAvailable,
  });
}
