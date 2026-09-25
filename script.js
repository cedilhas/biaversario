/**
 * SCRIPT PRINCIPAL - WEBSITE DE ANIVERSÁRIO DE 18 ANOS & DECLARAÇÃO DE AMOR
 * Com tema Pompompurin & Sanrio, armazenamento permanente com IndexedDB,
 * temporizador de 18 anos, galeria polaroid, jogo de palavras e árvore de presentes.
 */

// ==========================================================================
// 1. BANCO DE DADOS INDEXEDDB (PERSISTÊNCIA PERMANENTE)
// ==========================================================================
class MemoriesDB {
  constructor() {
    this.dbName = 'AniversarioAmorDB';
    this.version = 2;
    this.db = null;
  }

  async init() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);

      request.onupgradeneeded = (e) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains('photos')) {
          db.createObjectStore('photos', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('tree_gifts')) {
          db.createObjectStore('tree_gifts', { keyPath: 'id' });
        }
      };

      request.onsuccess = (e) => {
        this.db = e.target.result;
        resolve(this.db);
      };

      request.onerror = (e) => {
        console.error('IndexedDB error:', e);
        reject(e);
      };
    });
  }

  async getAll(storeName) {
    if (!this.db) await this.init();
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction(storeName, 'readonly');
      const store = tx.objectStore(storeName);
      const req = store.getAll();
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => reject(req.error);
    });
  }

  async put(storeName, item) {
    if (!this.db) await this.init();
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);
      const req = store.put(item);
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  }

  async delete(storeName, id) {
    if (!this.db) await this.init();
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);
      const req = store.delete(id);
      req.onsuccess = () => resolve(true);
      req.onerror = () => reject(req.error);
    });
  }
}

const db = new MemoriesDB();

// ==========================================================================
// 2. CONFETTI ENGINE (PURIN & HEARTS CANVAS)
// ==========================================================================
class ConfettiEngine {
  constructor() {
    this.canvas = document.getElementById('confetti-canvas');
    this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
    this.particles = [];
    this.animationId = null;
    this.resize();
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    if (!this.canvas) return;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  burst(x = window.innerWidth / 2, y = window.innerHeight / 2, count = 75) {
    const colors = ['#FFE082', '#FF80AB', '#FF4081', '#FFD54F', '#FFF9C4', '#4FC3F7', '#FF85A2'];
    const shapes = ['circle', 'heart', 'ribbon'];

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const velocity = Math.random() * 9 + 4;
      this.particles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity - 2,
        size: Math.random() * 9 + 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        shape: shapes[Math.floor(Math.random() * shapes.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 12,
        alpha: 1,
        life: 1
      });
    }

    if (!this.animationId) {
      this.animate();
    }
  }

  drawHeart(ctx, x, y, size) {
    ctx.save();
    ctx.translate(x, y);
    ctx.beginPath();
    const topCurveHeight = size * 0.3;
    ctx.moveTo(0, topCurveHeight);
    ctx.bezierCurveTo(0, 0, -size / 2, 0, -size / 2, topCurveHeight);
    ctx.bezierCurveTo(-size / 2, (size + topCurveHeight) / 2, 0, size, 0, size);
    ctx.bezierCurveTo(0, size, size / 2, (size + topCurveHeight) / 2, size / 2, topCurveHeight);
    ctx.bezierCurveTo(size / 2, 0, 0, 0, 0, topCurveHeight);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  animate() {
    if (!this.ctx) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.22; // Gravidade
      p.vx *= 0.985;
      p.rotation += p.rotationSpeed;
      p.alpha -= 0.012;

      if (p.alpha <= 0 || p.y > this.canvas.height + 50) {
        this.particles.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.globalAlpha = p.alpha;
      this.ctx.fillStyle = p.color;

      if (p.shape === 'heart') {
        this.ctx.rotate((p.rotation * Math.PI) / 180);
        this.drawHeart(this.ctx, p.x, p.y, p.size * 1.3);
      } else if (p.shape === 'ribbon') {
        this.ctx.translate(p.x, p.y);
        this.ctx.rotate((p.rotation * Math.PI) / 180);
        this.ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
      } else {
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.size / 2, 0, Math.PI * 2);
        this.ctx.fill();
      }
      this.ctx.restore();
    }

    if (this.particles.length > 0) {
      this.animationId = requestAnimationFrame(() => this.animate());
    } else {
      this.animationId = null;
    }
  }
}

let confettiEngine = null;

// ==========================================================================
// 2.1 CONTROLE DE SENHA DO SITE ("meowversario")
// ==========================================================================
function setupPasswordGate() {
  const gate = document.getElementById('password-gate');
  const card = document.getElementById('password-card');
  const input = document.getElementById('site-password-input');
  const errorMsg = document.getElementById('password-error-msg');
  const toggleEye = document.getElementById('toggle-pw-visibility');
  const lockLink = document.getElementById('lock-site-link');

  // Verifica se já foi desbloqueado nesta sessão
  const isUnlocked = sessionStorage.getItem('site_meowversario_unlocked') === 'true';
  if (isUnlocked && gate) {
    gate.classList.add('unlocked');
  } else if (input) {
    setTimeout(() => input.focus(), 350);
  }

  // Alternar visualização da senha
  toggleEye?.addEventListener('click', () => {
    if (input.type === 'password') {
      input.type = 'text';
      toggleEye.textContent = '🙈';
    } else {
      input.type = 'password';
      toggleEye.textContent = '👁️';
    }
  });

  window.checkSitePassword = function () {
    const val = input ? input.value.trim().toLowerCase() : '';
    // A senha requerida é: meowversario
    if (val === 'meowversario') {
      sessionStorage.setItem('site_meowversario_unlocked', 'true');
      if (errorMsg) errorMsg.classList.remove('visible');

      window.romanticAudio?.playNote(523.25, 0.3);
      setTimeout(() => window.romanticAudio?.playNote(783.99, 0.5), 180);
      confettiEngine?.burst();

      gate?.classList.add('unlocked');
    } else {
      if (errorMsg) errorMsg.classList.add('visible');
      card?.classList.add('shake-animation');
      setTimeout(() => card?.classList.remove('shake-animation'), 450);
      input?.focus();
      input?.select();
    }
  };

  lockLink?.addEventListener('click', () => {
    sessionStorage.removeItem('site_meowversario_unlocked');
    if (input) input.value = '';
    if (errorMsg) errorMsg.classList.remove('visible');
    gate?.classList.remove('unlocked');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => input?.focus(), 400);
  });
}

// ==========================================================================
// 3. ABERTURA "PRESENTE PARA VOCÊ" (UNBOXING)
// ==========================================================================
function setupUnboxing() {
  const overlay = document.getElementById('gift-overlay');
  const boxWrapper = document.getElementById('gift-box-wrapper');
  const openBtn = document.getElementById('open-gift-btn');
  const reopenLink = document.getElementById('reopen-gift-link');

  function openGift() {
    boxWrapper?.classList.add('animating');
    window.romanticAudio?.playNote(587.33, 0.4);
    setTimeout(() => window.romanticAudio?.playNote(880.0, 0.7), 200);

    const rect = boxWrapper?.getBoundingClientRect();
    const x = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
    const y = rect ? rect.top + rect.height / 2 : window.innerHeight / 2;

    confettiEngine?.burst(x, y, 90);
    setTimeout(() => confettiEngine?.burst(x, y - 50, 70), 250);

    setTimeout(() => {
      overlay?.classList.add('opened');
      // Inicia música romântica de fundo ao interagir
      if (!window.romanticAudio?.isPlaying) {
        window.romanticAudio?.startMusic();
      }
    }, 900);
  }

  boxWrapper?.addEventListener('click', openGift);
  openBtn?.addEventListener('click', openGift);

  reopenLink?.addEventListener('click', () => {
    overlay?.classList.remove('opened');
    boxWrapper?.classList.remove('animating');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ==========================================================================
// 4. TEMPORIZADOR DE 18 ANOS (30/09 ÀS 00:00)
// ==========================================================================
function setupCountdown() {
  const daysEl = document.getElementById('timer-days');
  const hoursEl = document.getElementById('timer-hours');
  const minsEl = document.getElementById('timer-mins');
  const secsEl = document.getElementById('timer-secs');
  const statusSub = document.getElementById('countdown-status-sub');
  const milestoneBanner = document.getElementById('milestone-banner');

  // Define data do aniversário: 30 de Setembro às 00:00
  // Usa o ano atual de forma inteligente para que o timer funcione perfeitamente
  const now = new Date();
  let targetYear = now.getFullYear();
  let targetDate = new Date(targetYear, 8, 30, 0, 0, 0); // Mês 8 = Setembro

  // Se já passou do dia 30/09 deste ano há mais de 10 dias, podemos olhar o momento de 18 anos
  function updateTimer() {
    const current = new Date();
    const diff = targetDate.getTime() - current.getTime();

    if (diff <= 0) {
      // Já completou 18 anos! Celebração total
      if (milestoneBanner) milestoneBanner.style.display = 'block';
      if (statusSub) statusSub.textContent = '🎉 Parabéns pelos seus 18 anos! O tempo passa, e o meu amor só cresce:';

      const pastDiff = Math.abs(diff);
      const days = Math.floor(pastDiff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((pastDiff / (1000 * 60 * 60)) % 24);
      const mins = Math.floor((pastDiff / (1000 * 60)) % 60);
      const secs = Math.floor((pastDiff / 1000) % 60);

      if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
      if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
      if (minsEl) minsEl.textContent = String(mins).padStart(2, '0');
      if (secsEl) secsEl.textContent = String(secs).padStart(2, '0');
    } else {
      // Contagem regressiva para os 18 anos
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const mins = Math.floor((diff / (1000 * 60)) % 60);
      const secs = Math.floor((diff / 1000) % 60);

      if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
      if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
      if (minsEl) minsEl.textContent = String(mins).padStart(2, '0');
      if (secsEl) secsEl.textContent = String(secs).padStart(2, '0');

      if (statusSub) {
        statusSub.textContent = `Faltam ${days} dias para a pessoa mais especial da minha vida completar 18 anos!`;
      }
    }
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

// ==========================================================================
// 5. NAVEGAÇÃO DE ABAS
// ==========================================================================
function setupTabs() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');

  tabButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-tab');

      tabButtons.forEach((b) => b.classList.remove('active'));
      tabPanes.forEach((p) => p.classList.remove('active'));

      btn.classList.add('active');
      const activePane = document.getElementById(targetId);
      if (activePane) {
        activePane.classList.add('active');
        window.scrollTo({ top: activePane.offsetTop - 80, behavior: 'smooth' });
      }

      // Se for a aba da árvore ou da galeria, atualiza renderização
      if (targetId === 'tab-gallery') renderGallery();
      if (targetId === 'tab-tree') renderTree();
    });
  });
}

// ==========================================================================
// 6. ABA 2: "MURAL DE GALERIA DO MEU NENÉM" (INDEXEDDB PERMANENTE)
// ==========================================================================
// Fotos padrão ilustradas fofas para a galeria já nascer linda
const defaultGalleryPhotos = [
  {
    id: 'photo-default-1',
    src: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=700&q=80',
    caption: 'O dia em que meu coração escolheu você para sempre 💖',
    date: 'Momento Inesquecível'
  },
  {
    id: 'photo-default-2',
    src: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=700&q=80',
    caption: 'Seu abraço é o meu lugar favorito no mundo todinho 🐾',
    date: 'Nosso Cantinho'
  },
  {
    id: 'photo-default-3',
    src: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=700&q=80',
    caption: 'Seu sorriso ilumina os meus dias mais nublados ✨',
    date: 'Amor da Minha Vida'
  },
  {
    id: 'photo-default-4',
    src: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=700&q=80',
    caption: 'Comemorando a sua vida, hoje, amanhã e sempre! 🎂',
    date: '30 de Setembro'
  }
];

async function initGalleryData() {
  const existing = await db.getAll('photos');
  if (existing.length === 0) {
    for (const photo of defaultGalleryPhotos) {
      await db.put('photos', photo);
    }
  }
}

async function renderGallery() {
  const grid = document.getElementById('polaroids-grid');
  if (!grid) return;

  const photos = await db.getAll('photos');
  grid.innerHTML = '';

  if (photos.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--purin-soft-brown);">
        <p style="font-size: 1.2rem; font-family: var(--font-script);">O mural está esperando as suas fotos favoritas! Clique no botão acima para adicionar uma lembrança nossa. 📸✨</p>
      </div>
    `;
    return;
  }

  photos.forEach((photo) => {
    const card = document.createElement('div');
    card.className = 'polaroid-card';
    card.setAttribute('data-id', photo.id);

    card.innerHTML = `
      <button class="polaroid-delete-btn" title="Remover lembrança" onclick="event.stopPropagation(); deleteGalleryPhoto('${photo.id}')">✕</button>
      <div class="polaroid-img-wrapper">
        <img class="polaroid-img" src="${photo.src}" alt="${photo.caption || 'Foto do meu amor'}" loading="lazy" />
      </div>
      <div class="polaroid-caption-wrap">
        <p class="polaroid-caption">${photo.caption || 'Momento nosso 💖'}</p>
        <span class="polaroid-date">${photo.date || 'Para todo o sempre'}</span>
      </div>
    `;

    card.addEventListener('click', () => {
      openLightbox(photo.src, photo.caption, photo.date);
    });

    grid.appendChild(card);
  });
}

async function deleteGalleryPhoto(id) {
  if (confirm('Deseja remover esta fotinha do mural?')) {
    await db.delete('photos', id);
    renderGallery();
  }
}

function setupGalleryModal() {
  const addBtn = document.getElementById('btn-open-photo-modal');
  const modal = document.getElementById('photo-modal');
  const closeBtn = document.getElementById('close-photo-modal');
  const fileInput = document.getElementById('photo-file-input');
  const previewBox = document.getElementById('photo-preview-box');
  const saveBtn = document.getElementById('btn-save-photo');
  const captionInput = document.getElementById('photo-caption-input');
  const dateInput = document.getElementById('photo-date-input');

  let selectedDataUrl = null;

  addBtn?.addEventListener('click', () => {
    selectedDataUrl = null;
    if (captionInput) captionInput.value = '';
    if (dateInput) dateInput.value = '';
    if (fileInput) fileInput.value = '';
    if (previewBox) previewBox.innerHTML = '<span style="color:#8D6E63; font-size:0.9rem;">Nenhuma foto selecionada ainda 📷</span>';
    modal?.classList.add('open');
  });

  closeBtn?.addEventListener('click', () => {
    modal?.classList.remove('open');
  });

  fileInput?.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      selectedDataUrl = event.target.result;
      if (previewBox) {
        previewBox.innerHTML = `<img src="${selectedDataUrl}" alt="Preview" style="width:100%; height:100%; object-fit:cover;" />`;
      }
    };
    reader.readAsDataURL(file);
  });

  saveBtn?.addEventListener('click', async () => {
    if (!selectedDataUrl) {
      alert('Por favor, selecione uma fotinha para colocar no mural!');
      return;
    }

    const newPhoto = {
      id: 'photo-' + Date.now(),
      src: selectedDataUrl,
      caption: captionInput?.value.trim() || 'Nosso Momento Especial 💖',
      date: dateInput?.value.trim() || 'Para Sempre'
    };

    await db.put('photos', newPhoto);
    modal?.classList.remove('open');
    confettiEngine?.burst();
    renderGallery();
  });
}

function openLightbox(src, caption, date) {
  const lightbox = document.getElementById('lightbox-modal');
  const imgEl = document.getElementById('lightbox-img');
  const capEl = document.getElementById('lightbox-caption');
  const dateEl = document.getElementById('lightbox-date');

  if (imgEl) imgEl.src = src;
  if (capEl) capEl.textContent = caption || '';
  if (dateEl) dateEl.textContent = date || '';

  lightbox?.classList.add('open');
}

// ==========================================================================
// 7. ABA 3: JOGO DE PALAVRAS ("TERMO DO AMOR" & "CAÇA-PALAVRAS")
// ==========================================================================
const romanticWordsList = [
  { word: 'PURIN', hint: 'Nosso cachorrinho fofo amarelo de boina que você ama!' },
  { word: 'NENEM', hint: 'O apelido mais doce e carinhoso do universo que é só seu.' },
  { word: 'AMADA', hint: 'O que você é hoje, amanhã e em cada segundo da minha vida.' },
  { word: 'LINDA', hint: 'O que você é por dentro, por fora e em cada detalhe do seu ser.' },
  { word: 'SONHO', hint: 'Ter você ao meu lado é a realização do meu maior desejo.' },
  { word: 'BEIJO', hint: 'O carinho mais gostoso que eu quero te dar todos os dias.' },
  { word: 'DOCIN', hint: 'O seu jeitinho carinhoso que derrete meu coração como pudim.' }
];

window.deleteGalleryPhoto = deleteGalleryPhoto;
window.openLightbox = openLightbox;

class TermoGame {
  constructor() {
    this.currentWordIdx = 0;
    this.targetWord = romanticWordsList[0].word;
    this.hint = romanticWordsList[0].hint;
    this.currentRow = 0;
    this.currentCol = 0;
    this.grid = Array(6).fill('').map(() => Array(5).fill(''));
    this.isOver = false;
  }

  init() {
    this.renderBoard();
    this.renderKeyboard();
    this.updateHintUI();
    this.bindPhysicalKeyboard();
  }

  updateHintUI() {
    const hintText = document.getElementById('termo-hint-text');
    const wordCount = document.getElementById('termo-word-counter');
    if (hintText) hintText.textContent = `Dica: ${this.hint}`;
    if (wordCount) wordCount.textContent = `Palavra ${this.currentWordIdx + 1} de ${romanticWordsList.length}`;
  }

  renderBoard() {
    const board = document.getElementById('termo-board');
    if (!board) return;
    board.innerHTML = '';

    for (let r = 0; r < 6; r++) {
      const row = document.createElement('div');
      row.className = 'termo-row';
      for (let c = 0; c < 5; c++) {
        const tile = document.createElement('div');
        tile.className = 'termo-tile';
        tile.id = `tile-${r}-${c}`;
        row.appendChild(tile);
      }
      board.appendChild(row);
    }
  }

  renderKeyboard() {
    const kb = document.getElementById('virtual-keyboard');
    if (!kb) return;

    const rows = [
      ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
      ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
      ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '⌫']
    ];

    kb.innerHTML = '';
    rows.forEach((rowLetters) => {
      const rowDiv = document.createElement('div');
      rowDiv.className = 'keyboard-row';

      rowLetters.forEach((key) => {
        const btn = document.createElement('button');
        btn.className = 'key-btn';
        if (key === 'ENTER' || key === '⌫') btn.classList.add('wide');
        btn.textContent = key;
        btn.setAttribute('data-key', key);

        btn.addEventListener('click', () => this.handleKeyPress(key));
        rowDiv.appendChild(btn);
      });
      kb.appendChild(rowDiv);
    });
  }

  bindPhysicalKeyboard() {
    window.addEventListener('keydown', (e) => {
      // Ignora se estiver digitando em formulários
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;

      if (e.key === 'Enter') {
        this.handleKeyPress('ENTER');
      } else if (e.key === 'Backspace') {
        this.handleKeyPress('⌫');
      } else {
        const letter = e.key.toUpperCase();
        if (/^[A-Z]$/.test(letter)) {
          this.handleKeyPress(letter);
        }
      }
    });
  }

  handleKeyPress(key) {
    if (this.isOver) return;

    if (key === 'ENTER') {
      this.submitGuess();
    } else if (key === '⌫' || key === 'BACKSPACE') {
      this.deleteLetter();
    } else if (/^[A-Z]$/.test(key)) {
      this.addLetter(key);
    }
  }

  addLetter(letter) {
    if (this.currentCol < 5) {
      this.grid[this.currentRow][this.currentCol] = letter;
      const tile = document.getElementById(`tile-${this.currentRow}-${this.currentCol}`);
      if (tile) {
        tile.textContent = letter;
        tile.classList.add('active-input');
      }
      this.currentCol++;
    }
  }

  deleteLetter() {
    if (this.currentCol > 0) {
      this.currentCol--;
      this.grid[this.currentRow][this.currentCol] = '';
      const tile = document.getElementById(`tile-${this.currentRow}-${this.currentCol}`);
      if (tile) {
        tile.textContent = '';
        tile.classList.remove('active-input');
      }
    }
  }

  submitGuess() {
    if (this.currentCol < 5) {
      alert('Preencha as 5 letrinhas do amor antes de enviar!');
      return;
    }

    const guess = this.grid[this.currentRow].join('');
    const target = this.targetWord;

    // Avalia acertos
    const targetArr = target.split('');
    const guessArr = guess.split('');
    const result = Array(5).fill('absent');

    // 1. Letras corretas na posição certa (Verde)
    for (let i = 0; i < 5; i++) {
      if (guessArr[i] === targetArr[i]) {
        result[i] = 'correct';
        targetArr[i] = null;
      }
    }

    // 2. Letras presentes na palavra mas posição errada (Amarelo)
    for (let i = 0; i < 5; i++) {
      if (result[i] === 'correct') continue;
      const foundIdx = targetArr.indexOf(guessArr[i]);
      if (foundIdx !== -1) {
        result[i] = 'present';
        targetArr[foundIdx] = null;
      }
    }

    // Aplica classes visuais com delay suave
    for (let i = 0; i < 5; i++) {
      const tile = document.getElementById(`tile-${this.currentRow}-${i}`);
      const letter = guessArr[i];
      const status = result[i];

      setTimeout(() => {
        tile?.classList.remove('active-input');
        tile?.classList.add(status);
        this.updateKeyboardKey(letter, status);
      }, i * 180);
    }

    setTimeout(() => {
      if (guess === target) {
        this.winRound();
      } else if (this.currentRow === 5) {
        alert(`Foi quase, meu bem! A palavrinha era: ${this.targetWord}. Vamos para a próxima! 💖`);
        this.nextWord();
      } else {
        this.currentRow++;
        this.currentCol = 0;
      }
    }, 5 * 180 + 100);
  }

  updateKeyboardKey(letter, status) {
    const btn = document.querySelector(`.key-btn[data-key="${letter}"]`);
    if (!btn) return;
    if (status === 'correct') {
      btn.className = 'key-btn correct';
    } else if (status === 'present' && !btn.classList.contains('correct')) {
      btn.className = 'key-btn present';
    } else if (status === 'absent' && !btn.classList.contains('correct') && !btn.classList.contains('present')) {
      btn.className = 'key-btn absent';
    }
  }

  winRound() {
    this.isOver = true;
    confettiEngine?.burst();
    setTimeout(() => confettiEngine?.burst(), 300);

    const winModal = document.getElementById('termo-win-modal');
    const winMsg = document.getElementById('termo-win-message');
    if (winMsg) {
      winMsg.textContent = `Você acertou: "${this.targetWord}"! ${this.hint} 💖`;
    }
    winModal?.classList.add('open');
  }

  nextWord() {
    this.currentWordIdx = (this.currentWordIdx + 1) % romanticWordsList.length;
    this.targetWord = romanticWordsList[this.currentWordIdx].word;
    this.hint = romanticWordsList[this.currentWordIdx].hint;
    this.currentRow = 0;
    this.currentCol = 0;
    this.grid = Array(6).fill('').map(() => Array(5).fill(''));
    this.isOver = false;

    this.renderBoard();
    this.renderKeyboard();
    this.updateHintUI();
  }
}

let termoGameInstance = null;

// ==========================================================================
// 8. ABA 4: ÁRVORE DE PRESENTES (IMAGEM EXPANSÍVEL & EDITÁVEL)
// ==========================================================================
const defaultTreeGifts = [
  {
    id: 'gift-1',
    tag: 'Presente 1',
    title: 'Vale Abraço Infinito & Muito Chamego 🧸',
    desc: 'Válido para qualquer dia, hora ou momento. Dá direito a cafuné sem limite e um milhão de beijinhos!',
    img: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=600&q=80',
    top: '32%',
    left: '26%'
  },
  {
    id: 'gift-2',
    tag: 'Presente 2',
    title: 'Jantar Romântico dos Seus Sonhos 🍝✨',
    desc: 'Uma noite especial com tudo o que você mais adora comer, luz de velas e o seu namorado apaixonado te admirando.',
    img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80',
    top: '22%',
    left: '48%'
  },
  {
    id: 'gift-3',
    tag: 'Presente 3',
    title: 'Noite de Filmes, Séries & Docinhos 🎬🍿',
    desc: 'Pipoca, chocolate, cobertor quentinho e maratonar tudo o que você escolher sem reclamar de nada!',
    img: 'https://images.unsplash.com/photo-1505686994434-e3cc5abf1330?auto=format&fit=crop&w=600&q=80',
    top: '34%',
    left: '68%'
  },
  {
    id: 'gift-4',
    tag: 'Presente 4',
    title: 'O Primeiro Grande Sonho dos 18 Anos ✈️🗺️',
    desc: 'O começo da nossa vida como casal oficial e independente! Uma viagem ou passeio especial para celebrar a sua maioridade.',
    img: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=600&q=80',
    top: '52%',
    left: '36%'
  },
  {
    id: 'gift-5',
    tag: 'Presente 5',
    title: 'Presente Secreto do Pompompurin 🎁🐾',
    desc: 'Um mimo físico super fofinho que preparei com todo o carinho do mundo para você!',
    img: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=600&q=80',
    top: '54%',
    left: '60%'
  }
];

async function initTreeData() {
  const existing = await db.getAll('tree_gifts');
  if (existing.length === 0) {
    for (const g of defaultTreeGifts) {
      await db.put('tree_gifts', g);
    }
  }
}

async function renderTree() {
  const stage = document.getElementById('tree-interactive-stage');
  if (!stage) return;

  // Remove presentes existentes na árvore
  const oldGifts = stage.querySelectorAll('.hanging-gift-item');
  oldGifts.forEach((el) => el.remove());

  const gifts = await db.getAll('tree_gifts');

  gifts.forEach((gift) => {
    const item = document.createElement('div');
    item.className = 'hanging-gift-item';
    item.style.top = gift.top || '40%';
    item.style.left = gift.left || '50%';

    item.innerHTML = `
      <div class="hanging-gift-box">🎁</div>
      <span class="hanging-gift-tag">${gift.tag || 'Presente'}</span>
    `;

    item.addEventListener('click', () => {
      openTreeGiftModal(gift);
    });

    stage.appendChild(item);
  });
}

let activeViewingGiftId = null;

function openTreeGiftModal(gift) {
  activeViewingGiftId = gift.id;
  const modal = document.getElementById('tree-gift-modal');
  const titleEl = document.getElementById('gift-modal-title');
  const descEl = document.getElementById('gift-modal-desc');
  const imgEl = document.getElementById('gift-modal-img');

  if (titleEl) titleEl.textContent = gift.title;
  if (descEl) descEl.textContent = gift.desc;
  if (imgEl) {
    imgEl.src = gift.img || 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=600&q=80';
    imgEl.alt = gift.title;
  }

  modal?.classList.add('open');
}

function setupTreeGiftEditing() {
  const changeImgBtn = document.getElementById('btn-change-gift-img');
  const fileInput = document.getElementById('gift-img-file-input');
  const closeBtn = document.getElementById('close-tree-gift-modal');
  const modal = document.getElementById('tree-gift-modal');

  closeBtn?.addEventListener('click', () => {
    modal?.classList.remove('open');
  });

  changeImgBtn?.addEventListener('click', () => {
    fileInput?.click();
  });

  fileInput?.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file || !activeViewingGiftId) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const newImgSrc = event.target.result;
      const gifts = await db.getAll('tree_gifts');
      const targetGift = gifts.find((g) => g.id === activeViewingGiftId);

      if (targetGift) {
        targetGift.img = newImgSrc;
        await db.put('tree_gifts', targetGift);

        const imgEl = document.getElementById('gift-modal-img');
        if (imgEl) imgEl.src = newImgSrc;
        confettiEngine?.burst();
        alert('Imagem do presente atualizada e salva com sucesso para sempre! 💖');
      }
    };
    reader.readAsDataURL(file);
  });
}

function setupNewTreeGiftModal() {
  const openBtn = document.getElementById('btn-open-new-tree-gift');
  const modal = document.getElementById('new-tree-gift-modal');
  const closeBtn = document.getElementById('close-new-tree-gift-modal');
  const fileInput = document.getElementById('new-gift-img-file');
  const previewBox = document.getElementById('new-gift-preview-box');
  const titleInput = document.getElementById('new-gift-title');
  const descInput = document.getElementById('new-gift-desc');
  const saveBtn = document.getElementById('btn-save-new-tree-gift');

  let selectedDataUrl = null;

  openBtn?.addEventListener('click', () => {
    selectedDataUrl = null;
    if (titleInput) titleInput.value = '';
    if (descInput) descInput.value = '';
    if (fileInput) fileInput.value = '';
    if (previewBox) previewBox.innerHTML = '<span style="color:#8D6E63; font-size:0.9rem;">Selecione uma imagem para este presente 🎁</span>';
    modal?.classList.add('open');
  });

  closeBtn?.addEventListener('click', () => {
    modal?.classList.remove('open');
  });

  fileInput?.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      selectedDataUrl = event.target.result;
      if (previewBox) {
        previewBox.innerHTML = `<img src="${selectedDataUrl}" alt="Preview" style="width:100%; height:100%; object-fit:cover;" />`;
      }
    };
    reader.readAsDataURL(file);
  });

  saveBtn?.addEventListener('click', async () => {
    const title = titleInput?.value.trim() || 'Presente Especial 💖';
    const desc = descInput?.value.trim() || 'Uma surpresa preparada com todo o meu coração para o seu aniversário!';
    const img = selectedDataUrl || 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=600&q=80';

    const gifts = await db.getAll('tree_gifts');
    const newCount = gifts.length + 1;

    // Coordenadas aleatórias seguras dentro da copa da árvore
    const topPos = (22 + Math.random() * 32).toFixed(0) + '%';
    const leftPos = (25 + Math.random() * 50).toFixed(0) + '%';

    const newGift = {
      id: 'gift-' + Date.now(),
      tag: `Presente ${newCount}`,
      title: title,
      desc: desc,
      img: img,
      top: topPos,
      left: leftPos
    };

    await db.put('tree_gifts', newGift);
    modal?.classList.remove('open');
    confettiEngine?.burst();
    renderTree();
    alert('Novo presente pendurado com sucesso na árvore! 🌳✨');
  });
}

// ==========================================================================
// 9. ABA 5: CONCLUSÃO ("O COMEÇO DA NOSSA VIDA JUNTOS")
// ==========================================================================
function setupConclusion() {
  const explosionBtn = document.getElementById('btn-love-explosion');
  const coupleSignBtn = document.getElementById('btn-seal-promise');
  const partnerNameInput = document.getElementById('partner-name-input');
  const yourNameInput = document.getElementById('your-name-input');
  const pledgeStatus = document.getElementById('pledge-status-msg');

  explosionBtn?.addEventListener('click', () => {
    window.romanticAudio?.playNote(523.25, 0.4);
    setTimeout(() => window.romanticAudio?.playNote(659.25, 0.4), 150);
    setTimeout(() => window.romanticAudio?.playNote(783.99, 0.6), 300);

    confettiEngine?.burst(window.innerWidth / 2, window.innerHeight / 2, 110);
    setTimeout(() => confettiEngine?.burst(window.innerWidth * 0.25, window.innerHeight * 0.4, 70), 250);
    setTimeout(() => confettiEngine?.burst(window.innerWidth * 0.75, window.innerHeight * 0.4, 70), 450);
  });

  coupleSignBtn?.addEventListener('click', () => {
    const partner = partnerNameInput?.value.trim() || 'Meu Amor';
    const you = yourNameInput?.value.trim() || 'Seu Namorado';

    if (pledgeStatus) {
      pledgeStatus.innerHTML = `
        <div style="background: #FFF9C4; border: 2px dashed #FFD54F; padding: 18px; border-radius: 14px; margin-top: 15px; animation: bounceBanner 0.5s ease;">
          <h4 style="color: var(--purin-brown); font-family: var(--font-heading); margin-bottom: 6px;">✨ Promessa Eterna Selada Oficialmente ✨</h4>
          <p style="color: var(--love-deep-rose); font-family: var(--font-script); font-size: 1.5rem; margin-bottom: 4px;">${partner} & ${you}</p>
          <p style="font-size: 0.88rem; color: #5D4037;">"Este é o início da nossa vida adulta, e acima de tudo, o início da nossa eternidade como um casal. O primeiro de infinitos aniversários juntos!"</p>
        </div>
      `;
      confettiEngine?.burst();
    }
  });
}

// ==========================================================================
// 10. INICIALIZAÇÃO GERAL AO CARREGAR O DOM
// ==========================================================================
document.addEventListener('DOMContentLoaded', async () => {
  confettiEngine = new ConfettiEngine();

  // Inicia banco de dados
  await db.init();
  await initGalleryData();
  await initTreeData();

  // Configura componentes
  setupPasswordGate();
  setupUnboxing();
  setupCountdown();
  setupTabs();
  setupGalleryModal();
  setupTreeGiftEditing();
  setupNewTreeGiftModal();
  setupConclusion();

  // Inicia jogo Termo
  termoGameInstance = new TermoGame();
  termoGameInstance.init();

  const nextWordBtn = document.getElementById('btn-next-word');
  nextWordBtn?.addEventListener('click', () => {
    document.getElementById('termo-win-modal')?.classList.remove('open');
    termoGameInstance?.nextWord();
  });

  // Renderiza dados iniciais
  renderGallery();
  renderTree();

  // Renderiza SVGs dos Personagens Sanrio
  renderSanrioArtwork();

  // Configura Player de Música
  const musicToggle = document.getElementById('music-toggle-btn');
  const customAudioInput = document.getElementById('custom-audio-file');

  musicToggle?.addEventListener('click', () => {
    window.romanticAudio?.toggle();
  });

  customAudioInput?.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      window.romanticAudio?.loadCustomFile(file);
      alert('Sua música especial foi carregada com sucesso! Tocando agora 🎵💖');
    }
  });
});

function renderSanrioArtwork() {
  if (typeof SanrioSVGs === 'undefined') return;

  const purinCakeElements = document.querySelectorAll('.svg-pompompurin-cake');
  purinCakeElements.forEach((el) => { el.innerHTML = SanrioSVGs.pompompurinCake; });

  const purinHeartElements = document.querySelectorAll('.svg-pompompurin-heart');
  purinHeartElements.forEach((el) => { el.innerHTML = SanrioSVGs.pompompurinHeart; });

  const helloKittyElements = document.querySelectorAll('.svg-hello-kitty');
  helloKittyElements.forEach((el) => { el.innerHTML = SanrioSVGs.helloKitty; });

  const myMelodyElements = document.querySelectorAll('.svg-my-melody');
  myMelodyElements.forEach((el) => { el.innerHTML = SanrioSVGs.myMelody; });

  const cinnamorollElements = document.querySelectorAll('.svg-cinnamoroll');
  cinnamorollElements.forEach((el) => { el.innerHTML = SanrioSVGs.cinnamoroll; });

  const kuromiElements = document.querySelectorAll('.svg-kuromi');
  kuromiElements.forEach((el) => { el.innerHTML = SanrioSVGs.kuromi; });

  const stampElements = document.querySelectorAll('.svg-stamp');
  stampElements.forEach((el) => { el.innerHTML = SanrioSVGs.stampHeart; });

  // Adiciona efeito sonoro fofo ao clicar nos mascotes
  const mascots = document.querySelectorAll('.mascot-card');
  mascots.forEach((card) => {
    card.addEventListener('click', () => {
      window.romanticAudio?.playNote(659.25, 0.3);
      confettiEngine?.burst(card.getBoundingClientRect().left + 40, card.getBoundingClientRect().top + 40, 20);
    });
  });
}
