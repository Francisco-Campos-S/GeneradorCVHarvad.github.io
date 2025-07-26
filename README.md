# Generador CV Harvard

Generador de CV profesional en formato Harvard con arquitectura mejorada y compatibilidad ATS.

## 🚀 Características

- **Formato Harvard Auténtico**: Estructura académica reconocida mundialmente
- **Compatible ATS**: Optimizado para filtros automáticos de reclutamiento
- **Arquitectura Moderna**: Código orientado a objetos con patrones enterprise
- **Validación en Tiempo Real**: Sistema avanzado de validación de formularios
- **Exportación Múltiple**: PDF y Word con formato profesional
- **Tema Oscuro/Claro**: Interfaz adaptable al usuario
- **Enlaces Funcionales**: WhatsApp, LinkedIn y Portfolio integrados

## 📁 Estructura del Proyecto

```
GeneradorCVHarvard/
├── index.html          # Aplicación principal
├── script.js           # Lógica de negocio (arquitectura OOP)
├── package.json        # Configuración del proyecto
├── README.md          # Documentación
└── .gitignore         # Archivos ignorados por Git
```

## 🛠️ Instalación y Uso

### Opción 1: Uso Directo
1. Abre `index.html` directamente en tu navegador
2. Completa los campos del formulario
3. Genera y descarga tu CV en formato Harvard

### Opción 2: Servidor Local
```bash
# Opción Python
python -m http.server 8000

# Opción Node.js (si tienes instalado)
npx http-server

# Luego abre: http://localhost:8000
```

## 🎯 Funcionalidades

### Generación de CV
- **Información Personal**: Datos de contacto con enlaces funcionales
- **Perfil Profesional**: Resumen ejecutivo personalizado
- **Educación**: Formación académica estructurada
- **Experiencia**: Historial laboral con formato profesional
- **Habilidades**: Competencias técnicas organizadas por categorías
- **Proyectos**: Portfolio de trabajos destacados
- **Certificaciones**: Credenciales profesionales
- **Idiomas**: Niveles de competencia lingüística

### Tecnología
- **Frontend**: HTML5, CSS3 (Variables CSS), JavaScript ES6+
- **Framework CSS**: Bootstrap 5.1.3
- **Iconos**: Font Awesome 6.0.0
- **Arquitectura**: Patrón Singleton, Clases ES6, Separación de responsabilidades
- **Almacenamiento**: LocalStorage con validación de integridad
- **Validación**: Sistema de validación en tiempo real con RegEx

## 🔧 Arquitectura del Código

### Clases Principales
- **CVGenerator**: Controlador principal (Singleton)
- **CVUtils**: Utilidades y validadores
- **StorageManager**: Gestión de persistencia de datos
- **FormValidator**: Validación de formularios en tiempo real
- **HTMLGenerator**: Generación de templates HTML
- **NotificationManager**: Sistema de notificaciones

### Patrones Implementados
- Singleton Pattern
- Observer Pattern (para validación)
- Template Method (para generación HTML)
- Strategy Pattern (para diferentes formatos de exportación)

## 📋 Formato Harvard

El CV generado sigue las especificaciones del formato Harvard:
- Tipografía: Times New Roman 12pt
- Estructura limpia sin elementos gráficos
- Secciones claramente definidas
- Optimizado para sistemas ATS
- Espaciado profesional

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 👨‍💻 Autor

**Francisco Campos**
- GitHub: [@Francisco-Campos-S](https://github.com/Francisco-Campos-S)

---

⭐ Si este proyecto te ayudó, ¡dale una estrella en GitHub!
