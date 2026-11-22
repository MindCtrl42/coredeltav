import { useState } from 'react';
import { Loader2, CheckCircle, ArrowUpRight } from 'lucide-react';
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';

const INQUIRY_TYPES = [
  {
    value: 'hire',
    label: 'Hire coredeltav™ for Your Project',
  },
  {
    value: 'general',
    label: 'General Inquiry',
  },
  {
    value: 'orders',
    label: 'Orders & Physical Products',
  },
  {
    value: 'other',
    label: 'Other',
  },
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

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://formspree.io/f/xeaegonl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
        toast.success('Message sent successfully!');
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    } catch {
      toast.error('Unable to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      inquiryType: '',
      message: '',
    });
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <Layout>
        <SEO
          title="Contact & Commission Inquiries — Kathmandu Studio"
          description="Commission coredeltav™ and Creative Director Sabin Bhandari for cinematography, commercial video production, photography, and design practice in Kathmandu, Nepal."
          canonicalUrl="https://coredeltav.com/contact"
        />

        <section className="w-full px-6 sm:px-10 md:px-16 lg:px-24 py-24 sm:py-32">
          <div className="max-w-xl mx-auto text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-primary" />
            </div>

            <h1 className="text-2xl sm:text-3xl font-medium tracking-tight">
              Message Sent
            </h1>

            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Thanks for reaching out. I'll get back to you as soon as I can.
            </p>

            <div className="pt-4">
              <Button
                variant="outline"
                onClick={handleReset}
                className="text-xs uppercase tracking-widest px-6 py-5"
              >
                Send Another Message
              </Button>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <SEO
        title="Contact & Commission Inquiries — Kathmandu Studio"
        description="Commission coredeltav™ and Creative Director Sabin Bhandari for cinematography, commercial video production, photography, and design practice in Kathmandu, Nepal."
        canonicalUrl="https://coredeltav.com/contact"
      />

      {/* ═══════════════ MAIN CONTACT SECTION (FULL WIDTH) ═══════════════ */}
      <section className="w-full px-6 sm:px-10 md:px-16 lg:px-24 py-16 sm:py-24">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
          
          {/* Left Column: Editorial Information & Direct Channels */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">
                Inquiries & Commissions
              </p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight leading-tight mb-4">
                Get in touch
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Have an idea, commercial project, commission inquiry, or something worth making? Reach out through the form or via direct channels.
              </p>
            </div>

            <div className="pt-4 border-t border-border space-y-6">
              <div>
                <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground mb-2">
                  Location
                </p>
                <p className="text-xs sm:text-sm font-medium">
                  Kathmandu, Nepal
                </p>
              </div>

              <div>
                <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground mb-2">
                  Direct Channels
                </p>
                <div className="space-y-2">
                  <a
                    href="https://www.instagram.com/coredeltav/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider underline underline-offset-4 hover:text-muted-foreground transition-colors"
                  >
                    <span>Instagram</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                  <br />
                  <a
                    href="https://wa.me/9779767834472"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider underline underline-offset-4 hover:text-muted-foreground transition-colors"
                  >
                    <span>Direct WhatsApp</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              <div className="pt-2">
                <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground mb-2">
                  Support Practice
                </p>
                <a
                  href="https://buymemomo.com/coredeltav"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider underline underline-offset-4 hover:text-muted-foreground transition-colors"
                >
                  <span>Buy Me Momo</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form (Spans entire right half) */}
          <div className="lg:col-span-7 w-full">
            <form onSubmit={handleSubmit} className="space-y-6 w-full">
              {/* Name + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-xs uppercase tracking-wider">
                    Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    placeholder="YOUR NAME"
                    required
                    className="h-12 text-xs uppercase placeholder:uppercase"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-xs uppercase tracking-wider">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="YOUR@EMAIL.COM"
                    required
                    className="h-12 text-xs placeholder:uppercase"
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-2 w-full">
                <Label htmlFor="phone" className="text-xs uppercase tracking-wider">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  placeholder="YOUR PHONE NUMBER"
                  className="h-12 text-xs placeholder:uppercase"
                />
              </div>

              {/* Inquiry Type */}
              <div className="space-y-2 w-full">
                <Label htmlFor="inquiryType" className="text-xs uppercase tracking-wider">
                  What can coredeltav™ help with?
                </Label>
                <Select
                  value={formData.inquiryType}
                  onValueChange={(value) => handleChange('inquiryType', value)}
                  required
                >
                  <SelectTrigger className="h-12 text-xs uppercase w-full">
                    <SelectValue placeholder="SELECT AN OPTION" />
                  </SelectTrigger>
                  <SelectContent>
                    {INQUIRY_TYPES.map((type) => (
                      <SelectItem
                        key={type.value}
                        value={type.value}
                        className="text-xs uppercase"
                      >
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Message */}
              <div className="space-y-2 w-full">
                <Label htmlFor="message" className="text-xs uppercase tracking-wider">
                  Message
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  placeholder="TELL ME WHAT'S ON YOUR MIND"
                  required
                  rows={6}
                  className="resize-none text-xs placeholder:uppercase w-full"
                />
              </div>

              {/* Submit */}
              <Button
                type="submit"
                className="w-full h-12 text-xs uppercase tracking-widest font-semibold"
                disabled={isSubmitting || !formData.inquiryType}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Sending
                  </>
                ) : (
                  'Send Message'
                )}
              </Button>
            </form>
          </div>

        </div>
      </section>

      {/* ═══════════════ FAQ SECTION (FULL WIDTH FROM LEFT TO RIGHT) ═══════════════ */}
      <section className="w-full px-6 sm:px-10 md:px-16 lg:px-24 py-20 sm:py-28 border-t border-border">
        <div className="w-full">
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-muted-foreground mb-10">
            Frequently Asked Questions
          </p>

          <Accordion type="single" collapsible className="w-full">
            {FAQ_ITEMS.map((item) => (
              <AccordionItem
                key={item.id}
                value={item.id}
                className="border-b border-border w-full"
              >
                <AccordionTrigger className="text-xs sm:text-sm md:text-base text-left hover:no-underline py-6 tracking-wide">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-xs sm:text-sm md:text-base text-muted-foreground max-w-4xl pb-6 leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </Layout>
  );
}
