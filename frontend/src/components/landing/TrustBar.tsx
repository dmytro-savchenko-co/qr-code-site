interface BrandStyle {
  name: string;
  className: string;
}

const brands: BrandStyle[] = [
  {
    name: "YouTube",
    className: "font-bold tracking-tight text-gray-500",
  },
  {
    name: "Slack",
    className: "font-bold tracking-tight text-gray-400",
  },
  {
    name: "JPMorgan Chase",
    className: "font-serif font-medium italic text-gray-500",
  },
  {
    name: "Walt Disney",
    className: "font-serif font-medium tracking-wide text-gray-400",
  },
  {
    name: "Squarespace",
    className: "font-bold uppercase tracking-widest text-gray-500 text-sm md:text-base",
  },
  {
    name: "Netflix",
    className: "font-extrabold uppercase tracking-wider text-gray-500",
  },
  {
    name: "Amazon",
    className: "font-extrabold tracking-tight text-gray-500",
  },
  {
    name: "PayPal",
    className: "font-bold italic text-gray-400",
  },
  {
    name: "FedEx",
    className: "font-extrabold tracking-tight text-gray-500",
  },
  {
    name: "Marriott",
    className: "font-serif font-medium tracking-[0.2em] uppercase text-gray-400 text-sm md:text-base",
  },
  {
    name: "Nestlé",
    className: "font-serif font-medium italic text-gray-500",
  },
  {
    name: "L'Oréal",
    className: "font-serif font-bold uppercase tracking-wider text-gray-500 text-sm md:text-base",
  },
  {
    name: "IKEA",
    className: "font-black tracking-wider text-gray-500",
  },
  {
    name: "Mastercard",
    className: "font-medium tracking-wide text-gray-400",
  },
  {
    name: "Lenovo",
    className: "font-bold tracking-tight text-gray-500",
  },
  {
    name: "Spotify",
    className: "font-bold tracking-tighter text-gray-500",
  },
  {
    name: "Microsoft",
    className: "font-semibold tracking-normal text-gray-400",
  },
];

export default function TrustBar() {
  const duplicated = [...brands, ...brands, ...brands];

  return (
    <section className="py-10 overflow-hidden border-y border-gray-200/60 bg-white">
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />
        <div className="flex animate-marquee whitespace-nowrap">
          {duplicated.map((brand, i) => (
            <span
              key={`${brand.name}-${i}`}
              className={`mx-10 text-lg md:text-xl flex-shrink-0 select-none ${brand.className}`}
            >
              {brand.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
