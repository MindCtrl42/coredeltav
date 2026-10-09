import { Helmet } from "react-helmet-async";
import Layout from "@/components/Layout";

const PrivacyPage = () => {
  return (
    <Layout>
      <Helmet>
        <title>Privacy Policy | coredeltav</title>
        <meta name="description" content="Privacy policy for coredeltav." />
      </Helmet>
      
      <main className="min-h-screen pt-24 pb-16 px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-base font-normal mb-8">Privacy Policy</h1>
          
          <div className="space-y-8 text-sm text-muted-foreground leading-relaxed">
            <section>
              <h2 className="text-foreground mb-3">1. Information We Collect</h2>
              <p>
                We collect information you provide directly to us, such as when you make a purchase inquiry or contact us via WhatsApp. This may include your name, phone number, delivery address, and order details.
              </p>
            </section>

            <section>
              <h2 className="text-foreground mb-3">2. How We Use Your Information</h2>
              <p>
                We use the information we collect to process your orders, arrange shipping, communicate with you about your purchases, and improve our creative services.
              </p>
            </section>

            <section>
              <h2 className="text-foreground mb-3">3. Information Sharing</h2>
              <p>
                We do not sell your personal information. We may share your information with service providers who assist us in operating our business, such as local delivery carriers. We may also disclose information when required by law.
              </p>
            </section>

            <section>
              <h2 className="text-foreground mb-3">4. Data Security</h2>
              <p>
                We implement appropriate measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
              </p>
            </section>

        

            <section>
              <h2 className="text-foreground mb-3">6. Updates to This Policy</h2>
              <p>
                We may update this privacy policy from time to time. We will notify you of any material changes by posting the new policy on this page.
              </p>
            </section>

            <section>
              <h2 className="text-foreground mb-3">7. Contact</h2>
              <p>
                For any questions about this privacy policy, coredeltav services, or product orders, please contact: contact@coredeltav.com
              </p>
            </section>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default PrivacyPage;