import Link from "next/link";

export function UnauthorizedCard() {
  return (
    <div className="mx-auto mt-20 max-w-md rounded-xl border p-8 text-center">
      <h2 className="text-xl font-semibold">Ruxsat yo'q</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Bu sahifani ko'rish uchun tizimga kirishingiz kerak.
      </p>
      <Link
        href="/login"
        className="mt-6 inline-block rounded-md bg-primary px-4 py-2 text-primary-foreground"
      >
        Kirish
      </Link>
    </div>
  );
}
