import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

const stats: StatItem[] = [
  {
    value: 850,
    suffix: "K+",
    label: "QR codes created with our platform",
  },
  {
    value: 102,
    suffix: "%",
    label: "Increase in social media account impressions",
  },
  {
    value: 68,
    suffix: "%",
    label: "Average increase for client retainers",
  },
];

function AnimatedCounter({
  value,
  suffix,
  inView,
}: {
  value: number;
  suffix: string;
  inView: boolean;
}) {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!inView || hasAnimated.current) return;
    hasAnimated.current = true;

    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const stepTime = duration / steps;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export default function StatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.4 });

  return (
    <section
      ref={sectionRef}
      className="w-full bg-gradient-to-br from-primary-light via-white to-primary-light/60 py-20 md:py-28"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy">
            Data doesn't lie
          </h2>
          <p className="mt-4 text-gray-500 text-lg max-w-2xl mx-auto">
            Want to know if our platform is effective? We'll let the numbers do
            the talking.
          </p>
        </motion.div>

        {/* Stats row */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-10">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="text-center"
            >
              <div className="text-5xl md:text-6xl font-black text-primary">
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  inView={isInView}
                />
              </div>
              <p className="mt-3 text-gray-500 text-base max-w-xs mx-auto">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
