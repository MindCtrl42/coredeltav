import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';

const heroImage = '/coredeltav%20sifi.png';
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
        className="relative w-full min-h-[100svh] flex flex-col justify-between bg-black px-6 sm:px-10 md:h-screen md:min-h-0 md:overflow-hidden md:block md:px-0"
      >
        {/* Background graphic — original colors, not inverted */}
        <div className="absolute inset-0 h-full flex items-center justify-center pointer-events-none p-6 sm:p-10 md:p-16">
          <motion.div
            style={{ scale: imageScale, opacity: imageOpacity }}
            className="w-full h-full flex items-center justify-center"
          >
            <img
              src={heroImage}
              alt="coredeltav™"
              className="w-full h-full object-contain pointer-events-none select-none"
            />
          </motion.div>
        </div>

        {/* Text overlay — on mobile, deliverables ~5 lines above center image and studio ~5 lines below */}
        <div className="relative z-10 w-full h-[100svh] min-h-[100svh] flex flex-col justify-between pt-[19svh] pb-[17svh] px-6 sm:px-10 md:h-full md:min-h-0 md:justify-end md:pt-0 md:pb-0 md:px-16 lg:px-24 pointer-events-none">
          <h1 className="sr-only">coredeltav™ Studio</h1>

          {/* Deliverables left/top, Studio + tagline right/bottom */}
          <div className="flex flex-col justify-between h-full w-full md:flex-row md:items-end md:h-auto md:mb-[14vh] pointer-events-auto">
            {/* Top on mobile, Left on desktop — Deliverables */}
            <div className="space-y-1 sm:space-y-1.5">
              {DELIVERABLES.map((d) => (
                <p
                  key={d}
                  className="text-[10px] sm:text-xs md:text-sm font-semibold tracking-[0.18em] text-white"
                >
                  {d}
                </p>
              ))}
            </div>

            {/* Bottom on mobile, Right on desktop — Studio + tagline */}
            <div className="text-right self-end md:self-auto space-y-2">
              <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-none mb-1 md:mb-3 select-none">
                Studio
              </p>
              <p className="text-[11px] sm:text-xs md:text-sm text-neutral-400 max-w-xs leading-relaxed ml-auto">
                An independent creative practice building visual stories, physical products, and digital experiences — one idea at a time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ DELIVERABLES SECTION ═══════════════ */}
      <section className="bg-black py-24 sm:py-32 px-6 sm:px-10 md:px-16 lg:px-24 w-full">
        <div className="w-full">
          <Reveal>
            <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-neutral-500 mb-10">
              Disciplines & Practice
            </p>
          </Reveal>

          <Reveal className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8 w-full">
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
                <div key={service.title} className="border-b border-neutral-800 pb-5 w-full">
                  <h3 className="text-sm sm:text-base font-semibold text-white mb-1 tracking-wide">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed">
                    {service.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-10">
              <Link
                to="/contact"
                className="inline-block text-xs uppercase tracking-[0.15em] font-semibold text-white hover:text-neutral-400 underline underline-offset-4 transition-colors"
              >
                Start a conversation →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════ FAQ SECTION ═══════════════ */}
      <section className="bg-black py-20 sm:py-28 px-6 sm:px-10 md:px-16 lg:px-24 border-t border-neutral-900 w-full">
        <div className="w-full">
          <Reveal>
            <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-neutral-500 mb-10">
              Frequently Asked Questions
            </p>
          </Reveal>

          <Reveal className="w-full">
            <Accordion type="single" collapsible className="w-full">
              {FAQ_ITEMS.map((item) => (
                <AccordionItem
                  key={item.id}
                  value={item.id}
                  className="border-b border-neutral-800 w-full"
                >
                  <AccordionTrigger className="text-xs sm:text-sm md:text-base text-left text-white hover:text-neutral-300 py-6 hover:no-underline tracking-wide">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-xs sm:text-sm md:text-base text-neutral-400 max-w-4xl pb-6 leading-relaxed">
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
