# Poradnik: Jak uruchomić repozytorium Next.js

Poniższy przewodnik pomoże Ci skonfigurować i uruchomić repozytorium Next.js z właściwymi zmiennymi środowiskowymi. Znajdziesz tu informacje, jakie klucze i tokeny musisz uzyskać oraz gdzie je wprowadzić w pliku .env.

## 1. Klonowanie repozytorium

Najpierw skopiuj repozytorium na swój lokalny komputer.

## 2. Instalacja zależności

Zainstaluj wszystkie wymagane pakiety:

```bash
npm install
```

## 3. Konfiguracja pliku .env

W katalogu głównym repozytorium utwórz plik .env i skopiuj do niego zawartość z pliku .env.example. Następnie wprowadź odpowiednie wartości dla każdego klucza.

## 4. Gdzie się zarejestrować i skąd pobrać klucze

Aby uzyskać potrzebne klucze i tokeny, musisz wykonać następujące kroki:

### MongoDB
- Zarejestruj się na MongoDB Atlas i utwórz klaster
- Wygeneruj URI połączenia, które umieścisz w DATABASE_URL

### NextAuth
- Wygeneruj AUTH_SECRET, możesz skorzystać z NextAuth.js secret generator
- Dodatkowo skonfiguruj swoje Google OAuth 2.0 credentials do logowania

### Google
1. Przejdź do Google Cloud Console
2. Utwórz nowy projekt lub wybierz istniejący
3. Przejdź do sekcji APIs & Services > Credentials
4. Utwórz nowe OAuth 2.0 Client IDs
5. Wprowadź dane wymagane dla aplikacji webowej i skopiuj Client ID oraz Client Secret do zmiennych GOGGLE_CLIENT_ID i GOOGLE_CLIENT_SECRET

### Resend
- Zarejestruj się na Resend i wygeneruj API Key, który wkleisz w RESEND_API_KEY

### Cloudinary
1. Zarejestruj się na Cloudinary
2. Utwórz konto i pobierz Cloud Name, API Key i API Secret
3. Utwórz Upload Preset w zakładce Settings > Upload i podaj nazwę w NEXT_PUBLIC_CLOUDINARY_PRESET_NAME
4. Uzupełnij odpowiednie zmienne NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, CLOUD_NAME, CLOUD_API_KEY, CLOUD_API_SECRET

### Pusher
1. Zarejestruj się na Pusher
2. Utwórz nową aplikację kanałową
3. Skopiuj App Key, App ID, Secret oraz Cluster do odpowiednich zmiennych (NEXT_PUBLIC_PUSHER_APP_KEY, PUSHER_APP_ID, PUSHER_SECRET, NEXT_PUBLIC_PUSHER_CLUSTER)

### Mapbox
1. Zarejestruj się na Mapbox
2. Przejdź do swojego konta i wygeneruj Access Token
3. Skopiuj token do zmiennej NEXT_PUBLIC_MAPBOX_TOKEN

### Stripe
1. Zarejestruj się na Stripe
2. Utwórz projekt i pobierz swoje klucze API:
   - Publishable key do NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
   - Secret key do STRIPE_SECRET_KEY
3. Skonfiguruj Stripe Webhook i pobierz sekretny klucz webhooka, który wstawisz do STRIPE_WEBHOOK_SECRET

## 5. Uruchomienie aplikacji

Po skonfigurowaniu pliku .env uruchom aplikację lokalnie:

```bash
npm run dev
```

Aplikacja powinna być dostępna pod adresem http://localhost:3000.