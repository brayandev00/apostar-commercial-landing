import { SeccionHero } from "@/components/seccionHero"
import { SeccionEstadisticas } from "@/components/seccionEstadisticas"
import { SeccionProductos } from "@/components/seccionProductos"
import { SeccionSorteos } from "@/components/seccionSorteos"
import { SeccionContacto } from "@/components/seccionContacto"
import { SeccionApostarOnline } from "@/components/seccionApostarOnline"
import { SeccionDomicilios } from "@/components/seccionDomicilios"
import { SeccionBeneficios } from "@/components/seccionBeneficios"

export default function Home() {
    return (
        <div className="flex flex-col gap-20 pb-20">
            <SeccionHero />
            <SeccionEstadisticas />
            <SeccionBeneficios />
            <SeccionProductos />

            <div id="online">
                <SeccionApostarOnline />
            </div>

            <div id="domicilios">
                <SeccionDomicilios />
            </div>



            <SeccionSorteos />
            <SeccionContacto />
        </div>
    )
}
