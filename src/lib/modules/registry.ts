'use client';

export interface ModuleMetadata {
    code: string;
    name: string;
    description: string;
    icon: string;
    route: string;
    requiredRole?: string;
}

export const SYSTEM_MODULES: ModuleMetadata[] = [
    {
        code: 'POS_BASIC',
        name: 'Punto de Venta',
        description: 'Gestión de ventas y terminal de pago.',
        icon: '🛒',
        route: '/pos',
    },
    {
        code: 'INVENTORY_BASIC',
        name: 'Inventario',
        description: 'Control de stock y almacenes.',
        icon: '📦',
        route: '/inventory',
    },
    {
        code: 'REPORTS_BASIC',
        name: 'Reportes',
        description: 'Análisis y estadísticas de negocio.',
        icon: '📊',
        route: '/reports',
    },
];

export function getModuleByCode(code: string) {
    return SYSTEM_MODULES.find(m => m.code === code);
}

export function getModuleByRoute(route: string) {
    return SYSTEM_MODULES.find(m => route.startsWith(m.route));
}
