// =============================================================================
// GENERADOR CV HARVARD - ARQUITECTURA MEJORADA
// Desarrollado con mejores prácticas de ingeniería de software
// =============================================================================

/**
 * Clase principal para el manejo del generador de CV
 * Implementa patrón Singleton y separación de responsabilidades
 */
class CVGenerator {
    constructor() {
        if (CVGenerator.instance) {
            return CVGenerator.instance;
        }
        
        this.cvData = {};
        this.pythonAnalysisResult = null;
        this.config = {
            storageKey: 'cvFormulario',
            autoSaveDelay: 500, // ms
            minimumCharLimits: {
                perfilProfesional: 150,
                educacion: 100,
                experiencia: 200,
                habilidades: 100,
                proyectos: 150
            }
        };
        
        // Cacheo de elementos DOM para mejor rendimiento
        this.domCache = new Map();
        
        CVGenerator.instance = this;
        this.init();
    }
    
    /**
     * Inicialización de la aplicación
     */
    init() {
        this.cacheDOM();
        this.bindEvents();
        this.loadSavedForm();
        this.calculateProgress();
        console.log('🚀 CV Generator inicializado con arquitectura mejorada');
    }
    
    /**
     * Cacheo de elementos DOM para evitar consultas repetitivas
     */
    cacheDOM() {
        const elements = [
            'nombre', 'email', 'telefono', 'ubicacion', 'linkedin', 'portfolio',
            'perfilProfesional', 'educacion', 'experiencia', 'habilidades',
            'proyectos', 'certificaciones', 'idiomas', 'resultado',
            'progressBar', 'progressPercentage', 'progressText'
        ];
        
        elements.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                this.domCache.set(id, element);
            }
        });
    }
    
    /**
     * Obtiene elemento del cache DOM
     */
    getElement(id) {
        return this.domCache.get(id);
    }
}

/**
 * Clase para manejo de persistencia de datos
 */
class StorageManager {
    constructor(storageKey = 'cvFormulario') {
        this.storageKey = storageKey;
        this.compressionEnabled = true;
    }
    
    /**
     * Guarda datos con compresión opcional y validación
     */
    save(data) {
        try {
            const dataToSave = {
                data,
                timestamp: Date.now(),
                version: '2.0',
                checksum: this.generateChecksum(data)
            };
            
            const serialized = JSON.stringify(dataToSave);
            
            // Verificar límites de localStorage
            if (serialized.length > 5000000) { // 5MB aprox
                console.warn('Datos demasiado grandes para localStorage');
                return false;
            }
            
            localStorage.setItem(this.storageKey, serialized);
            console.log('📁 Datos guardados exitosamente');
            return true;
            
        } catch (error) {
            console.error('Error al guardar datos:', error);
            this.handleStorageError(error);
            return false;
        }
    }
    
    /**
     * Carga datos con validación de integridad
     */
    load() {
        try {
            const stored = localStorage.getItem(this.storageKey);
            if (!stored) return null;
            
            const parsed = JSON.parse(stored);
            
            // Validar estructura de datos
            if (!this.validateDataStructure(parsed)) {
                console.warn('Estructura de datos inválida, limpiando storage');
                this.clear();
                return null;
            }
            
            // Verificar integridad
            const expectedChecksum = this.generateChecksum(parsed.data);
            if (parsed.checksum !== expectedChecksum) {
                console.warn('Checksum inválido, datos posiblemente corruptos');
                return null;
            }
            
            console.log('📂 Datos cargados exitosamente');
            return parsed.data;
            
        } catch (error) {
            console.error('Error al cargar datos:', error);
            this.clear();
            return null;
        }
    }
    
    /**
     * Genera checksum simple para validar integridad
     */
    generateChecksum(data) {
        const str = JSON.stringify(data);
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convertir a 32-bit
        }
        return hash;
    }
    
    /**
     * Valida estructura de datos
     */
    validateDataStructure(parsed) {
        return parsed && 
               typeof parsed === 'object' && 
               parsed.data && 
               parsed.timestamp && 
               parsed.version;
    }
    
    /**
     * Maneja errores de storage
     */
    handleStorageError(error) {
        if (error.name === 'QuotaExceededError') {
            console.error('Cuota de localStorage excedida');
            // Implementar limpieza automática de datos antiguos
            this.cleanOldData();
        }
    }
    
    /**
     * Limpia datos antiguos si es necesario
     */
    cleanOldData() {
        // Implementación de limpieza de datos antiguos
        console.log('🧹 Limpiando datos antiguos...');
    }
    
    /**
     * Limpia el storage
     */
    clear() {
        localStorage.removeItem(this.storageKey);
        console.log('🗑️ Storage limpiado');
    }
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

/**
 * Clase para validación de formularios con reglas avanzadas
 */
class FormValidator {
    constructor() {
        this.rules = {
            nombre: {
                required: true,
                minLength: 2,
                maxLength: 100,
                pattern: /^[a-zA-ZÀ-ÿ\u00f1\u00d1\s]+$/,
                message: 'Nombre debe contener solo letras y espacios'
            },
            email: {
                required: true,
                validator: 'email'
            },
            telefono: {
                required: false,
                validator: 'phone'
            },
            linkedin: {
                required: false,
                validator: 'linkedin'
            },
            portfolio: {
                required: false,
                validator: 'url'
            },
            educacion: {
                required: true,
                minLength: 50,
                message: 'Educación debe tener al menos 50 caracteres'
            },
            perfilProfesional: {
                required: false,
                minLength: 100,
                maxLength: 500,
                message: 'Perfil profesional debe tener entre 100-500 caracteres'
            }
        };
        
        this.errors = new Map();
        this.warnings = new Map();
    }
    
    /**
     * Valida un campo específico
     */
    validateField(fieldName, value) {
        const rule = this.rules[fieldName];
        if (!rule) return { isValid: true };
        
        const trimmedValue = value?.trim() || '';
        const result = { isValid: true, message: null, type: 'success' };
        
        // Verificar campo requerido
        if (rule.required && !trimmedValue) {
            result.isValid = false;
            result.message = `${this.getFieldLabel(fieldName)} es requerido`;
            result.type = 'error';
            return result;
        }
        
        // Si no es requerido y está vacío, es válido
        if (!rule.required && !trimmedValue) {
            return result;
        }
        
        // Validar longitud mínima
        if (rule.minLength && trimmedValue.length < rule.minLength) {
            result.isValid = false;
            result.message = `${this.getFieldLabel(fieldName)} debe tener al menos ${rule.minLength} caracteres`;
            result.type = 'warning';
        }
        
        // Validar longitud máxima
        if (rule.maxLength && trimmedValue.length > rule.maxLength) {
            result.isValid = false;
            result.message = `${this.getFieldLabel(fieldName)} no puede exceder ${rule.maxLength} caracteres`;
            result.type = 'error';
        }
        
        // Validar patrón
        if (rule.pattern && !rule.pattern.test(trimmedValue)) {
            result.isValid = false;
            result.message = rule.message || `Formato de ${this.getFieldLabel(fieldName)} inválido`;
            result.type = 'error';
        }
        
        // Validar con validador personalizado
        if (rule.validator) {
            const validatorResult = CVUtils.validateField(trimmedValue, rule.validator);
            if (!validatorResult.isValid) {
                result.isValid = false;
                result.message = validatorResult.message;
                result.type = 'error';
            }
        }
        
        return result;
    }
    
    /**
     * Valida todo el formulario
     */
    validateForm(data) {
        this.errors.clear();
        this.warnings.clear();
        
        let isFormValid = true;
        
        Object.keys(this.rules).forEach(fieldName => {
            const result = this.validateField(fieldName, data[fieldName]);
            
            if (!result.isValid) {
                if (result.type === 'error') {
                    this.errors.set(fieldName, result.message);
                    isFormValid = false;
                } else if (result.type === 'warning') {
                    this.warnings.set(fieldName, result.message);
                }
            }
        });
        
        // Validaciones adicionales de contenido
        this.validateContentQuality(data);
        
        return {
            isValid: isFormValid,
            errors: Array.from(this.errors.values()),
            warnings: Array.from(this.warnings.values())
        };
    }
    
    /**
     * Validaciones de calidad de contenido
     */
    validateContentQuality(data) {
        // Verificar balance de secciones
        const sections = ['experiencia', 'habilidades', 'proyectos'];
        const emptySections = sections.filter(section => !data[section]?.trim());
        
        if (emptySections.length > 1) {
            this.warnings.set('balance', 'Considera completar más secciones para un CV más completo');
        }
        
        // Verificar palabras clave profesionales
        const professionalKeywords = ['desarrollador', 'ingeniero', 'programador', 'analista', 'líder', 'senior'];
        const experienceText = (data.experiencia || '').toLowerCase();
        const hasKeywords = professionalKeywords.some(keyword => experienceText.includes(keyword));
        
        if (!hasKeywords && data.experiencia) {
            this.warnings.set('keywords', 'Considera incluir palabras clave profesionales en tu experiencia');
        }
        
        // Verificar formato de fechas
        if (data.experiencia && !this.hasDateFormat(data.experiencia)) {
            this.warnings.set('dates', 'Incluye fechas en formato consistente (ej: Enero 2020 - Presente)');
        }
    }
    
    /**
     * Verifica si el texto contiene formato de fechas
     */
    hasDateFormat(text) {
        const datePatterns = [
            /\d{4}\s*-\s*\d{4}/, // 2020 - 2023
            /\d{4}\s*-\s*presente/i, // 2020 - Presente
            /(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)\s+\d{4}/i
        ];
        
        return datePatterns.some(pattern => pattern.test(text));
    }
    
    /**
     * Obtiene la etiqueta amigable del campo
     */
    getFieldLabel(fieldName) {
        const labels = {
            nombre: 'Nombre',
            email: 'Email',
            telefono: 'Teléfono',
            linkedin: 'LinkedIn',
            portfolio: 'Portfolio',
            educacion: 'Educación',
            experiencia: 'Experiencia',
            habilidades: 'Habilidades',
            proyectos: 'Proyectos',
            perfilProfesional: 'Perfil Profesional'
        };
        
        return labels[fieldName] || fieldName;
    }
}

/**
 * Clase de utilidades para validaciones y funciones helper
 */
class CVUtils {
    /**
     * Validadores mejorados con RegEx más robustos
     */
    static validators = {
        email: {
            regex: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
            message: 'Formato de email inválido'
        },
        phone: {
            regex: /^[\+]?[1-9][\d\s\-\(\)\.]{6,18}$/,
            message: 'Formato de teléfono inválido'
        },
        url: {
            regex: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/,
            message: 'URL inválida'
        },
        linkedin: {
            regex: /^https:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9\-_]+\/?$/,
            message: 'URL de LinkedIn inválida'
        }
    };
    
    /**
     * Valida un campo específico
     */
    static validateField(value, type) {
        if (!value || value.trim() === '') {
            return { isValid: false, message: 'Campo requerido' };
        }
        
        const validator = this.validators[type];
        if (!validator) {
            return { isValid: true };
        }
        
        const isValid = validator.regex.test(value.trim());
        return {
            isValid,
            message: isValid ? null : validator.message
        };
    }
    
    /**
     * Sanitiza HTML para prevenir XSS
     */
    static sanitizeHTML(text) {
        if (!text) return '';
        const tempDiv = document.createElement('div');
        tempDiv.textContent = text;
        return tempDiv.innerHTML;
    }
    
    /**
     * Debounce function para optimizar eventos
     */
    static debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    /**
     * Genera nombre de archivo seguro
     */
    static generateSafeFileName(name) {
        return name
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '') // Remover acentos
            .replace(/[^a-zA-Z0-9\s]/g, '') // Remover caracteres especiales
            .trim()
            .replace(/\s+/g, '_') // Reemplazar espacios con guiones bajos
            .toLowerCase();
    }
    
    /**
     * Formateo de texto mejorado con protección contra inyección
     */
    static formatText(text, options = {}) {
        if (!text) return '';
        
        const {
            preserveLineBreaks = true,
            maxLength = null,
            allowHTML = false
        } = options;
        
        let formatted = allowHTML ? text : this.sanitizeHTML(text);
        
        if (preserveLineBreaks) {
            formatted = formatted.replace(/\n/g, '<br>');
        }
        
        if (maxLength && formatted.length > maxLength) {
            formatted = formatted.substring(0, maxLength) + '...';
        }
        
        return formatted;
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

/**
 * Clase para generación de HTML con sistema de templates
 */
class HTMLGenerator {
    constructor() {
        this.templates = {
            header: this.getHeaderTemplate(),
            section: this.getSectionTemplate(),
            contact: this.getContactTemplate()
        };
        
        this.styles = {
            harvard: this.getHarvardStyles(),
            modern: this.getModernStyles()
        };
    }
    
    /**
     * Genera HTML completo del CV
     */
    generateCV(data, options = {}) {
        const { style = 'harvard', format = 'web' } = options;
        
        try {
            const sections = this.buildSections(data);
            const header = this.buildHeader(data);
            const styles = this.getStylesForFormat(style, format);
            
            return this.assembleHTML(header, sections, styles, format);
            
        } catch (error) {
            console.error('Error generando HTML:', error);
            throw new Error('Error al generar el CV');
        }
    }
    
    /**
     * Construye el encabezado del CV
     */
    buildHeader(data) {
        const contactInfo = this.buildContactInfo(data);
        
        return this.templates.header
            .replace('{{nombre}}', CVUtils.sanitizeHTML(data.nombre || ''))
            .replace('{{contacto}}', contactInfo);
    }
    
    /**
     * Construye información de contacto
     */
    buildContactInfo(data) {
        const contacts = [];
        
        if (data.ubicacion) {
            contacts.push(CVUtils.sanitizeHTML(data.ubicacion));
        }
        
        if (data.telefono) {
            const whatsappLink = this.generateWhatsAppLink(data.telefono);
            contacts.push(`<a href="${whatsappLink}" class="contact-link">${CVUtils.sanitizeHTML(data.telefono)}</a>`);
        }
        
        if (data.email) {
            contacts.push(`<a href="mailto:${data.email}" class="contact-link">${CVUtils.sanitizeHTML(data.email)}</a>`);
        }
        
        if (data.linkedin) {
            contacts.push(`<a href="${data.linkedin}" class="contact-link">LinkedIn</a>`);
        }
        
        if (data.portfolio) {
            contacts.push(`<a href="${data.portfolio}" class="contact-link">Portfolio</a>`);
        }
        
        return contacts.join(' • ');
    }
    
    /**
     * Construye todas las secciones del CV
     */
    buildSections(data) {
        const sectionOrder = [
            { key: 'perfilProfesional', title: 'PROFESSIONAL SUMMARY', formatter: 'text' },
            { key: 'educacion', title: 'EDUCATION', formatter: 'harvard' },
            { key: 'experiencia', title: 'EXPERIENCE', formatter: 'experience' },
            { key: 'habilidades', title: 'SKILLS', formatter: 'skills' },
            { key: 'proyectos', title: 'PROJECTS', formatter: 'projects' },
            { key: 'certificaciones', title: 'CERTIFICATIONS', formatter: 'harvard' },
            { key: 'idiomas', title: 'LANGUAGES', formatter: 'harvard' }
        ];
        
        return sectionOrder
            .filter(section => data[section.key] && data[section.key].trim())
            .map(section => this.buildSection(section, data[section.key]))
            .join('');
    }
    
    /**
     * Construye una sección individual
     */
    buildSection(sectionConfig, content) {
        const formattedContent = this.formatContent(content, sectionConfig.formatter);
        
        return this.templates.section
            .replace('{{title}}', sectionConfig.title)
            .replace('{{content}}', formattedContent);
    }
    
    /**
     * Formatea contenido según el tipo
     */
    formatContent(content, formatter) {
        const formatters = {
            text: (text) => `<div class="text-content">${CVUtils.formatText(text)}</div>`,
            harvard: (text) => this.formatHarvardSection(text),
            experience: (text) => this.formatExperienceSection(text),
            skills: (text) => this.formatSkillsSection(text),
            projects: (text) => this.formatProjectsSection(text)
        };
        
        return formatters[formatter] ? formatters[formatter](content) : formatters.text(content);
    }
    
    /**
     * Formatea sección estilo Harvard
     */
    formatHarvardSection(text) {
        return text.split('\n')
            .filter(line => line.trim())
            .map(line => {
                const trimmed = line.trim();
                if (trimmed.startsWith('•')) {
                    return `<div class="bullet-item">• ${CVUtils.sanitizeHTML(trimmed.substring(1).trim())}</div>`;
                }
                return `<div class="section-item">${CVUtils.sanitizeHTML(trimmed)}</div>`;
            })
            .join('');
    }
    
    /**
     * Formatea sección de experiencia
     */
    formatExperienceSection(text) {
        const lines = text.split('\n').filter(line => line.trim());
        let html = '';
        
        lines.forEach(line => {
            const trimmed = line.trim();
            
            if (this.isJobTitle(trimmed)) {
                html += `<div class="job-title">${CVUtils.sanitizeHTML(trimmed)}</div>`;
            } else if (this.isCompanyInfo(trimmed)) {
                html += `<div class="company-info">${CVUtils.sanitizeHTML(trimmed)}</div>`;
            } else if (trimmed.startsWith('•')) {
                html += `<div class="responsibility">• ${CVUtils.sanitizeHTML(trimmed.substring(1).trim())}</div>`;
            } else {
                html += `<div class="experience-detail">${CVUtils.sanitizeHTML(trimmed)}</div>`;
            }
        });
        
        return html;
    }
    
    /**
     * Verifica si es título de trabajo
     */
    isJobTitle(text) {
        const jobKeywords = ['developer', 'engineer', 'manager', 'analyst', 'specialist', 'coordinator', 'director', 'lead', 'senior', 'junior'];
        return jobKeywords.some(keyword => text.toLowerCase().includes(keyword));
    }
    
    /**
     * Verifica si es información de empresa
     */
    isCompanyInfo(text) {
        return text.includes(',') && (text.includes('20') || text.toLowerCase().includes('presente'));
    }
    
    /**
     * Genera enlace de WhatsApp
     */
    generateWhatsAppLink(phone) {
        const cleanPhone = phone.replace(/[^\d+]/g, '');
        const phoneNumber = cleanPhone.startsWith('+') ? cleanPhone.substring(1) : cleanPhone;
        return `https://wa.me/${phoneNumber}`;
    }
    
    /**
     * Templates HTML
     */
    getHeaderTemplate() {
        return `
        <div class="cv-header">
            <div class="name-section">{{nombre}}</div>
            <div class="contact-section">{{contacto}}</div>
        </div>`;
    }
    
    getSectionTemplate() {
        return `
        <div class="cv-section">
            <div class="section-title">{{title}}</div>
            <div class="section-content">{{content}}</div>
        </div>`;
    }
    
    /**
     * Estilos CSS mejorados
     */
    getHarvardStyles() {
        return `
        .cv-container {
            font-family: 'Times New Roman', serif;
            font-size: 12pt;
            line-height: 1.15;
            color: #000000;
            max-width: 8.5in;
            margin: 0 auto;
            padding: 0.5in;
        }
        
        .cv-header {
            text-align: center;
            margin-bottom: 24pt;
            border-bottom: 1pt solid #000000;
            padding-bottom: 12pt;
        }
        
        .name-section {
            font-size: 16pt;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 1pt;
            margin-bottom: 12pt;
        }
        
        .contact-section {
            font-size: 11pt;
            line-height: 1.4;
        }
        
        .contact-link {
            color: #0563C1;
            text-decoration: underline;
        }
        
        .cv-section {
            margin-bottom: 20pt;
            text-align: left;
        }
        
        .section-title {
            font-size: 12pt;
            font-weight: bold;
            text-transform: uppercase;
            border-bottom: 1pt solid #000000;
            margin-bottom: 8pt;
            padding-bottom: 2pt;
        }
        
        .section-content {
            font-size: 12pt;
            line-height: 1.3;
        }
        
        .job-title {
            font-weight: bold;
            margin-top: 8pt;
            margin-bottom: 2pt;
        }
        
        .company-info {
            font-style: italic;
            margin-bottom: 4pt;
        }
        
        .responsibility {
            margin-left: 12pt;
            margin-bottom: 2pt;
        }
        
        .bullet-item {
            margin-bottom: 2pt;
        }
        
        .section-item {
            margin-bottom: 4pt;
        }
        
        @media print {
            .cv-container {
                margin: 0;
                padding: 0.5in;
            }
            
            .contact-link {
                color: #0563C1 !important;
            }
        }`;
    }
    
    getModernStyles() {
        // Implementar estilos modernos para futuras versiones
        return this.getHarvardStyles();
    }
    
    /**
     * Ensambla el HTML final
     */
    assembleHTML(header, sections, styles, format) {
        const cssClass = format === 'word' ? 'cv-container word-format' : 'cv-container';
        
        return `
        <div class="${cssClass}">
            <style>${styles}</style>
            ${header}
            ${sections}
        </div>`;
    }
    
    /**
     * Obtiene estilos según formato
     */
    getStylesForFormat(style, format) {
        let baseStyles = this.styles[style] || this.styles.harvard;
        
        if (format === 'word') {
            baseStyles += `
            .word-format {
                padding: 0;
                margin: 0;
            }
            
            .word-format .cv-header {
                text-align: center !important;
            }
            
            .word-format .cv-section {
                text-align: left !important;
            }`;
        }
        
        return baseStyles;
    }
}

function generarCVHTML(datos) {
    const fechaGeneracion = new Date().toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    let html = `
    <div style="max-width: 100%; margin: 0; padding: 10px; font-family: 'Times New Roman', serif; font-size: 12pt; line-height: 1.15; color: #000000; text-align: left;">
        <!-- ENCABEZADO FORMATO HARVARD - SOLO NOMBRE CENTRADO -->
        <div style="margin-bottom: 24pt; width: 100%;">
            <!-- Solo el nombre centrado -->
            <div style="font-size: 16pt; font-weight: bold; text-transform: uppercase; letter-spacing: 1pt; margin-bottom: 12pt; text-align: center;">
                ${escaparHTML(datos.nombre)}
            </div>
            
            <!-- Información de contacto centrada -->
            <div style="font-size: 11pt; line-height: 1.4; text-align: center;">
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
            <div style="font-size: 12pt; font-weight: bold; text-transform: uppercase; border-bottom: 1pt solid #000000; margin-bottom: 8pt; padding-bottom: 2pt; text-align: left;">
                PROFESSIONAL SUMMARY
            </div>
            <div style="margin-left: 0pt; text-align: left; font-size: 12pt; line-height: 1.3;">
                ${escaparHTML(datos.perfilProfesional)}
            </div>
        </div>`;
    }
    
    // EDUCACIÓN - Formato Harvard ATS
    if (datos.educacion) {
        html += `
        <div style="margin-bottom: 20pt;">
            <div style="font-size: 12pt; font-weight: bold; text-transform: uppercase; border-bottom: 1pt solid #000000; margin-bottom: 8pt; padding-bottom: 2pt; text-align: left;">
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
            <div style="font-size: 12pt; font-weight: bold; text-transform: uppercase; border-bottom: 1pt solid #000000; margin-bottom: 8pt; padding-bottom: 2pt; text-align: left;">
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
            <div style="font-size: 12pt; font-weight: bold; text-transform: uppercase; border-bottom: 1pt solid #000000; margin-bottom: 8pt; padding-bottom: 2pt; text-align: left;">
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
            <div style="font-size: 12pt; font-weight: bold; text-transform: uppercase; border-bottom: 1pt solid #000000; margin-bottom: 8pt; padding-bottom: 2pt; text-align: left;">
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
            <div style="font-size: 12pt; font-weight: bold; text-transform: uppercase; border-bottom: 1pt solid #000000; margin-bottom: 8pt; padding-bottom: 2pt; text-align: left;">
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
            <div style="font-size: 12pt; font-weight: bold; text-transform: uppercase; border-bottom: 1pt solid #000000; margin-bottom: 8pt; padding-bottom: 2pt; text-align: left;">
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

// Función específica para generar HTML optimizado para Word
function generarCVHTMLParaWord(datos) {
    let html = `
    <div style="margin: 0; padding: 0; font-family: 'Times New Roman', serif; font-size: 12pt; line-height: 1.15; color: #000000;">
        <!-- ENCABEZADO CENTRADO -->
        <div style="text-align: center; margin-bottom: 24pt;">
            <div style="font-size: 16pt; font-weight: bold; text-transform: uppercase; letter-spacing: 1pt; margin-bottom: 12pt;">
                ${escaparHTML(datos.nombre)}
            </div>
            
            <div style="font-size: 11pt; line-height: 1.4;">
                ${datos.ubicacion ? `${escaparHTML(datos.ubicacion)}<br>` : ''}
                ${datos.telefono ? `${crearEnlaceHTML(generarEnlaceWhatsApp(datos.telefono), escaparHTML(datos.telefono))}` : ''} 
                ${datos.telefono && datos.email ? ' • ' : ''}
                ${crearEnlaceHTML(datos.email, escaparHTML(datos.email), true)}<br>
                ${datos.linkedin ? crearEnlaceHTML(datos.linkedin, 'LinkedIn') : ''}
                ${datos.linkedin && datos.portfolio ? ' • ' : ''}
                ${datos.portfolio ? crearEnlaceHTML(datos.portfolio, 'Portfolio') : ''}
            </div>
        </div>`;
    
    // TODAS LAS SECCIONES CON ALINEACIÓN IZQUIERDA FORZADA
    if (datos.perfilProfesional) {
        html += `
        <div style="margin-bottom: 20pt; text-align: left;">
            <div style="font-size: 12pt; font-weight: bold; text-transform: uppercase; border-bottom: 1pt solid #000000; margin-bottom: 8pt; padding-bottom: 2pt; text-align: left;">
                PROFESSIONAL SUMMARY
            </div>
            <div style="text-align: left; font-size: 12pt; line-height: 1.3;">
                ${escaparHTML(datos.perfilProfesional)}
            </div>
        </div>`;
    }
    
    if (datos.educacion) {
        html += `
        <div style="margin-bottom: 20pt; text-align: left;">
            <div style="font-size: 12pt; font-weight: bold; text-transform: uppercase; border-bottom: 1pt solid #000000; margin-bottom: 8pt; padding-bottom: 2pt; text-align: left;">
                EDUCATION
            </div>
            <div style="text-align: left;">
                ${formatearSeccionHarvardATS(datos.educacion)}
            </div>
        </div>`;
    }
    
    if (datos.experiencia) {
        html += `
        <div style="margin-bottom: 20pt; text-align: left;">
            <div style="font-size: 12pt; font-weight: bold; text-transform: uppercase; border-bottom: 1pt solid #000000; margin-bottom: 8pt; padding-bottom: 2pt; text-align: left;">
                EXPERIENCE
            </div>
            <div style="text-align: left;">
                ${formatearExperienciaHarvardATS(datos.experiencia)}
            </div>
        </div>`;
    }
    
    if (datos.habilidades) {
        html += `
        <div style="margin-bottom: 20pt; text-align: left;">
            <div style="font-size: 12pt; font-weight: bold; text-transform: uppercase; border-bottom: 1pt solid #000000; margin-bottom: 8pt; padding-bottom: 2pt; text-align: left;">
                SKILLS
            </div>
            <div style="text-align: left;">
                ${formatearHabilidadesHarvardATS(datos.habilidades)}
            </div>
        </div>`;
    }
    
    if (datos.proyectos) {
        html += `
        <div style="margin-bottom: 20pt; text-align: left;">
            <div style="font-size: 12pt; font-weight: bold; text-transform: uppercase; border-bottom: 1pt solid #000000; margin-bottom: 8pt; padding-bottom: 2pt; text-align: left;">
                PROJECTS
            </div>
            <div style="text-align: left;">
                ${formatearProyectosHarvardATS(datos.proyectos)}
            </div>
        </div>`;
    }
    
    if (datos.certificaciones) {
        html += `
        <div style="margin-bottom: 20pt; text-align: left;">
            <div style="font-size: 12pt; font-weight: bold; text-transform: uppercase; border-bottom: 1pt solid #000000; margin-bottom: 8pt; padding-bottom: 2pt; text-align: left;">
                CERTIFICATIONS
            </div>
            <div style="text-align: left;">
                ${formatearSeccionHarvardATS(datos.certificaciones)}
            </div>
        </div>`;
    }
    
    if (datos.idiomas) {
        html += `
        <div style="margin-bottom: 20pt; text-align: left;">
            <div style="font-size: 12pt; font-weight: bold; text-transform: uppercase; border-bottom: 1pt solid #000000; margin-bottom: 8pt; padding-bottom: 2pt; text-align: left;">
                LANGUAGES
            </div>
            <div style="text-align: left;">
                ${formatearSeccionHarvardATS(datos.idiomas)}
            </div>
        </div>`;
    }
    
    html += `</div>`;
    return html;
}

function generarWord() {
    if (!cvData || !cvData.nombre) {
        mostrarAlerta('Primero genera el CV antes de descargarlo', 'warning');
        return;
    }

    try {
        const cvHTML = generarCVHTMLParaWord(cvData);
        
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
                    p, div {
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

        const cvHTML = generarCVHTMLParaWord(cvData);
        
        // Crear ventana nueva para impresión
        const ventanaPDF = window.open('', '_blank');
        
        if (ventanaPDF) {
            // Escribir contenido directamente
            ventanaPDF.document.write(`
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>${cvData.nombre.replace(/[<>"'&]/g, '')}</title>
    <style>
        @page { margin: 0.5in; size: A4; }
        body { 
            font-family: 'Times New Roman', serif; 
            font-size: 12pt; 
            line-height: 1.15; 
            color: #000; 
            background: white; 
            margin: 0; 
            padding: 0; 
            text-align: left !important;
        }
        /* Forzar alineación izquierda para todo por defecto */
        * {
            text-align: left !important;
        }
        p, div {
            text-align: left !important;
        }
        /* SOLO centrar el nombre y contacto específicamente */
        div[style*="font-size: 16pt"] {
            text-align: center !important;
        }
        div[style*="font-size: 11pt"][style*="line-height: 1.4"] {
            text-align: center !important;
        }
        /* Asegurar que elementos con center explícito se centren */
        div[style*="text-align: center"] {
            text-align: center !important;
        }
        a { color: #0563C1; text-decoration: underline; }
        @media print {
            * { -webkit-print-color-adjust: exact !important; }
            body { margin: 0 !important; padding: 0 !important; text-align: left !important; }
        }
    </style>
</head>
<body>
${cvHTML}
<script>
    document.title = "${cvData.nombre.replace(/[<>"'&]/g, '')}";
    window.onload = function() {
        setTimeout(function() {
            window.print();
            setTimeout(function() {
                window.close();
            }, 1000);
        }, 500);
    };
</script>
</body>
</html>`);
            
            ventanaPDF.document.close();
        } else {
            // Si no se puede abrir ventana, crear descarga directa
            const contenidoHTML = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>${cvData.nombre.replace(/[<>"'&]/g, '')}</title>
    <style>
        @page { margin: 0.5in; size: A4; }
        body { 
            font-family: 'Times New Roman', serif; 
            font-size: 12pt; 
            line-height: 1.15; 
            color: #000; 
            background: white; 
            margin: 0; 
            padding: 0; 
            text-align: left !important;
        }
        /* Forzar alineación izquierda para todo por defecto */
        * {
            text-align: left !important;
        }
        /* SOLO centrar el nombre y contacto específicamente */
        div[style*="font-size: 16pt"] {
            text-align: center !important;
        }
        div[style*="font-size: 11pt"][style*="line-height: 1.4"] {
            text-align: center !important;
        }
        /* Asegurar que elementos con center explícito se centren */
        div[style*="text-align: center"] {
            text-align: center !important;
        }
        a { color: #0563C1; text-decoration: underline; }
        @media print {
            * { -webkit-print-color-adjust: exact !important; }
            body { margin: 0 !important; padding: 0 !important; }
        }
    </style>
</head>
<body>
${cvHTML}
</body>
</html>`;
            
            const blob = new Blob([contenidoHTML], { type: 'text/html;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const enlace = document.createElement('a');
            enlace.href = url;
            enlace.download = `${cvData.nombre.replace(/[^a-zA-Z0-9\s]/g, '').trim().replace(/\s+/g, '-')}-CV.html`;
            document.body.appendChild(enlace);
            enlace.click();
            document.body.removeChild(enlace);
            URL.revokeObjectURL(url);
            
            mostrarAlerta('CV descargado como archivo HTML. Ábrelo en tu navegador y usa Ctrl+P para generar PDF.', 'info');
        }
        
        // Restaurar botón después de un momento
        setTimeout(() => {
            pdfBtn.innerHTML = textoOriginal;
            pdfBtn.classList.remove('pdf-loading');
            pdfBtn.disabled = false;
        }, 2000);
        
        mostrarAlerta('¡PDF listo para generar! 📄 Usa Ctrl+P en la ventana que se abrió', 'success');
        
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
/**
 * Funciones auxiliares mejoradas
 */

/**
 * Limpia el formulario con confirmación
 */
function clearForm() {
    if (!confirm('¿Estás seguro de que quieres limpiar todos los datos? Esta acción no se puede deshacer.')) {
        return;
    }
    
    try {
        // Limpiar campos
        const fields = [
            'nombre', 'email', 'telefono', 'ubicacion', 'linkedin', 'portfolio',
            'perfilProfesional', 'educacion', 'experiencia', 'habilidades',
            'proyectos', 'certificaciones', 'idiomas'
        ];
        
        fields.forEach(field => {
            const element = document.getElementById(field);
            if (element) {
                element.value = '';
                // Limpiar validación visual
                const indicator = document.getElementById(field + '-validation');
                if (indicator) {
                    indicator.className = 'validation-indicator';
                    indicator.innerHTML = '';
                }
            }
        });
        
        // Limpiar storage
        storageManager.clear();
        
        // Limpiar resultado
        const resultContainer = document.getElementById('resultado');
        if (resultContainer) {
            resultContainer.style.display = 'none';
            resultContainer.innerHTML = '';
        }
        
        // Actualizar progreso
        updateProgress();
        
        notificationManager.success('Formulario limpiado exitosamente');
        
    } catch (error) {
        console.error('Error al limpiar formulario:', error);
        notificationManager.error('Error al limpiar el formulario');
    }
}

/**
 * Carga ejemplo mejorado
 */
function loadExample() {
    try {
        const exampleData = {
            nombre: 'María González Rodríguez',
            email: 'maria.gonzalez@techpro.com',
            telefono: '+34 665 123 456',
            ubicacion: 'Madrid, España',
            linkedin: 'https://linkedin.com/in/maria-gonzalez-dev',
            portfolio: 'https://mariagonzalez.dev',
            
            perfilProfesional: 'Ingeniera de Software Senior con más de 7 años de experiencia en desarrollo full-stack y liderazgo técnico. Especializada en arquitecturas escalables, metodologías ágiles y tecnologías modernas. Apasionada por la innovación y el mentoring técnico.',
            
            educacion: `Máster en Ingeniería de Software
Universidad Politécnica de Madrid
2018 - 2020
Especialización: Arquitecturas de Software y DevOps

Grado en Ingeniería Informática
Universidad Complutense de Madrid
2014 - 2018
Nota Media: 8.7/10 - Matrícula de Honor

Certificaciones:
• AWS Certified Solutions Architect - Professional (2023)
• Certified Kubernetes Administrator (2022)
• Scrum Master Certified (2021)`,

            experiencia: `Tech Lead & Senior Full Stack Developer
InnovateTech Solutions, Madrid - Enero 2022 - Presente
• Liderazgo técnico de equipo multidisciplinario de 12 desarrolladores
• Arquitectura y desarrollo de microservicios con Spring Boot y React
• Implementación de pipelines CI/CD que redujeron deployment time en 75%
• Migración exitosa de aplicaciones legacy a arquitectura cloud-native
• Mentoring y formación técnica de desarrolladores junior

Senior Full Stack Developer
DigitalCorp, Madrid - Marzo 2020 - Diciembre 2021
• Desarrollo de aplicaciones web críticas con más de 100k usuarios
• Stack técnico: React, Node.js, PostgreSQL, Docker, Kubernetes
• Implementación de sistemas de autenticación OAuth2 y JWT
• Optimización de rendimiento que mejoró la velocidad de carga en 60%
• Colaboración directa con equipos de UX/UI y Product Management

Full Stack Developer
StartupHub, Madrid - Junio 2018 - Febrero 2020
• Desarrollo de MVP para startups en fase inicial
• Tecnologías: Vue.js, Python Django, MongoDB, AWS
• Implementación de sistemas de pago con Stripe y PayPal
• Desarrollo de APIs REST y GraphQL para aplicaciones móviles`,

            habilidades: `Lenguajes de Programación: JavaScript, TypeScript, Python, Java, SQL

Frontend: React, Vue.js, Angular, HTML5, CSS3, SASS, Tailwind CSS, Bootstrap

Backend: Node.js, Spring Boot, Django, FastAPI, Express.js, Microservicios

Bases de Datos: PostgreSQL, MongoDB, MySQL, Redis, Elasticsearch

Cloud & DevOps: AWS, Docker, Kubernetes, Jenkins, GitLab CI/CD, Terraform

Herramientas: Git, GitHub, Jira, Confluence, Postman, SonarQube

Metodologías: Scrum, Kanban, TDD, Clean Architecture, Design Patterns`,

            proyectos: `E-Commerce Platform - TechMarket (2023)
• Plataforma de comercio electrónico B2B con más de 50k productos
• Arquitectura de microservicios con Spring Boot y React
• Integración con múltiples sistemas de pago y logística
• Manejo de 10k+ transacciones diarias con 99.9% uptime
• Stack: React, Spring Boot, PostgreSQL, Redis, AWS, Kubernetes

Healthcare Management System - MediFlow (2022)
• Sistema integral de gestión hospitalaria para múltiples centros
• Interface responsive y sistema de notificaciones en tiempo real
• Cumplimiento de normativas GDPR y protección de datos sanitarios
• Reducción del 40% en tiempo de gestión administrativa
• Stack: Vue.js, Node.js, MongoDB, Socket.io, Docker

Financial Analytics Dashboard - FinTech Pro (2021)
• Dashboard analítico para gestión de inversiones y trading
• Procesamiento en tiempo real de datos financieros
• Visualizaciones interactivas con D3.js y Chart.js
• Integración con APIs de mercados financieros globales
• Stack: Angular, Python Django, PostgreSQL, Redis, AWS Lambda`,

            certificaciones: `• AWS Certified Solutions Architect - Professional (2023)
• Certified Kubernetes Administrator - CKA (2022)
• Certified Scrum Master - CSM (2021)
• MongoDB Certified Developer Associate (2020)
• Google Cloud Professional Developer (2020)`,

            idiomas: `• Español: Nativo
• Inglés: Avanzado (C1) - Cambridge Certificate
• Francés: Intermedio (B2)
• Alemán: Básico (A2)`
        };
        
        populateForm(exampleData);
        
        notificationManager.success('Ejemplo cargado correctamente', {
            actions: [{
                label: 'Generar CV',
                handler: 'generateCV()'
            }]
        });
        
    } catch (error) {
        console.error('Error al cargar ejemplo:', error);
        notificationManager.error('Error al cargar el ejemplo');
    }
}

/**
 * Analiza CV con IA simulada mejorada
 */
function analyzeCV() {
    try {
        const data = collectFormData();
        
        if (!data.nombre || !data.experiencia) {
            notificationManager.warning('Completa al menos el nombre y experiencia para el análisis');
            return;
        }
        
        notificationManager.info('Analizando CV con IA...', { duration: 2000 });
        
        // Simular análisis con delay
        setTimeout(() => {
            const analysis = performAIAnalysis(data);
            showAnalysisResults(analysis);
        }, 2500);
        
    } catch (error) {
        console.error('Error en análisis:', error);
        notificationManager.error('Error al analizar el CV');
    }
}

/**
 * Realiza análisis de CV simulado
 */
function performAIAnalysis(data) {
    const analysis = {
        score: 0,
        strengths: [],
        improvements: [],
        keywords: [],
        technologies: [],
        recommendations: []
    };
    
    const fullText = Object.values(data).join(' ').toLowerCase();
    
    // Análisis de score base
    analysis.score = 65;
    
    // Análisis de tecnologías
    const techKeywords = ['react', 'angular', 'vue', 'node.js', 'python', 'java', 'aws', 'docker', 'kubernetes'];
    analysis.technologies = techKeywords.filter(tech => fullText.includes(tech));
    analysis.score += analysis.technologies.length * 3;
    
    // Análisis de experiencia
    if (fullText.includes('senior') || fullText.includes('lead')) {
        analysis.score += 10;
        analysis.strengths.push('Experiencia en posiciones de liderazgo');
    }
    
    if (fullText.includes('arquitectura') || fullText.includes('microservicios')) {
        analysis.score += 8;
        analysis.strengths.push('Conocimiento en arquitecturas avanzadas');
    }
    
    // Análisis de certificaciones
    if (data.certificaciones && data.certificaciones.length > 50) {
        analysis.score += 5;
        analysis.strengths.push('Certificaciones profesionales relevantes');
    }
    
    // Recomendaciones
    if (analysis.technologies.length < 5) {
        analysis.improvements.push('Incluir más tecnologías relevantes');
    }
    
    if (!fullText.includes('agile') && !fullText.includes('scrum')) {
        analysis.improvements.push('Mencionar experiencia en metodologías ágiles');
    }
    
    if (!data.proyectos || data.proyectos.length < 100) {
        analysis.improvements.push('Ampliar la sección de proyectos con más detalles');
    }
    
    // Limitar score máximo
    analysis.score = Math.min(analysis.score, 95);
    
    return analysis;
}

/**
 * Muestra resultados del análisis
 */
function showAnalysisResults(analysis) {
    const color = analysis.score >= 80 ? 'success' : analysis.score >= 60 ? 'warning' : 'danger';
    
    const content = `
        <div class="text-center mb-3">
            <h4 class="text-${color}">Puntuación: ${analysis.score}/100</h4>
            <div class="progress mb-3">
                <div class="progress-bar bg-${color}" style="width: ${analysis.score}%"></div>
            </div>
        </div>
        
        ${analysis.strengths.length > 0 ? `
            <h6 class="text-success">🎯 Fortalezas Detectadas:</h6>
            <ul class="list-group list-group-flush mb-3">
                ${analysis.strengths.map(strength => `<li class="list-group-item">${strength}</li>`).join('')}
            </ul>
        ` : ''}
        
        ${analysis.improvements.length > 0 ? `
            <h6 class="text-warning">💡 Áreas de Mejora:</h6>
            <ul class="list-group list-group-flush mb-3">
                ${analysis.improvements.map(improvement => `<li class="list-group-item">${improvement}</li>`).join('')}
            </ul>
        ` : ''}
        
        ${analysis.technologies.length > 0 ? `
            <h6 class="text-info">🔧 Tecnologías Identificadas:</h6>
            <div class="mb-3">
                ${analysis.technologies.map(tech => `<span class="badge bg-primary me-1">${tech}</span>`).join('')}
            </div>
        ` : ''}
    `;
    
    showModal('Análisis de CV con IA', content);
    
    notificationManager.success(`Análisis completado - Puntuación: ${analysis.score}/100`);
}

/**
 * Genera documento Word mejorado
 */
function generateWord() {
    if (!cvGenerator.cvData || !cvGenerator.cvData.nombre) {
        notificationManager.warning('Primero genera el CV antes de descargarlo');
        return;
    }
    
    try {
        const cvHTML = htmlGenerator.generateCV(cvGenerator.cvData, { style: 'harvard', format: 'word' });
        
        const blob = new Blob([`
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <meta name="Generator" content="Microsoft Word">
                <title>CV - ${CVUtils.sanitizeHTML(cvGenerator.cvData.nombre)}</title>
            </head>
            <body>
                ${cvHTML}
            </body>
            </html>
        `], { type: 'application/msword' });
        
        const fileName = `CV_${CVUtils.generateSafeFileName(cvGenerator.cvData.nombre)}.doc`;
        downloadBlob(blob, fileName);
        
        notificationManager.success('CV en Word descargado exitosamente');
        
    } catch (error) {
        console.error('Error al generar Word:', error);
        notificationManager.error('Error al generar el documento Word');
    }
}

/**
 * Genera PDF mejorado
 */
function generatePDF() {
    if (!cvGenerator.cvData || !cvGenerator.cvData.nombre) {
        notificationManager.warning('Primero genera el CV antes de descargarlo');
        return;
    }
    
    try {
        const cvHTML = htmlGenerator.generateCV(cvGenerator.cvData, { style: 'harvard', format: 'pdf' });
        
        const printWindow = window.open('', '_blank');
        
        if (printWindow) {
            printWindow.document.write(`
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="utf-8">
                    <title>CV - ${CVUtils.sanitizeHTML(cvGenerator.cvData.nombre)}</title>
                    <style>
                        @page { margin: 0.5in; size: A4; }
                        @media print {
                            * { -webkit-print-color-adjust: exact !important; }
                        }
                    </style>
                </head>
                <body>
                    ${cvHTML}
                    <script>
                        window.onload = function() {
                            setTimeout(() => {
                                window.print();
                                setTimeout(() => window.close(), 1000);
                            }, 500);
                        };
                    </script>
                </body>
                </html>
            `);
            
            printWindow.document.close();
            
            notificationManager.success('PDF generado - Usa Ctrl+P para guardar');
        } else {
            throw new Error('No se pudo abrir ventana para PDF');
        }
        
    } catch (error) {
        console.error('Error al generar PDF:', error);
        notificationManager.error('Error al generar el PDF');
    }
}

/**
 * Descarga blob como archivo
 */
function downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Funciones de compatibilidad hacia atrás (deprecated)
function generarCV() { return generateCV(); }
function limpiarFormulario() { return clearForm(); }
function cargarEjemploModerno() { return loadExample(); }
function analizarCV() { return analyzeCV(); }
function generarWord() { return generateWord(); }
function generarPDF() { return generatePDF(); }
function mostrarAlerta(mensaje, tipo) { 
    if (notificationManager) {
        notificationManager.show(mensaje, tipo);
    }
}

/**
 * Sistema de notificaciones mejorado con cola y animaciones
 */
class NotificationManager {
    constructor() {
        this.notifications = [];
        this.container = null;
        this.maxNotifications = 5;
        this.init();
    }
    
    init() {
        this.createContainer();
    }
    
    createContainer() {
        this.container = document.getElementById('alertas') || this.createNotificationContainer();
    }
    
    createNotificationContainer() {
        const container = document.createElement('div');
        container.id = 'notification-container';
        container.className = 'notification-container';
        container.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 9999;
            max-width: 400px;
        `;
        document.body.appendChild(container);
        return container;
    }
    
    /**
     * Muestra una notificación
     */
    show(message, type = 'info', options = {}) {
        const {
            duration = this.getDurationByType(type),
            persistent = false,
            actions = []
        } = options;
        
        const notification = this.createNotification(message, type, { duration, persistent, actions });
        this.addNotification(notification);
        
        if (!persistent) {
            setTimeout(() => this.removeNotification(notification), duration);
        }
        
        return notification;
    }
    
    /**
     * Crea elemento de notificación
     */
    createNotification(message, type, options) {
        const notification = document.createElement('div');
        const id = 'notification-' + Date.now() + Math.random().toString(36).substr(2, 9);
        
        notification.id = id;
        notification.className = `alert alert-${type} alert-dismissible fade show notification-item`;
        notification.style.cssText = `
            margin-bottom: 10px;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s ease;
        `;
        
        const icon = this.getIconForType(type);
        
        notification.innerHTML = `
            <div class="d-flex align-items-center">
                <i class="${icon} me-2"></i>
                <div class="flex-grow-1">${message}</div>
                ${this.createActionsHTML(options.actions)}
                <button type="button" class="btn-close" onclick="notificationManager.removeNotification('${id}')"></button>
            </div>
            ${!options.persistent ? `<div class="notification-progress" style="height: 2px; background: rgba(255,255,255,0.3); margin-top: 8px;"><div class="progress-bar" style="height: 100%; background: rgba(255,255,255,0.7); width: 100%; animation: countdown ${options.duration}ms linear;"></div></div>` : ''}
        `;
        
        // Trigger animation
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 10);
        
        return notification;
    }
    
    /**
     * Crea HTML para acciones
     */
    createActionsHTML(actions) {
        if (!actions || actions.length === 0) return '';
        
        return `
            <div class="notification-actions ms-2">
                ${actions.map(action => 
                    `<button class="btn btn-sm btn-outline-light me-1" onclick="${action.handler}">${action.label}</button>`
                ).join('')}
            </div>
        `;
    }
    
    /**
     * Añade notificación al contenedor
     */
    addNotification(notification) {
        // Limitar número de notificaciones
        if (this.notifications.length >= this.maxNotifications) {
            this.removeNotification(this.notifications[0]);
        }
        
        this.notifications.push(notification);
        this.container.appendChild(notification);
    }
    
    /**
     * Remueve notificación
     */
    removeNotification(notificationOrId) {
        const notification = typeof notificationOrId === 'string' 
            ? document.getElementById(notificationOrId)
            : notificationOrId;
            
        if (!notification) return;
        
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
            this.notifications = this.notifications.filter(n => n !== notification);
        }, 300);
    }
    
    /**
     * Obtiene duración según tipo
     */
    getDurationByType(type) {
        const durations = {
            success: 4000,
            info: 5000,
            warning: 6000,
            danger: 8000,
            error: 8000
        };
        return durations[type] || 5000;
    }
    
    /**
     * Obtiene icono según tipo
     */
    getIconForType(type) {
        const icons = {
            success: 'fas fa-check-circle',
            info: 'fas fa-info-circle',
            warning: 'fas fa-exclamation-triangle',
            danger: 'fas fa-times-circle',
            error: 'fas fa-times-circle'
        };
        return icons[type] || 'fas fa-info-circle';
    }
    
    /**
     * Limpia todas las notificaciones
     */
    clearAll() {
        this.notifications.forEach(notification => {
            this.removeNotification(notification);
        });
    }
    
    /**
     * Métodos de conveniencia
     */
    success(message, options = {}) {
        return this.show(message, 'success', options);
    }
    
    error(message, options = {}) {
        return this.show(message, 'danger', options);
    }
    
    warning(message, options = {}) {
        return this.show(message, 'warning', options);
    }
    
    info(message, options = {}) {
        return this.show(message, 'info', options);
    }
}

// CSS para animaciones
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes countdown {
        from { width: 100%; }
        to { width: 0%; }
    }
    
    .notification-container {
        pointer-events: none;
    }
    
    .notification-item {
        pointer-events: all;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }
    
    .notification-actions .btn {
        font-size: 0.75rem;
        padding: 0.25rem 0.5rem;
    }
`;
document.head.appendChild(notificationStyles);

// Instancias globales mejoradas
let cvGenerator;
let storageManager;
let formValidator;
let htmlGenerator;
let notificationManager;

/**
 * Inicialización mejorada de la aplicación
 */
document.addEventListener('DOMContentLoaded', function() {
    try {
        // Inicializar componentes principales
        initializeApplication();
        
        console.log('🚀 CV Generator inicializado con arquitectura mejorada');
        notificationManager.success('Aplicación inicializada correctamente', {
            duration: 3000
        });
        
    } catch (error) {
        console.error('Error al inicializar la aplicación:', error);
        handleInitializationError(error);
    }
});

/**
 * Inicializa todos los componentes de la aplicación
 */
function initializeApplication() {
    // Inicializar managers
    notificationManager = new NotificationManager();
    storageManager = new StorageManager();
    formValidator = new FormValidator();
    htmlGenerator = new HTMLGenerator();
    cvGenerator = new CVGenerator();
    
    // Configurar event listeners mejorados
    setupEventListeners();
    
    // Cargar datos guardados
    loadSavedData();
    
    // Inicializar validación en tiempo real
    setupRealTimeValidation();
}

/**
 * Configura event listeners con debouncing
 */
function setupEventListeners() {
    const formFields = [
        'nombre', 'email', 'telefono', 'ubicacion', 'linkedin', 'portfolio',
        'perfilProfesional', 'educacion', 'experiencia', 'habilidades',
        'proyectos', 'certificaciones', 'idiomas'
    ];
    
    // Auto-save con debouncing
    const debouncedSave = CVUtils.debounce(() => {
        const data = collectFormData();
        storageManager.save(data);
    }, 1000);
    
    formFields.forEach(fieldId => {
        const element = document.getElementById(fieldId);
        if (element) {
            element.addEventListener('input', () => {
                debouncedSave();
                updateProgress();
                validateFieldRealTime(fieldId, element.value);
            });
            
            element.addEventListener('blur', () => {
                validateFieldRealTime(fieldId, element.value, true);
            });
        }
    });
    
    // Configurar botones principales
    setupButtonListeners();
}

/**
 * Configura listeners para botones
 */
function setupButtonListeners() {
    const buttons = {
        'generarBtn': generateCV,
        'limpiarBtn': clearForm,
        'ejemploBtn': loadExample,
        'analizarBtn': analyzeCV,
        'wordBtn': generateWord,
        'pdfBtn': generatePDF
    };
    
    Object.entries(buttons).forEach(([buttonId, handler]) => {
        const button = document.getElementById(buttonId);
        if (button) {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                try {
                    handler();
                } catch (error) {
                    console.error(`Error en ${buttonId}:`, error);
                    notificationManager.error(`Error al ejecutar la acción: ${error.message}`);
                }
            });
        }
    });
}

/**
 * Configurar validación en tiempo real
 */
function setupRealTimeValidation() {
    const fields = document.querySelectorAll('input, textarea');
    fields.forEach(field => {
        const indicator = createValidationIndicator(field);
        field.parentNode.appendChild(indicator);
    });
}

/**
 * Crea indicador visual de validación
 */
function createValidationIndicator(field) {
    const indicator = document.createElement('div');
    indicator.className = 'validation-indicator';
    indicator.style.cssText = `
        font-size: 0.875rem;
        margin-top: 0.25rem;
        min-height: 1.25rem;
    `;
    indicator.id = field.id + '-validation';
    return indicator;
}

/**
 * Valida campo en tiempo real
 */
function validateFieldRealTime(fieldId, value, showSuccess = false) {
    const result = formValidator.validateField(fieldId, value);
    const indicator = document.getElementById(fieldId + '-validation');
    
    if (!indicator) return;
    
    if (result.isValid && showSuccess && value.trim()) {
        indicator.className = 'validation-indicator text-success';
        indicator.innerHTML = '<i class="fas fa-check"></i> Válido';
    } else if (!result.isValid) {
        const className = result.type === 'error' ? 'text-danger' : 'text-warning';
        const icon = result.type === 'error' ? 'fa-times' : 'fa-exclamation-triangle';
        indicator.className = `validation-indicator ${className}`;
        indicator.innerHTML = `<i class="fas ${icon}"></i> ${result.message}`;
    } else {
        indicator.className = 'validation-indicator';
        indicator.innerHTML = '';
    }
}

/**
 * Función principal para generar CV mejorada
 */
function generateCV() {
    try {
        console.log('🚀 Generando CV con validación mejorada');
        
        const data = collectFormData();
        const validation = formValidator.validateForm(data);
        
        if (!validation.isValid) {
            notificationManager.error('Por favor corrige los errores antes de continuar', {
                actions: [{
                    label: 'Ver errores',
                    handler: () => showValidationDetails(validation)
                }]
            });
            return false;
        }
        
        if (validation.warnings.length > 0) {
            notificationManager.warning(`CV generado con ${validation.warnings.length} sugerencias`, {
                actions: [{
                    label: 'Ver sugerencias',
                    handler: () => showValidationDetails(validation)
                }]
            });
        }
        
        // Generar HTML del CV
        const cvHTML = htmlGenerator.generateCV(data, { style: 'harvard', format: 'web' });
        
        // Mostrar resultado
        displayCV(cvHTML);
        
        // Guardar datos
        cvGenerator.cvData = data;
        storageManager.save(data);
        
        notificationManager.success('¡CV generado exitosamente!', {
            actions: [{
                label: 'Descargar Word',
                handler: 'generateWord()'
            }, {
                label: 'Generar PDF',
                handler: 'generatePDF()'
            }]
        });
        
        return true;
        
    } catch (error) {
        console.error('Error al generar CV:', error);
        notificationManager.error('Error al generar el CV: ' + error.message);
        return false;
    }
}

/**
 * Recolecta datos del formulario
 */
function collectFormData() {
    const fields = [
        'nombre', 'email', 'telefono', 'ubicacion', 'linkedin', 'portfolio',
        'perfilProfesional', 'educacion', 'experiencia', 'habilidades',
        'proyectos', 'certificaciones', 'idiomas'
    ];
    
    const data = {};
    fields.forEach(field => {
        const element = document.getElementById(field);
        data[field] = element ? element.value.trim() : '';
    });
    
    return data;
}

/**
 * Muestra detalles de validación
 */
function showValidationDetails(validation) {
    let content = '';
    
    if (validation.errors.length > 0) {
        content += '<h6 class="text-danger">Errores:</h6><ul>';
        validation.errors.forEach(error => {
            content += `<li class="text-danger">${error}</li>`;
        });
        content += '</ul>';
    }
    
    if (validation.warnings.length > 0) {
        content += '<h6 class="text-warning">Sugerencias:</h6><ul>';
        validation.warnings.forEach(warning => {
            content += `<li class="text-warning">${warning}</li>`;
        });
        content += '</ul>';
    }
    
    // Crear modal o panel de detalles
    showModal('Detalles de Validación', content);
}

/**
 * Muestra modal simple
 */
function showModal(title, content) {
    // Implementación básica de modal
    const existingModal = document.getElementById('validation-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    const modal = document.createElement('div');
    modal.id = 'validation-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
    `;
    
    modal.innerHTML = `
        <div style="background: white; padding: 2rem; border-radius: 8px; max-width: 500px; width: 90%; max-height: 80%; overflow-y: auto;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                <h5>${title}</h5>
                <button onclick="document.getElementById('validation-modal').remove()" style="border: none; background: none; font-size: 1.5rem;">&times;</button>
            </div>
            <div>${content}</div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Cerrar al hacer click fuera
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

/**
 * Muestra el CV generado
 */
function displayCV(cvHTML) {
    const resultContainer = document.getElementById('resultado');
    if (resultContainer) {
        resultContainer.innerHTML = cvHTML;
        resultContainer.style.display = 'block';
        resultContainer.scrollIntoView({ behavior: 'smooth' });
    }
}

/**
 * Carga datos guardados
 */
function loadSavedData() {
    const savedData = storageManager.load();
    if (savedData) {
        populateForm(savedData);
        notificationManager.info('Datos recuperados automáticamente', { duration: 3000 });
    }
}

/**
 * Puebla el formulario con datos
 */
function populateForm(data) {
    Object.keys(data).forEach(field => {
        const element = document.getElementById(field);
        if (element && data[field]) {
            element.value = data[field];
        }
    });
    updateProgress();
}

/**
 * Actualiza progreso del formulario
 */
function updateProgress() {
    const data = collectFormData();
    const fields = Object.keys(data);
    const completedFields = fields.filter(field => data[field] && data[field].trim());
    
    const progress = Math.round((completedFields.length / fields.length) * 100);
    
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressPercentage');
    
    if (progressBar && progressText) {
        progressBar.style.width = progress + '%';
        progressText.textContent = progress + '%';
        
        // Actualizar clase según progreso
        progressBar.className = 'progress-bar progress-bar-striped progress-bar-animated';
        if (progress >= 80) {
            progressBar.classList.add('bg-success');
        } else if (progress >= 50) {
            progressBar.classList.add('bg-warning');
        } else {
            progressBar.classList.add('bg-danger');
        }
    }
}

/**
 * Maneja errores de inicialización
 */
function handleInitializationError(error) {
    console.error('Error crítico al inicializar:', error);
    
    // Crear notificación de error básica si el sistema de notificaciones falla
    const errorDiv = document.createElement('div');
    errorDiv.className = 'alert alert-danger';
    errorDiv.textContent = 'Error al inicializar la aplicación. Por favor recarga la página.';
    document.body.insertBefore(errorDiv, document.body.firstChild);
}
