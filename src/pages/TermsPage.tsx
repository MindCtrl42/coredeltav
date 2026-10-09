import { Helmet } from "react-helmet-async";
import Layout from "@/components/Layout";

const TermsPage = () => {
  return (
    <Layout>
      <Helmet>
        <title>Terms & Conditions | coredeltav™</title>
        <meta name="description" content="Terms and conditions for coredeltav™ store." />
      </Helmet>
      
      <main className="min-h-screen pt-24 pb-16 px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-base font-normal mb-8">Terms & Conditions</h1>
          
          <div className="space-y-8 text-sm text-muted-foreground leading-relaxed">
            <section>
              <h2 className="text-foreground mb-3">1. General</h2>
              <p>
                These terms and conditions govern your use of the coredeltav™ website and the purchase of products and services from coredeltav™. By accessing this website, purchasing a product, downloading or receiving any files, or using any content from coredeltav™, you agree to be bound by these terms.
              </p>
            </section>

            <section>
              <h2 className="text-foreground mb-3">2. Ownership & Intellectual Property</h2>
              <p>
                Unless otherwise agreed to in writing, all content created, published, or provided by coredeltav™ remains the intellectual property of coredeltav™. This includes, but is not limited to, photographs, videos, cinematography, camera work, raw and unedited files, edited files, digital artwork, designs, graphics, products, concepts, and other creative materials. Purchasing a product or service, receiving or downloading a file, or being provided with a copy of any creative work does not transfer ownership or intellectual property rights. Unless a separate written agreement states otherwise, all rights remain with coredeltav™.
              </p>
            </section>

            <section>
              <h2 className="text-foreground mb-3">3. Raw & Unedited Files</h2>
              <p>
                Raw, original, unedited, source, or working files provided to a client or customer remain the property of coredeltav™ unless ownership is explicitly transferred through a separate written agreement. Receiving a copy of these files does not grant the right to resell, redistribute, reproduce, modify, claim ownership of, or commercially exploit them without permission.
              </p>
            </section>

            <section>
              <h2 className="text-foreground mb-3">4. Products & Creative Work</h2>
              <p>
                Physical products purchased from the coredeltav™ store belong to the purchaser after purchase, but the underlying designs, artwork, concepts, photographs, graphics, branding, and other intellectual property used to create those products remain the property of coredeltav™ unless otherwise agreed upon.
              </p>
            </section>

            <section>
              <h2 className="text-foreground mb-3">5. Intellectual Property</h2>
              <p>
                All content on this website, including text, graphics, logos, images, and software, is the property of coredeltav™ and is protected by copyright and other intellectual property laws. You may not reproduce, distribute, or use any content without our prior written consent.
              </p>
            </section>

            <section>
              <h2 className="text-foreground mb-3">6. Usage Rights</h2>
              <p>
                Any permission granted to use coredeltav™ content is limited to the purpose explicitly agreed upon. No implied license or transfer of rights is created simply because content has been purchased, delivered, downloaded, photographed, filmed, or otherwise provided.
              </p>
            </section>

            <section>
              <h2 className="text-foreground mb-3">7. Governing Law</h2>
              <p>
                These terms shall be governed by and construed in accordance with the laws of Nepal. Any disputes shall be subject to the exclusive jurisdiction of the courts in our registered place of business.
              </p>
            </section>

            <section>
              <h2 className="text-foreground mb-3">8. Contact</h2>
              <p>
                For any questions regarding these terms, please contact us at contact@coredeltav.com
              </p>
            </section>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default TermsPage;
