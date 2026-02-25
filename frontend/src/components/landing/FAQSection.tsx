import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, Info } from "lucide-react";

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
      {
        question: "Why shouldn't I use a free QR code generator?",
        answer:
          "Free QR code generators often lack essential features like analytics, dynamic editing, custom branding, and reliable uptime. They may also inject ads or expire your codes unexpectedly.",
      },
      {
        question: "Can I download and use the QR codes from my trial period?",
        answer:
          "Yes, any QR codes you create during your trial period are fully functional and can be downloaded and used right away.",
      },
      {
        question: "What information can I store in a QR code?",
        answer:
          "QR codes can store URLs, text, contact cards (vCards), WiFi credentials, email addresses, phone numbers, SMS messages, calendar events, and more.",
      },
      {
        question: "When can I download my QR code?",
        answer:
          "You can download your QR code immediately after creating it. Simply customize your design and click the download button to save it in your preferred format.",
      },
      {
        question: "Can I manage my QR codes using your platform?",
        answer:
          "Absolutely! Our dashboard lets you manage all your QR codes in one place. You can edit, track analytics, organize by folders, and update destinations at any time.",
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
    <div className="bg-white border border-gray-200 rounded-xl">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center justify-between w-full px-6 py-5 text-left gap-4 cursor-pointer"
      >
        <span className="text-navy font-semibold text-base">
          {item.question}
        </span>
        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
          {isOpen ? (
            <Minus className="w-4 h-4 text-navy" />
          ) : (
            <Plus className="w-4 h-4 text-navy" />
          )}
        </span>
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
            <p className="px-6 pb-5 text-gray-500 leading-relaxed text-sm">
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
        {/* Heading row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="flex items-start justify-between gap-4"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-navy">
            Frequently Asked Questions
          </h2>
          <Link
            to="/faq"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-300 rounded-full text-primary font-semibold text-sm hover:border-primary transition-colors"
          >
            <Info className="w-4 h-4" />
            Learn More
          </Link>
        </motion.div>

        {/* Tab buttons */}
        <div className="mt-10 flex flex-wrap gap-6 border-b border-gray-200">
          {faqTabs.map((tab, i) => (
            <button
              key={tab.label}
              onClick={() => setActiveTab(i)}
              className={`pb-3 text-sm font-semibold transition-all duration-200 cursor-pointer border-b-2 ${
                activeTab === i
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* FAQ items as individual cards */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-6 flex flex-col gap-3"
        >
          {faqTabs[activeTab].items.map((item) => (
            <AccordionItem key={item.question} item={item} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
