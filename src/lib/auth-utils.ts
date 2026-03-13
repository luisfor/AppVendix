import prisma from './prisma.ts';
import { SystemRole, CompanyStatus } from '@prisma/client';

export interface AuthSession {
    userId: string;
    systemRole: SystemRole;
    companyId?: string;
}

/**
 * Middleware conceptual para validar permisos a nivel de base de datos
 * En Next.js App Router, se usa dentro de Server Actions o Layouts
 */
export async function checkAccess(session: AuthSession, requiredPermission?: { action: string, resource: string }) {
    // 1. Verificar si el usuario existe
    const user = await prisma.user.findUnique({
        where: { id: session.userId },
        include: {
            company: true,
            role: { include: { permissions: true } }
        },
    });

    if (!user) throw new Error('Usuario no autorizado');

    // 2. Si pertenece a una empresa, verificar el estado de la misma
    if (user.companyId && user.companyId !== 'GLOBAL') {
        if (user.company?.status === CompanyStatus.SUSPENDED) {
            throw new Error('Su cuenta de empresa ha sido suspendida. Contacte al administrador del sistema.');
        }
    }

    // 3. Si es Super Admin, tiene acceso total a todo (opcional, dependiendo de si queremos RBAC estricto incluso para ellos)
    if (user.systemRole === SystemRole.SAAS_SUPER_ADMIN) {
        return true;
    }

    // 4. Verificar permisos específicos
    if (requiredPermission) {
        const hasPermission = user.role?.permissions.some(
            p => p.action === requiredPermission.action && p.resource === requiredPermission.resource
        );

        if (!hasPermission) {
            throw new Error(`Permiso denegado: No tiene autorización para ${requiredPermission.action} en ${requiredPermission.resource}`);
        }
    }

    return true;
}

/**
 * Verifica si un módulo específico está habilitado para la empresa
 */
export async function isModuleEnabled(companyId: string, moduleCode: string) {
    const companyModule = await prisma.companyModule.findFirst({
        where: {
            companyId,
            module: { code: moduleCode },
            enabled: true,
        },
    });

    return !!companyModule;
}
