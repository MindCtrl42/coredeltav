import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
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
      <Helmet>
        <title>coredeltav — Creative Director & Visual Storyteller</title>
        <meta
          name="description"
          content="coredeltav — Creative Director, visual storyteller, and content creator based in Kathmandu, Nepal."
        />
      </Helmet>

      {/* ABOUT SECTION - CENTERED */}
      <section className="pt-16 pb-16 px-4 flex flex-col items-center text-center">
        {/* Changed max-w-4xl to max-w-7xl to make it much wider */}
        <div className="max-w-7xl w-full">
          
          {/* Changed md:h-[500px] to md:h-[75vh] for a massive height on desktop */}
          <div className="w-full mb-12 overflow-hidden rounded-sm flex justify-center">
            <img
              src={heroImage}
              alt="Coredeltav Banner"
              className="w-full h-auto max-h-[75vh] object-contain"
            />
          </div>

          {/* Bio Text & Link (Kept slightly narrower for reading comfort) */}
          <div className="max-w-3xl mx-auto space-y-6 text-sm text-muted-foreground leading-relaxed mb-16">
            
            
            <p>
              coredeltav™ is an independent creative practice based in Kathmandu, Nepal, led by Sabin. 
            </p>

            <p>
              Working across visual storytelling, digital art, and physical product design, the studio specializes in cinematography, photography, creative direction, and video editing.

coredeltav™ is a one-person studio—one mind behind the lens, the strategy, the physical making, and an obsessive focus on the small details. The work adapts to the idea.
            </p>

            <p className="font-medium text-foreground pb-4">
              LET'S WORK TOGETHER <br />
            </p>

            {/* Contact to Hire Link */}
            <div>
              <Link
                to="/contact"
                className="inline-block text-xs uppercase tracking-widest font-semibold text-foreground underline underline-offset-4 hover:text-muted-foreground transition-colors"
              >
                Reach Out→
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
                coredeltav™ is a one-person creative practice. One person
                behind the camera, behind the designs, and occasionally
                behind the unreasonable amount of time spent on small details.
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