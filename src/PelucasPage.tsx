import { useMemo, useState } from "react";
import MenuToggle from "./MenuToggle";

type Product = { name: string; category: string; detail: string; price: string; previousPrice?: string; image: string; badge: string; rating: string; colors: string[] };

const products: Product[] = [
  { name: "Luna Top Lace", category: "Prótesis capilar", detail: "Cabello natural · Monofilamento", price: "389 €", image: "https://images.unsplash.com/photo-1583331030595-6601e6c7b5d5?auto=format&fit=crop&w=900&q=86", badge: "Más vendido", rating: "4.9", colors: ["#2c201b", "#6d4936", "#b58c68"] },
  { name: "Aura Lace Front", category: "Peluca médica", detail: "Fibra premium · Lace frontal", price: "329 €", image: "https://images.unsplash.com/photo-1625503337559-d3e99da12715?auto=format&fit=crop&w=900&q=86", badge: "Nuevo", rating: "4.8", colors: ["#211713", "#5d3c2c", "#a87957", "#d2b091"] },
  { name: "Natura Volume 20", category: "Sistema capilar", detail: "Cabello Remy · Base de tul", price: "449 €", image: "https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?auto=format&fit=crop&w=900&q=86", badge: "", rating: "4.9", colors: ["#30231d", "#76513e", "#c69a72"] },
  { name: "Clara Bob 14", category: "Peluca natural", detail: "Cabello humano · Lace front", price: "359 €", previousPrice: "399 €", image: "https://images.unsplash.com/photo-1590610831759-0fca59c21a23?auto=format&fit=crop&w=900&q=86", badge: "-10%", rating: "4.7", colors: ["#211914", "#684736", "#b38a6d"] },
  { name: "Essential Topper 12", category: "Topper", detail: "Cabello natural · Clip invisible", price: "279 €", image: "https://images.unsplash.com/photo-1562092139-cac69580cd74?auto=format&fit=crop&w=900&q=86", badge: "", rating: "4.8", colors: ["#2f211a", "#745442", "#c5a080"] },
  { name: "Siena Soft Wave", category: "Peluca premium", detail: "Fibra térmica · Ondulada", price: "249 €", image: "https://images.unsplash.com/photo-1617391654484-2894196c2cc9?auto=format&fit=crop&w=900&q=86", badge: "Exclusivo online", rating: "4.6", colors: ["#231713", "#654231", "#aa7956"] },
  { name: "Silk Repair Serum", category: "Cuidado", detail: "Sérum reparador · 100 ml", price: "34 €", image: "https://images.unsplash.com/photo-1613754773306-532ec48b0de5?auto=format&fit=crop&w=900&q=86", badge: "", rating: "4.9", colors: [] },
  { name: "Invisible Hold", category: "Adhesión", detail: "Adhesivo capilar · 50 ml", price: "28 €", image: "https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=900&q=86", badge: "", rating: "4.7", colors: [] },
];

function Icon({ type }: { type: "search" | "bag" | "user" | "heart" | "chevron" | "sliders" }) {
  const paths = {
    search: <><circle cx="11" cy="11" r="6.5" /><path d="m16 16 4 4" /></>,
    bag: <><path d="M5.5 8.5h13l-1 12h-11l-1-12Z" /><path d="M9 9V6a3 3 0 0 1 6 0v3" /></>,
    user: <><circle cx="12" cy="8" r="3.5" /><path d="M5.5 20c.7-4 3-6 6.5-6s5.8 2 6.5 6" /></>,
    heart: <path d="M20.8 5.8c-2.5-2.6-6.4-1.2-8.8 1.6C9.6 4.6 5.7 3.2 3.2 5.8.8 8.3 2 12.9 12 20c10-7.1 11.2-11.7 8.8-14.2Z" />,
    chevron: <path d="m8 10 4 4 4-4" />,
    sliders: <><path d="M4 7h10M18 7h2M4 17h2M10 17h10" /><circle cx="16" cy="7" r="2" /><circle cx="8" cy="17" r="2" /></>,
  };
  return <svg viewBox="0 0 24 24" aria-hidden="true">{paths[type]}</svg>;
}

type Props = { onNavigate: (item: string) => void };

export default function PelucasPage({ onNavigate }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([1]);
  const [visibleCount, setVisibleCount] = useState(6);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("Recomendados");
  const [openFilter, setOpenFilter] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLocaleLowerCase("es");
    let result = products.filter((product) =>
      (!query || `${product.name} ${product.category} ${product.detail}`.toLocaleLowerCase("es").includes(query)) &&
      (!selectedTypes.length || selectedTypes.includes(product.category)),
    );
    if (sort === "Precio: menor a mayor") result = [...result].sort((a, b) => Number(a.price.replace(/\D/g, "")) - Number(b.price.replace(/\D/g, "")));
    if (sort === "Precio: mayor a menor") result = [...result].sort((a, b) => Number(b.price.replace(/\D/g, "")) - Number(a.price.replace(/\D/g, "")));
    return result;
  }, [search, selectedTypes, sort]);

  const toggleType = (type: string) => setSelectedTypes((current) => current.includes(type) ? current.filter((item) => item !== type) : [...current, type]);
  const toggleFavorite = (index: number) => setFavorites((current) => current.includes(index) ? current.filter((item) => item !== index) : [...current, index]);

  return (
    <main className="catalog-page min-h-screen bg-[#faf9f6] text-[#28231f]">
      <div className="bg-[#2d2926] px-5 py-2.5 text-center text-[10px] font-medium uppercase tracking-[0.24em] text-[#f6f0e6] sm:text-[11px]">Envío gratuito en pedidos superiores a 90 €</div>
      <header className="relative z-30 border-b border-black/10 bg-[#f7f4ee]">
        <div className="mx-auto flex h-[76px] max-w-[1380px] items-center justify-between px-5 sm:h-[88px] sm:px-8 lg:px-12">
          <MenuToggle expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)} />
          <button onClick={() => onNavigate("Inicio")} className="font-display whitespace-nowrap text-[27px] leading-none tracking-[-0.04em] sm:text-[32px]">MAISON <span className="italic text-[#9a7452]">del cabello</span></button>
          <nav className="hidden items-center gap-8 text-xs font-semibold uppercase tracking-[0.15em] lg:flex">
            {["Inicio", "Prótesis", "Postizos", "Cuidado", "Accesorios"].map((item) => <button key={item} onClick={() => onNavigate(item)} className={`relative py-3 transition-colors hover:text-[#9a7452] ${item === "Prótesis" ? "text-[#9a7452]" : ""}`}>{item}{item === "Prótesis" && <span className="absolute inset-x-0 bottom-0 h-px bg-[#9a7452]" />}</button>)}<a className="py-3" href="#asesoria">Asesoría</a>
          </nav>
          <div className="flex items-center gap-1 sm:gap-3"><button className="icon-button hidden sm:flex" aria-label="Buscar"><Icon type="search" /></button><button className="icon-button hidden sm:flex" aria-label="Mi cuenta"><Icon type="user" /></button><button className="icon-button relative" aria-label="Cesta"><Icon type="bag" /><span className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-[#9a7452] text-[8px] text-white">2</span></button></div>
        </div>
        {menuOpen && <nav className="absolute inset-x-0 top-full border-y border-black/10 bg-[#f7f4ee] px-6 py-5 shadow-xl lg:hidden">{["Inicio", "Prótesis", "Postizos", "Cuidado", "Accesorios", "Asesoría"].map((item) => <button key={item} aria-current={item === "Prótesis" ? "page" : undefined} className={`block w-full border-b border-black/10 py-3 text-left text-sm uppercase tracking-[0.18em] last:border-0 ${item === "Prótesis" ? "text-[#9a7452]" : ""}`} onClick={() => { onNavigate(item); setMenuOpen(false); }}>{item}</button>)}</nav>}
      </header>

      <section className="catalog-intro mx-auto max-w-[1440px] px-5 pb-8 pt-9 sm:px-8 sm:pb-10 sm:pt-12 lg:px-12">
        <div className="mb-5 text-[9px] font-medium uppercase tracking-[0.18em] text-[#82776e]"><button onClick={() => onNavigate("Inicio")} className="hover:text-[#9a7452]">Inicio</button><span className="px-2">/</span><span>Prótesis</span></div>
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div><p className="mb-2 text-[9px] font-semibold uppercase tracking-[0.25em] text-[#9a7452]">La colección</p><h1 className="font-display text-5xl tracking-[-0.045em] sm:text-6xl">Prótesis & sistemas capilares</h1><p className="mt-3 max-w-xl text-sm leading-6 text-[#70675f]">Encuentra tu estilo, con la naturalidad y el cuidado que mereces.</p></div>
          <label className="search-box flex w-full md:max-w-[310px]"><Icon type="search" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar productos" aria-label="Buscar productos" /></label>
        </div>
        <div className="mt-7 flex flex-wrap gap-2">{["Todo", "Prótesis", "Sistemas capilares", "Toppers", "Cuidado"].map((item, index) => <button key={item} className={`category-pill ${index === 0 && !selectedTypes.length ? "is-selected" : ""}`} onClick={() => { setSelectedTypes(index === 0 ? [] : item === "Prótesis" ? ["Prótesis capilar", "Peluca médica", "Peluca natural", "Peluca premium"] : item === "Sistemas capilares" ? ["Sistema capilar"] : item === "Toppers" ? ["Topper"] : ["Cuidado"]); setVisibleCount(6); }}>{item}</button>)}</div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 pb-20 sm:px-8 lg:px-12">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-y border-black/10 py-3"><p className="text-[10px] text-[#70675f]">Mostrando <strong className="text-[#28231f]">{filteredProducts.length}</strong> productos</p><div className="flex items-center gap-2"><button className="toolbar-button lg:hidden" onClick={() => setOpenFilter(openFilter ? "" : "Tipo de producto")}><Icon type="sliders" /> Filtros</button><label className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-wider">Ordenar por <select className="bg-transparent text-[10px] normal-case tracking-normal outline-none" value={sort} onChange={(event) => setSort(event.target.value)}><option>Recomendados</option><option>Precio: menor a mayor</option><option>Precio: mayor a menor</option></select></label></div></div>
        {openFilter && <div className="mobile-filter-panel mb-5 lg:hidden"><p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.18em]">Tipo de producto</p><div className="flex flex-wrap gap-x-5 gap-y-3">{["Prótesis capilar", "Peluca médica", "Sistema capilar", "Peluca natural", "Topper", "Peluca premium"].map((type) => <label key={type} className="filter-option"><input type="checkbox" checked={selectedTypes.includes(type)} onChange={() => toggleType(type)} />{type}</label>)}</div><button className="mt-4 text-[9px] uppercase tracking-wider underline" onClick={() => setSelectedTypes([])}>Limpiar filtros</button></div>}
        <div className="catalog-layout">
          <aside className="catalog-filters hidden lg:block"><p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.18em]">Filtrar por</p><div className="filter-group"><button onClick={() => setOpenFilter(openFilter === "Tipo de producto" ? "" : "Tipo de producto")}>Tipo de producto<Icon type="chevron" /></button>{openFilter === "Tipo de producto" && ["Prótesis capilar", "Peluca médica", "Sistema capilar", "Peluca natural", "Topper", "Peluca premium"].map((type) => <label key={type} className="filter-option mb-3"><input type="checkbox" checked={selectedTypes.includes(type)} onChange={() => toggleType(type)} />{type}</label>)}</div><div className="filter-group"><button onClick={() => setOpenFilter(openFilter === "Color" ? "" : "Color")}>Color<Icon type="chevron" /></button>{openFilter === "Color" && <div className="flex gap-2 pb-4">{["#2c201b", "#6d4936", "#b58c68", "#d2b091"].map((color) => <button key={color} aria-label={`Color ${color}`} className="h-6 w-6 rounded-full border border-black/15" style={{ backgroundColor: color }} />)}</div>}</div><div className="filter-group"><button onClick={() => setOpenFilter(openFilter === "Precio" ? "" : "Precio")}>Precio<Icon type="chevron" /></button>{openFilter === "Precio" && <div className="pb-4 text-[11px] text-[#68615b]">Rango de precios<br /><input className="mt-3 w-full accent-[#2e2925]" type="range" min="20" max="500" /></div>}</div><button className="mt-4 text-[9px] uppercase tracking-wider underline" onClick={() => setSelectedTypes([])}>Limpiar filtros</button></aside>
          <div><div className="products-grid">{filteredProducts.slice(0, visibleCount).map((product) => { const originalIndex = products.indexOf(product); return <article key={product.name} className="product-card"><div className="product-image"><img src={product.image} alt={`${product.name}, ${product.category}`} loading="lazy" />{product.badge && <span className="product-badge">{product.badge}</span>}<button className={`favorite-button ${favorites.includes(originalIndex) ? "is-active" : ""}`} onClick={() => toggleFavorite(originalIndex)} aria-label="Añadir a favoritos"><Icon type="heart" /></button><button className="quick-add">Añadir a la cesta</button></div><div className="flex items-start justify-between gap-2 pt-3"><div className="min-w-0"><p className="mb-1 text-[8px] uppercase tracking-[0.12em] text-[#8b8179]">{product.category}</p><h2 className="font-display text-[23px] leading-tight">{product.name}</h2><p className="mt-1 text-[10px] text-[#776f68]">{product.detail}</p><div className="mt-2 flex items-center gap-2"><span className="text-[10px] tracking-widest text-[#9a7452]">★★★★★</span><span className="text-[9px] text-[#776f68]">{product.rating}</span></div>{product.colors.length > 0 && <div className="mt-3 flex gap-1.5">{product.colors.map((color) => <span key={color} className="h-3.5 w-3.5 rounded-full border border-black/15" style={{ backgroundColor: color }} />)}</div>}</div><div className="shrink-0 pt-5 text-right text-xs font-semibold">{product.price}{product.previousPrice && <span className="mt-1 block text-[9px] font-normal text-[#8b8179] line-through">{product.previousPrice}</span>}</div></div></article>; })}</div>{filteredProducts.length === 0 && <p className="py-16 text-center text-sm text-[#70675f]">No encontramos productos con esos filtros.</p>}{visibleCount < filteredProducts.length && <div className="mt-12 text-center"><button className="load-more" onClick={() => setVisibleCount((count) => count + 2)}>Cargar más productos</button></div>}</div>
        </div>
      </section>
    </main>
  );
}
