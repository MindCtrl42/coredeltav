import { useState } from 'react';
import { Loader2, CheckCircle, ArrowRight } from 'lucide-react';
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

  const stardustBg = {
    backgroundColor: '#0c0c10',
    backgroundImage:
      'radial-gradient(circle at 20% 30%, rgba(246, 241, 227, 0.22) 0 1px, transparent 1.6px), radial-gradient(circle at 80% 70%, rgba(246, 241, 227, 0.12) 0 1.3px, transparent 2px), radial-gradient(circle at 50% 50%, rgba(246, 241, 227, 0.08) 0 2px, transparent 2.6px)',
    backgroundSize: '71px 83px, 113px 97px, 197px 181px',
    color: '#f6f1e3',
  };

  if (isSubmitted) {
    return (
      <Layout>
        <SEO
          title="Contact & Commission Inquiries — coredeltav™"
          description="Commission coredeltav™ and Creative Director Sabin Bhandari for cinematography, commercial video production, photography, and design practice."
          canonicalUrl="https://coredeltav.com/contact"
        />

        <div className="min-h-[calc(100vh-3.5rem)] flex items-center justify-center px-6 py-24" style={stardustBg}>
          <div className="max-w-md w-full text-center space-y-6 p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-sm">
            <div className="w-16 h-16 rounded-full bg-[#ffe98a]/10 border border-[#ffe98a]/20 flex items-center justify-center mx-auto mb-2">
              <CheckCircle className="w-8 h-8 text-[#ffe98a]" />
            </div>

            <div className="space-y-2">
              <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#ffe98a]">
                Message Received
              </p>
              <h1 className="text-3xl font-extrabold tracking-tight text-[#f6f1e3]">
                Thank You
              </h1>
            </div>

            <p className="text-sm text-[#f6f1e3]/70 leading-relaxed">
              Your inquiry has been delivered directly. I will review it and get back to you shortly.
            </p>

            <div className="pt-4">
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-[#ffe98a] text-[#0d137a] text-xs font-bold uppercase tracking-widest hover:bg-[#fff0a6] transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                Send Another Message
              </button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <SEO
        title="Contact & Commission Inquiries — coredeltav™"
        description="Commission coredeltav™ and Creative Director Sabin Bhandari for cinematography, commercial video production, photography, and design practice in Kathmandu, Nepal."
        canonicalUrl="https://coredeltav.com/contact"
      />

      <div className="min-h-screen w-full transition-colors" style={stardustBg}>
        {/* ═══════════════ MAIN CONTACT SECTION ═══════════════ */}
        <section className="w-full max-w-7xl mx-auto px-6 sm:px-10 md:px-16 lg:px-20 pt-16 sm:pt-24 pb-20 sm:pb-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            
            {/* Left Column: Heading & Editorial Intro */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-3">
                <span className="inline-block text-[11px] font-mono uppercase tracking-[0.2em] text-[#ffe98a]">
                  ( Inquiries & Commissions )
                </span>
                
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#f6f1e3] leading-[1.02]">
                  Get in
                  <br />
                  touch
                </h1>
              </div>

              <p className="text-sm sm:text-base text-[#f6f1e3]/75 leading-relaxed max-w-md">
                Have an idea, a commercial project, a commission inquiry, or something worth making? Send it over through the form.
              </p>

              <div className="pt-2">
                <span
                  style={{
                    fontFamily: "'Architects Daughter', cursive",
                    fontSize: '19px',
                    color: '#ffe98a',
                    textDecoration: 'underline',
                    textUnderlineOffset: '5px',
                  }}
                >
                  Let's make something remarkable.
                </span>
              </div>

              <div className="pt-4">
                <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-[11px] font-mono text-[#f6f1e3]/80">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Accepting select commissions & projects</span>
                </div>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div className="lg:col-span-7 w-full p-6 sm:p-10 rounded-3xl bg-white/[0.025] border border-white/10 backdrop-blur-sm shadow-2xl shadow-black/40">
              <form onSubmit={handleSubmit} className="space-y-6 w-full">
                
                {/* Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-[11px] font-mono uppercase tracking-wider text-[#f6f1e3]/80">
                      Name *
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      placeholder="Your name"
                      required
                      className="h-12 bg-white/[0.04] border-white/15 focus:border-[#ffe98a] focus:ring-1 focus:ring-[#ffe98a] text-[#f6f1e3] placeholder:text-[#f6f1e3]/30 rounded-xl text-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-[11px] font-mono uppercase tracking-wider text-[#f6f1e3]/80">
                      Email *
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      placeholder="your@email.com"
                      required
                      className="h-12 bg-white/[0.04] border-white/15 focus:border-[#ffe98a] focus:ring-1 focus:ring-[#ffe98a] text-[#f6f1e3] placeholder:text-[#f6f1e3]/30 rounded-xl text-sm"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="space-y-2 w-full">
                  <Label htmlFor="phone" className="text-[11px] font-mono uppercase tracking-wider text-[#f6f1e3]/80">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    placeholder="+977 / Phone number"
                    className="h-12 bg-white/[0.04] border-white/15 focus:border-[#ffe98a] focus:ring-1 focus:ring-[#ffe98a] text-[#f6f1e3] placeholder:text-[#f6f1e3]/30 rounded-xl text-sm"
                  />
                </div>

                {/* Inquiry Type */}
                <div className="space-y-2 w-full">
                  <Label htmlFor="inquiryType" className="text-[11px] font-mono uppercase tracking-wider text-[#f6f1e3]/80">
                    What can coredeltav™ help with? *
                  </Label>
                  <Select
                    value={formData.inquiryType}
                    onValueChange={(value) => handleChange('inquiryType', value)}
                    required
                  >
                    <SelectTrigger className="h-12 bg-white/[0.04] border-white/15 focus:border-[#ffe98a] focus:ring-1 focus:ring-[#ffe98a] text-[#f6f1e3] rounded-xl text-sm w-full">
                      <SelectValue placeholder="Select an inquiry type" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#121218] border-white/15 text-[#f6f1e3] rounded-xl">
                      {INQUIRY_TYPES.map((type) => (
                        <SelectItem
                          key={type.value}
                          value={type.value}
                          className="text-xs focus:bg-[#ffe98a]/10 focus:text-[#ffe98a]"
                        >
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Message */}
                <div className="space-y-2 w-full">
                  <Label htmlFor="message" className="text-[11px] font-mono uppercase tracking-wider text-[#f6f1e3]/80">
                    Message *
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    placeholder="Tell me about your project, idea, or timeline..."
                    required
                    rows={6}
                    className="resize-none bg-white/[0.04] border-white/15 focus:border-[#ffe98a] focus:ring-1 focus:ring-[#ffe98a] text-[#f6f1e3] placeholder:text-[#f6f1e3]/30 rounded-xl text-sm w-full"
                  />
                </div>

                {/* Submit Pill Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || !formData.inquiryType}
                  className="w-full h-14 rounded-full bg-[#ffe98a] text-[#0d137a] text-xs font-bold uppercase tracking-widest hover:bg-[#fff0a6] hover:scale-[1.005] active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none transition-all flex items-center justify-center gap-2.5 shadow-lg shadow-[#ffe98a]/10 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-[#0d137a]" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>

          </div>
        </section>

        {/* ═══════════════ FAQ SECTION ═══════════════ */}
        <section className="w-full border-t border-white/10 py-20 sm:py-28">
          <div className="max-w-4xl mx-auto px-6 sm:px-10">
            <div className="mb-10 text-center sm:text-left space-y-2">
              <span className="inline-block text-[11px] font-mono uppercase tracking-[0.2em] text-[#ffe98a]">
                ( Frequently Asked Questions )
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#f6f1e3]">
                Common Questions
              </h2>
            </div>

            <Accordion type="single" collapsible className="w-full divide-y divide-white/10">
              {FAQ_ITEMS.map((item) => (
                <AccordionItem
                  key={item.id}
                  value={item.id}
                  className="border-b-0 py-1"
                >
                  <AccordionTrigger className="text-sm sm:text-base font-semibold text-[#f6f1e3] hover:text-[#ffe98a] hover:no-underline py-5 tracking-wide text-left transition-colors">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-xs sm:text-sm md:text-base text-[#f6f1e3]/70 pb-6 leading-relaxed">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </div>
    </Layout>
  );
}
