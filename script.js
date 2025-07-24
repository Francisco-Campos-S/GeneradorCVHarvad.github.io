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
        perfilProfesional: document.getElementById('perfilProfesional').value.trim(),
        educacion: document.getElementById('educacion').value.trim(),
        experiencia: document.getElementById('experiencia').value.trim(),
        habilidades: document.getElementById('habilidades').value.trim(),
        proyectos: document.getElementById('proyectos').value.trim(),
        certificaciones: document.getElementById('certificaciones').value.trim(),
        idiomas: document.getElementById('idiomas').value.trim()
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
        perfilProfesional: document.getElementById('perfilProfesional').value.trim(),
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
function generarEnlaceWhatsApp(numero) {
    if (!numero) return '';
    // Limpiar el número de espacios y caracteres especiales, mantener solo números y +
    const numeroLimpio = numero.replace(/[^\d+]/g, '');
    return `https://wa.me/${numeroLimpio.startsWith('+') ? numeroLimpio.substring(1) : numeroLimpio}`;
}

function crearEnlaceHTML(url, texto, esEmail = false) {
    if (!url) return texto || '';
    
    if (esEmail && !url.startsWith('mailto:')) {
        url = 'mailto:' + url;
    }
    
    // Para Word y PDF, usar estilos que mantengan los enlaces funcionales
    return `<a href="${url}" style="color: #0000EE; text-decoration: underline;" title="${url}">${texto}</a>`;
}

function generarCVHTML(datos) {
    const fechaGeneracion = new Date().toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    let html = `
    <div style="max-width: 100%; margin: 0; padding: 10px; font-family: 'Times New Roman', serif; font-size: 12pt; line-height: 1.15; color: #000000; text-align: left;">
        <!-- ENCABEZADO FORMATO HARVARD MEJORADO -->
        <div style="text-align: center; margin-bottom: 24pt; width: 100%;">
            <div style="font-size: 16pt; font-weight: bold; text-transform: uppercase; letter-spacing: 1pt; margin-bottom: 12pt;">
                ${escaparHTML(datos.nombre)}
            </div>
            
            <!-- Información de contacto organizada en líneas -->
            <div style="font-size: 11pt; line-height: 1.4;">
                ${datos.ubicacion ? `
                <div style="margin-bottom: 3pt;">
                    ${escaparHTML(datos.ubicacion)}
                </div>
                ` : ''}
                
                <div style="margin-bottom: 3pt;">
                    ${datos.telefono ? `${crearEnlaceHTML(generarEnlaceWhatsApp(datos.telefono), escaparHTML(datos.telefono))}` : ''} 
                    ${datos.telefono && datos.email ? ' • ' : ''}
                    ${crearEnlaceHTML(datos.email, escaparHTML(datos.email), true)}
                </div>
                
                ${(datos.linkedin || datos.portfolio) ? `
                <div style="margin-bottom: 3pt;">
                    ${datos.linkedin ? crearEnlaceHTML(datos.linkedin, 'LinkedIn') : ''}
                    ${datos.linkedin && datos.portfolio ? ' • ' : ''}
                    ${datos.portfolio ? crearEnlaceHTML(datos.portfolio, 'Portfolio') : ''}
                </div>
                ` : ''}
            </div>
        </div>`;
    
    // PERFIL PROFESIONAL - Formato Harvard ATS
    if (datos.perfilProfesional) {
        html += `
        <div style="margin-bottom: 20pt;">
            <div style="font-size: 12pt; font-weight: bold; text-transform: uppercase; border-bottom: 1pt solid #000000; margin-bottom: 8pt; padding-bottom: 2pt;">
                PROFESSIONAL SUMMARY
            </div>
            <div style="margin-left: 0pt; text-align: justify; font-size: 12pt; line-height: 1.3;">
                ${escaparHTML(datos.perfilProfesional)}
            </div>
        </div>`;
    }
    
    // EDUCACIÓN - Formato Harvard ATS
    if (datos.educacion) {
        html += `
        <div style="margin-bottom: 20pt;">
            <div style="font-size: 12pt; font-weight: bold; text-transform: uppercase; border-bottom: 1pt solid #000000; margin-bottom: 8pt; padding-bottom: 2pt;">
                EDUCATION
            </div>
            <div style="margin-left: 0pt;">
                ${formatearSeccionHarvardATS(datos.educacion)}
            </div>
        </div>`;
    }
    
    // EXPERIENCIA PROFESIONAL - Formato Harvard ATS
    if (datos.experiencia) {
        html += `
        <div style="margin-bottom: 20pt;">
            <div style="font-size: 12pt; font-weight: bold; text-transform: uppercase; border-bottom: 1pt solid #000000; margin-bottom: 8pt; padding-bottom: 2pt;">
                EXPERIENCE
            </div>
            <div style="margin-left: 0pt;">
                ${formatearExperienciaHarvardATS(datos.experiencia)}
            </div>
        </div>`;
    }
    
    // HABILIDADES - Formato Harvard ATS
    if (datos.habilidades) {
        html += `
        <div style="margin-bottom: 20pt;">
            <div style="font-size: 12pt; font-weight: bold; text-transform: uppercase; border-bottom: 1pt solid #000000; margin-bottom: 8pt; padding-bottom: 2pt;">
                SKILLS
            </div>
            <div style="margin-left: 0pt;">
                ${formatearHabilidadesHarvardATS(datos.habilidades)}
            </div>
        </div>`;
    }
    
    // PROYECTOS - Formato Harvard ATS
    if (datos.proyectos) {
        html += `
        <div style="margin-bottom: 20pt;">
            <div style="font-size: 12pt; font-weight: bold; text-transform: uppercase; border-bottom: 1pt solid #000000; margin-bottom: 8pt; padding-bottom: 2pt;">
                PROJECTS
            </div>
            <div style="margin-left: 0pt;">
                ${formatearProyectosHarvardATS(datos.proyectos)}
            </div>
        </div>`;
    }
    
    // CERTIFICACIONES - Formato Harvard ATS
    if (datos.certificaciones) {
        html += `
        <div style="margin-bottom: 20pt;">
            <div style="font-size: 12pt; font-weight: bold; text-transform: uppercase; border-bottom: 1pt solid #000000; margin-bottom: 8pt; padding-bottom: 2pt;">
                CERTIFICATIONS
            </div>
            <div style="margin-left: 0pt;">
                ${formatearSeccionHarvardATS(datos.certificaciones)}
            </div>
        </div>`;
    }
    
    // IDIOMAS - Formato Harvard ATS
    if (datos.idiomas) {
        html += `
        <div style="margin-bottom: 20pt;">
            <div style="font-size: 12pt; font-weight: bold; text-transform: uppercase; border-bottom: 1pt solid #000000; margin-bottom: 8pt; padding-bottom: 2pt;">
                LANGUAGES
            </div>
            <div style="margin-left: 0pt;">
                ${formatearSeccionHarvardATS(datos.idiomas)}
            </div>
        </div>`;
    }
    
    html += `</div>`;
    
    return html;
}

// ===== FUNCIONES DE FORMATEO HARVARD ATS =====
function formatearSeccionHarvardATS(texto) {
    if (!texto) return '';
    
    return texto.split('\n')
        .map(linea => {
            const lineaTrim = linea.trim();
            if (!lineaTrim) return '';
            
            // Manejar viñetas (ATS prefiere formato simple)
            if (lineaTrim.startsWith('•')) {
                return `<div style="margin-bottom: 2pt;">• ${escaparHTML(lineaTrim.substring(1).trim())}</div>`;
            }
            
            return `<div style="margin-bottom: 4pt;">${escaparHTML(lineaTrim)}</div>`;
        })
        .filter(linea => linea !== '')
        .join('');
}

function formatearExperienciaHarvardATS(texto) {
    if (!texto) return '';
    
    const lineas = texto.split('\n');
    let html = '';
    let dentroDeExperiencia = false;
    
    lineas.forEach(linea => {
        const lineaTrim = linea.trim();
        if (!lineaTrim) return;
        
        // Detectar cargo (líneas que no empiezan con • y no tienen fechas obvias)
        if (!lineaTrim.startsWith('•') && !lineaTrim.includes('•') && 
            (lineaTrim.length < 100 || lineaTrim.match(/\b(Developer|Engineer|Manager|Analyst|Specialist|Coordinator|Director|Lead|Senior|Junior)\b/i))) {
            
            // Si es claramente un cargo
            if (lineaTrim.match(/\b(Developer|Engineer|Manager|Analyst|Specialist|Coordinator|Director|Lead|Senior|Junior)\b/i)) {
                html += `<div style="font-weight: bold; margin-top: 8pt; margin-bottom: 2pt;">${escaparHTML(lineaTrim)}</div>`;
                dentroDeExperiencia = true;
            }
            // Si parece empresa y fecha
            else if (lineaTrim.includes(',') && (lineaTrim.includes('20') || lineaTrim.includes('presente'))) {
                html += `<div style="font-style: italic; margin-bottom: 4pt;">${escaparHTML(lineaTrim)}</div>`;
            }
            // Otro título
            else {
                html += `<div style="font-weight: bold; margin-top: 8pt; margin-bottom: 2pt;">${escaparHTML(lineaTrim)}</div>`;
                dentroDeExperiencia = true;
            }
        }
        // Manejar viñetas de responsabilidades
        else if (lineaTrim.startsWith('•')) {
            html += `<div style="margin-left: 12pt; margin-bottom: 2pt;">• ${escaparHTML(lineaTrim.substring(1).trim())}</div>`;
        }
        // Línea normal
        else {
            html += `<div style="margin-bottom: 4pt;">${escaparHTML(lineaTrim)}</div>`;
        }
    });
    
    return html;
}

function formatearHabilidadesHarvardATS(texto) {
    if (!texto) return '';
    
    const lineas = texto.split('\n');
    let html = '';
    
    lineas.forEach(linea => {
        const lineaTrim = linea.trim();
        if (!lineaTrim) return;
        
        // Si la línea contiene ":" es una categoría (formato ATS friendly)
        if (lineaTrim.includes(':')) {
            const partes = lineaTrim.split(':');
            if (partes.length >= 2) {
                const categoria = partes[0].trim();
                const habilidades = partes.slice(1).join(':').trim();
                
                html += `<div style="margin-bottom: 6pt;">`;
                html += `<span style="font-weight: bold;">${escaparHTML(categoria)}:</span> `;
                html += `${escaparHTML(habilidades)}`;
                html += `</div>`;
            }
        } 
        // Si empieza con viñeta
        else if (lineaTrim.startsWith('•')) {
            html += `<div style="margin-bottom: 2pt;">• ${escaparHTML(lineaTrim.substring(1).trim())}</div>`;
        }
        // Línea normal
        else {
            html += `<div style="margin-bottom: 4pt;">${escaparHTML(lineaTrim)}</div>`;
        }
    });
    
    return html;
}

function formatearProyectosHarvardATS(texto) {
    if (!texto) return '';
    
    const lineas = texto.split('\n');
    let html = '';
    
    lineas.forEach(linea => {
        const lineaTrim = linea.trim();
        if (!lineaTrim) return;
        
        // Detectar título de proyecto (líneas con paréntesis de fecha o palabras clave)
        if (lineaTrim.includes('(') && lineaTrim.includes(')') || 
            lineaTrim.match(/\b(Platform|System|Application|Website|App|Dashboard|API|Database)\b/i)) {
            html += `<div style="font-weight: bold; margin-top: 8pt; margin-bottom: 2pt;">${escaparHTML(lineaTrim)}</div>`;
        }
        // Manejar viñetas de características
        else if (lineaTrim.startsWith('•')) {
            html += `<div style="margin-left: 12pt; margin-bottom: 2pt;">• ${escaparHTML(lineaTrim.substring(1).trim())}</div>`;
        }
        // Línea normal
        else {
            html += `<div style="margin-bottom: 4pt;">${escaparHTML(lineaTrim)}</div>`;
        }
    });
    
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

// ===== NUEVAS FUNCIONES DE FORMATEO PROFESIONAL PARA PDF =====
function formatearSeccionProfesional(texto) {
    if (!texto) return '';
    
    return texto.split('\n')
        .map(linea => {
            const lineaTrim = linea.trim();
            if (!lineaTrim) return '';
            
            // Manejar viñetas
            if (lineaTrim.startsWith('•')) {
                return `<div class="lista-item">${escaparHTML(lineaTrim)}</div>`;
            } 
            // Manejar líneas con dos puntos (títulos/categorías)
            else if (lineaTrim.includes(':')) {
                const partes = lineaTrim.split(':');
                if (partes.length >= 2) {
                    return `<div><span class="negrita">${escaparHTML(partes[0])}:</span> ${escaparHTML(partes.slice(1).join(':'))}</div>`;
                }
            }
            
            // Detectar si es un cargo o título (líneas cortas y significativas)
            if (lineaTrim.length < 80 && !lineaTrim.includes('.') && !lineaTrim.includes(',')) {
                return `<div class="cargo">${escaparHTML(lineaTrim)}</div>`;
            }
            
            return `<div>${escaparHTML(lineaTrim)}</div>`;
        })
        .join('');
}

function formatearSeccionHabilidadesProfesional(texto) {
    if (!texto) return '';
    
    const lineas = texto.split('\n');
    let html = '';
    
    lineas.forEach(linea => {
        const lineaTrim = linea.trim();
        if (!lineaTrim) return;
        
        // Si la línea contiene ":" es una categoría
        if (lineaTrim.includes(':')) {
            const partes = lineaTrim.split(':');
            if (partes.length >= 2) {
                html += `<div class="habilidad-categoria">${escaparHTML(partes[0])}:</div>`;
                html += `<div style="margin-bottom: 6pt; margin-left: 12pt;">${escaparHTML(partes.slice(1).join(':').trim())}</div>`;
            }
        } 
        // Si empieza con viñeta
        else if (lineaTrim.startsWith('•')) {
            html += `<div class="lista-item">${escaparHTML(lineaTrim)}</div>`;
        }
        // Línea normal
        else {
            html += `<div>${escaparHTML(lineaTrim)}</div>`;
        }
    });
    
    return html;
}

// ===== FUNCIONES WORD Y PDF =====
function generarWord() {
    if (!cvData || !cvData.nombre) {
        mostrarAlerta('Primero genera el CV antes de descargarlo', 'warning');
        return;
    }

    try {
        const cvHTML = generarCVHTML(cvData);
        
        // Crear blob con HTML simplificado para Word
        const blob = new Blob([`
            <html>
            <head>
                <meta charset="utf-8">
                <meta name="Generator" content="Microsoft Word">
                <title>CV - ${cvData.nombre}</title>
                <style>
                    body { 
                        font-family: 'Times New Roman', serif; 
                        margin: 0.5in; 
                        color: #000000; 
                        font-size: 12pt; 
                        line-height: 1.15;
                    }
                    h1, h2, h3 { 
                        color: #000000; 
                        font-family: 'Times New Roman', serif;
                    }
                    a {
                        color: #0563C1;
                        text-decoration: underline;
                    }
                    a:visited {
                        color: #954F72;
                    }
                    p {
                        margin: 0;
                        padding: 0;
                    }
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
        // Actualizar botón para mostrar estado de carga
        const pdfBtn = document.getElementById('pdfBtn');
        const textoOriginal = pdfBtn.innerHTML;
        pdfBtn.innerHTML = '<i class="fas fa-spinner fa-spin icon"></i>Generando PDF...';
        pdfBtn.classList.add('pdf-loading');
        pdfBtn.disabled = true;

        const cvHTML = generarCVHTML(cvData);
        
        // Crear ventana de impresión optimizada para PDF con estilos profesionales
        const ventanaImpresion = window.open('', '_blank', 'width=800,height=600,scrollbars=yes');
        
        const contenidoPDF = `
            <!DOCTYPE html>
            <html lang="es">
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>CV - ${cvData.nombre.replace(/[<>"'&]/g, '')}</title>
                <style>
                    /* Configuración de página Harvard ATS Compatible */
                    @page {
                        margin: 0.5in 0.5in;
                        size: A4 portrait;
                    }
                    
                    * {
                        box-sizing: border-box;
                        margin: 0;
                        padding: 0;
                    }
                    
                    body { 
                        font-family: 'Times New Roman', Times, serif; 
                        font-size: 12pt;
                        line-height: 1.15;
                        color: #000000;
                        background: white;
                        margin: 0;
                        padding: 0;
                        width: 100%;
                        max-width: 100%;
                        overflow-x: hidden;
                        -webkit-font-smoothing: antialiased;
                        text-align: left;
                    }
                    
                    /* Estilo Harvard para títulos de sección */
                    h1, h2, h3, h4, h5, h6 {
                        font-family: 'Times New Roman', serif;
                        color: #000000;
                        font-weight: bold;
                        page-break-after: avoid;
                    }
                    
                    /* Encabezado centrado estilo Harvard */
                    .header {
                        text-align: center;
                        margin-bottom: 24pt;
                        page-break-after: avoid;
                    }
                    
                    .name {
                        font-size: 16pt;
                        font-weight: bold;
                        text-transform: uppercase;
                        letter-spacing: 1pt;
                        margin-bottom: 8pt;
                    }
                    
                    /* Títulos de sección Harvard */
                    .section-title {
                        font-size: 12pt;
                        font-weight: bold;
                        text-transform: uppercase;
                        border-bottom: 1pt solid #000000;
                        margin-top: 16pt;
                        margin-bottom: 8pt;
                        padding-bottom: 2pt;
                        page-break-after: avoid;
                    }
                    
                    /* Primera sección sin margen superior */
                    .section-title:first-of-type {
                        margin-top: 0;
                    }
                    
                    /* Contenido de sección */
                    .section-content {
                        margin-bottom: 16pt;
                        page-break-inside: avoid;
                    }
                    
                    /* Párrafos y divs */
                    p, div {
                        margin-bottom: 4pt;
                        text-align: left;
                        orphans: 2;
                        widows: 2;
                        word-wrap: break-word;
                    }
                    
                    /* Información de contacto */
                    .contact-info {
                        font-size: 11pt;
                        margin-bottom: 4pt;
                    }
                    
                    /* Trabajos y cargos */
                    .job-title {
                        font-weight: bold;
                        margin-top: 8pt;
                        margin-bottom: 2pt;
                    }
                    
                    .company-info {
                        font-style: italic;
                        margin-bottom: 4pt;
                    }
                    
                    /* Lista de responsabilidades */
                    .responsibility {
                        margin-left: 12pt;
                        margin-bottom: 2pt;
                        text-indent: -12pt;
                        padding-left: 12pt;
                    }
                    
                    /* Habilidades categorizadas */
                    .skill-category {
                        font-weight: bold;
                        display: inline;
                    }
                    
                    .skill-list {
                        display: inline;
                        margin-left: 0;
                    }
                    
                    /* Títulos de proyectos */
                    .project-title {
                        font-weight: bold;
                        margin-top: 8pt;
                        margin-bottom: 2pt;
                    }
                    
                    /* Certificaciones y educación */
                    .education-item, .cert-item {
                        margin-bottom: 4pt;
                    }
                    
                    /* Estilo para texto en negrita */
                    .bold {
                        font-weight: bold;
                    }
                    
                    .italic {
                        font-style: italic;
                    }
                    
                    /* Evitar cortes de página problemáticos */
                    .no-break {
                        page-break-inside: avoid;
                    }
                    
                    /* Estilos de impresión específicos ATS */
                    @media print {
                        body {
                            margin: 0 !important;
                            padding: 0 !important;
                            background: white !important;
                            -webkit-print-color-adjust: exact !important;
                            print-color-adjust: exact !important;
                        }
                        
                        .no-print {
                            display: none !important;
                        }
                        
                        /* Asegurar legibilidad ATS */
                        * {
                            color: #000000 !important;
                            background: white !important;
                            font-family: 'Times New Roman', serif !important;
                        }
                        
                        /* Evitar elementos flotantes */
                        * {
                            float: none !important;
                            position: static !important;
                        }
                        
                        /* Asegurar que el contenido no se corte */
                        * {
                            overflow: visible !important;
                        }
                        
                        /* Espaciado consistente */
                        .section-title {
                            margin-top: 16pt !important;
                            margin-bottom: 8pt !important;
                        }
                        
                        .section-content {
                            margin-bottom: 16pt !important;
                        }
                    }
                    
                    /* Estilos específicos para compatibilidad ATS */
                    table {
                        border-collapse: collapse;
                        width: 100%;
                    }
                    
                    td, th {
                        text-align: left;
                        vertical-align: top;
                        padding: 2pt;
                    }
                    
                    /* Enlaces activos en PDF */
                    a {
                        color: #0000EE;
                        text-decoration: underline;
                    }
                    
                    /* Para impresión, mantener enlaces visibles */
                    @media print {
                        a {
                            color: #0000EE !important;
                            text-decoration: underline !important;
                        }
                        
                        /* Mostrar URLs después del texto para PDF */
                        a[href^="http"]:after,
                        a[href^="mailto"]:after,
                        a[href^="https://wa.me"]:after {
                            content: " (" attr(href) ")";
                            font-size: 10pt;
                            color: #666;
                        }
                    }
                    
                    /* Asegurar que las listas sean legibles */
                    ul, ol {
                        margin-left: 0;
                        padding-left: 16pt;
                    }
                    
                    li {
                        margin-bottom: 2pt;
                    }
                </style>
            </head>
            <body>
                ${cvHTML}
                
                <script>
                    // Función para imprimir automáticamente después de cargar
                    window.onload = function() {
                        // Dar tiempo para que se carguen los estilos
                        setTimeout(function() {
                            window.print();
                        }, 500);
                    };
                    
                    // Manejar el evento después de imprimir
                    window.onafterprint = function() {
                        window.close();
                    };
                </script>
                </script>
            </body>
            </html>
        `;
        
        ventanaImpresion.document.write(contenidoPDF);
        ventanaImpresion.document.close();
        
        // Restaurar botón después de un momento
        setTimeout(() => {
            pdfBtn.innerHTML = textoOriginal;
            pdfBtn.classList.remove('pdf-loading');
            pdfBtn.disabled = false;
        }, 2000);
        
        mostrarAlerta('¡PDF Formato Harvard generado! 📄 Compatible con filtros ATS - Optimizado para sistemas de reclutamiento automático', 'success');
        
    } catch (error) {
        console.error('Error al generar PDF:', error);
        mostrarAlerta('Error al generar el documento PDF.', 'danger');
        
        // Restaurar botón en caso de error
        const pdfBtn = document.getElementById('pdfBtn');
        pdfBtn.innerHTML = '<i class="fas fa-file-pdf icon"></i>Generar PDF';
        pdfBtn.classList.remove('pdf-loading');
        pdfBtn.disabled = false;
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
    
    document.getElementById('perfilProfesional').value = `Profesional egresado en ingeniería en sistemas de información, con un enfoque proactivo y autodidacta, con experiencia en desarrollo de software fullstack y administración de servidores. Me destaco por mi capacidad para aprender rápidamente y adaptarme a entornos dinámicos.`;
    
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

    document.getElementById('habilidades').value = `Programming Languages: Python, JavaScript, TypeScript, SQL, HTML5, CSS3

Frontend Development: React, Angular, Vue.js, SASS, Tailwind CSS, Bootstrap, Responsive Design

Backend Development: Django, FastAPI, Node.js, Express, REST APIs, GraphQL, Microservices

Database Management: PostgreSQL, MongoDB, MySQL, Redis, Database Design, Query Optimization

Cloud & DevOps: AWS (EC2, S3, Lambda), Google Cloud Platform, Docker, Kubernetes, CI/CD Pipelines

Development Tools: Git, GitHub, VS Code, IntelliJ IDEA, Postman, Jira, Slack

Methodologies: Agile/Scrum, Test-Driven Development, Clean Code, Design Patterns`;

    document.getElementById('proyectos').value = `E-commerce Platform - ShopTech (2023)
• Developed full-stack web application using React, TypeScript, and Django
• Implemented secure payment processing with Stripe API integration
• Built responsive admin dashboard with real-time analytics
• Achieved 10,000+ active users with 99.9% uptime
• Technologies: React, Django, PostgreSQL, Redis, AWS

Task Management System - ProjectFlow (2022)
• Created collaborative project management tool for remote teams
• Developed RESTful APIs using Node.js and Express framework
• Integrated real-time notifications using WebSocket technology
• Improved team productivity by 35% based on user feedback
• Technologies: Vue.js, Node.js, MongoDB, Socket.io

Data Analytics Dashboard - InsightPro (2021)
• Built interactive data visualization platform using Python and D3.js
• Processed large datasets with Pandas and NumPy libraries
• Created automated reporting system reducing manual work by 60%
• Deployed scalable solution on AWS with Docker containers
• Technologies: Python, Flask, D3.js, PostgreSQL, Docker`;

    // Agregar secciones opcionales para ejemplo completo
    document.getElementById('certificaciones').value = `• AWS Certified Solutions Architect - Associate (2023)
• Google Cloud Professional Developer (2022)
• Certified Scrum Master (CSM) (2021)
• MongoDB Certified Developer Associate (2021)`;

    document.getElementById('idiomas').value = `• Spanish: Native
• English: Advanced (C1)
• Catalan: Native
• French: Intermediate (B2)`;

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
                   'perfilProfesional', 'educacion', 'experiencia', 'habilidades', 'proyectos', 'certificaciones', 'idiomas'];
    
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
        perfilProfesional: document.getElementById('perfilProfesional').value.trim(),
        educacion: document.getElementById('educacion').value.trim(),
        experiencia: document.getElementById('experiencia').value.trim(),
        habilidades: document.getElementById('habilidades').value.trim(),
        proyectos: document.getElementById('proyectos').value.trim(),
        certificaciones: document.getElementById('certificaciones').value.trim(),
        idiomas: document.getElementById('idiomas').value.trim()
    };
    
    // Pesos de importancia de cada campo
    const pesos = {
        nombre: 15,              // Obligatorio
        email: 15,               // Obligatorio
        telefono: 5,             // Opcional pero importante
        ubicacion: 3,            // Opcional pero importante
        perfilProfesional: 15,   // Muy importante para Harvard
        educacion: 15,           // Muy importante
        experiencia: 20,         // Muy importante
        habilidades: 8,          // Importante
        proyectos: 4,            // Útil
        certificaciones: 2,      // Opcional
        idiomas: 2               // Opcional
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
        { campo: 'perfilProfesional', contador: 'perfilProfesionalCounter' },
        { campo: 'educacion', contador: 'educacionCounter' },
        { campo: 'experiencia', contador: 'experienciaCounter' },
        { campo: 'habilidades', contador: 'habilidadesCounter' },
        { campo: 'proyectos', contador: 'proyectosCounter' },
        { campo: 'certificaciones', contador: 'certificacionesCounter' },
        { campo: 'idiomas', contador: 'idiomasCounter' }
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
        perfilProfesional: 150,
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
