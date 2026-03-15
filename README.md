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

### 2. Control Total y Soporte (Impersonación) 🎭
El sistema incluye una función avanzada de **Impersonación** para el Super Admin:
- **Soporte Proactivo**: Permite al administrador global entrar en la cuenta de cualquier empresa cliente para resolver problemas técnicos "in-situ" sin pedir contraseñas.
- **Auditoría**: Cada sesión de impersonación genera un log de auditoría para garantizar la seguridad y transparencia.
- **Vista de Espejo**: El administrador ve exactamente la misma interfaz y datos que el cliente final.

### 3. Motor de Cumplimiento de Planes (Plan Enforcement) 🛡️
AppVendix integra un motor de validación en tiempo real para asegurar la rentabilidad del SaaS:
- **Límites Estrictos**: Controla el número máximo de sucursales, usuarios, productos y correos electrónicos mensuales.
- **Estado Over-Limit**: Gestión elegante de excesos de uso, permitiendo la operación normal pero bloqueando la creación de nuevos recursos hasta una actualización de plan o limpieza.
- **Reseteo Automático**: Ciclos automáticos de métricas de uso basados en la fecha de suscripción del cliente.

### 4. Sistema de Facturación y Pagos 💳
Arquitectura preparada para integración con pasarelas de pago (Stripe/PayPal):
- **Generación Automática**: Facturación recurrente automatizada al inicio de cada ciclo.
- **Simulación de Pago Manual**: Permite al administrador marcar facturas como pagadas manualmente para clientes que realicen transferencias directas.
- **Estados de Gracia (Grace Period)**: Gestión automatizada de suspensiones tras facturas vencidas.

### 5. Dashboard Contextual e Interactivo 📊
Panel de control dinámico con:
- **Filtrado por KPI**: Haz clic en cualquier métrica (MRR, Empresas Activas, por Plan) para filtrar la tabla de gestión instantáneamente.
- **Paginación Server-Side**: Optimizado para manejar miles de inquilinos con alto rendimiento.
- **Persistencia en Base de Datos**: La preferencia del usuario se guarda en el perfil, permitiendo una experiencia consistente en cualquier dispositivo.
- **Modos**: Oscuro (Default) y Claro, con transiciones suaves y optimización de contraste.

### 7. Pruebas de Extremo a Extremo (E2E)
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
