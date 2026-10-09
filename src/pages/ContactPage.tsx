
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Loader2, CheckCircle } from 'lucide-react';
import Layout from '@/components/Layout';
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
    label: 'Orders',
  },
  {
    value: 'other',
    label: 'Other',
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
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(
        'https://formspree.io/f/xeaegonl',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        setIsSubmitted(true);
        toast.success('Message sent successfully!');
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    } catch (error) {
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
        <Helmet>
          <title>Contact — coredeltav™</title>
          <meta
            name="description"
            content="Get in touch with coredeltav™ for inquiries, projects, and orders."
          />
        </Helmet>

        <section className="page-padding py-20">
          <div className="max-w-lg mx-auto text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-primary" />
            </div>

            <h1 className="text-sm mb-4">
              Message Sent
            </h1>

            <p className="text-xs text-muted-foreground mb-8">
              Thanks for reaching out. I'll get back to you as soon as I can.
            </p>

            <Button
              variant="outline"
              onClick={handleReset}
              className="text-xs"
            >
              Send Another Message
            </Button>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <Helmet>
        <title>Contact — coredeltav™</title>
        <meta
          name="description"
          content="Get in touch with coredeltav™ for inquiries, projects, and orders."
        />
      </Helmet>

      <section className="page-padding py-20">
        <div className="max-w-lg mx-auto">

          <h1 className="text-sm mb-2">
            Contact
          </h1>

          <p className="text-xs text-muted-foreground mb-8">
            Have an idea, question, or something worth making?
            Get in touch.
          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            {/* Name + Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              <div className="space-y-2">
                <Label
                  htmlFor="name"
                  className="text-xs uppercase"
                >
                  Name
                </Label>

                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    handleChange('name', e.target.value)
                  }
                  placeholder="YOUR NAME"
                  required
                  className="h-12 text-xs uppercase placeholder:uppercase"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-xs uppercase"
                >
                  Email
                </Label>

                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    handleChange('email', e.target.value)
                  }
                  placeholder="YOUR@EMAIL.COM"
                  required
                  className="h-12 text-xs placeholder:uppercase"
                />
              </div>

            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label
                htmlFor="phone"
                className="text-xs uppercase"
              >
                Phone Number
              </Label>

              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  handleChange('phone', e.target.value)
                }
                placeholder="YOUR PHONE NUMBER"
                className="h-12 text-xs placeholder:uppercase"
              />
            </div>

            {/* Inquiry Type */}
            <div className="space-y-2">
              <Label
                htmlFor="inquiryType"
                className="text-xs uppercase"
              >
                What can coredeltav™ help with?
              </Label>

              <Select
                value={formData.inquiryType}
                onValueChange={(value) =>
                  handleChange('inquiryType', value)
                }
                required
              >
                <SelectTrigger className="h-12 text-xs uppercase">
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
            <div className="space-y-2">
              <Label
                htmlFor="message"
                className="text-xs uppercase"
              >
                Message
              </Label>

              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={(e) =>
                  handleChange('message', e.target.value)
                }
                placeholder="TELL ME WHAT'S ON YOUR MIND"
                required
                rows={5}
                className="resize-none text-xs placeholder:uppercase"
              />
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full h-12 text-xs uppercase"
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

          {/* Direct Contact */}
          <div className="mt-12 pt-8 border-t border-border">

            <p className="text-xs text-muted-foreground mb-4">
              Or reach out directly:
            </p>

            <div className="space-y-2">

            

              <a
                href="https://www.instagram.com/coredeltav/"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-xs underline underline-offset-4 hover:text-muted-foreground transition-colors mb-4"
              >
                Instagram
              </a>
              
              
     
              <div className="space-y-3">
  

  <p className="text-xs text-muted-foreground ">
    Love my work?
  </p>

  <a
    href="https://buymemomo.com/coredeltav"
    target="_blank"
    rel="noopener noreferrer"
    className="block text-xs underline underline-offset-4 hover:text-muted-foreground transition-colors mb-4"
  >
    Support Me
  </a>
</div>

            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-16 pt-8 border-t border-border">

            <h2 className="text-xs uppercase tracking-widest text-muted-foreground mb-6">
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

        </div>
      </section>
    </Layout>
  );
}
