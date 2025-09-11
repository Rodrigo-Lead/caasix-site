/* script.js */
function flipCard(card) {
    card.classList.toggle('flipped');
    }
    
    
    function openModal(videoSrc) {
    document.getElementById('modal').style.display = 'flex';
    document.getElementById('modal-video').src = videoSrc;
    }
    
    
    function closeModal() {
    document.getElementById('modal').style.display = 'none';
    document.getElementById('modal-video').src = '';
    }

    function openVideo(src) {
        const modal = document.getElementById('videoModal');
        const videoFrame = document.getElementById('videoFrame');
        videoFrame.src = src;
        modal.style.display = 'flex';
      }
      
      function closeVideo() {
        const modal = document.getElementById('videoModal');
        const videoFrame = document.getElementById('videoFrame');
        videoFrame.src = ""; // limpa para parar o vídeo
        modal.style.display = 'none';
      }


(function () {
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  if (!menuToggle || !navLinks) return;

  function openMenu() {
    navLinks.classList.add('show');
    navLinks.setAttribute('aria-hidden', 'false');
    menuToggle.setAttribute('aria-expanded', 'true');
  }

  function closeMenu() {
    navLinks.classList.remove('show');
    navLinks.setAttribute('aria-hidden', 'true');
    menuToggle.setAttribute('aria-expanded', 'false');
  }

  function toggleMenu() {
    if (navLinks.classList.contains('show')) closeMenu();
    else openMenu();
  }

  // evento do botão
  menuToggle.addEventListener('click', function (e) {
    e.stopPropagation();
    toggleMenu();
  });

  // fecha ao clicar em um link do menu (útil para âncoras)
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      // se estiver em mobile, fechamos
      if (window.innerWidth <= 768) closeMenu();
    });
  });

  // fecha ao clicar fora do menu
  document.addEventListener('click', function (e) {
    if (window.innerWidth > 768) return; // só para mobile
    if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
      closeMenu();
    }
  });

  // se redimensionar pra desktop, garante que o menu mobile seja fechado
  window.addEventListener('resize', function () {
    if (window.innerWidth > 768) {
      // remove a classe .show caso exista
      if (navLinks.classList.contains('show')) closeMenu();
    }
  });
})();

// ===== MENU MOBILE =====
function toggleMenu() {
    const menu = document.getElementById("navLinks");
    menu.classList.toggle("show");
  }
  
  // Fecha menu ao clicar em um link (opcional)
  document.querySelectorAll(".menu a").forEach(link => {
    link.addEventListener("click", () => {
      document.getElementById("navLinks").classList.remove("show");
    });
  });
  
  // ===== MODAL DE VÍDEOS =====
  function openVideo(src) {
    const modal = document.getElementById("videoModal");
    const video = document.getElementById("videoFrame");
    video.src = src;
    modal.style.display = "flex";
  }
  
  function closeVideo() {
    const modal = document.getElementById("videoModal");
    const video = document.getElementById("videoFrame");
    video.pause();
    video.src = "";
    modal.style.display = "none";
  }
  
  // Fechar modal clicando fora do vídeo
  window.addEventListener("click", (e) => {
    const modal = document.getElementById("videoModal");
    const video = document.getElementById("videoFrame");
    if (e.target === modal) {
      video.pause();
      video.src = "";
      modal.style.display = "none";
    }
  });

  // Abrir e fechar modal
function abrirRoteiro() {
  document.getElementById("modalRoteiro").style.display = "block";
}
function fecharRoteiro() {
  document.getElementById("modalRoteiro").style.display = "none";
}

// Gerar roteiro com ChatGPT (precisa configurar API)
async function gerarRoteiro() {
  const ideia = document.getElementById("ideiaVideo").value;
  const respostaDiv = document.getElementById("respostaRoteiro");

  if (!ideia) {
    respostaDiv.innerHTML = "<p style='color:red'>Digite uma ideia antes de gerar!</p>";
    return;
  }

  respostaDiv.innerHTML = "<p>⏳ Gerando roteiro, aguarde...</p>";

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer SUA_CHAVE_OPENAI" // ⚡ coloque sua chave aqui
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "Você é um roteirista criativo que cria roteiros curtos e cativantes para vídeos de animação." },
          { role: "user", content: `Minha ideia é: ${ideia}. Crie um roteiro curto para esse vídeo, em tom criativo e direto.` }
        ],
        max_tokens: 250
      })
    });

    const data = await response.json();
    respostaDiv.innerHTML = "<p><b>Roteiro Gerado:</b></p><p>" + data.choices[0].message.content + "</p>";
  } catch (error) {
    respostaDiv.innerHTML = "<p style='color:red'>❌ Erro ao gerar roteiro.</p>";
    console.error(error);
  }
}

// Fechar modal clicando fora
window.onclick = function(event) {
  const modal = document.getElementById("modalRoteiro");
  if (event.target === modal) {
    fecharRoteiro();
  }
};

  
