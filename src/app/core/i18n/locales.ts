export const locales = {
  es: {
    translation: {
      header: {
        nav: { historial: 'Historial', stack: 'Stack', contacto: 'Contacto' },
        mainNav: 'Principal',
        skip: 'Saltar al contenido',
        menuOpen: 'Abrir menú',
        menuClose: 'Cerrar menú',
        langCode: 'EN',
        langLabel: 'Cambiar idioma a inglés (EN)',
        themeLight: 'Cambiar a tema claro',
        themeDark: 'Cambiar a tema oscuro',
      },
      hero: {
        name: 'Sergio Rodríguez',
        role: 'Full stack en Go, Rust y TypeScript',
        pitch:
          'Aprendo construyendo producto real: en los dos últimos años he diseñado y desarrollado tres plataformas SaaS completas, de la base de datos al despliegue. Mi base es el backend, en Go y Rust, y también trabajo el frontend con React y Angular.',
      },
      actions: {
        downloadCv: 'Descargar CV',
        writeMe: 'Escribirme',
        code: 'Código',
        demo: 'Ver demo',
        request: 'Pedir el código',
        requestSubject: 'Código de {{title}}',
      },
      stack: {
        title: 'Stack',
        hint: 'Pulsa una tecnología para ver solo los commits que la usan.',
        chipLabel_one: '{{tech}}, {{count}} commit',
        chipLabel_other: '{{tech}}, {{count}} commits',
        architecture: 'Arquitectura: microservicios, hexagonal, multi-tenant, WebSockets.',
        security: 'Seguridad: JWT, MFA/TOTP.',
        status: '{{shown}} de {{total}} commits',
        clear: 'Quitar filtro',
        groups: {
          languages: 'Lenguajes',
          frontend: 'Frontend',
          data: 'Datos',
          infra: 'Infraestructura',
        },
      },
      log: {
        title: 'Historial',
        months: 'ene feb mar abr may jun jul ago sep oct nov dic',
        screenshot: 'Captura de {{title}}',
        screenshotSynthetic: 'Captura de {{title}}, con datos de demostración',
        synthetic: 'Datos de demostración',
        team: 'En equipo',
        evidence: {
          code: 'Código público',
          demo: 'Demo en vivo',
          private: 'Código bajo petición',
        },
        entries: {
          cuentas: {
            title: 'Cuentas',
            summary:
              'Finanzas personales con la regla 50/30/20: reparte los ingresos del mes entre necesidades, deseos y ahorro, y avisa cuando una parte se pasa. Backend en Rust (axum y sqlx) sobre PostgreSQL, con el dinero guardado en céntimos enteros y la sesión en una cookie httpOnly.',
          },
          nexora: {
            title: 'Nexora',
            summary:
              'CRM/ERP modular en el que cada cliente accede solo a los módulos que tiene contratados: proyectos, tickets, contratos y facturación. API en Rust que aísla los datos de cada cliente, con respuestas por debajo de 50 ms, y panel en Angular.',
          },
          cuadre: {
            title: 'Cuadre',
            summary:
              'Contabilidad para autónomos y pymes españolas. Backend en Rust con arquitectura hexagonal, de modo que toda la lógica de negocio se prueba sin base de datos, y acceso con doble factor (TOTP) y protección contra ataques de fuerza bruta.',
          },
          'cita-perfecta': {
            title: 'Cita Perfecta',
            summary:
              'Web interactiva en formato scrapbook, un diario de recuerdos, para proponer una cita y elegir plan, comida, vestimenta, fecha y hora. React y Vite, con melodías retro con Web Audio y botones que esquivan al usuario.',
          },
          'atelier-ledger': {
            title: 'Atelier Ledger',
            summary:
              'SaaS de contabilidad para autónomos: caja diaria por canal, gastos con historial de auditoría inmutable, importación desde Excel e informes exportables a PDF, Excel y CSV. Backend en Rust (axum) sobre SQLite en Turso, con aislamiento por usuario en cada consulta y tokens JWT de Clerk validados con JWKS.',
          },
          'url-state-monitor': {
            title: 'URL State Monitor',
            summary:
              'Aplicación en Go que monitoriza el estado de varias URLs: lee las direcciones de un archivo .txt y guarda las métricas de respuesta en una base de datos MySQL.',
          },
          hcm: {
            title: 'Suite de gestión de personal (HCM)',
            summary:
              'Plataforma de RR. HH. para empresas: fichaje, turnos, nóminas, documentos y mensajería interna. Arquitectura de 17 microservicios en Go que se comunican por eventos, con más de 300 commits, mensajería en tiempo real cifrada de extremo a extremo y un cliente web con organigrama interactivo.',
          },
          vass: {
            title: 'Prácticas en VASS',
            org: 'VASS',
            role: 'Desarrollador Full Stack Salesforce',
            summary:
              'Prácticas desarrollando componentes Lightning (LWC) y lógica de negocio en Apex para portales de cliente. Incluyó la gestión de permisos y el paso a preproducción.',
          },
          tfg: {
            title: 'Proyecto final de ciclo (TFG)',
            summary:
              'Proyecto final de ciclo hecho en equipo: un chatbot con interfaz en Angular que habla con una API en Python (FastAPI) y un modelo de lenguaje propio entrenado con PyTorch.',
          },
          'art-space': {
            title: 'Art Space',
            summary:
              'App Android en Kotlin con Jetpack Compose, hecha en equipo: una galería de imágenes con título, autor y año que se recorre con los botones anterior y siguiente. Usa interfaz declarativa y estado local de Compose.',
          },
          crc: {
            title: 'Prácticas en CRC',
            org: 'CRC',
            role: 'Desarrollador Frontend',
            summary:
              'Prácticas desarrollando una aplicación web en Angular desplegada en AWS EC2. Incluyó el procesamiento paralelo de las respuestas de una API REST.',
          },
          dam: {
            title: 'Desarrollo de Aplicaciones Multiplataforma',
            role: 'Grado superior',
            summary:
              'Ciclo de grado superior en el que trabajé con Java, Kotlin, Python y TypeScript. Lo cerré con un proyecto final en equipo: un chatbot con Angular y PyTorch.',
          },
          erasmus: {
            title: 'Erasmus: técnico de redes',
            org: 'Erasmus',
            role: 'Técnico de redes',
            summary:
              'Soporte y configuración de redes durante la primavera de 2024, trabajando en inglés con clientes internacionales.',
          },
          smr: {
            title: 'Sistemas Microinformáticos y Redes',
            org: 'IES Virgen de la Paloma',
            role: 'Grado medio',
            summary:
              'Ciclo de grado medio sobre sistemas informáticos y redes. Es donde empieza este historial, antes de pasar a programar con el DAM.',
          },
        },
      },
      shortcuts: {
        hint: 'Pulsa ? para ver los atajos',
        toggle: 'Atajos de una tecla',
        title: 'Atajos de teclado',
        close: 'Cerrar los atajos',
        next: 'Commit siguiente',
        prev: 'Commit anterior',
        filter: 'Ir al filtro del stack',
        copy: 'Copiar el email',
        escape: 'Quitar el filtro o cerrar esta ayuda',
        help: 'Mostrar esta ayuda',
        copied: 'Email copiado',
        copyFailed: 'No se pudo copiar el email.',
      },
      contact: { title: 'Contacto' },
    },
  },
  en: {
    translation: {
      header: {
        nav: { historial: 'History', stack: 'Stack', contacto: 'Contact' },
        mainNav: 'Main',
        skip: 'Skip to content',
        menuOpen: 'Open menu',
        menuClose: 'Close menu',
        langCode: 'ES',
        langLabel: 'Switch language to Spanish (ES)',
        themeLight: 'Switch to light theme',
        themeDark: 'Switch to dark theme',
      },
      hero: {
        name: 'Sergio Rodríguez',
        role: 'Full stack developer in Go, Rust and TypeScript',
        pitch:
          'I learn by building real products: over the last two years I have designed and built three complete SaaS platforms, from the database to deployment. My base is the backend, in Go and Rust, and I also build frontends with React and Angular.',
      },
      actions: {
        downloadCv: 'Download CV',
        writeMe: 'Email me',
        code: 'Code',
        demo: 'Live demo',
        request: 'Request the code',
        requestSubject: '{{title}} source code',
      },
      stack: {
        title: 'Stack',
        hint: 'Press a technology to see only the commits that use it.',
        chipLabel_one: '{{tech}}, {{count}} commit',
        chipLabel_other: '{{tech}}, {{count}} commits',
        architecture: 'Architecture: microservices, hexagonal, multi-tenant, WebSockets.',
        security: 'Security: JWT, MFA/TOTP.',
        status: '{{shown}} of {{total}} commits',
        clear: 'Clear filter',
        groups: {
          languages: 'Languages',
          frontend: 'Frontend',
          data: 'Data',
          infra: 'Infrastructure',
        },
      },
      log: {
        title: 'History',
        months: 'Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec',
        screenshot: 'Screenshot of {{title}}',
        screenshotSynthetic: 'Screenshot of {{title}}, with demo data',
        synthetic: 'Demo data',
        team: 'Team project',
        evidence: {
          code: 'Public code',
          demo: 'Live demo',
          private: 'Code on request',
        },
        entries: {
          cuentas: {
            title: 'Cuentas',
            summary:
              "Personal finance app built on the 50/30/20 rule: it splits the month's income between needs, wants and savings, and warns when a share goes over. Rust backend (axum and sqlx) on PostgreSQL, with money stored as integer cents and the session in an httpOnly cookie.",
          },
          nexora: {
            title: 'Nexora',
            summary:
              "Modular CRM/ERP where each client only accesses the modules they subscribe to: projects, tickets, contracts and invoicing. Rust API that isolates each client's data, with response times under 50 ms, and an Angular admin panel.",
          },
          cuadre: {
            title: 'Cuadre',
            summary:
              'Accounting for Spanish freelancers and small businesses. Rust backend on a hexagonal architecture, so all business logic is tested without a database, with two-factor sign-in (TOTP) and brute-force protection.',
          },
          'cita-perfecta': {
            title: 'Cita Perfecta',
            summary:
              'Interactive scrapbook-style web page for asking someone on a date and choosing the plan, food, outfit, date and time. React and Vite, with retro melodies built on Web Audio and buttons that dodge the user.',
          },
          'atelier-ledger': {
            title: 'Atelier Ledger',
            summary:
              'Accounting SaaS for freelancers: daily takings per channel, expenses with an immutable audit trail, Excel import and reports exportable to PDF, Excel and CSV. Rust (axum) backend on SQLite in Turso, with per-user isolation in every query and Clerk JWTs verified through JWKS.',
          },
          'url-state-monitor': {
            title: 'URL State Monitor',
            summary:
              'Go application that monitors the status of several URLs: it reads the addresses from a .txt file and stores the response metrics in a MySQL database.',
          },
          hcm: {
            title: 'HR management suite (HCM)',
            summary:
              'HR platform for companies: time tracking, shift scheduling, payroll, documents and internal messaging. Architecture of 17 Go microservices that communicate through events, with more than 300 commits, real-time end-to-end encrypted messaging and a web client with an interactive org chart.',
          },
          vass: {
            title: 'Internship at VASS',
            org: 'VASS',
            role: 'Salesforce Full Stack Developer',
            summary:
              'Internship building Lightning Web Components (LWC) and Apex business logic for customer portals. It included managing permissions and releases to pre-production.',
          },
          tfg: {
            title: 'Final-year project (TFG)',
            summary:
              'Final-year project built as a team: a chatbot with an Angular interface that talks to a Python API (FastAPI) and a custom language model trained with PyTorch.',
          },
          'art-space': {
            title: 'Art Space',
            summary:
              "Android app in Kotlin with Jetpack Compose, built as a team: an image gallery with title, artist and year, navigated with previous and next buttons. It uses Compose's declarative UI and local state.",
          },
          crc: {
            title: 'Internship at CRC',
            org: 'CRC',
            role: 'Frontend Developer',
            summary:
              'Internship building an Angular web app deployed on AWS EC2. It included parallel processing of REST API responses.',
          },
          dam: {
            title: 'Multiplatform Application Development',
            role: 'Higher vocational diploma (EQF 5)',
            summary:
              'Higher vocational diploma where I worked with Java, Kotlin, Python and TypeScript. I closed it with a team final-year project: a chatbot built with Angular and PyTorch.',
          },
          erasmus: {
            title: 'Erasmus: network technician',
            org: 'Erasmus',
            role: 'Network technician',
            summary:
              'Network support and configuration in spring 2024, working in English with international clients.',
          },
          smr: {
            title: 'Microcomputer Systems and Networks',
            org: 'IES Virgen de la Paloma',
            role: 'Vocational diploma (EQF 4)',
            summary:
              'Vocational diploma on computer systems and networks. This is where the history starts, before I moved on to programming with the DAM.',
          },
        },
      },
      shortcuts: {
        hint: 'Press ? for shortcuts',
        toggle: 'Single-key shortcuts',
        title: 'Keyboard shortcuts',
        close: 'Close the shortcuts',
        next: 'Next commit',
        prev: 'Previous commit',
        filter: 'Jump to the stack filter',
        copy: 'Copy the email',
        escape: 'Clear the filter or close this help',
        help: 'Show this help',
        copied: 'Email copied',
        copyFailed: 'The email could not be copied.',
      },
      contact: { title: 'Contact' },
    },
  },
};
