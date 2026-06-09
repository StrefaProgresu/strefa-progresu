import { Resend } from "resend";
import { Product } from "./products";
import { createDownloadToken } from "./downloads";
import { getBaseUrl } from "./stripe";

// Klient tworzony "leniwie" — dopiero przy wysyłce, gdy klucz jest już dostępny.
function getResend(): Resend {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    throw new Error(
      "Brak RESEND_API_KEY. Uzupełnij plik .env.local / zmienne na Vercel."
    );
  }
  return new Resend(key);
}

// Adres nadawcy. Dopóki nie zweryfikujesz własnej domeny w Resend,
// możesz używać onboarding@resend.dev (działa tylko do testów).
const FROM = process.env.EMAIL_FROM ?? "STREFA PROGRESU <onboarding@resend.dev>";

/**
 * Wysyła do klienta maila z linkami do pobrania zakupionych plików.
 */
export async function sendPurchaseEmail(params: {
  to: string;
  product: Product;
}): Promise<void> {
  const { to, product } = params;
  const baseUrl = getBaseUrl();

  const links = product.files.map((file, index) => {
    const token = createDownloadToken(product.id, index);
    const url = `${baseUrl}/api/download?token=${encodeURIComponent(token)}`;
    return { label: file.label, url };
  });

  const buttons = links
    .map(
      (l) => `
        <tr>
          <td style="padding:8px 0;">
            <a href="${l.url}"
               style="display:inline-block;background:#C9A227;color:#0A0A0B;
                      text-decoration:none;font-weight:700;font-family:Arial,sans-serif;
                      padding:14px 28px;border-radius:8px;font-size:15px;">
              Pobierz: ${l.label}
            </a>
          </td>
        </tr>`
    )
    .join("");

  const html = `
  <div style="background:#0A0A0B;padding:40px 0;font-family:Arial,Helvetica,sans-serif;">
    <table align="center" width="560" cellpadding="0" cellspacing="0"
           style="background:#121214;border-radius:16px;border:1px solid #1C1C20;overflow:hidden;">
      <tr>
        <td style="padding:36px 40px 8px 40px;">
          <div style="letter-spacing:4px;font-size:12px;color:#C9A227;font-weight:700;">
            STREFA&nbsp;PROGRESU
          </div>
        </td>
      </tr>
      <tr>
        <td style="padding:8px 40px;">
          <h1 style="color:#F5F3EC;font-size:24px;margin:12px 0 4px 0;">
            Dziękujemy za zakup
          </h1>
          <p style="color:#8C8C92;font-size:15px;line-height:1.6;margin:0 0 8px 0;">
            Twój zakup <strong style="color:#F5F3EC;">${product.name}</strong> został opłacony.
            Pobierz swoje materiały poniżej.
          </p>
        </td>
      </tr>
      <tr>
        <td style="padding:16px 40px 8px 40px;">
          <table cellpadding="0" cellspacing="0">${buttons}</table>
        </td>
      </tr>
      <tr>
        <td style="padding:16px 40px 36px 40px;">
          <p style="color:#5e5e64;font-size:12px;line-height:1.6;margin:16px 0 0 0;">
            Linki są ważne przez 30 dni. Jeśli wygasną, odpowiedz na tego maila —
            wyślemy nowe. Małe działania. Wielkie rezultaty.
          </p>
        </td>
      </tr>
    </table>
  </div>`;

  const { error } = await getResend().emails.send({
    from: FROM,
    to,
    subject: `Twój zakup: ${product.name}`,
    html,
  });

  if (error) {
    throw new Error(`Resend error: ${JSON.stringify(error)}`);
  }
}
