# AI Excel - Intelligent Spreadsheet Processing

Un sistema de inteligencia artificial modular y escalable para interpretar imágenes y modificar archivos Excel, construido con un monorepo que incluye backend (Node.js/Express/PostgreSQL), frontend (Next.js/TypeScript/React), y API de IA (Python/TensorFlow).

## 🚀 Características Principales

- **Procesamiento de Excel con IA**: Interpreta y modifica archivos Excel automáticamente
- **Reconocimiento de Imágenes**: Analiza imágenes de productos para categorización automática
- **Arquitectura Modular**: Monorepo escalable con separación clara de responsabilidades
- **Autenticación Segura**: Sistema de login con JWT y protección de rutas
- **UI Moderna**: Interfaz construida con Next.js, TypeScript y shadcn/ui
- **Base de Datos Robusta**: PostgreSQL con Sequelize ORM y migraciones

## 📁 Estructura del Proyecto

```
AI-Excel/
├── apps/
│   ├── backend/           # API Node.js/Express
│   ├── frontend/          # Aplicación Next.js
│   └── ai-api/           # API Python/TensorFlow (futuro)
├── packages/
│   └── common/           # Tipos y utilidades compartidas (futuro)
└── docs/                 # Documentación del proyecto
```

## 🛠️ Tecnologías

### Backend

- **Node.js** + **Express.js** - Server y API REST
- **PostgreSQL** - Base de datos relacional
- **Sequelize** - ORM con migraciones y seeders
- **JWT** - Autenticación y autorización
- **bcrypt** - Encriptación de contraseñas
- **Helmet** + **CORS** - Seguridad

### Frontend

- **Next.js 15** - Framework React con App Router
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Styling utility-first
- **shadcn/ui** - Componentes UI accesibles
- **React Hook Form** - Manejo de formularios
- **Context API** - Manejo de estado

### AI (Próximamente)

- **Python** + **TensorFlow** - Procesamiento de IA
- **OpenCV** - Procesamiento de imágenes
- **Pandas** - Manipulación de datos
- **FastAPI** - API de IA

### Infraestructura

- **AWS S3** - Almacenamiento de archivos
- **Vercel** - Despliegue del frontend
- **AWS/DigitalOcean** - Despliegue del backend

## 🏗️ Arquitectura

### Base de Datos

- **users** - Gestión de usuarios
- **excel_files** - Archivos Excel subidos
- **categories** - Categorías de productos
- **products** - Productos identificados
- **images** - Imágenes analizadas
- **prompts** - Prompts de IA
- **prediction_logs** - Logs de predicciones

### Flujo de Trabajo

1. **Autenticación** - Usuario se loguea
2. **Upload Excel** - Subida de archivo Excel
3. **Upload Images** - Subida de imágenes de productos
4. **AI Processing** - Análisis con IA
5. **Excel Update** - Modificación automática del Excel
6. **Download** - Descarga del archivo procesado

## 🚀 Instalación y Configuración

### Prerrequisitos

- Node.js 18+
- PostgreSQL 12+
- npm o yarn

### Backend Setup

```bash
cd apps/backend
npm install
cp .env.example .env
# Configurar variables de entorno
npm run migrate
npm run seed
npm run dev
```

### Frontend Setup

```bash
cd apps/frontend
npm install
cp .env.example .env.local
# Configurar variables de entorno
npm run dev
```

### Variables de Entorno

#### Backend (.env)

```env
NODE_ENV=
PORT=
DATABASE_URL=
JWT_SECRET=
JWT_EXPIRES_IN=
```

#### Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=
```

## 📝 Estado Actual del Desarrollo

### ✅ Completado

- [x] Diseño y configuración de base de datos
- [x] Backend API con autenticación JWT
- [x] Frontend modular con Next.js y TypeScript
- [x] Sistema de login/logout
- [x] Protección de rutas
- [x] Componentes UI con shadcn/ui
- [x] Estructura modular y escalable
- [x] Configuración de desarrollo

### 🚧 En Desarrollo

- [ ] Integración con Vercel AI SDK
- [ ] Upload de archivos Excel
- [ ] Procesamiento de imágenes con IA
- [ ] Modificación automática de Excel
- [ ] Integración con AWS S3

### 📋 Roadmap

- [ ] API de IA en Python
- [ ] Sistema de notificaciones
- [ ] Dashboard analytics
- [ ] Tests unitarios y E2E
- [ ] CI/CD pipeline
- [ ] Documentación completa
- [ ] Despliegue en producción

## 🔐 Autenticación

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.


**Nota**: Este proyecto está en desarrollo activo. Las características y la API pueden cambiar.
