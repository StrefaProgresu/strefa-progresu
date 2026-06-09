import crypto from "crypto";

// ============================================================================
//  BEZPIECZNE LINKI DO POBIERANIA
// ----------------------------------------------------------------------------
//  Linki do plików PDF są PODPISANE (HMAC-SHA256) i mają datę ważności.
//  Dzięki temu nikt nie pobierze pliku bez zakupu, a link nie działa wiecznie.
//  Sekret pochodzi z DOWNLOAD_SECRET (patrz .env.example).
// ============================================================================

const SECRET = process.env.DOWNLOAD_SECRET ?? "";

// Domyślny czas ważności linku: 30 dni.
const DEFAULT_TTL_MS = 30 * 24 * 60 * 60 * 1000;

type TokenPayload = {
  /** id produktu */
  p: string;
  /** indeks pliku w tablicy product.files */
  f: number;
  /** timestamp wygaśnięcia (ms) */
  e: number;
};

function base64url(input: Buffer | string): string {
  return Buffer.from(input)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function fromBase64url(input: string): Buffer {
  return Buffer.from(input.replace(/-/g, "+").replace(/_/g, "/"), "base64");
}

function sign(data: string): string {
  return base64url(crypto.createHmac("sha256", SECRET).update(data).digest());
}

/** Tworzy podpisany token dla danego produktu i pliku. */
export function createDownloadToken(
  productId: string,
  fileIndex: number,
  ttlMs: number = DEFAULT_TTL_MS
): string {
  const payload: TokenPayload = {
    p: productId,
    f: fileIndex,
    e: Date.now() + ttlMs,
  };
  const data = base64url(JSON.stringify(payload));
  return `${data}.${sign(data)}`;
}

/** Weryfikuje token. Zwraca payload albo null gdy nieprawidłowy/przeterminowany. */
export function verifyDownloadToken(token: string): TokenPayload | null {
  if (!SECRET) return null;
  const parts = token.split(".");
  if (parts.length !== 2) return null;
  const [data, signature] = parts;

  // Porównanie odporne na timing attack.
  const expected = sign(data);
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;

  try {
    const payload = JSON.parse(fromBase64url(data).toString()) as TokenPayload;
    if (typeof payload.e !== "number" || Date.now() > payload.e) return null;
    return payload;
  } catch {
    return null;
  }
}
