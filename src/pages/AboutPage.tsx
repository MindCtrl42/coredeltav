import SEO from '@/components/SEO';
import BunkumStudioTemplate from '@/components/ui/bunkum-studio-template';

export default function AboutPage() {
  return (
    <>
      <SEO
        title="coredeltav™ | Studio & Visual Storytelling"
        description="coredeltav™ is an independent creative practice led by Sabin Bhandari in Kathmandu, Nepal. Working across visual storytelling, digital art, physical product design, cinematography, and photography."
        canonicalUrl="https://coredeltav.com/"
      />
      <BunkumStudioTemplate commissionAction={{ label: "Start a commission", href: "/contact" }} />
    </>
  );
}
