import { Helmet } from 'react-helmet-async';

export interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogType?: 'website' | 'profile' | 'product' | 'article';
  ogImage?: string;
  jsonLd?: Record<string, any> | Array<Record<string, any>>;
  productData?: {
    name: string;
    description: string;
    price: number;
    currency?: string;
    image: string;
    availability?: 'InStock' | 'OutOfStock' | 'PreOrder';
    sku?: string;
  };
}

const DEFAULT_TITLE = 'coredeltav™ — Creative Director & Visual Storyteller | Kathmandu, Nepal';
const DEFAULT_DESCRIPTION =
  'coredeltav™ is an independent creative studio and product practice in Kathmandu, Nepal led by Creative Director Sabin Bhandari. Specializing in cinematography, photography, creative direction, commercial video editing, and custom physical products.';
const DEFAULT_KEYWORDS = [
  'Sabin Bhandari',
  'coredeltav',
  'coredeltav Kathmandu',
  'Creative Director Nepal',
  'Creative Director Kathmandu',
  'Cinematographer Nepal',
  'Visual Storyteller Nepal',
  'Commercial Video Editor Kathmandu',
  'Photography Studio Kathmandu',
  'Minimalist Product Design Nepal',
  'Film Director Nepal',
  'Art Director Kathmandu',
  'Brand Strategy Nepal',
  'coredeltav.com',
].join(', ');
const SITE_URL = 'https://coredeltav.com';
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

export default function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  keywords = DEFAULT_KEYWORDS,
  canonicalUrl = SITE_URL,
  ogType = 'website',
  ogImage = DEFAULT_OG_IMAGE,
  jsonLd,
  productData,
}: SEOProps) {
  const fullTitle = title
    ? `${title} — coredeltav™`
    : DEFAULT_TITLE;

  // Base structured data: Studio (LocalBusiness / ProfessionalService) + Founder (Person) + WebSite
  const baseSchemaGraph: Record<string, any>[] = [
    {
      '@type': ['ProfessionalService', 'LocalBusiness'],
      '@id': `${SITE_URL}/#studio`,
      name: 'coredeltav™',
      alternateName: ['coredeltav', 'Core Delta V', 'Coredeltav Studio'],
      url: SITE_URL,
      logo: `${SITE_URL}/og-image.png`,
      image: `${SITE_URL}/og-image.png`,
      description: DEFAULT_DESCRIPTION,
      telephone: '+977-9767834472',
      email: 'contact@coredeltav.com',
      priceRange: 'NPR',
      currenciesAccepted: 'NPR',
      paymentAccepted: 'WhatsApp Order, Cash on Delivery, Bank Transfer',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Kathmandu',
        addressRegion: 'Bagmati Province',
        addressCountry: 'NP',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 27.7172,
        longitude: 85.324,
      },
      areaServed: [
        { '@type': 'City', name: 'Kathmandu' },
        { '@type': 'Country', name: 'Nepal' },
        { '@type': 'AdministrativeArea', name: 'Worldwide' },
      ],
      founder: {
        '@type': 'Person',
        '@id': `${SITE_URL}/#sabin-bhandari`,
        name: 'Sabin Bhandari',
        jobTitle: 'Creative Director & Visual Storyteller',
        description:
          'Sabin Bhandari is an independent Creative Director, visual storyteller, cinematographer, and product maker based in Kathmandu, Nepal.',
        url: SITE_URL,
        worksFor: {
          '@id': `${SITE_URL}/#studio`,
        },
        sameAs: [
          'https://www.instagram.com/coredeltav',
          'https://www.youtube.com/@coredeltav',
        ],
        knowsAbout: [
          'Creative Direction',
          'Cinematography',
          'Commercial Video Editing',
          'Editorial Photography',
          'Visual Production',
          'Minimalist Product Design',
          'Physical Product Craftsmanship',
          'Brand Identity & Narrative Strategy',
        ],
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Kathmandu',
          addressCountry: 'NP',
        },
      },
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Sunday',
        ],
        opens: '10:00',
        closes: '18:00',
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Coredeltav Creative Practice Offerings',
        itemListElement: [
          {
            '@type': 'OfferCatalog',
            name: 'Visual Production & Creative Direction',
            itemListElement: [
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: 'Creative Direction & Commercial Cinematography',
                  description: 'End-to-end film direction, camera operation, and narrative pacing.',
                },
              },
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: 'Commercial Video Editing & Color Grading',
                  description: 'Editorial cutting, sound design, and color finishing.',
                },
              },
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: 'Editorial & Brand Photography',
                  description: 'High-end visual still production and creative staging.',
                },
              },
            ],
          },
          {
            '@type': 'OfferCatalog',
            name: 'Studio Physical Products',
            itemListElement: [
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Product',
                  name: 'Custom Crafted Physical Goods & Minimalist Objects',
                  description: 'Tangible design pieces crafted and released in Kathmandu.',
                },
              },
            ],
          },
        ],
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: 'coredeltav™',
      description: DEFAULT_DESCRIPTION,
      publisher: {
        '@id': `${SITE_URL}/#studio`,
      },
    },
  ];

  // If page provides specific product data, attach rich product snippet
  if (productData) {
    baseSchemaGraph.push({
      '@type': 'Product',
      '@id': `${canonicalUrl}#product`,
      name: productData.name,
      image: productData.image.startsWith('http') ? productData.image : `${SITE_URL}${productData.image}`,
      description: productData.description,
      brand: {
        '@type': 'Brand',
        name: 'coredeltav™',
      },
      offers: {
        '@type': 'Offer',
        url: canonicalUrl,
        priceCurrency: productData.currency || 'NPR',
        price: productData.price,
        availability:
          productData.availability === 'OutOfStock'
            ? 'https://schema.org/OutOfStock'
            : 'https://schema.org/InStock',
        seller: {
          '@id': `${SITE_URL}/#studio`,
        },
      },
    });
  }

  // If custom schema provided, append to graph
  if (jsonLd) {
    if (Array.isArray(jsonLd)) {
      baseSchemaGraph.push(...jsonLd);
    } else {
      baseSchemaGraph.push(jsonLd);
    }
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': baseSchemaGraph,
  };

  return (
    <Helmet>
      {/* Standard HTML Meta */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Sabin Bhandari — coredeltav™" />
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:site_name" content="coredeltav™" />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@coredeltav" />
      <meta name="twitter:creator" content="@coredeltav" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* AI Search Engine Directives (ChatGPT, Perplexity, Google AI Overviews) */}
      <meta name="article:publisher" content="https://coredeltav.com" />
      <meta name="geo.region" content="NP-BA" />
      <meta name="geo.placename" content="Kathmandu" />
      <meta name="geo.position" content="27.7172;85.3240" />
      <meta name="ICBM" content="27.7172, 85.3240" />

      {/* Schema.org Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
}

