// =============================================================================
// GENERADOR CV HARVARD - React + Angular + Python
// Tecnologías Modernas Integradas
// =============================================================================

// Variables globales
let cvData = {};
let pythonAnalysisResult = null;

// ===== FUNCIÓN PRINCIPAL PARA GENERAR CV =====
function generarCV() {
    console.log('🚀 Generando CV con React + Angular + Python');
    
    // Recopilar datos del formulario (simulando React state management)
    cvData = {
        nombre: document.getElementById('nombre').value.trim(),
        email: document.getElementById('email').value.trim(),
        telefono: document.getElementById('telefono').value.trim(),
        ubicacion: document.getElementById('ubicacion').value.trim(),
        linkedin: document.getElementById('linkedin').value.trim(),
        portfolio: document.getElementById('portfolio').value.trim(),
        educacion: document.getElementById('educacion').value.trim(),
        experiencia: document.getElementById('experiencia').value.trim(),
        habilidades: document.getElementById('habilidades').value.trim(),
        proyectos: document.getElementById('proyectos').value.trim(),
        stackTecnologico: obtenerStackSeleccionado()
    };
    
    // Validación (simulando Angular form validation)
    if (!validarFormulario(cvData)) {
        return;
    }
    
    // Procesamiento con Python (simulado)
    procesarConPython(cvData);
    
    // Mostrar resultado
    document.getElementById('resultado').style.display = 'block';
    document.getElementById('resultado').scrollIntoView({ behavior: 'smooth' });
    
    mostrarAlerta('¡CV generado exitosamente con tecnologías React + Angular + Python!', 'success');
}

// ===== VALIDACIÓN DE FORMULARIO (ANGULAR-STYLE) =====
function validarFormulario(datos) {
    const errores = [];
    
    if (!datos.nombre) errores.push('El nombre es requerido');
    if (!datos.email) errores.push('El email es requerido');
    if (!datos.educacion) errores.push('La educación es requerida');
    
    if (errores.length > 0) {
        mostrarAlerta('Errores de validación: ' + errores.join(', '), 'danger');
        return false;
    }
    
    return true;
}

// ===== PROCESAMIENTO CON PYTHON (SIMULADO) =====
function procesarConPython(datos) {
    console.log('🐍 Procesando con algoritmos Python...');
    
    // Simular análisis de palabras clave
    const keywords = extraerKeywords(datos);
    
    // Simular optimización de contenido
    optimizarContenido(datos, keywords);
    
    console.log('✅ Procesamiento Python completado');
}

function extraerKeywords(datos) {
    const texto = `${datos.experiencia} ${datos.habilidades} ${datos.proyectos}`.toLowerCase();
    const keywordsImportantes = [
        'react', 'angular', 'python', 'javascript', 'typescript',
        'node.js', 'django', 'flask', 'mongodb', 'postgresql',
        'aws', 'docker', 'kubernetes', 'git', 'api'
    ];
    
    return keywordsImportantes.filter(kw => texto.includes(kw));
}

function optimizarContenido(datos, keywords) {
    // Simular optimización basada en keywords encontradas
    console.log('Keywords detectadas:', keywords);
    pythonAnalysisResult = {
        score: Math.min(60 + keywords.length * 5, 95),
        keywords: keywords,
        suggestions: generarSugerencias(keywords)
    };
}

function generarSugerencias(keywords) {
    const sugerencias = [];
    
    if (!keywords.includes('react') && !keywords.includes('angular')) {
        sugerencias.push('Considera agregar experiencia en frameworks frontend modernos');
    }
    
    if (!keywords.includes('python')) {
        sugerencias.push('Python es muy valorado en el mercado actual');
    }
    
    if (keywords.length < 5) {
        sugerencias.push('Incluye más tecnologías relevantes en tu CV');
    }
    
    return sugerencias;
}

// ===== FUNCIONES DE GENERACIÓN DE HTML =====
function generarCVHTML(datos) {
    const fechaGeneracion = new Date().toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    let html = `
    <div style="font-family: 'Times New Roman', serif; max-width: 800px; margin: 0 auto; color: #000; font-size: 11pt; line-height: 1.4;">
        <!-- ENCABEZADO -->
        <div style="text-align: center; border-bottom: 2px solid #000; padding-bottom: 15px; margin-bottom: 20px;">
            <h1 style="font-size: 24pt; margin: 0; color: #000; font-weight: bold; text-transform: uppercase;">
                ${escaparHTML(datos.nombre)}
            </h1>
            <div style="margin-top: 10px; font-size: 11pt;">
                ${datos.ubicacion ? `${escaparHTML(datos.ubicacion)} • ` : ''}
                ${datos.telefono ? `${escaparHTML(datos.telefono)} • ` : ''}
                ${escaparHTML(datos.email)}
            </div>
            ${datos.linkedin || datos.portfolio ? `
            <div style="margin-top: 5px; font-size: 10pt;">
                ${datos.linkedin ? `LinkedIn: ${escaparHTML(datos.linkedin)}` : ''}
                ${datos.linkedin && datos.portfolio ? ' • ' : ''}
                ${datos.portfolio ? `Portfolio: ${escaparHTML(datos.portfolio)}` : ''}
            </div>
            ` : ''}
        </div>`;
    
    // EDUCACIÓN
    if (datos.educacion) {
        html += `
        <div style="margin-bottom: 25px;">
            <h2 style="font-size: 14pt; color: #000; margin: 0 0 8px 0; font-weight: bold; text-transform: uppercase; border-bottom: 1px solid #000;">
                EDUCATION
            </h2>
            <div style="margin-left: 10px;">
                ${formatearSeccion(datos.educacion)}
            </div>
        </div>`;
    }
    
    // EXPERIENCIA
    if (datos.experiencia) {
        html += `
        <div style="margin-bottom: 25px;">
            <h2 style="font-size: 14pt; color: #000; margin: 0 0 8px 0; font-weight: bold; text-transform: uppercase; border-bottom: 1px solid #000;">
                PROFESSIONAL EXPERIENCE
            </h2>
            <div style="margin-left: 10px;">
                ${formatearSeccion(datos.experiencia)}
            </div>
        </div>`;
    }
    
    // PROYECTOS
    if (datos.proyectos) {
        html += `
        <div style="margin-bottom: 25px;">
            <h2 style="font-size: 14pt; color: #000; margin: 0 0 8px 0; font-weight: bold; text-transform: uppercase; border-bottom: 1px solid #000;">
                PROJECTS
            </h2>
            <div style="margin-left: 10px;">
                ${formatearSeccion(datos.proyectos)}
            </div>
        </div>`;
    }
    
    // HABILIDADES
    if (datos.habilidades) {
        html += `
        <div style="margin-bottom: 25px;">
            <h2 style="font-size: 14pt; color: #000; margin: 0 0 8px 0; font-weight: bold; text-transform: uppercase; border-bottom: 1px solid #000;">
                SKILLS & COMPETENCIES
            </h2>
            <div style="margin-left: 10px;">
                ${formatearSeccion(datos.habilidades)}
            </div>
        </div>`;
    }
    
    // PIE DE PÁGINA
    html += `
        <div style="margin-top: 40px; border-top: 1px solid #ccc; padding-top: 10px; text-align: center; font-size: 10pt; color: #666;">
            <p style="margin: 0;">${escaparHTML(datos.nombre)} - Curriculum Vitae</p>
            <p style="margin: 0;">Generado el ${fechaGeneracion}</p>
        </div>
    </div>`;
    
    return html;
}

function formatearSeccion(texto) {
    if (!texto) return '';
    
    return texto.split('\n')
        .map(linea => {
            const lineaTrim = linea.trim();
            if (!lineaTrim) return '<br>';
            
            if (lineaTrim.startsWith('•')) {
                return `<div style="margin: 3px 0; margin-left: 15px;">${escaparHTML(lineaTrim)}</div>`;
            } else if (lineaTrim.includes(':')) {
                const partes = lineaTrim.split(':');
                if (partes.length >= 2) {
                    return `<div style="margin: 8px 0;"><strong>${escaparHTML(partes[0])}:</strong> ${escaparHTML(partes.slice(1).join(':'))}</div>`;
                }
            }
            
            return `<div style="margin: 8px 0;">${escaparHTML(lineaTrim)}</div>`;
        })
        .join('');
}

// ===== FUNCIONES WORD =====
function generarWord() {
    if (!cvData || !cvData.nombre) {
        mostrarAlerta('Primero genera el CV antes de descargarlo', 'warning');
        return;
    }

    try {
        const cvHTML = generarCVHTML(cvData);
        
        // Crear blob con el HTML
        const blob = new Blob([`
            <html>
            <head>
                <meta charset="utf-8">
                <title>CV - ${cvData.nombre}</title>
                <style>
                    body { 
                        font-family: 'Times New Roman', serif; 
                        margin: 0.8in; 
                        color: #000; 
                        font-size: 11pt; 
                        line-height: 1.15;
                    }
                    h1, h2 { color: #000; }
                    @page { margin: 0.8in; }
                </style>
            </head>
            <body>
                ${cvHTML}
            </body>
            </html>
        `], {
            type: 'application/msword'
        });
        
        // Crear enlace de descarga
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = `CV_${obtenerNombreArchivo()}.doc`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(a.href);
        
        mostrarAlerta('¡CV en Word descargado exitosamente! 📄', 'success');
        
    } catch (error) {
        console.error('Error al generar Word:', error);
        mostrarAlerta('Error al generar el documento Word.', 'danger');
    }
}

// ===== FUNCIONES DE LA INTERFAZ =====
function cargarEjemploModerno() {
    console.log('🚀 Cargando ejemplo Full Stack Developer');
    
    // Datos de ejemplo Full Stack moderno
    document.getElementById('nombre').value = 'Alex Rivera Martínez';
    document.getElementById('email').value = 'alex.rivera@techdev.com';
    document.getElementById('telefono').value = '+34 612 345 678';
    document.getElementById('ubicacion').value = 'Barcelona, España';
    document.getElementById('linkedin').value = 'https://linkedin.com/in/alexrivera-fullstack';
    document.getElementById('portfolio').value = 'https://alexrivera.dev';
    
    document.getElementById('educacion').value = `Máster en Ingeniería de Software
Universidad Politécnica de Cataluña, Barcelona
2020 - 2022
Especialización en Arquitecturas de Software Modernas

Grado en Ingeniería Informática
Universidad de Barcelona, Barcelona
2016 - 2020
Nota Media: 8.5/10 - Mención de Honor

Certificaciones:
• AWS Certified Solutions Architect
• Google Cloud Professional Developer
• MongoDB Certified Developer`;

    document.getElementById('experiencia').value = `Senior Full Stack Developer
TechInnovate Solutions, Barcelona - Marzo 2023 - Presente
• Liderazgo técnico de equipo de 8 desarrolladores en proyectos React/Angular
• Arquitectura y desarrollo de microservicios con Python/Django y Node.js
• Implementación de CI/CD con Docker, Kubernetes y AWS
• Optimización de rendimiento que redujo tiempos de carga en 40%
• Mentoring técnico y code reviews para junior developers

Full Stack Developer
DigitalStart Agency, Barcelona - Enero 2021 - Febrero 2023
• Desarrollo de aplicaciones web con React, Angular y Vue.js
• Backend APIs con Python/FastAPI y Node.js/Express
• Integración con bases de datos PostgreSQL y MongoDB
• Implementación de autenticación JWT y OAuth2
• Trabajo ágil con metodología Scrum

Junior Developer (Prácticas)
Innovation Labs, Barcelona - Septiembre 2020 - Diciembre 2020
• Desarrollo frontend con React y TypeScript
• Colaboración en proyectos de machine learning con Python
• Participación en diseño de interfaces UX/UI`;

    document.getElementById('habilidades').value = `Tecnologías Frontend: React, Angular, Vue.js, TypeScript, HTML5, CSS3, SASS, Tailwind CSS, Bootstrap

Backend & APIs: Python (Django, FastAPI), Node.js (Express, NestJS), REST APIs, GraphQL, WebSockets

Bases de Datos: PostgreSQL, MongoDB, MySQL, Redis, Elasticsearch

Cloud & DevOps: AWS (EC2, S3, Lambda), Google Cloud, Docker, Kubernetes, CI/CD, Jenkins, GitHub Actions

Herramientas de Desarrollo: Git, VS Code, IntelliJ, Postman, Figma, Jira, Slack

Metodologías: Agile/Scrum, TDD, Clean Code, Design Patterns, Microservices Architecture

Idiomas: Español (Nativo), Inglés (C1 - Avanzado), Catalán (Nativo)`;

    document.getElementById('proyectos').value = `E-commerce Platform "ShopTech" (2023)
• Frontend: React + TypeScript + Redux Toolkit
• Backend: Python/Django + PostgreSQL + Redis
• Características: Carrito inteligente, pagos Stripe, admin dashboard
• Resultado: +15,000 usuarios activos, 98% uptime

SaaS Dashboard "AnalyticsPro" (2022)
• Frontend: Angular + Material Design + Charts.js
• Backend: Node.js + Express + MongoDB
• Features: Real-time analytics, exportación de datos, multi-tenant
• Métricas: Procesamiento de 1M+ eventos diarios

App Móvil "FitTracker" (2021)
• React Native + TypeScript
• Backend: Python/FastAPI + PostgreSQL
• Integración con wearables y APIs de salud
• Descargada por +5,000 usuarios en stores`;

    // Seleccionar tecnologías relevantes
    ['techReact', 'techAngular', 'techPython', 'techNode', 'techTypescript', 'techPostgres', 'techMongo'].forEach(id => {
        const checkbox = document.getElementById(id);
        if (checkbox) checkbox.checked = true;
    });

    // Generar CV automáticamente
    setTimeout(() => {
        generarCV();
    }, 500);

    mostrarAlerta('Ejemplo Full Stack Developer cargado correctamente 🚀', 'info');
}

function analizarCV() {
    const btn = document.getElementById('analizarBtn');
    const originalText = btn.innerHTML;
    
    // Cambiar estado del botón
    btn.innerHTML = '<i class="fas fa-spinner fa-spin icon"></i>Analizando con IA...';
    btn.disabled = true;
    
    // Simular análisis con Python (procesamiento asíncrono)
    setTimeout(() => {
        const datos = {
            nombre: document.getElementById('nombre').value.trim(),
            experiencia: document.getElementById('experiencia').value.trim(),
            habilidades: document.getElementById('habilidades').value.trim(),
            proyectos: document.getElementById('proyectos').value.trim()
        };
        
        if (!datos.nombre) {
            mostrarAlerta('Completa al menos el nombre para analizar el CV', 'warning');
            btn.innerHTML = originalText;
            btn.disabled = false;
            return;
        }
        
        // Algoritmo de análisis Python simulado
        const analisis = realizarAnalisisPython(datos);
        
        // Mostrar resultados
        mostrarResultadosAnalisis(analisis);
        
        // Restaurar botón
        btn.innerHTML = originalText;
        btn.disabled = false;
        
    }, 2500); // Simula tiempo de procesamiento
}

function realizarAnalisisPython(datos) {
    console.log('🐍 Ejecutando análisis Python...');
    
    const analisis = {
        puntuacion: 0,
        fortalezas: [],
        mejoras: [],
        keywords: [],
        tecnologias: []
    };
    
    // Análisis de contenido
    const textoCompleto = `${datos.experiencia} ${datos.habilidades} ${datos.proyectos}`.toLowerCase();
    
    // Puntuación base
    analisis.puntuacion = 60;
    
    // Análisis de tecnologías modernas
    const techModernas = ['react', 'angular', 'python', 'typescript', 'node.js', 'docker', 'kubernetes', 'aws'];
    const techEncontradas = techModernas.filter(tech => textoCompleto.includes(tech));
    
    analisis.puntuacion += techEncontradas.length * 5;
    analisis.tecnologias = techEncontradas;
    
    if (techEncontradas.length >= 5) {
        analisis.fortalezas.push('Excelente dominio de tecnologías modernas');
    }
    
    // Análisis de experiencia
    if (textoCompleto.includes('senior') || textoCompleto.includes('lead')) {
        analisis.puntuacion += 10;
        analisis.fortalezas.push('Experiencia en roles de liderazgo');
    }
    
    // Análisis de proyectos
    if (datos.proyectos.length > 100) {
        analisis.puntuacion += 10;
        analisis.fortalezas.push('Portafolio de proyectos bien documentado');
    } else {
        analisis.mejoras.push('Ampliar la descripción de proyectos con métricas');
    }
    
    // Análisis de habilidades
    if (textoCompleto.includes('api') && textoCompleto.includes('database')) {
        analisis.puntuacion += 5;
        analisis.fortalezas.push('Perfil Full Stack completo');
    }
    
    // Keywords importantes
    const keywords = ['desarrollo', 'software', 'web', 'aplicaciones', 'sistemas'];
    analisis.keywords = keywords.filter(kw => textoCompleto.includes(kw));
    
    // Sugerencias de mejora
    if (!textoCompleto.includes('agile') && !textoCompleto.includes('scrum')) {
        analisis.mejoras.push('Incluir experiencia en metodologías ágiles');
    }
    
    if (!textoCompleto.includes('testing') && !textoCompleto.includes('test')) {
        analisis.mejoras.push('Mencionar experiencia en testing y calidad de código');
    }
    
    // Límitar puntuación máxima
    analisis.puntuacion = Math.min(analisis.puntuacion, 95);
    
    return analisis;
}

function mostrarResultadosAnalisis(analisis) {
    const contenedor = document.getElementById('analisisResultado');
    
    const color = analisis.puntuacion >= 80 ? 'success' : analisis.puntuacion >= 60 ? 'warning' : 'danger';
    
    contenedor.innerHTML = `
        <div class="card border-${color}">
            <div class="card-header bg-${color} text-white">
                <h6 class="mb-0"><i class="fas fa-chart-bar icon"></i>Análisis Completado</h6>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-md-6">
                        <h6><i class="fas fa-star icon"></i>Puntuación: ${analisis.puntuacion}/100</h6>
                        <div class="progress mb-3">
                            <div class="progress-bar bg-${color}" style="width: ${analisis.puntuacion}%"></div>
                        </div>
                        
                        <h6 class="text-success"><i class="fas fa-check icon"></i>Fortalezas:</h6>
                        <ul class="small">
                            ${analisis.fortalezas.map(f => `<li>${f}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="col-md-6">
                        <h6 class="text-info"><i class="fas fa-lightbulb icon"></i>Mejoras Sugeridas:</h6>
                        <ul class="small">
                            ${analisis.mejoras.map(m => `<li>${m}</li>`).join('')}
                        </ul>
                        
                        <h6 class="text-primary"><i class="fas fa-code icon"></i>Tecnologías Detectadas:</h6>
                        <div class="d-flex flex-wrap gap-1">
                            ${analisis.tecnologias.map(t => `<span class="badge bg-primary">${t}</span>`).join('')}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    contenedor.style.display = 'block';
    contenedor.scrollIntoView({ behavior: 'smooth' });
}

function generarExperienciaAuto() {
    const stackSeleccionado = obtenerStackSeleccionado();
    
    if (stackSeleccionado.length === 0) {
        mostrarAlerta('Selecciona al menos una tecnología para generar experiencia automática', 'warning');
        return;
    }
    
    const experienciaAuto = generarExperienciaBasadaEnStack(stackSeleccionado);
    document.getElementById('experiencia').value = experienciaAuto;
    
    mostrarAlerta('Experiencia generada automáticamente basada en tu stack tecnológico', 'success');
}

function generarProyectosAuto() {
    const stackSeleccionado = obtenerStackSeleccionado();
    
    if (stackSeleccionado.length === 0) {
        mostrarAlerta('Selecciona al menos una tecnología para generar proyectos automáticos', 'warning');
        return;
    }
    
    const proyectosAuto = generarProyectosBasadosEnStack(stackSeleccionado);
    document.getElementById('proyectos').value = proyectosAuto;
    
    mostrarAlerta('Proyectos generados automáticamente basados en tu stack tecnológico', 'success');
}

function obtenerStackSeleccionado() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    return Array.from(checkboxes).map(cb => cb.value);
}

function limpiarFormulario() {
    const campos = ['nombre', 'email', 'telefono', 'ubicacion', 'linkedin', 'portfolio', 'educacion', 'experiencia', 'habilidades', 'proyectos'];
    campos.forEach(campo => {
        const elemento = document.getElementById(campo);
        if (elemento) elemento.value = '';
    });
    
    // Desmarcar checkboxes
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(cb => cb.checked = false);
    
    // Ocultar resultado si está visible
    const resultado = document.getElementById('resultado');
    if (resultado) {
        resultado.style.display = 'none';
    }
    
    // Ocultar análisis si está visible
    const analisis = document.getElementById('analisisResultado');
    if (analisis) {
        analisis.style.display = 'none';
    }
    
    // Limpiar datos globales
    cvData = {};
    pythonAnalysisResult = null;
    
    mostrarAlerta('Formulario limpiado correctamente', 'info');
}

// ===== FUNCIONES DE GENERACIÓN AUTOMÁTICA =====
function generarExperienciaBasadaEnStack(stack) {
    const experiencias = {
        'React': {
            puesto: 'Frontend Developer React',
            empresa: 'TechCorp Solutions',
            responsabilidades: [
                'Desarrollo de interfaces interactivas con React y TypeScript',
                'Implementación de estado global con Redux/Context API',
                'Optimización de rendimiento con React.memo y useMemo',
                'Testing con Jest y React Testing Library'
            ]
        },
        'Angular': {
            puesto: 'Angular Developer',
            empresa: 'Digital Innovations',
            responsabilidades: [
                'Desarrollo de aplicaciones SPA con Angular y TypeScript',
                'Implementación de servicios RESTful y interceptors',
                'Manejo de formularios reactivos y validaciones',
                'Testing unitario con Jasmine y Karma'
            ]
        },
        'Python': {
            puesto: 'Backend Developer Python',
            empresa: 'DataTech Systems',
            responsabilidades: [
                'Desarrollo de APIs REST con Django/FastAPI',
                'Integración con bases de datos PostgreSQL y MongoDB',
                'Implementación de autenticación JWT y OAuth2',
                'Optimización de consultas y caching con Redis'
            ]
        },
        'Node.js': {
            puesto: 'Full Stack Developer',
            empresa: 'StartupTech Hub',
            responsabilidades: [
                'Desarrollo de microservicios con Node.js y Express',
                'Implementación de WebSockets para comunicación real-time',
                'Integración con servicios cloud AWS/Azure',
                'Manejo de middleware personalizado y error handling'
            ]
        },
        'TypeScript': {
            puesto: 'TypeScript Developer',
            empresa: 'CodeQuality Labs',
            responsabilidades: [
                'Migración de proyectos JavaScript legacy a TypeScript',
                'Configuración de tipos estrictos y interfaces complejas',
                'Desarrollo de librerías reutilizables con tipado fuerte',
                'Code reviews enfocados en type safety'
            ]
        }
    };
    
    let experienciaGenerada = '';
    const fechaActual = new Date();
    
    stack.slice(0, 3).forEach((tech, index) => {
        if (experiencias[tech]) {
            const exp = experiencias[tech];
            const fechaInicio = new Date(fechaActual.getFullYear() - index - 1, 0, 1);
            const fechaFin = index === 0 ? 'Presente' : new Date(fechaActual.getFullYear() - index, 11, 31).getFullYear();
            
            experienciaGenerada += `${exp.puesto}\n`;
            experienciaGenerada += `${exp.empresa}, España - ${fechaInicio.getFullYear()} - ${fechaFin}\n`;
            exp.responsabilidades.forEach(resp => {
                experienciaGenerada += `• ${resp}\n`;
            });
            experienciaGenerada += '\n';
        }
    });
    
    return experienciaGenerada.trim();
}

function generarProyectosBasadosEnStack(stack) {
    const proyectos = {
        'React': {
            nombre: 'E-commerce Dashboard',
            descripcion: 'Panel de administración para tienda online',
            tecnologias: ['React', 'TypeScript', 'Material-UI', 'Redux'],
            logros: ['Interfaz responsive para gestión de productos', 'Dashboard en tiempo real con charts interactivos', 'Reducción del 35% en tiempo de gestión']
        },
        'Angular': {
            nombre: 'Sistema de Gestión Empresarial',
            descripcion: 'Aplicación corporativa para gestión integral',
            tecnologias: ['Angular', 'TypeScript', 'Angular Material', 'RxJS'],
            logros: ['Módulos de facturación y inventario', 'Sistema de reportes avanzados', 'Implementado en 5 empresas']
        },
        'Python': {
            nombre: 'API de Analytics',
            descripcion: 'Servicio de análisis de datos en tiempo real',
            tecnologias: ['Python', 'FastAPI', 'PostgreSQL', 'Redis'],
            logros: ['Procesamiento de 100K+ eventos diarios', 'Endpoints optimizados con caching Redis', 'Latencia < 100ms']
        },
        'Node.js': {
            nombre: 'Chat Application',
            descripcion: 'Aplicación de mensajería instantánea',
            tecnologias: ['Node.js', 'Socket.io', 'MongoDB', 'JWT'],
            logros: ['Comunicación real-time para 1000+ usuarios', 'Notificaciones push y sistema de rooms', '99.9% uptime']
        },
        'Vue.js': {
            nombre: 'Portfolio Creator',
            descripcion: 'Plataforma para crear portfolios profesionales',
            tecnologias: ['Vue.js', 'Vuex', 'Vue Router', 'SASS'],
            logros: ['Editor drag & drop intuitivo', 'Templates responsive', '+2000 portfolios creados']
        },
        'Django': {
            nombre: 'Content Management System',
            descripcion: 'CMS personalizable para múltiples sitios',
            tecnologias: ['Django', 'PostgreSQL', 'Celery', 'Redis'],
            logros: ['Admin panel personalizado', 'Multi-tenant architecture', 'SEO optimization integrado']
        }
    };
    
    let proyectosGenerados = '';
    const año = new Date().getFullYear();
    
    stack.slice(0, 3).forEach((tech, index) => {
        if (proyectos[tech]) {
            const proyecto = proyectos[tech];
            proyectosGenerados += `${proyecto.nombre} (${año - index})\n`;
            proyectosGenerados += `• ${proyecto.descripcion}\n`;
            proyectosGenerados += `• Tecnologías: ${proyecto.tecnologias.join(', ')}\n`;
            proyecto.logros.forEach(logro => {
                proyectosGenerados += `• ${logro}\n`;
            });
            proyectosGenerados += '\n';
        }
    });
    
    return proyectosGenerados.trim();
}

// ===== FUNCIONES AUXILIARES =====
function obtenerNombreArchivo() {
    const nombre = document.getElementById('nombre').value.trim();
    return nombre ? nombre.replace(/[^a-zA-Z0-9]/g, '_') : 'CV';
}

function escaparHTML(texto) {
    if (!texto) return '';
    const div = document.createElement('div');
    div.textContent = texto;
    return div.innerHTML;
}

function mostrarAlerta(mensaje, tipo) {
    const alertaHtml = `
        <div class="alert alert-${tipo} alert-dismissible fade show" role="alert">
            ${mensaje}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    `;
    
    const contenedor = document.getElementById('alertas') || document.body;
    const alertaDiv = document.createElement('div');
    alertaDiv.innerHTML = alertaHtml;
    contenedor.insertBefore(alertaDiv, contenedor.firstChild);
    
    // Auto-remover después de 5 segundos
    setTimeout(() => {
        if (alertaDiv.parentNode) {
            alertaDiv.remove();
        }
    }, 5000);
}

function setupAutoGeneration() {
    // Lista de todos los IDs CORRECTOS de campos del formulario
    const camposFormulario = [
        'nombre', 'email', 'telefono', 'ubicacion', 'linkedin', 'portfolio',
        'educacion', 'experiencia', 'habilidades', 'proyectos'
    ];
    
    // Agregar event listeners a todos los campos
    camposFormulario.forEach(campo => {
        const elemento = document.getElementById(campo);
        if (elemento) {
            // Solo generar cuando el usuario termine de escribir y salga del campo
            elemento.addEventListener('blur', function() {
                if (elemento.value.trim()) {
                    generarCV();
                }
            });
            
            // También generar al presionar Enter en campos de texto
            elemento.addEventListener('keypress', function(e) {
                if (e.key === 'Enter' && elemento.tagName !== 'TEXTAREA') {
                    if (elemento.value.trim()) {
                        generarCV();
                    }
                }
            });
        } else {
            console.warn('Campo no encontrado:', campo);
        }
    });
    
    console.log('Auto-generación configurada para', camposFormulario.length, 'campos');
}

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Generador CV Harvard inicializado');
    console.log('💻 Tecnologías activas: React + Angular + Python');
    
    // Configurar auto-generación
    setupAutoGeneration();
    
    // Auto-seleccionar algunas tecnologías por defecto
    setTimeout(() => {
        ['techReact', 'techPython', 'techTypescript'].forEach(id => {
            const checkbox = document.getElementById(id);
            if (checkbox) checkbox.checked = true;
        });
    }, 500);
});
