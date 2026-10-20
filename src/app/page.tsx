import { SiteHeader } from "@/components/site-header";
import { SiteHero } from "@/components/site-hero";
import { ModelSection } from "@/components/model-section";
import { ServicesSection } from "@/components/services-section";
import { PromoSection } from "@/components/promo-section";
import { GallerySection } from "@/components/gallery-section";
import { FinancingSimulator } from "@/components/financing-simulator";
import { TestDriveSection } from "@/components/test-drive-section";
import { CoverageSection } from "@/components/coverage-section";
import { FaqSection } from "@/components/faq-section";
import { CtaBand } from "@/components/cta-band";
import { ContactFooter } from "@/components/contact-footer";
import { FloatingCta } from "@/components/floating-cta";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <SiteHero />
        <ModelSection />
        <ServicesSection />
        <PromoSection />
        <FinancingSimulator />
        <GallerySection />
        <TestDriveSection />
        <CoverageSection />
        <FaqSection />
        <CtaBand />
      </main>
      <ContactFooter />
      <FloatingCta />
      {/* Spacer so the mobile sticky bar never covers footer content */}
      <div aria-hidden="true" className="h-16 md:hidden" />
    </div>
  );
}
