# AppVendix - Sistema POS SaaS Escalable 🚀

AppVendix es una plataforma de Punto de Venta (POS) de última generación, diseñada con una **Arquitectura Modular de Plugins** y preparada para el despliegue masivo en la nube (SaaS).

## 🌟 Valor Diferencial
- **Arquitectura de Plugins**: Sistema altamente extensible donde cada funcionalidad de negocio (POS, Inventario, Reportes) es un módulo independiente.
- **Aislamiento Total**: Seguridad de grado bancario con aislamiento estricto de datos por empresa (Multi-tenancy).
- **Diseño Premium**: Interfaz moderna basada en **Glassmorphism**, temas oscuros profundos y tipografía optimizada (Outfit/Inter).

## 🛠️ Arquitectura y Características
### 1. Jerarquía de Administración de 3 Niveles
- **SaaS Super Administrator**:
    - Gestión global de empresas cliente.
    - Configuración de planes y **Registry de Módulos**.
    - Gestión de ciclos de facturación y métricas de plataforma.
- **Company Administrator**:
    - Control total sobre su empresa y sucursales.
    - Activación de módulos permitidos según su plan.
- **Usuarios Operativos (Staff)**: Roles RBAC (Cajeros, Supervisores) con permisos limitados.

### 2. Arquitectura Modular (System Plugins) 🧩
El sistema utiliza un motor de carga dinámica de módulos:
- **Registry Central**: Ubicado en `src/lib/modules/registry.ts`, define los metadatos de acceso y rutas.
- **Plugins Aislados**: Toda la lógica de negocio reside en `src/modules/[module]`, separando el core de la aplicación de las funcionalidades específicas.
- **Navegación Dinámica**: El Sidebar se genera en tiempo real basándose en los módulos habilitados para el tenant actual.

### 3. Motor de Cumplimiento de Planes (Plan Enforcement) 🛡️
- **Límites Estrictos**: Controla sucursales, usuarios y productos.
- **Acceso por Módulos**: El middleware valida en tiempo real si una empresa tiene permiso para acceder a una ruta de plugin específica.

### 4. Soporte Proactivo (Impersonación) 🎭
Permite al Super Admin entrar en el panel de cualquier cliente para soporte técnico con registro completo de auditoría.

## 💻 Stack Tecnológico
- **Frontend**: Next.js 15+ (App Router), TypeScript, Tailwind CSS.
- **Backend**: Server Actions, Next.js Middleware para seguridad perimetral.
- **Base de Datos**: PostgreSQL.
- **ORM**: Prisma 6.
- **Testing**: Playwright (E2E Testing).

## 📂 Estructura de Proyecto Clave
- `src/app`: Rutas principales y layouts.
- `src/modules`: **[NUEVO]** Plugins de negocio (POS, etc.).
- `src/lib/actions`: Acciones de servidor centralizadas.
- `src/lib/modules`: Lógica de registro y validación de plugins.
- `scripts/`: Utilidades de seeding y mantenimiento.

## 🚀 Instalación y Puesta en Marcha

1. **Instalación**:
    ```bash
    npm install
    npx playwright install
    ```

2. **Configuración (.env)**:
    ```env
    DATABASE_URL="postgresql://USUARIO:PASSWORD@localhost:5432/pos_saas"
    ```

3. **Base de Datos**:
    ```bash
    npx prisma db push
    npx prisma generate
    npx tsx scripts/seed-modules.ts # Seed de módulos base
    ```

4. **Desarrollo**:
    ```bash
    npm run dev
    ```

## 🔍 Verificación
- `/saas-admin`: Dashboard de Plataforma.
- `/pos`: Terminal de Punto de Venta (Plugin).
- `npm run test:e2e`: Ejecutar suite de pruebas.

---
*Desarrollado con estándares de ingeniería de software de alto nivel por **Antigravity**.*
