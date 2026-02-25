import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQTab {
  label: string;
  items: FAQItem[];
}

const faqTabs: FAQTab[] = [
  {
    label: "Basic Concepts",
    items: [
      {
        question: "What is a QR code generator?",
        answer:
          "A QR code generator is an online tool that allows you to create custom QR codes. These codes can store various types of information such as URLs, contact details, WiFi credentials, and more.",
      },
      {
        question: "Can I download my custom QR codes?",
        answer:
          "Yes! You can download your QR codes in multiple formats including PNG, JPG, SVG, and EPS.",
      },
      {
        question: "Do I need to be skilled with technology?",
        answer:
          "Not at all! Our platform is designed to be user-friendly and intuitive. Anyone can create professional QR codes in minutes.",
      },
      {
        question: "What is a dynamic QR code?",
        answer:
          "A dynamic QR code can be edited after creation. Unlike static QR codes, you can change the destination URL or content without reprinting the code.",
      },
      {
        question: "How many QR codes can I create?",
        answer:
          "The number of QR codes you can create depends on your subscription plan. Our platform offers various plans to suit different needs.",
      },
    ],
  },
  {
    label: "Designing and Creating",
    items: [
      {
        question: "Can I create custom designs for my QR codes?",
        answer:
          "Absolutely! You can customize colors, add logos, choose different dot styles, and add frames to make your QR codes match your brand.",
      },
      {
        question: "Can I include my business logo in a QR code?",
        answer:
          "Yes, our platform allows you to upload and embed your company logo directly into your QR code design.",
      },
      {
        question: "How do I edit my QR codes?",
        answer:
          "Simply log into your dashboard, find the QR code you want to edit, and make your changes. Updates take effect immediately.",
      },
    ],
  },
  {
    label: "Scanning and Printing",
    items: [
      {
        question: "How can I scan a QR code?",
        answer:
          "Most modern smartphones can scan QR codes using their built-in camera app. Simply point your camera at the QR code and follow the prompt.",
      },
      {
        question: "Can I print my QR code?",
        answer:
          "Yes! Our QR codes are high-resolution and designed for both digital and print use. Download in SVG or high-res PNG for best print quality.",
      },
      {
        question: "What data do dynamic QR codes track?",
        answer:
          "Dynamic QR codes can track scan counts, scan locations, devices used, time of scans, and more.",
      },
    ],
  },
];

function AccordionItem({ item }: { item: FAQItem }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center justify-between w-full py-5 text-left gap-4 cursor-pointer"
      >
        <span className="text-navy font-semibold text-base">
          {item.question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="flex-shrink-0"
        >
          <ChevronDown className="w-5 h-5 text-gray-400" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-gray-500 leading-relaxed text-sm">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQSection() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="w-full bg-white py-20 md:py-28">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy text-center"
        >
          Frequently Asked Questions
        </motion.h2>

        {/* Tab buttons */}
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {faqTabs.map((tab, i) => (
            <button
              key={tab.label}
              onClick={() => setActiveTab(i)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer ${
                activeTab === i
                  ? "bg-primary text-white shadow-md shadow-primary/25"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Accordion */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-8 bg-gray-50 rounded-2xl px-6 md:px-8"
        >
          {faqTabs[activeTab].items.map((item) => (
            <AccordionItem key={item.question} item={item} />
          ))}
        </motion.div>

        {/* Bottom link */}
        <div className="mt-10 text-center">
          <Link
            to="/faq"
            className="inline-flex items-center gap-1.5 text-primary font-semibold hover:text-primary-dark transition-colors"
          >
            Learn More
            <ArrowRight className="w-4 h-4" />
          </Link>
          <p className="mt-1 text-gray-400 text-sm">
            Frequently Asked Questions
          </p>
        </div>
      </div>
    </section>
  );
}
