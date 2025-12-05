import { HeroSection } from "@/components/hero-section"
import { StatsSection } from "@/components/stats-section"
import { ProductsSection } from "@/components/products-section"
import { RafflesSection } from "@/components/raffles-section"
import { ContactSection } from "@/components/contact-section"
import { DigitalEcosystemSection } from "@/components/digital-ecosystem-section"
import { DeliverySection } from "@/components/delivery-section"
import { BenefitsSection } from "@/components/benefits-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { PromotionsSection } from "@/components/promotions-section"

export default function Home() {
    return (
        <div className="flex flex-col gap-20 pb-20">
            <HeroSection />
            <StatsSection />
            <BenefitsSection />
            <ProductsSection />

            <div id="online">
                <DigitalEcosystemSection />
            </div>

            <div id="domicilios">
                <DeliverySection />
            </div>

            <PromotionsSection />
            <TestimonialsSection />
            <RafflesSection />
            <ContactSection />
        </div>
    )
}
