import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { QrCode, CheckCircle2, MousePointer2 } from "lucide-react";

function FloatingCard({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
          delay,
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

function StylizedQRCode() {
  // A more realistic QR-like pattern with proper finder patterns (3 corner squares)
  // 0 = white, 1 = black, 2 = finder pattern outer, 3 = finder pattern inner
  const size = 21;

  // Build a 21x21 grid
  const grid: number[][] = Array.from({ length: size }, () =>
    Array(size).fill(0)
  );

  // Finder patterns (7x7 with 5x5 border, 3x3 inner, 1x1 center)
  const drawFinder = (startR: number, startC: number) => {
    for (let r = 0; r < 7; r++) {
      for (let c = 0; c < 7; c++) {
        if (
          r === 0 || r === 6 || c === 0 || c === 6 || // outer border
          (r >= 2 && r <= 4 && c >= 2 && c <= 4) // inner 3x3
        ) {
          grid[startR + r][startC + c] = 1;
        }
      }
    }
  };

  // Top-left finder
  drawFinder(0, 0);
  // Top-right finder
  drawFinder(0, 14);
  // Bottom-left finder
  drawFinder(14, 0);

  // Timing patterns (row 6 and col 6)
  for (let i = 7; i < 14; i++) {
    if (i % 2 === 0) {
      grid[6][i] = 1;
      grid[i][6] = 1;
    }
  }

  // Scattered data modules for realism
  const dataPixels = [
    [1, 8], [2, 9], [3, 8], [4, 10], [5, 9],
    [8, 1], [9, 2], [8, 3], [10, 4], [9, 5],
    [8, 8], [8, 10], [8, 12], [9, 9], [9, 11],
    [10, 8], [10, 10], [10, 12], [11, 9], [11, 11],
    [12, 8], [12, 10], [12, 12], [13, 9], [13, 11],
    [8, 14], [8, 16], [8, 18], [8, 19], [8, 20],
    [9, 15], [9, 17], [9, 19],
    [10, 14], [10, 16], [10, 18], [10, 20],
    [11, 15], [11, 17], [11, 19],
    [12, 14], [12, 16], [12, 18], [12, 20],
    [14, 8], [14, 10], [14, 12],
    [15, 9], [15, 11], [15, 13],
    [16, 8], [16, 10], [16, 12],
    [17, 9], [17, 11],
    [18, 8], [18, 10], [18, 12],
    [19, 9], [19, 11], [19, 13],
    [20, 8], [20, 10], [20, 12],
    [1, 12], [2, 11], [3, 12], [4, 11], [5, 12],
    [12, 1], [11, 2], [12, 3], [11, 4], [12, 5],
  ];

  dataPixels.forEach(([r, c]) => {
    if (r < size && c < size && grid[r][c] === 0) {
      grid[r][c] = 1;
    }
  });

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="relative"
    >
      <div className="w-64 h-64 md:w-80 md:h-80 bg-white rounded-3xl shadow-2xl p-5 md:p-6 border border-gray-100">
        <div className="grid grid-cols-[repeat(21,1fr)] gap-[1.5px] w-full h-full relative">
          {grid.flat().map((cell, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.4 + i * 0.002 }}
              className={`rounded-[1px] ${
                cell === 1 ? "bg-black" : "bg-transparent"
              }`}
            />
          ))}

          {/* White circle with LOGO text in center */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white flex items-center justify-center shadow-sm border border-gray-200">
              <span className="text-[10px] md:text-xs font-bold text-gray-400 tracking-wider">
                LOGO
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Blue sparkle decorative icons near top-left */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1.0 }}
        className="absolute -top-3 -left-3 md:-top-4 md:-left-4"
      >
        <span className="text-primary text-xl md:text-2xl">✦</span>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1.15 }}
        className="absolute top-4 -left-6 md:top-5 md:-left-8"
      >
        <span className="text-primary/60 text-sm md:text-base">✦</span>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1.3 }}
        className="absolute -top-6 left-5 md:-top-8 md:left-6"
      >
        <span className="text-primary/40 text-xs md:text-sm">✦</span>
      </motion.div>

      {/* Large blue cursor arrow at bottom-left */}
      <motion.div
        initial={{ opacity: 0, x: -20, y: 20 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="absolute -bottom-4 -left-6 md:-bottom-5 md:-left-8"
      >
        <div className="bg-primary rounded-xl p-2.5 shadow-lg shadow-primary/30">
          <MousePointer2 className="w-5 h-5 md:w-6 md:h-6 text-white" />
        </div>
      </motion.div>

      {/* Small translucent social QR previews at bottom */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 0.5, y: 0 }}
        transition={{ duration: 0.5, delay: 1.4 }}
        className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-2"
      >
        {[0, 1, 2].map((idx) => (
          <div
            key={idx}
            className="w-8 h-8 md:w-9 md:h-9 bg-gray-100 rounded-lg border border-gray-200/60 flex items-center justify-center"
          >
            <QrCode className="w-4 h-4 md:w-5 md:h-5 text-gray-300" />
          </div>
        ))}
      </motion.div>

      {/* Blue progress bar line on the right side */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.8, delay: 1.3 }}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-[calc(100%+12px)] origin-left"
      >
        <div className="w-16 md:w-20 h-1.5 bg-primary/20 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "65%" }}
            transition={{ duration: 1.2, delay: 1.6, ease: "easeOut" }}
            className="h-full bg-primary rounded-full"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

const bulletPoints = [
  "Create dynamic, editable QR codes",
  "Tracking & analytics for your QR code",
  "Custom QR codes with logos, colors & more",
];

export default function HeroSection() {
  return (
    <section className="w-full bg-gradient-to-b from-[#f8fbff] to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-28">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left side - Text content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="flex-1 text-center lg:text-left"
          >
            <h1 className="text-navy text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight">
              The Most Convenient QR Code Generator
            </h1>

            <p className="mt-6 text-gray-500 text-lg md:text-xl max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Our customizable platform allows you to manage your QR codes in
              one centralized location.
            </p>

            <div className="mt-8">
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-3 bg-primary hover:bg-primary-dark text-white font-semibold text-lg rounded-full px-8 py-4 shadow-lg shadow-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/40 hover:scale-[1.02] active:scale-[0.98]"
              >
                <QrCode className="w-5 h-5" />
                Generate QR Code
              </Link>
            </div>

            <ul className="mt-10 space-y-4 text-left max-w-md mx-auto lg:mx-0">
              {bulletPoints.map((text, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.15 }}
                  className="flex items-center gap-3"
                >
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                  </span>
                  <span className="text-gray-600 text-base">{text}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Right side - QR Code illustration with floating decorators */}
          <div className="flex-1 flex items-center justify-center relative min-h-[400px] md:min-h-[480px]">
            {/* Background decorative circle */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.1 }}
              className="absolute w-80 h-80 md:w-[420px] md:h-[420px] rounded-full bg-primary/[0.03]"
            />

            {/* Main QR Code */}
            <StylizedQRCode />

            {/* Floating card: Typography "Aa" + Color swatches (combined card) */}
            <FloatingCard
              className="absolute -top-4 -right-4 md:top-0 md:-right-12"
              delay={0.5}
            >
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 px-4 py-3 flex items-center gap-3">
                <span className="font-black text-navy text-lg">Aa</span>
                <div className="w-px h-6 bg-gray-200" />
                <div className="flex gap-1.5">
                  <span className="w-5 h-5 rounded bg-primary" />
                  <span className="w-5 h-5 rounded bg-primary/30" />
                </div>
              </div>
            </FloatingCard>

            {/* Floating card: Scan counter "134" with wave chart */}
            <FloatingCard
              className="absolute -bottom-6 -right-4 md:-bottom-4 md:-right-12"
              delay={0.9}
            >
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-gray-400 leading-none font-medium">
                      Scans
                    </span>
                    <span className="font-black text-navy text-xl leading-tight">
                      134
                    </span>
                  </div>
                </div>
                {/* Mini wave chart */}
                <div className="mt-1.5 flex items-end gap-[2px] h-4">
                  {[40, 65, 45, 80, 55, 70, 90, 60, 75, 85, 50, 95].map(
                    (h, i) => (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{ duration: 0.4, delay: 1.2 + i * 0.05 }}
                        className="w-1 bg-primary/40 rounded-full"
                      />
                    )
                  )}
                </div>
              </div>
            </FloatingCard>
          </div>
        </div>
      </div>
    </section>
  );
}
