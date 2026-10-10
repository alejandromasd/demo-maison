import { useEffect, useState } from "react";
import PelucasPage from "./PelucasPage";
import MenuToggle from "./MenuToggle";

const heroImage =
  "https://images.unsplash.com/photo-1625503336205-fba8025fa0f1?auto=format&fit=crop&w=1400&q=88";

const products = [
  {
    name: "Éclat",
    type: "Peluca de cabello natural",
    price: "289 €",
    image:
      "https://images.unsplash.com/photo-1625503337559-d3e99da12715?auto=format&fit=crop&w=900&q=86",
    tone: "Rubio arena",
  },
  {
    name: "Sienna",
    type: "Lace front premium",
    price: "249 €",
    image:
      "https://images.unsplash.com/photo-1625503339883-6ddd78909177?auto=format&fit=crop&w=900&q=86",
    tone: "Castaño avellana",
  },
  {
    name: "Amélie",
    type: "Peluca de cabello natural",
    price: "319 €",
    image:
      "https://images.unsplash.com/photo-1663475986058-a4a06c5f9b8e?auto=format&fit=crop&w=900&q=86",
    tone: "Moreno intenso",
  },
];

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4 4" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5.5 8.5h13l-1 12h-11l-1-12Z" />
      <path d="M9 9V6a3 3 0 0 1 6 0v3" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5.5 20c.7-4 3-6 6.5-6s5.8 2 6.5 6" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h13M14 7l5 5-5 5" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.8 5.8c-2.5-2.6-6.4-1.2-8.8 1.6C9.6 4.6 5.7 3.2 3.2 5.8.8 8.3 2 12.9 12 20c10-7.1 11.2-11.7 8.8-14.2Z" />
    </svg>
  );
}

export default function App() {
  const [activeCategory, setActiveCategory] = useState("Inicio");
  const [menuOpen, setMenuOpen] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [page, setPage] = useState<"home" | "protesis">("home");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  if (page === "protesis") {
    return <PelucasPage onNavigate={navigateTo} />;
  }

  function navigateTo(item: string) {
    setActiveCategory(item);
    setMenuOpen(false);
    setPage(item === "Prótesis" ? "protesis" : "home");
  }

  const openCategory = (item: string) => navigateTo(item);

  const toggleFavorite = (index: number) => {
    setFavorites((current) =>
      current.includes(index)
        ? current.filter((item) => item !== index)
        : [...current, index],
    );
  };

  return (
    <main className="min-h-screen bg-[#f7f4ee] text-[#29231f]">
      <div className="bg-[#2d2926] px-5 py-2.5 text-center text-[10px] font-medium uppercase tracking-[0.24em] text-[#f6f0e6] sm:text-[11px]">
        Envío gratuito en pedidos superiores a 90 €
      </div>

      <header className="relative z-30 border-b border-black/10 bg-[#f7f4ee]">
        <div className="mx-auto flex h-[76px] max-w-[1380px] items-center justify-between px-5 sm:h-[88px] sm:px-8 lg:px-12">
          <MenuToggle expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)} />

          <a className="font-display text-[27px] leading-none tracking-[-0.04em] sm:text-[32px]" href="#">
            MAISON <span className="italic text-[#9a7452]">del cabello</span>
          </a>

          <nav className="hidden items-center gap-8 text-xs font-semibold uppercase tracking-[0.15em] lg:flex">
            <button onClick={() => navigateTo("Inicio")} className={`relative py-3 transition-colors hover:text-[#9a7452] ${activeCategory === "Inicio" ? "text-[#9a7452]" : ""}`}>Inicio{activeCategory === "Inicio" && <span className="absolute inset-x-0 bottom-0 h-px bg-[#9a7452]" />}</button>
            {["Prótesis", "Postizos", "Cuidado", "Accesorios"].map((item) => (
              <button
                key={item}
                onClick={() => openCategory(item)}
                className={`relative py-3 transition-colors hover:text-[#9a7452] ${
                  activeCategory === item ? "text-[#9a7452]" : ""
                }`}
              >
                {item}
                {activeCategory === item && (
                  <span className="absolute inset-x-0 bottom-0 h-px bg-[#9a7452]" />
                )}
              </button>
            ))}
            <a className="py-3" href="#asesoria">
              Asesoría
            </a>
          </nav>

          <div className="flex items-center gap-1 sm:gap-3">
            <button className="icon-button hidden sm:flex" aria-label="Buscar">
              <SearchIcon />
            </button>
            <button className="icon-button hidden sm:flex" aria-label="Mi cuenta">
              <UserIcon />
            </button>
            <button className="icon-button relative" aria-label="Cesta">
              <BagIcon />
              <span className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-[#9a7452] text-[8px] text-white">
                2
              </span>
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav className="absolute inset-x-0 top-full border-y border-black/10 bg-[#f7f4ee] px-6 py-5 shadow-xl lg:hidden">
            {["Inicio", "Prótesis", "Postizos", "Cuidado", "Accesorios", "Asesoría"].map(
              (item) => (
                <button
                  key={item}
                  className={`block w-full border-b border-black/10 py-3 text-left text-sm uppercase tracking-[0.18em] last:border-0 ${activeCategory === item ? "text-[#9a7452]" : ""}`}
                  aria-current={activeCategory === item ? "page" : undefined}
                  onClick={() => {
                    navigateTo(item)
                  }}
                >
                  {item}
                </button>
              ),
            )}
          </nav>
        )}
      </header>

      <section className="hero-grid mx-auto max-w-[1440px] bg-[#ebe4da]">
        <div className="order-2 flex items-center px-6 py-14 sm:px-12 sm:py-20 lg:order-1 lg:px-[7vw]">
          <div className="max-w-xl">
            <p className="mb-6 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#87684d] sm:text-xs">
              <span className="h-px w-8 bg-[#87684d]" />
              Belleza con identidad
            </p>
            <h1 className="font-display text-[54px] leading-[0.9] tracking-[-0.055em] sm:text-[76px] lg:text-[88px] xl:text-[102px]">
              Tu cabello,
              <br />
              <em className="font-normal text-[#967254]">tu historia.</em>
            </h1>
            <p className="mt-7 max-w-md text-[14px] leading-7 text-[#625952] sm:text-base">
              Pelucas de cabello natural creadas para sentirse tuyas. Acabados
              imperceptibles, movimiento real y asesoramiento experto.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-5">
              <a className="primary-button" href="#coleccion">
                Descubrir colección <ArrowIcon />
              </a>
              <a className="text-link" href="#asesoria">
                Reserva tu asesoría
              </a>
            </div>
            <div className="mt-12 flex gap-9 border-t border-black/15 pt-6 sm:mt-16">
              <div>
                <strong className="font-display text-2xl font-medium">100%</strong>
                <p className="mt-1 text-[9px] uppercase tracking-[0.18em] text-[#716861]">
                  Cabello natural
                </p>
              </div>
              <div>
                <strong className="font-display text-2xl font-medium">+15</strong>
                <p className="mt-1 text-[9px] uppercase tracking-[0.18em] text-[#716861]">
                  Años de experiencia
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative order-1 min-h-[510px] overflow-hidden sm:min-h-[650px] lg:order-2 lg:min-h-[760px]">
          <img
            src={heroImage}
            alt="Mujer con cabello largo y natural"
            className="absolute inset-0 h-full w-full object-cover object-[center_25%]"
          />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/30 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-white sm:bottom-9 sm:left-9 sm:right-9">
            <div>
              <p className="text-[9px] uppercase tracking-[0.24em]">Colección</p>
              <p className="font-display text-3xl italic">Essentielle 04</p>
            </div>
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/60 backdrop-blur-sm">
              <ArrowIcon />
            </span>
          </div>
        </div>
      </section>

      <section id="coleccion" className="mx-auto max-w-[1380px] px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="mb-10 flex flex-col justify-between gap-6 sm:mb-14 sm:flex-row sm:items-end">
          <div>
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.26em] text-[#9a7452]">
              Selección de la maison
            </p>
            <h2 className="font-display text-5xl tracking-[-0.04em] sm:text-6xl">
              Acabados naturales
            </h2>
          </div>
          <a className="text-link self-start sm:self-auto" href="#">
            Ver todas las pelucas
          </a>
        </div>

        <div className="product-grid">
          {products.map((product, index) => (
            <article key={product.name} className="group">
              <div className="relative aspect-[3/4] overflow-hidden bg-[#e8e0d5]">
                <img
                  src={product.image}
                  alt={`${product.name}, ${product.tone}`}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.025]"
                />
                {index === 0 && (
                  <span className="absolute left-4 top-4 bg-[#f7f4ee] px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.18em]">
                    Bestseller
                  </span>
                )}
                <button
                  onClick={() => toggleFavorite(index)}
                  className={`absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full backdrop-blur-md transition ${
                    favorites.includes(index)
                      ? "bg-[#3d3028] text-white"
                      : "bg-white/75 hover:bg-white"
                  }`}
                  aria-label="Añadir a favoritos"
                >
                  <HeartIcon />
                </button>
                <button className="quick-add">Añadir a la cesta</button>
              </div>
              <div className="flex items-start justify-between gap-4 pt-5">
                <div>
                  <p className="mb-1 text-[9px] uppercase tracking-[0.18em] text-[#8b8179]">
                    {product.type}
                  </p>
                  <h3 className="font-display text-3xl">{product.name}</h3>
                  <p className="mt-1 text-xs text-[#776f68]">{product.tone}</p>
                </div>
                <p className="pt-6 text-sm font-semibold">{product.price}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="asesoria" className="bg-[#332c27] px-5 py-20 text-[#f5efe7] sm:px-8 sm:py-24">
        <div className="mx-auto grid max-w-[1280px] items-center gap-10 lg:grid-cols-[1fr_0.72fr]">
          <div>
            <p className="mb-4 text-[10px] uppercase tracking-[0.25em] text-[#c4a889]">
              Tu elección, acompañada
            </p>
            <h2 className="font-display max-w-3xl text-5xl leading-[0.98] tracking-[-0.04em] sm:text-7xl">
              Encuentra la pieza que se siente como tú.
            </h2>
          </div>
          <div className="border-l border-white/20 pl-7 sm:pl-10">
            <p className="max-w-md text-sm leading-7 text-white/65">
              Nuestras especialistas te ayudan a elegir corte, tono y base.
              Online o en nuestro salón, siempre con total privacidad.
            </p>
            <a className="mt-7 inline-flex items-center gap-3 border-b border-[#c4a889] pb-2 text-xs uppercase tracking-[0.18em] text-[#e4d2be]" href="#">
              Hablar con una especialista <ArrowIcon />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
