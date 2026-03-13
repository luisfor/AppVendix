# AppVendix - Sistema POS SaaS Escalable

AppVendix es una plataforma de Punto de Venta (POS) diseñada para la era moderna, con un enfoque en escalabilidad SaaS, diseño premium y robustez técnica.

## 🚀 Características Principales

- **Jerarquía de 3 Niveles**:
    1. **SaaS Super Admin**: Control total del sistema, gestión de clientes y planes.
    2. **Admin de Empresa**: Gestión de su propia empresa, sucursales y usuarios.
    3. **Usuarios Operativos**: Cajeros, supervisores y personal de almacén con RBAC.
- **Arquitectura Multi-Tenant**: Aislamiento estricto de datos mediante `company_id`.
- **Gestión de Suscripciones**: Activación modular de módulos (Inventario, Reportes, Taller) según el plan.
- **Seguridad RBAC**: Control de acceso basado en roles y permisos configurable por empresa.

## 🛠️ Stack Tecnológico

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS, Lucide React.
- **Backend**: Next.js Server Actions / API Routes.
- **Base de Datos**: PostgreSQL.
- **ORM**: Prisma 7.
- **Estilos**: Vanilla CSS + Tailwind.

## 📂 Estructura del Proyecto

- `src/app`: Rutas y componentes de la interfaz de usuario.
- `src/lib/actions`: Lógica de negocio (Ventas, Inventario).
- `src/lib/prisma`: Cliente de base de datos Singleton.
- `prisma/`: Esquema de base de datos y migraciones.

## ⚙️ Configuración e Instalación

1.  **Requisitos**: Node.js v18+, PostgreSQL.
2.  **Instalación**: `npm install`.
3.  **Base de Datos**:
    - Configurar `DATABASE_URL` en `.env`.
    - Ejecutar `npx prisma db push` para sincronizar el esquema.
4.  **Ejecución**: `npm run dev`.

## ✅ Verificación Automatizada

El sistema incluye pruebas de flujo de venta en `src/lib/actions/test-sale.ts`. Estas pruebas verifican:
1. Creación de empresa y sucursal.
2. Registro de productos e inventario inicial.
3. Ejecución de venta transaccional.
4. Verificación del descuento correcto en el stock.

---

Diseñado con ❤️ por **Antigravity** para Luis.
