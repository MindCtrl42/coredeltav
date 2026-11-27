import SEO from '@/components/SEO';
import BunkumStudioTemplate from '@/components/ui/bunkum-studio-template';

export default function AboutPage() {
  return (
    <>
      <SEO
        description="coredeltav™ is an independent creative studio led by Sabin Bhandari — a creative director in Nepal, visual storyteller Kathmandu, cinematographer in Kathmandu, and photographer in Kathmandu, Nepal."
        canonicalUrl="https://coredeltav.com/"
      />
      <BunkumStudioTemplate commissionAction={{ label: "Start a commission", href: "/contact" }} />
    </>
  );
}
