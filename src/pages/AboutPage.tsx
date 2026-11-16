import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import heroImage from '@/assets/coredeltav.png';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function AboutPage() {
  return (
    <Layout>
      <SEO
        title="Creative Director & Visual Storyteller | Kathmandu, Nepal"
        description="coredeltav™ is an independent creative studio and product practice in Kathmandu, Nepal led by Creative Director Sabin Bhandari. Specializing in cinematography, photography, creative direction, commercial video editing, and custom physical products."
        canonicalUrl="https://coredeltav.com/"
      />

      {/* ABOUT HERO BANNER */}
      <section className="pt-8 pb-16 px-4 md:px-8 max-w-7xl mx-auto w-full">
        <div className="w-full overflow-hidden rounded-sm bg-black flex flex-col justify-center">
          <img
            src={heroImage}
            alt="coredeltav"
            className="w-full h-auto max-h-[75vh] object-contain mx-auto block"
          />

          {/* Bio text placed below the image (shifted down to prevent mixing with the graphic) */}
          <div className="mt-8 md:mt-12 px-2 sm:px-4 md:px-6 max-w-xl text-left space-y-3">
            <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground">
              coredeltav™ is an independent creative practice based in Kathmandu, Nepal, led by Creative Director Sabin Bhandari.
            </p>
            <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground">
              Working across visual storytelling, digital art, and physical product design, the studio specializes in cinematography, photography, creative direction, and video editing. coredeltav™ is a one-person studio—one mind behind the lens, the strategy, the physical making, and an obsessive focus on the small details. The work adapts to the idea.
            </p>
            <div className="pt-2">
              <Link
                to="/contact"
                className="inline-block text-xs uppercase tracking-widest font-semibold text-muted-foreground hover:text-foreground underline underline-offset-4 transition-colors"
              >
                Reach Out →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FREQUENTLY ASKED QUESTIONS */}
      <section className="page-padding py-6 border-t border-border/10">
        <div className="max-w-3xl mx-auto text-left">

          <h2 className="text-xs uppercase tracking-widest text-muted-foreground mb-8 text-center md:text-left">
            Frequently Asked Questions
          </h2>

          <Accordion
            type="single"
            collapsible
            className="w-full"
          >
            <AccordionItem value="what-is-coredeltav">
              <AccordionTrigger className="text-xs text-left">
                What is coredeltav™?
              </AccordionTrigger>
              <AccordionContent className="text-xs text-muted-foreground">
                coredeltav™ is an independent creative practice focused on
                photography, cinematography, design, storytelling, and
                making interesting things.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="what-does-coredeltav-do">
              <AccordionTrigger className="text-xs text-left">
                What does coredeltav™ do?
              </AccordionTrigger>
              <AccordionContent className="text-xs text-muted-foreground">
                coredeltav™ works across photography, cinematography,
                creative direction, digital art, product design, and
                visual storytelling. The work changes depending on the idea.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="who-makes-products">
              <AccordionTrigger className="text-xs text-left">
                Who makes the products?
              </AccordionTrigger>
              <AccordionContent className="text-xs text-muted-foreground">
                Designed by coredeltav™ and crafted by coredeltav™.
                Each product is developed, designed, and made personally
                by the creator behind the studio.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="who-is-behind-coredeltav">
              <AccordionTrigger className="text-xs text-left">
                Who is behind coredeltav™?
              </AccordionTrigger>
              <AccordionContent className="text-xs text-muted-foreground">
                coredeltav™ is an independent creative practice led by Sabin Bhandari. One person
                behind the lens, behind the designs, and dedicated to deliberate craftsmanship, visual storytelling, and small details.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="where-is-coredeltav">
              <AccordionTrigger className="text-xs text-left">
                Where is coredeltav™ based?
              </AccordionTrigger>
              <AccordionContent className="text-xs text-muted-foreground">
                coredeltav™ is based in Kathmandu, Nepal, creating work
                inspired by Nepal and beyond.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="serious-question">
              <AccordionTrigger className="text-xs text-left">
                Is coredeltav™ run by a whole team?
              </AccordionTrigger>
              <AccordionContent className="text-xs text-muted-foreground">
                No. Just one person, several hard drives, and a slightly
                concerning amount of unfinished ideas.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

    </Layout>
  );
}
