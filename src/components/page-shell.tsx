import { SiteHeader } from "@/components/site-header";
import { ContactFooter } from "@/components/contact-footer";
import { FloatingCta } from "@/components/floating-cta";

/**
 * Kerangka halaman sub (non-beranda): header tetap, konten, footer,
 * floating CTA, dan spacer bar mobile — konsisten dengan beranda.
 */
export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 pt-16">{children}</main>
      <ContactFooter />
      <FloatingCta />
      {/* Spacer agar bar sticky mobile tidak menutupi footer */}
      <div aria-hidden="true" className="h-16 md:hidden" />
    </div>
  );
}
