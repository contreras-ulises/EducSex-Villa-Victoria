// APP.JS - LÓGICA COMPLETA Y FUNCIONAL DE EDUCSEX

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. MODO CLARO / MODO OSCURO
  // ==========================================
  const btnThemeToggle = document.getElementById('btnThemeToggle');
  const htmlElem = document.documentElement;

  if (btnThemeToggle) {
    btnThemeToggle.addEventListener('click', () => {
      const currentTheme = htmlElem.getAttribute('data-bs-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      htmlElem.setAttribute('data-bs-theme', newTheme);

      btnThemeToggle.innerHTML = newTheme === 'dark'
        ? '<i class="fa-solid fa-sun"></i>'
        : '<i class="fa-solid fa-moon"></i>';
    });
  }

  // ==========================================
  // 2. SIMULADOR DE MÉTODOS ANTICONCEPTIVOS
  // ==========================================
  const methodSelect = document.getElementById('methodSelect');
  const methodTitle = document.getElementById('methodTitle');
  const methodDesc = document.getElementById('methodDesc');
  const effectivenessRate = document.getElementById('effectivenessRate');
  const effectivenessBar = document.getElementById('effectivenessBar');
  const itsBadge = document.getElementById('itsBadge');
  const methodTip = document.getElementById('methodTip');

  const methodData = {
    condon: {
      title: "Condón Masculino / Femenino",
      desc: "Funda de látex que impide el paso de espermatozoides y microorganismos. Es el único método de barrera con doble protección.",
      rate: "98%",
      barWidth: "98%",
      barColor: "bg-success",
      itsText: "SÍ PREVIENE ITS",
      itsClass: "bg-success",
      tip: "Se debe colocar antes de cualquier contacto genital y revisar siempre la fecha de caducidad."
    },
    implante: {
      title: "Implante Subdérmico",
      desc: "Varilla flexible colocada bajo la piel del brazo que libera hormonas para evitar la ovulación de forma continua.",
      rate: "99.9%",
      barWidth: "99.9%",
      barColor: "bg-success",
      itsText: "NO PREVIENE ITS",
      itsClass: "bg-danger",
      tip: "Altamente eficaz contra embarazos, pero debe combinarse con condón para prevenir infecciones de transmisión sexual."
    },
    pildora: {
      title: "Pastillas Anticonceptivas (Diarias)",
      desc: "Tratamiento hormonal diario que inhibe la ovulación si se toma exactamente a la misma hora todos los días.",
      rate: "91%",
      barWidth: "91%",
      barColor: "bg-primary",
      itsText: "NO PREVIENE ITS",
      itsClass: "bg-danger",
      tip: "Requiere disciplina estricta de horario para mantener su nivel óptimo de protección."
    },
    ritmo: {
      title: "Método del Ritmo (Calendario)",
      desc: "Intento de calcular los días fértiles basándose en el calendario menstrual. Muy inestable e inseguro en jóvenes.",
      rate: "76%",
      barWidth: "76%",
      barColor: "bg-warning",
      itsText: "NO PREVIENE ITS",
      itsClass: "bg-danger",
      tip: "No es confiable en la adolescencia debido a las irregularidades naturales del ciclo menstrual."
    }
  };

  if (methodSelect) {
    methodSelect.addEventListener('change', (e) => {
      const data = methodData[e.target.value];
      if (!data) return;

      methodTitle.textContent = data.title;
      methodDesc.textContent = data.desc;
      effectivenessRate.textContent = data.rate;
      effectivenessBar.style.width = data.barWidth;
      effectivenessBar.className = `progress-bar progress-bar-striped progress-bar-animated ${data.barColor}`;

      itsBadge.textContent = data.itsText;
      itsBadge.className = `badge ${data.itsClass} fs-6`;
      methodTip.textContent = data.tip;
    });
  }

  // ==========================================
  // 3. DESPLEGABLE DE TARJETAS DE MITOS
  // ==========================================
  const mythCards = document.querySelectorAll('.myth-card');
  mythCards.forEach(card => {
    card.addEventListener('click', () => {
      const answer = card.querySelector('.myth-answer');
      if (answer) {
        answer.classList.toggle('d-none');
      }
    });
  });

  // ==========================================
  // 4. QUIZ INTERACTIVO MULTI-PREGUNTA
  // ==========================================
  const questionBlocks = document.querySelectorAll('.quiz-question-block');
  const scoreBadge = document.getElementById('scoreBadge');

  let questionResults = { 1: false, 2: false, 3: false, 4: false };

  questionBlocks.forEach(block => {
    const options = block.querySelectorAll('.quiz-opt');
    const feedback = block.querySelector('.quiz-feedback');
    const optionsContainer = block.querySelector('.quiz-options');
    const qIndex = optionsContainer ? optionsContainer.getAttribute('data-qindex') : null;

    options.forEach(btn => {
      btn.addEventListener('click', () => {
        const isCorrect = btn.getAttribute('data-correct') === 'true';

        options.forEach(b => {
          b.classList.remove('btn-success', 'btn-danger', 'btn-outline-secondary');
          b.classList.add('btn-outline-secondary');
        });

        if (isCorrect) {
          btn.classList.remove('btn-outline-secondary');
          btn.classList.add('btn-success');
          feedback.className = 'quiz-feedback mt-2 p-2 rounded-3 alert alert-success d-block small';
          feedback.innerHTML = '<i class="fa-solid fa-circle-check me-1"></i><strong>¡Respuesta Correcta!</strong>';
          if (qIndex) questionResults[qIndex] = true;
        } else {
          btn.classList.remove('btn-outline-secondary');
          btn.classList.add('btn-danger');
          feedback.className = 'quiz-feedback mt-2 p-2 rounded-3 alert alert-danger d-block small';
          feedback.innerHTML = '<i class="fa-solid fa-circle-xmark me-1"></i><strong>Incorrecta.</strong> Revisa la guía previa.';
          if (qIndex) questionResults[qIndex] = false;
        }

        // Actualizar la puntuación global (X de 4)
        const totalCorrect = Object.values(questionResults).filter(v => v === true).length;
        if (scoreBadge) {
          scoreBadge.textContent = `Puntuación: ${totalCorrect} / 4`;
          scoreBadge.className = totalCorrect >= 3
            ? 'badge bg-success rounded-pill fs-6'
            : 'badge bg-warning text-dark rounded-pill fs-6';
        }
      });
    });
  });

  // ==========================================
  // 5. CHATBOT ANÓNIMO INTELIGENTE (CECYAYUDANDO)
  // ==========================================
  const chatDrawer = document.getElementById('chatDrawer');
  const btnFabChat = document.getElementById('btnFabChat');
  const btnOpenChat = document.getElementById('btnOpenChat');
  const btnCloseChat = document.getElementById('btnCloseChat');
  const chatForm = document.getElementById('chatForm');
  const chatInput = document.getElementById('chatInput');
  const chatMessages = document.getElementById('chatMessages');

  function toggleChat() {
    if (chatDrawer) {
      chatDrawer.classList.toggle('open');
    }
  }

  if (btnFabChat) btnFabChat.addEventListener('click', toggleChat);
  if (btnOpenChat) btnOpenChat.addEventListener('click', toggleChat);
  if (btnCloseChat) btnCloseChat.addEventListener('click', toggleChat);

  // Generador de respuestas dinámicas amigables
  function getCecyAyudaResponse(userText) {
    const text = userText.toLowerCase().trim();

    if (text.includes('hola') || text.includes('que onda') || text.includes('buenos dias') || text.includes('buenas tardes') || text.includes('hey')) {
      return "¡Hola! ¿Qué se te ofrece? Estoy aquí para ayudarte con cualquier duda sobre salud sexual, métodos o centros en Villa Victoria de forma 100% anónima.";
    }
    
    if (text.includes('condon') || text.includes('metodo') || text.includes('pastilla') || text.includes('anticonceptivo')) {
      return "Los métodos anticonceptivos son clave para prevenir embarazos. Recuerda que el condón es el único que además te protege contra las ITS. ¿Te gustaría saber de alguno en específico?";
    }

    if (text.includes('centro') || text.includes('salud') || text.includes('ceaps') || text.includes('villa victoria') || text.includes('donde ir') || text.includes('dif')) {
      return "En Villa Victoria cuentas con el CEAPS, el Centro de Salud de San Diego y el DIF Municipal. ¡Revisa la sección de mapas en la plataforma para ubicarlos exactamente!";
    }

    if (text.includes('embarazo') || text.includes('bebe') || text.includes('riesgo')) {
      return "El embarazo adolescente se puede prevenir con una buena educación sexual y el uso correcto de métodos de barrera. ¿Tienes alguna duda sobre efectividad?";
    }

    return "¡Entendido! Recuerda que puedes explorar el video oficial, los mapas de centros de salud y el quiz interactivo. ¿Hay alguna otra duda en la que te pueda apoyar?";
  }

  if (chatForm) {
    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = chatInput.value.trim();
      if (!text) return;

      const uDiv = document.createElement('div');
      uDiv.className = 'chat-msg user-msg bg-primary text-white p-3 rounded-3 small align-self-end ms-auto shadow-sm';
      uDiv.style.maxWidth = '85%';
      uDiv.textContent = text;
      chatMessages.appendChild(uDiv);

      chatInput.value = '';
      chatMessages.scrollTop = chatMessages.scrollHeight;

      setTimeout(() => {
        const botReply = getCecyAyudaResponse(text);
        const bDiv = document.createElement('div');
        bDiv.className = 'chat-msg bot-msg bg-body-tertiary border p-3 rounded-3 small shadow-sm';
        bDiv.style.maxWidth = '85%';
        bDiv.innerHTML = `<i class="fa-solid fa-robot me-1 text-success"></i> ${botReply}`;
        chatMessages.appendChild(bDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
      }, 500);
    });
  }

});
