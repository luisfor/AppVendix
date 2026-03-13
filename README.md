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

### 3. Sistema de Temas (Tema Dinámico)
- **Persistencia en Base de Datos**: La preferencia del usuario se guarda en el perfil, permitiendo una experiencia consistente en cualquier dispositivo.
- **Modos**: Oscuro (Default) y Claro, con transiciones suaves y optimización de contraste.

### 4. Pruebas de Extremo a Extremo (E2E)
- **Playwright**: Suite completa de pruebas automatizadas que cubren flujos críticos de negocio como autenticación, gestión de empresas y cambio de temas.

## 💻 Stack Tecnológico
- **Frontend**: Next.js 15+, TypeScript, Tailwind CSS.
- **Base de Datos**: PostgreSQL para persistencia relacional.
- **ORM**: Prisma 6 (Optimizado para rendimiento y seguridad de tipos).
- **Testing**: Playwright (E2E Testing en navegadores reales).

## 🚀 Instalación y Puesta en Marcha

1. **Prerrequisitos**: 
    - Node.js v18+ 
    - PostgreSQL activo.

2. **Instalación de Dependencias**:
    ```bash
    npm install
    npx playwright install chromium --with-deps
    ```

3. **Configuración de Variables de Entorno**:
    Crear un archivo `.env` con:
    ```env
    DATABASE_URL="postgresql://USUARIO:PASSWORD@localhost:5432/pos_saas?schema=public"
    ```

4. **Preparación de la Base de Datos**:
    ```bash
    npx prisma db push
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

### Rutas Clave
- `/saas-admin`: Dashboard Global para el Dueño de la Plataforma.
- `/auth/login`: Portal de acceso seguro.
- `/`: Dashboard operativo para empresas cliente.

### Ejecución de Pruebas E2E
El sistema incluye una suite de pruebas profesional. Para ejecutarlas:

```bash
# Ejecutar todas las pruebas en modo headless
npm run test:e2e

# Ejecutar con interfaz visual para depuración
npm run test:e2e:ui
```

---
*Desarrollado con estándares de ingeniería de software de alto nivel por **Antigravity**.*
