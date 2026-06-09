# STREFA PROGRESU — sklep z produktami cyfrowymi

Kompletny sklep do sprzedaży e-booków i checklist (PDF) zbudowany w Next.js 15,
z płatnościami Stripe i automatyczną wysyłką maili przez Resend. Gotowy do
wdrożenia na Vercel.

- Sprzedaż produktów cyfrowych jednym kliknięciem (bez koszyka, bez wysyłki)
- Płatności: karta, BLIK, Przelewy24 (waluta PLN)
- Po zakupie: mail z bezpiecznymi linkami do pobrania PDF
- Łatwe dodawanie kolejnych produktów (jeden plik konfiguracyjny)

---

## 📁 Co jest w projekcie

```
strefa-progresu/
├── content/                      ← TWOJE PLIKI PDF (ebooki + checklisty)
├── public/fonts/                 ← czcionki (polskie znaki) — nie ruszaj
├── src/
│   ├── app/
│   │   ├── page.tsx              ← strona główna
│   │   ├── success/page.tsx      ← strona po udanej płatności
│   │   ├── layout.tsx            ← SEO, czcionki, schema
│   │   └── api/
│   │       ├── checkout/         ← tworzy płatność Stripe
│   │       ├── webhook/          ← odbiera potwierdzenie i wysyła maila
│   │       └── download/         ← serwuje pliki PDF (chronione)
│   ├── components/               ← sekcje strony
│   └── lib/
│       ├── products.ts           ← ⭐ TU DODAJESZ PRODUKTY
│       ├── stripe.ts
│       ├── email.ts
│       └── downloads.ts
├── .env.example                  ← wzór pliku z kluczami
└── .env.local                    ← Twoje klucze (NIE trafia do gita)
```

---

## 🚀 Szybki start — testy na własnym komputerze

> Potrzebujesz zainstalowanego **Node.js 18.18+** (najlepiej 20 lub 22).
> Pobierz z https://nodejs.org

1. Otwórz folder projektu w terminalu i zainstaluj zależności:
   ```bash
   npm install
   ```

2. Plik `.env.local` jest już wstępnie uzupełniony Twoimi **testowymi** kluczami
   Stripe. Aby działała wysyłka maili, dodaj jeszcze klucz Resend (patrz krok
   „Resend" niżej). Bez tego strona i płatność zadziałają, ale mail nie wyjdzie.

3. Uruchom stronę lokalnie:
   ```bash
   npm run dev
   ```
   Wejdź na http://localhost:3000

---

## 🔑 Konfiguracja krok po kroku

### 1. Stripe (płatności)

1. Załóż konto na https://stripe.com i zaloguj się.
2. Wejdź w **Developers → API keys**.
3. Skopiuj **Publishable key** (`pk_...`) i **Secret key** (`sk_...`).
4. Wklej je do `.env.local`:
   ```
   STRIPE_SECRET_KEY=sk_test_...
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
   ```
   > 🔒 **Ważne:** klucze testowe (`_test_`) które były w czacie — odśwież po
   > testach (Stripe → Developers → API keys → „Roll key"). Klucza `sk_...`
   > nigdy nie wklejaj publicznie.

### 2. Resend (wysyłka maili)

1. Załóż konto na https://resend.com
2. Wejdź w **API Keys → Create API Key**, skopiuj klucz `re_...`
3. Wklej do `.env.local`:
   ```
   RESEND_API_KEY=re_...
   ```
4. Na start możesz zostawić nadawcę `onboarding@resend.dev` (działa tylko do
   testów i wysyła na Twój własny adres). Docelowo: w Resend wejdź w **Domains**,
   dodaj i zweryfikuj swoją domenę, a potem ustaw:
   ```
   EMAIL_FROM=STREFA PROGRESU <zakup@twojadomena.pl>
   ```

### 3. Sekret do pobierania

W `.env.local` jest już wygenerowany `DOWNLOAD_SECRET`. Jeśli chcesz nowy:
```bash
openssl rand -hex 32
```
i wklej wynik. (Po zmianie wcześniej wysłane linki przestają działać.)

---

## 📦 Dodawanie i podmiana produktów

### Podmiana PDF-ów na własne

W folderze `content/` są przykładowe pliki PDF. **Zastąp je swoimi**,
zachowując te same nazwy (albo zmień nazwy także w `src/lib/products.ts`):

```
content/potega-nawykow.pdf
content/potega-nawykow-checklista.pdf
content/przestan-byc-zmeczony.pdf
content/przestan-byc-zmeczony-checklista.pdf
```

### Dodanie nowego produktu

Otwórz `src/lib/products.ts` i dopisz nowy obiekt do tablicy `products`:

```ts
{
  id: "twoj-nowy-produkt",            // unikalny, bez spacji
  name: "Tytuł produktu + Checklista",
  shortDescription: "Jedno zdanie zachęty.",
  lead: "Mocne zdanie otwierające.",
  description: ["Akapit 1.", "Akapit 2."],
  bullets: ["czego się nauczy 1", "czego się nauczy 2"],
  priceGrosze: 4900,                   // 49 PLN = 4900 groszy
  files: [
    { label: "E-book PDF", filename: "twoj-nowy-produkt.pdf" },
    { label: "Checklista PDF", filename: "twoj-nowy-produkt-checklista.pdf" },
  ],
}
```

Następnie wrzuć odpowiednie pliki PDF do `content/`. To wszystko — przycisk
zakupu, płatność i mail zadziałają automatycznie.

### Zmiana ceny

W `src/lib/products.ts` zmień `priceGrosze` (cena w groszach). Po zmianie zrób
ponowny deploy (jeśli korzystasz z GitHub — wystarczy commit + push).

---

## ☁️ Wdrożenie na Vercel (produkcja)

### Krok 1 — wrzuć kod na GitHub

1. Załóż konto na https://github.com i utwórz nowe (puste) repozytorium.
2. W folderze projektu:
   ```bash
   git init
   git add .
   git commit -m "Pierwsza wersja sklepu"
   git branch -M main
   git remote add origin https://github.com/TWOJ_LOGIN/NAZWA_REPO.git
   git push -u origin main
   ```
   > Plik `.env.local` NIE trafi na GitHub (jest w `.gitignore`) — i dobrze.

### Krok 2 — połącz z Vercel

1. Załóż konto na https://vercel.com (zaloguj się przez GitHub).
2. **Add New → Project → Import** swoje repozytorium.
3. W sekcji **Environment Variables** dodaj WSZYSTKIE zmienne z `.env.local`:
   - `STRIPE_SECRET_KEY`
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - `STRIPE_WEBHOOK_SECRET` (uzupełnisz w kroku 4)
   - `RESEND_API_KEY`
   - `EMAIL_FROM`
   - `DOWNLOAD_SECRET`
   - `NEXT_PUBLIC_BASE_URL` → tu wpisz adres jaki nada Ci Vercel,
     np. `https://strefa-progresu.vercel.app` (możesz go poprawić po pierwszym
     deployu, gdy poznasz dokładny adres).
4. Kliknij **Deploy**. Po chwili strona będzie online.

### Krok 3 — ustaw `NEXT_PUBLIC_BASE_URL`

Po pierwszym deployu skopiuj dokładny adres strony z Vercel, wklej go w
**Settings → Environment Variables** jako `NEXT_PUBLIC_BASE_URL`, i kliknij
**Redeploy**. To ważne — od tego zależą poprawne linki w mailach.

### Krok 4 — webhook Stripe (kluczowe dla wysyłki maili)

1. W Stripe wejdź w **Developers → Webhooks → Add endpoint**.
2. **Endpoint URL:** `https://TWOJ-ADRES.vercel.app/api/webhook`
3. **Events to send:** wybierz `checkout.session.completed`.
4. Zapisz. Stripe pokaże **Signing secret** (`whsec_...`).
5. Wklej go na Vercel jako `STRIPE_WEBHOOK_SECRET` i zrób **Redeploy**.

### Krok 5 — przejście na płatności prawdziwe (live)

Gdy wszystko działa na kluczach testowych:
1. W Stripe przełącz tryb na **Live** (przełącznik w panelu).
2. Skopiuj klucze **live** (`sk_live_...`, `pk_live_...`).
3. Utwórz webhook **jeszcze raz** w trybie live (osobny `whsec_...`).
4. Podmień wszystkie te wartości na Vercel i zrób Redeploy.

---

## 🌐 Własna domena (zalecane)

1. Kup domenę (np. w OVH, nazwa.pl, Namecheap) — koszt zwykle kilkanaście–
   kilkadziesiąt zł/rok. Wygląda profesjonalnie i buduje zaufanie.
2. W Vercel: **Settings → Domains → Add**, wpisz swoją domenę.
3. Vercel pokaże rekordy DNS do ustawienia u sprzedawcy domeny.
4. Po podpięciu zmień `NEXT_PUBLIC_BASE_URL` na adres z własną domeną i zrób
   Redeploy. Zaktualizuj też URL webhooka w Stripe.

---

## 🧪 Test płatności (tryb testowy Stripe)

Na stronie kliknij „Kup teraz" i użyj testowej karty Stripe:
- Numer: `4242 4242 4242 4242`
- Data: dowolna przyszła, CVC: dowolne 3 cyfry

Po opłaceniu powinieneś trafić na `/success` i (jeśli ustawiłeś Resend +
webhook) dostać maila z linkami do pobrania.

---

## ❓ Najczęstsze problemy

- **Mail nie przychodzi** → sprawdź, czy ustawiony jest `RESEND_API_KEY` oraz
  webhook (`STRIPE_WEBHOOK_SECRET`). Zobacz logi w Vercel (zakładka „Logs")
  i w Stripe (Webhooks → Twój endpoint → ostatnie zdarzenia).
- **Linki w mailu prowadzą do localhost** → ustaw `NEXT_PUBLIC_BASE_URL` na
  produkcyjny adres i zrób Redeploy.
- **„Link wygasł lub jest nieprawidłowy"** przy pobieraniu → `DOWNLOAD_SECRET`
  został zmieniony po wysłaniu maila, albo minęło 30 dni.
- **Płatność nie startuje** → sprawdź, czy klucze Stripe są poprawne i czy
  Przelewy24/BLIK są włączone w ustawieniach Twojego konta Stripe.

---

Małe działania. Wielkie rezultaty.
