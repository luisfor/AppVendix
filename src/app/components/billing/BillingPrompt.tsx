import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth-utils';
import { CompanyStatus } from '@prisma/client';
import Link from 'next/link';

export default async function BillingPrompt() {
    let session = null;
    let company = null;

    try {
        session = await getSession();
        if (!session || !session.companyId) return null;

        company = await prisma.company.findUnique({
            where: { id: session.companyId },
            include: { plan: true }
        });
    } catch (error) {
        console.error('Error fetching billing prompt data:', error);
        return null;
    }

    if (!company) return null;

    const now = new Date();
    const isSuspended = company.status === CompanyStatus.SUSPENDED ||
        (company.subscriptionEndsAt && company.subscriptionEndsAt < now);

    let message = '';
    let btnText = 'Gestionar Suscripción';
    let bannerColor = 'bg-blue-500/10 border-blue-500/30 text-blue-300';
    let icon = '💳';

    if (isSuspended) {
        message = 'Tu suscripción ha expirado. El acceso a las funciones principales está bloqueado hasta que actualices tu plan.';
        btnText = 'Pagar Ahora';
        bannerColor = 'bg-red-500/10 border-red-500/30 text-red-300';
        icon = '⚠️';
    } else if (company.subscriptionEndsAt) {
        const diffTime = Math.abs(company.subscriptionEndsAt.getTime() - now.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays <= 7) {
            message = `¡Atención! Tu plan expira en ${diffDays} días. Renueva pronto para evitar interrupciones.`;
            bannerColor = 'bg-amber-500/10 border-amber-500/30 text-amber-300';
            icon = '⏳';
        } else {
            message = `Suscripción Activa (${company.plan?.name || 'Básico'}). Tu próximo cobro es en ${diffDays} días.`;
            bannerColor = 'bg-green-500/10 border-green-500/30 text-green-300';
            icon = '✅';
        }
    } else if (company.status === CompanyStatus.TRIAL) {
        message = 'Estás en tu periodo de prueba. ¡Actualiza al Plan Pro hoy para desbloquear todo!';
        btnText = 'Ver Planes';
        icon = '🎁';
    }

    return (
        <div className={`p-4 mb-8 rounded-xl border flex flex-col sm:flex-row gap-4 items-center justify-between ${bannerColor} animate-in fade-in zoom-in duration-500`}>
            <div className="flex items-center gap-3">
                <span className="text-2xl">{icon}</span>
                <p className="font-medium text-sm sm:text-base">{message}</p>
            </div>

            <Link
                href="/billing"
                className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-bold tracking-wide uppercase transition-colors whitespace-nowrap"
            >
                {btnText}
            </Link>
        </div>
    );
}
