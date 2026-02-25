const brands = [
  'YouTube', 'Slack', 'JPMorgan Chase', 'Walt Disney', 'Squarespace',
  'Netflix', 'Amazon', 'PayPal', 'FedEx', 'Marriott',
  'Nestlé', "L'Oréal", 'IKEA', 'Mastercard', 'Lenovo', 'Spotify', 'Microsoft',
]

export default function TrustBar() {
  const duplicated = [...brands, ...brands, ...brands]

  return (
    <section className="py-8 overflow-hidden border-y border-gray-100 bg-white">
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10" />
        <div className="flex animate-marquee whitespace-nowrap">
          {duplicated.map((brand, i) => (
            <span
              key={`${brand}-${i}`}
              className="mx-8 text-gray-300 font-bold text-lg md:text-xl tracking-tight flex-shrink-0"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
