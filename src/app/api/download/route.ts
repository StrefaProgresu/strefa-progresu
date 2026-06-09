import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";
import { verifyDownloadToken } from "@/lib/downloads";
import { getProductById } from "@/lib/products";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");
  if (!token) {
    return new NextResponse("Brak tokenu.", { status: 400 });
  }

  const payload = verifyDownloadToken(token);
  if (!payload) {
    return new NextResponse("Link wygasł lub jest nieprawidłowy.", {
      status: 403,
    });
  }

  const product = getProductById(payload.p);
  const file = product?.files[payload.f];
  if (!product || !file) {
    return new NextResponse("Nie znaleziono pliku.", { status: 404 });
  }

  try {
    const filePath = path.join(process.cwd(), "content", file.filename);
    const data = await readFile(filePath);

    return new NextResponse(data, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${file.filename}"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    console.error("[download] nie można odczytać pliku:", err);
    return new NextResponse(
      "Plik chwilowo niedostępny. Skontaktuj się z nami.",
      { status: 500 }
    );
  }
}
