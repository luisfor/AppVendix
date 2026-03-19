import { getModules } from '@/lib/actions/modules';
import { getPlans } from '@/lib/actions/saas-admin';
import ModuleManagement from '@/app/components/saas/ModuleManagement';

export default async function ModulesPage() {
    const modulesData = await getModules();
    const plans = await getPlans();

    return (
        <div className="p-8">
            <div className="mb-10">
                <h1 className="text-4xl font-black tracking-tighter text-[var(--text-main)] mb-2 uppercase">
                    Gestión de Módulos
                </h1>
                <p className="text-[var(--text-dim)] font-medium tracking-wide">
                    Controla el registro, activación y disponibilidad de las funcionalidades del sistema.
                </p>
            </div>

            <ModuleManagement
                initialData={JSON.parse(JSON.stringify(modulesData))}
                plans={JSON.parse(JSON.stringify(plans))}
            />
        </div>
    );
}
