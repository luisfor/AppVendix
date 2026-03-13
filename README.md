# AppVendix - Sistema POS SaaS Escalable

AppVendix es una plataforma de Punto de Venta (POS) diseñada para la era moderna, con un enfoque en escalabilidad SaaS, diseño premium y robustez técnica.

## 🚀 Características Principales

- **Arquitectura Multi-Tenant**: Aislamiento de datos por empresa, garantizando que cada cliente solo acceda a su información.
- **Gestión de Sucursales**: Control centralizado de múltiples sucursales por empresa.
- **Inventario en Tiempo Real**: Descuento automático de stock tras cada venta con soporte para alertas de stock bajo.
- **Interfaz Premium**: Diseño oscuro (Dark Mode) con estética de "glassmorphism", micro-animaciones y una experiencia de usuario fluida.
- **Lógica de Ventas Robusta**: Transacciones ACID para asegurar la integridad de las ventas y el inventario.

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
