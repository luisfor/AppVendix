# AppVendix - Sistema POS SaaS Escalable 🚀

AppVendix es una plataforma de Punto de Venta (POS) de última generación, diseñada con una arquitectura de micro-servicios modular y preparada para el despliegue masivo en la nube (SaaS). 

## 🌟 Valor Diferencial
- **Aislamiento Total**: Seguridad de grado bancario con aislamiento estricto de datos por empresa (Multi-tenancy).
- **Diseño Premium**: Interfaz moderna basada en **Glassmorphism**, temas oscuros profundos y tipografía optimizada para legibilidad.
- **Escalabilidad**: Preparado para crecer desde una sola tienda hasta grandes corporaciones con múltiples sucursales.

## 🛠️ Arquitectura y Características
### 1. Jerarquía de Administración de 3 Niveles
- **SaaS Super Administrator (Dueño del Sistema)**:
    - Gestión global de empresas cliente (Alta, Baja, Suspensión).
    - Configuración de planes de suscripción y precios.
    - Activación/Desactivación de módulos globales.
    - Métricas de uso y facturación global.
- **Company Administrator (Dueño del Negocio)**:
    - Control total sobre su propia empresa y sucursales.
    - Gestión de usuarios y asignación de roles operativos (RBAC).
    - Configuración de inventarios y catálogos.
- **Usuarios Operativos (Staff)**:
    - Roles específicos: Cajeros, Supervisores, Almaceneros.
    - Permisos limitados según el perfil definido por la empresa.

### 2. Módulos y Planes de Suscripción
El sistema incluye un motor de **Feature Flags** que activa funcionalidades dinámicamente:
- **Plan Básico**: POS Core + Inventario esencial.
- **Plan Profesional**: POS + Inventario Avanzado + Reportes Pro.
- **Plan Enterprise**: Acceso total incluyendo Módulo de Taller y Soporte.

## 💻 Stack Tecnológico
- **Frontend**: Next.js 14+, TypeScript, Tailwind CSS.
- **Base de Datos**: PostgreSQL para persistencia relacional.
- **ORM**: Prisma 6 (Optimizado para rendimiento y seguridad de tipos).
- **Middleware**: Control de acceso granular (RBAC) y validación de Tenant.

## 🚀 Instalación y Puesta en Marcha

1. **Prerrequisitos**: 
    - Node.js v18+ 
    - PostgreSQL activo.

2. **Instalación de Dependencias**:
    ```bash
    npm install
    ```

3. **Configuración de Variables de Entorno**:
    Crear un archivo `.env` con:
    ```env
    DATABASE_URL="postgresql://USUARIO:PASSWORD@localhost:5432/pos_saas?schema=public"
    ```

4. **Preparación de la Base de Datos**:
    ```bash
    npx prisma db push
    # Re-generar cliente si se realizaron cambios en el esquema
    npx prisma generate
    ```

5. **Carga de Datos Maestros (Seeding)**:
    ```bash
    npx ts-node -r dotenv/config prisma/seed.ts
    ```

6. **Iniciar Desarrollo**:
    ```bash
    npm run dev
    ```

## 🔍 Verificación del Sistema
Para validar la integridad del sistema SaaS, puede acceder a las siguientes rutas tras ejecutar el seed:
- `/sucursales`: Gestión de locales comerciales.
- `/usuarios`: Administración de personal y roles.
- `/`: Dashboard principal con métricas en tiempo real.

---
*Desarrollado con estándares de ingeniería de software de alto nivel por **Antigravity**.*
