import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-bg text-text">
      <section className="container flex flex-1 flex-col items-center justify-center py-16 text-center gap-8">
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight text-brand drop-shadow-md">
            Micro-Landlord OS Lite
          </h1>
          <p className="text-lg sm:text-xl text-muted max-w-xl mx-auto">
            Intelligens, gyors és mobil-barát lakáskiadói menedzsment az alapoktól. Exkluzív élmény, egyszerű használat, magyar piacra!
          </p>
        </div>
        <div className="flex flex-col gap-4 items-center">
          <a href="/regisztracio" className="px-8 py-3 rounded-full bg-brand text-brand-contrast shadow-lg ring-brand ring-2 ring-offset-2 ring-offset-bg font-semibold text-lg hover:bg-accent transition">Regisztráció</a>
          <span className="text-sm text-muted">🚀 Próbáld ki most, ingyenesen!</span>
        </div>
      </section>
    </div>
  );
}
