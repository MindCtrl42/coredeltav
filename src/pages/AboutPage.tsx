import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import heroImage from '@/assets/coredeltav.png';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

/* ─── Data ────────────────────────────────────────────────────── */

const DELIVERABLES = [
  'CINEMATOGRAPHY',
  'PHOTOGRAPHY',
  'CREATIVE DIRECTION',
  'VIDEO EDITING',
  'PRODUCT DESIGN',
];

const FAQ_ITEMS = [
  {
    id: 'what-is-coredeltav',
    question: 'What is coredeltav™?',
    answer:
      'coredeltav™ is an independent creative practice focused on photography, cinematography, design, storytelling, and making interesting things.',
  },
  {
    id: 'what-does-coredeltav-do',
    question: 'What does coredeltav™ do?',
    answer:
      'coredeltav™ works across photography, cinematography, creative direction, digital art, product design, and visual storytelling. The work changes depending on the idea.',
  },
  {
    id: 'who-makes-products',
    question: 'Who makes the products?',
    answer:
      'Designed by coredeltav™ and crafted by coredeltav™. Each product is developed, designed, and made personally by the creator behind the studio.',
  },
  {
    id: 'who-is-behind-coredeltav',
    question: 'Who is behind coredeltav™?',
    answer:
      'coredeltav™ is an independent creative practice led by Sabin Bhandari. One person behind the lens, behind the designs, and dedicated to deliberate craftsmanship, visual storytelling, and small details.',
  },
  {
    id: 'where-is-coredeltav',
    question: 'Where is coredeltav™ based?',
    answer:
      'coredeltav™ is based in Kathmandu, Nepal, creating work inspired by Nepal and beyond.',
  },
  {
    id: 'serious-question',
    question: 'Is coredeltav™ run by a whole team?',
    answer:
      'No. Just one person, several hard drives, and a slightly concerning amount of unfinished ideas.',
  },
];

/* ─── Reveal wrapper ──────────────────────────────────────────── */

function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Page ────────────────────────────────────────────────────── */

export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const imageOpacity = useTransform(scrollYProgress, [0.6, 1], [1, 0]);

  return (
    <Layout className="bg-black" showHero>
      <SEO
        title="Creative Director & Visual Storyteller | Kathmandu, Nepal"
        description="coredeltav™ is an independent creative studio and product practice in Kathmandu, Nepal led by Creative Director Sabin Bhandari. Specializing in cinematography, photography, creative direction, commercial video editing, and custom physical products."
        canonicalUrl="https://coredeltav.com/"
      />

      {/* ═══════════════ HERO ═══════════════ */}
      <section
        ref={heroRef}
        className="relative w-full h-screen overflow-hidden bg-black flex items-center justify-center"
      >
        {/* Background image — centered, inverted to work on black bg */}
        <motion.div
          style={{ scale: imageScale, opacity: imageOpacity }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <img
            src={heroImage}
            alt="coredeltav™"
            className="w-full h-full object-contain mix-blend-difference invert"
          />
        </motion.div>

        {/* Text overlay */}
        <div className="relative z-10 w-full h-full flex flex-col justify-center px-6 sm:px-10 md:px-16 lg:px-24">
          {/* Center — Brand name */}
          <div className="flex items-center justify-center">
            <h1 className="text-[12vw] sm:text-[10vw] md:text-[9vw] lg:text-[8vw] font-bold leading-[0.9] tracking-tight text-white select-none whitespace-nowrap">
              coredeltav™
            </h1>
          </div>

          {/* Bottom overlay: deliverables left, "Studio" + tagline right */}
          <div className="absolute bottom-[12vh] sm:bottom-[14vh] left-6 sm:left-10 md:left-16 lg:left-24 right-6 sm:right-10 md:right-16 lg:right-24 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-8">
            {/* Left — Deliverables */}
            <div className="space-y-1">
              {DELIVERABLES.map((d) => (
                <p
                  key={d}
                  className="text-[11px] sm:text-xs md:text-sm font-semibold tracking-[0.15em] text-white"
                >
                  {d}
                </p>
              ))}
            </div>

            {/* Right — Studio + tagline */}
            <div className="text-right">
              <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-none mb-3 select-none">
                Studio
              </p>
              <p className="text-[11px] sm:text-xs md:text-sm text-neutral-400 max-w-xs leading-relaxed">
                An independent creative practice building visual stories, physical products, and digital experiences — one idea at a time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ DELIVERABLES SECTION ═══════════════ */}
      <section className="bg-black py-24 sm:py-32 px-6 sm:px-10 md:px-16 lg:px-24">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-neutral-500 mb-10">
              What We Do
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
            {/* Left — Services list */}
            <Reveal>
              <div className="space-y-6">
                {[
                  {
                    title: 'Cinematography',
                    desc: 'High-end visual production for brands, events, and independent stories.',
                  },
                  {
                    title: 'Photography',
                    desc: 'Editorial, documentary, and product photography with intentional composition.',
                  },
                  {
                    title: 'Creative Direction',
                    desc: 'End-to-end visual strategy — from concept through final delivery.',
                  },
                  {
                    title: 'Video Editing',
                    desc: 'Commercial editing, color grading, and post-production with obsessive attention to pacing.',
                  },
                  {
                    title: 'Product Design',
                    desc: 'Custom-crafted physical goods — designed, prototyped, and produced in-house.',
                  },
                ].map((service) => (
                  <div key={service.title} className="border-b border-neutral-800 pb-5">
                    <h3 className="text-sm sm:text-base font-semibold text-white mb-1 tracking-wide">
                      {service.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed">
                      {service.desc}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Right — Studio philosophy */}
            <Reveal>
              <div className="space-y-6">
                <p className="text-lg sm:text-xl md:text-2xl font-medium text-white leading-snug">
                  coredeltav™ is a one-person studio — one mind behind the lens, the strategy, the physical making, and an obsessive focus on the small details.
                </p>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                  Working across visual storytelling, digital art, and physical product design, the studio specializes in cinematography, photography, creative direction, and video editing. Based in Kathmandu, Nepal, every project is shaped by its own idea — the work adapts to the vision, not the other way around.
                </p>
                <div className="pt-4">
                  <Link
                    to="/contact"
                    className="inline-block text-xs uppercase tracking-[0.15em] font-semibold text-white hover:text-neutral-400 underline underline-offset-4 transition-colors"
                  >
                    Start a conversation →
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════════ FAQ SECTION ═══════════════ */}
      <section className="bg-black py-20 sm:py-28 px-6 sm:px-10 md:px-16 lg:px-24 border-t border-neutral-900">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-neutral-500 mb-10">
              Frequently Asked Questions
            </p>
          </Reveal>

          <Reveal>
            <Accordion type="single" collapsible className="w-full">
              {FAQ_ITEMS.map((item) => (
                <AccordionItem
                  key={item.id}
                  value={item.id}
                  className="border-b border-neutral-800"
                >
                  <AccordionTrigger className="text-xs sm:text-sm text-left text-white hover:text-neutral-300 py-5">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-xs sm:text-sm text-neutral-500 pb-5">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </section>
    </Layout>
  );
}
