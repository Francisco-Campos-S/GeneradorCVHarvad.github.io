// =============================================================================
// GENERADOR CV HARVARD - React + Angular + Python
// Tecnologías Modernas Integradas
// =============================================================================

// Variables globales
let cvData = {};
let pythonAnalysisResult = null;

// ===== GUARDADO AUTOMÁTICO =====
function guardarFormularioAutomatico() {
    const datosFormulario = {
        nombre: document.getElementById('nombre').value.trim(),
        email: document.getElementById('email').value.trim(),
        telefono: document.getElementById('telefono').value.trim(),
        ubicacion: document.getElementById('ubicacion').value.trim(),
        linkedin: document.getElementById('linkedin').value.trim(),
        portfolio: document.getElementById('portfolio').value.trim(),
        educacion: document.getElementById('educacion').value.trim(),
        experiencia: document.getElementById('experiencia').value.trim(),
        habilidades: document.getElementById('habilidades').value.trim(),
        proyectos: document.getElementById('proyectos').value.trim()
    };
    
    localStorage.setItem('cvFormulario', JSON.stringify(datosFormulario));
    console.log('📁 Formulario guardado automáticamente');
}

function cargarFormularioGuardado() {
    const datosGuardados = localStorage.getItem('cvFormulario');
    if (datosGuardados) {
        try {
            const datos = JSON.parse(datosGuardados);
            
            // Cargar datos en el formulario
            Object.keys(datos).forEach(campo => {
                const elemento = document.getElementById(campo);
                if (elemento && datos[campo]) {
                    elemento.value = datos[campo];
                }
            });
            
            console.log('📂 Formulario cargado desde guardado local');
            mostrarAlerta('Formulario recuperado automáticamente 📂', 'info');
        } catch (error) {
            console.error('Error al cargar formulario guardado:', error);
        }
    }
}

function limpiarGuardadoLocal() {
    localStorage.removeItem('cvFormulario');
    console.log('🗑️ Guardado local eliminado');
}

// ===== FUNCIÓN PRINCIPAL PARA GENERAR CV =====
function generarCV() {
    console.log('🚀 Generando CV Harvard');
    
    // Recopilar datos del formulario
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
        certificaciones: document.getElementById('certificaciones').value.trim(),
        idiomas: document.getElementById('idiomas').value.trim()
    };
    
    // Validación básica
    if (!validarFormulario(cvData)) {
        return;
    }
    
    // Mostrar resultado
    document.getElementById('resultado').style.display = 'block';
    document.getElementById('resultado').scrollIntoView({ behavior: 'smooth' });
    
    mostrarAlerta('¡CV Harvard generado exitosamente!', 'success');
}

// ===== VALIDACIÓN DE FORMULARIO MEJORADA =====
function validarFormulario(datos) {
    const errores = [];
    const warnings = [];
    
    // Validaciones obligatorias
    if (!datos.nombre) errores.push('El nombre es requerido');
    if (!datos.email) errores.push('El email es requerido');
    if (!datos.educacion) errores.push('La educación es requerida');
    
    // Validaciones de formato
    if (datos.email && !validarEmail(datos.email)) {
        errores.push('El formato del email no es válido');
    }
    
    if (datos.telefono && !validarTelefono(datos.telefono)) {
        warnings.push('El formato del teléfono podría no ser válido');
    }
    
    if (datos.linkedin && !validarURL(datos.linkedin)) {
        warnings.push('La URL de LinkedIn no parece válida');
    }
    
    if (datos.portfolio && !validarURL(datos.portfolio)) {
        warnings.push('La URL del portfolio no parece válida');
    }
    
    // Validaciones de contenido
    if (datos.experiencia && datos.experiencia.length < 50) {
        warnings.push('La sección de experiencia es muy corta (mínimo 50 caracteres recomendado)');
    }
    
    if (datos.habilidades && datos.habilidades.length < 30) {
        warnings.push('La sección de habilidades es muy corta');
    }
    
    // Mostrar errores
    if (errores.length > 0) {
        mostrarAlerta('❌ Errores: ' + errores.join(', '), 'danger');
        return false;
    }
    
    // Mostrar warnings
    if (warnings.length > 0) {
        mostrarAlerta('⚠️ Sugerencias: ' + warnings.join(', '), 'warning');
    }
    
    return true;
}

function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function validarTelefono(telefono) {
    const regex = /^[\+]?[\d\s\-\(\)]{7,15}$/;
    return regex.test(telefono.replace(/\s/g, ''));
}

function validarURL(url) {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
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
    <div style="font-family: 'Times New Roman', serif; max-width: 100%; margin: 0; color: #000; font-size: 11pt; line-height: 1.0; padding: 0;">
        <!-- ENCABEZADO -->
        <div style="text-align: center; border-bottom: 2px solid #000; padding-bottom: 15px; margin-bottom: 20px; line-height: 1.2;">
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
        <div style="margin-bottom: 20px;">
            <h2 style="font-size: 14pt; color: #000; margin: 0 0 6px 0; font-weight: bold; text-transform: uppercase; border-bottom: 1px solid #000;">
                EDUCATION
            </h2>
            <div style="margin-left: 0px;">
                ${formatearSeccion(datos.educacion)}
            </div>
        </div>`;
    }
    
    // EXPERIENCIA
    if (datos.experiencia) {
        html += `
        <div style="margin-bottom: 20px;">
            <h2 style="font-size: 14pt; color: #000; margin: 0 0 6px 0; font-weight: bold; text-transform: uppercase; border-bottom: 1px solid #000;">
                PROFESSIONAL EXPERIENCE
            </h2>
            <div style="margin-left: 0px;">
                ${formatearSeccion(datos.experiencia)}
            </div>
        </div>`;
    }
    
    // PROYECTOS
    if (datos.proyectos) {
        html += `
        <div style="margin-bottom: 20px;">
            <h2 style="font-size: 14pt; color: #000; margin: 0 0 6px 0; font-weight: bold; text-transform: uppercase; border-bottom: 1px solid #000;">
                PROJECTS
            </h2>
            <div style="margin-left: 0px;">
                ${formatearSeccion(datos.proyectos)}
            </div>
        </div>`;
    }
    
    // HABILIDADES - OPTIMIZADA ESPECÍFICAMENTE
    if (datos.habilidades) {
        html += `
        <div style="margin-bottom: 20px;">
            <h2 style="font-size: 14pt; color: #000; margin: 0 0 6px 0; font-weight: bold; text-transform: uppercase; border-bottom: 1px solid #000;">
                SKILLS & COMPETENCIES
            </h2>
            <div style="margin-left: 0px;">
                ${formatearSeccionHabilidades(datos.habilidades)}
            </div>
        </div>`;
    }
    
    // CERTIFICACIONES (NUEVA SECCIÓN)
    if (datos.certificaciones) {
        html += `
        <div style="margin-bottom: 20px;">
            <h2 style="font-size: 14pt; color: #000; margin: 0 0 6px 0; font-weight: bold; text-transform: uppercase; border-bottom: 1px solid #000;">
                CERTIFICATIONS
            </h2>
            <div style="margin-left: 0px;">
                ${formatearSeccion(datos.certificaciones)}
            </div>
        </div>`;
    }
    
    // IDIOMAS (NUEVA SECCIÓN)
    if (datos.idiomas) {
        html += `
        <div style="margin-bottom: 20px;">
            <h2 style="font-size: 14pt; color: #000; margin: 0 0 6px 0; font-weight: bold; text-transform: uppercase; border-bottom: 1px solid #000;">
                LANGUAGES
            </h2>
            <div style="margin-left: 0px;">
                ${formatearSeccion(datos.idiomas)}
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
            if (!lineaTrim) return '';
            
            if (lineaTrim.startsWith('•')) {
                return `<div style="margin: 0; padding: 0; margin-left: 5px; line-height: 1.0;">${escaparHTML(lineaTrim)}</div>`;
            } else if (lineaTrim.includes(':')) {
                const partes = lineaTrim.split(':');
                if (partes.length >= 2) {
                    return `<div style="margin: 0; padding: 1px 0; line-height: 1.0;"><strong>${escaparHTML(partes[0])}:</strong> ${escaparHTML(partes.slice(1).join(':'))}</div>`;
                }
            }
            
            return `<div style="margin: 0; padding: 1px 0; line-height: 1.0;">${escaparHTML(lineaTrim)}</div>`;
        })
        .join('');
}

function formatearSeccionHabilidades(texto) {
    if (!texto) return '';
    
    return texto.split('\n')
        .map(linea => {
            const lineaTrim = linea.trim();
            if (!lineaTrim) return '';
            
            if (lineaTrim.startsWith('•')) {
                return `<div style="margin: 0; padding: 0; margin-left: 5px; line-height: 1.1;">${escaparHTML(lineaTrim)}</div>`;
            } else if (lineaTrim.includes(':')) {
                const partes = lineaTrim.split(':');
                if (partes.length >= 2) {
                    return `<div style="margin: 0; padding: 0; line-height: 1.1;"><strong>${escaparHTML(partes[0])}:</strong> ${escaparHTML(partes.slice(1).join(':'))}</div>`;
                }
            }
            
            return `<div style="margin: 0; padding: 0; line-height: 1.1;">${escaparHTML(lineaTrim)}</div>`;
        })
        .join('');
}

// ===== FUNCIONES WORD Y PDF =====
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
                        margin: 0.4in 0.4in; 
                        color: #000; 
                        font-size: 11pt; 
                        line-height: 1.15;
                    }
                    h1, h2 { color: #000; }
                    @page { margin: 0.4in 0.4in; }
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

function generarPDF() {
    if (!cvData || !cvData.nombre) {
        mostrarAlerta('Primero genera el CV antes de descargarlo', 'warning');
        return;
    }

    try {
        const cvHTML = generarCVHTML(cvData);
        
        // Crear ventana de impresión optimizada para PDF
        const ventanaImpresion = window.open('', '_blank');
        ventanaImpresion.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <title>CV - ${cvData.nombre}</title>
                <style>
                    @page {
                        margin: 0.4in;
                        size: A4;
                    }
                    body { 
                        font-family: 'Times New Roman', serif; 
                        margin: 0;
                        color: #000; 
                        font-size: 11pt; 
                        line-height: 1.15;
                        background: white;
                    }
                    h1, h2 { color: #000; }
                    @media print {
                        body { margin: 0; }
                        .no-print { display: none; }
                    }
                </style>
            </head>
            <body>
                ${cvHTML}
                <script>
                    window.onload = function() {
                        setTimeout(function() {
                            window.print();
                            window.close();
                        }, 500);
                    }
                </script>
            </body>
            </html>
        `);
        
        ventanaImpresion.document.close();
        mostrarAlerta('¡Ventana de impresión abierta! Selecciona "Guardar como PDF" 📄', 'info');
        
    } catch (error) {
        console.error('Error al generar PDF:', error);
        mostrarAlerta('Error al generar el documento PDF.', 'danger');
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
        <div class="card border-${color}" style="background: var(--card-bg); color: var(--text-primary);">
            <div class="card-header bg-${color} text-white">
                <h6 class="mb-0"><i class="fas fa-chart-bar icon"></i>Análisis Completado</h6>
            </div>
            <div class="card-body" style="background: var(--card-bg); color: var(--text-primary);">
                <div class="row">
                    <div class="col-md-6">
                        <h6 style="color: var(--text-primary);"><i class="fas fa-star icon"></i>Puntuación: ${analisis.puntuacion}/100</h6>
                        <div class="progress mb-3">
                            <div class="progress-bar bg-${color}" style="width: ${analisis.puntuacion}%"></div>
                        </div>
                        
                        <h6 class="text-success"><i class="fas fa-check icon"></i>Fortalezas:</h6>
                        <ul class="small" style="color: var(--text-primary);">
                            ${analisis.fortalezas.map(f => `<li>${f}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="col-md-6">
                        <h6 class="text-info"><i class="fas fa-lightbulb icon"></i>Mejoras Sugeridas:</h6>
                        <ul class="small" style="color: var(--text-primary);">
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

function limpiarFormulario() {
    const campos = ['nombre', 'email', 'telefono', 'ubicacion', 'linkedin', 'portfolio', 
                   'educacion', 'experiencia', 'habilidades', 'proyectos', 'certificaciones', 'idiomas'];
    
    campos.forEach(campo => {
        const elemento = document.getElementById(campo);
        if (elemento) elemento.value = '';
    });
    
    // Resetear contadores
    const contadores = ['educacionCounter', 'experienciaCounter', 'habilidadesCounter', 
                       'proyectosCounter', 'certificacionesCounter', 'idiomasCounter'];
    contadores.forEach(contador => {
        const elemento = document.getElementById(contador);
        if (elemento) {
            elemento.textContent = '0 caracteres';
            elemento.className = 'text-muted';
        }
    });
    
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
    
    // Limpiar guardado local
    limpiarGuardadoLocal();
    
    // Resetear progreso
    calcularProgreso();
    
    mostrarAlerta('Formulario limpiado correctamente 🗑️', 'info');
}

// ===== FUNCIONES DE PROGRESO Y CONTADORES =====
function calcularProgreso() {
    const campos = {
        nombre: document.getElementById('nombre').value.trim(),
        email: document.getElementById('email').value.trim(),
        telefono: document.getElementById('telefono').value.trim(),
        ubicacion: document.getElementById('ubicacion').value.trim(),
        educacion: document.getElementById('educacion').value.trim(),
        experiencia: document.getElementById('experiencia').value.trim(),
        habilidades: document.getElementById('habilidades').value.trim(),
        proyectos: document.getElementById('proyectos').value.trim()
    };
    
    // Pesos de importancia de cada campo
    const pesos = {
        nombre: 20,      // Obligatorio
        email: 20,       // Obligatorio
        telefono: 5,     // Opcional pero importante
        ubicacion: 5,    // Opcional pero importante
        educacion: 15,   // Muy importante
        experiencia: 20, // Muy importante
        habilidades: 10, // Importante
        proyectos: 5     // Útil
    };
    
    let puntuacionTotal = 0;
    let puntuacionMaxima = 0;
    
    Object.keys(campos).forEach(campo => {
        puntuacionMaxima += pesos[campo];
        if (campos[campo]) {
            puntuacionTotal += pesos[campo];
        }
    });
    
    const porcentaje = Math.round((puntuacionTotal / puntuacionMaxima) * 100);
    
    // Actualizar interfaz
    const progressBar = document.getElementById('progressBar');
    const progressPercentage = document.getElementById('progressPercentage');
    const progressText = document.getElementById('progressText');
    
    if (progressBar && progressPercentage && progressText) {
        progressBar.style.width = porcentaje + '%';
        progressBar.setAttribute('aria-valuenow', porcentaje);
        progressPercentage.textContent = porcentaje + '%';
        
        // Cambiar color según progreso
        progressBar.className = 'progress-bar progress-bar-striped progress-bar-animated';
        if (porcentaje >= 80) {
            progressBar.classList.add('bg-success');
            progressText.textContent = '🎉 ¡CV casi completo! Listo para generar';
        } else if (porcentaje >= 50) {
            progressBar.classList.add('bg-warning');
            progressText.textContent = '📝 Buen progreso, agrega más detalles para mejorar';
        } else {
            progressBar.classList.add('bg-danger');
            progressText.textContent = '📋 Completa más campos para un CV profesional';
        }
    }
    
    return porcentaje;
}

function configurarContadores() {
    const contadores = [
        { campo: 'educacion', contador: 'educacionCounter' },
        { campo: 'experiencia', contador: 'experienciaCounter' },
        { campo: 'habilidades', contador: 'habilidadesCounter' },
        { campo: 'proyectos', contador: 'proyectosCounter' }
    ];
    
    contadores.forEach(({ campo, contador }) => {
        const elemento = document.getElementById(campo);
        const contadorElemento = document.getElementById(contador);
        
        if (elemento && contadorElemento) {
            // Inicializar contador
            actualizarContador(elemento, contadorElemento);
            
            // Event listener para actualizar en tiempo real
            elemento.addEventListener('input', () => {
                actualizarContador(elemento, contadorElemento);
                calcularProgreso();
                guardarFormularioAutomatico();
            });
        }
    });
}

function actualizarContador(elemento, contadorElemento) {
    const longitud = elemento.value.length;
    const minimo = getRecomendacionMinima(elemento.id);
    
    contadorElemento.textContent = `${longitud} caracteres`;
    
    // Cambiar color según longitud
    if (longitud >= minimo) {
        contadorElemento.className = 'text-success';
        contadorElemento.textContent += ' ✓';
    } else if (longitud > 0) {
        contadorElemento.className = 'text-warning';
        contadorElemento.textContent += ` (mín. ${minimo})`;
    } else {
        contadorElemento.className = 'text-muted';
    }
}

function getRecomendacionMinima(campo) {
    const recomendaciones = {
        educacion: 100,
        experiencia: 200,
        habilidades: 100,
        proyectos: 150
    };
    return recomendaciones[campo] || 50;
}

function configurarEventosFormulario() {
    const camposBasicos = ['nombre', 'email', 'telefono', 'ubicacion'];
    
    camposBasicos.forEach(campo => {
        const elemento = document.getElementById(campo);
        if (elemento) {
            elemento.addEventListener('input', () => {
                calcularProgreso();
                guardarFormularioAutomatico();
            });
        }
    });
}
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

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Generador CV Harvard inicializado');
    console.log('💫 Funciones mejoradas: Guardado automático, Progreso, Contadores, PDF');
    
    // Configurar funciones mejoradas
    configurarContadores();
    configurarEventosFormulario();
    
    // Cargar formulario guardado si existe
    cargarFormularioGuardado();
    
    // Calcular progreso inicial
    calcularProgreso();
    
    // Configurar contadores para secciones opcionales
    const seccionesOpcionales = [
        { campo: 'certificaciones', contador: 'certificacionesCounter' },
        { campo: 'idiomas', contador: 'idiomasCounter' }
    ];
    
    seccionesOpcionales.forEach(({ campo, contador }) => {
        const elemento = document.getElementById(campo);
        const contadorElemento = document.getElementById(contador);
        
        if (elemento && contadorElemento) {
            elemento.addEventListener('input', () => {
                const longitud = elemento.value.length;
                contadorElemento.textContent = `${longitud} caracteres`;
                
                if (longitud > 0) {
                    contadorElemento.className = 'text-success';
                } else {
                    contadorElemento.className = 'text-muted';
                }
                
                calcularProgreso();
                guardarFormularioAutomatico();
            });
        }
    });
});
