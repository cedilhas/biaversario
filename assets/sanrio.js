/**
 * SVG Artworks & Sanrio Icons
 * Foco especial no Pompompurin, com presenças doces de Hello Kitty, My Melody, Cinnamoroll e Kuromi!
 */

const SanrioSVGs = {
  // Pompompurin Principal (Com boina marrom, bochechinhas coradas e bolo de aniversário)
  pompompurinCake: `
    <svg viewBox="0 0 200 200" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="purinGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#FFF8E1"/>
          <stop offset="100%" stop-color="#FFE082"/>
        </radialGradient>
      </defs>
      <!-- Sombra macia -->
      <ellipse cx="100" cy="180" rx="65" ry="12" fill="#D7CCC8" opacity="0.4"/>
      <!-- Orelha Esquerda -->
      <path d="M 50 85 C 30 75, 25 105, 45 118 C 55 125, 65 110, 55 95 Z" fill="#FFE082" stroke="#5D4037" stroke-width="3" stroke-linejoin="round"/>
      <!-- Orelha Direita -->
      <path d="M 150 85 C 170 75, 175 105, 155 118 C 145 125, 135 110, 145 95 Z" fill="#FFE082" stroke="#5D4037" stroke-width="3" stroke-linejoin="round"/>
      <!-- Corpo Redondinho -->
      <ellipse cx="100" cy="125" rx="68" ry="55" fill="url(#purinGlow)" stroke="#5D4037" stroke-width="3.5"/>
      <!-- Boina Marrom Charme -->
      <path d="M 75 62 C 75 48, 125 48, 125 62 C 125 68, 75 68, 75 62 Z" fill="#5D4037"/>
      <ellipse cx="100" cy="62" rx="28" ry="9" fill="#6D4C41"/>
      <circle cx="100" cy="51" r="3.5" fill="#5D4037"/>
      <!-- Olhinhos Fofos -->
      <circle cx="82" cy="108" r="4.5" fill="#5D4037"/>
      <circle cx="118" cy="108" r="4.5" fill="#5D4037"/>
      <!-- Focinho e Boquinha de 'W' -->
      <ellipse cx="100" cy="115" rx="4.5" ry="3.5" fill="#5D4037"/>
      <path d="M 94 120 Q 97 124 100 121 Q 103 124 106 120" stroke="#5D4037" stroke-width="2.5" stroke-linecap="round" fill="none"/>
      <!-- Bochechinhas Rosadas -->
      <circle cx="70" cy="118" r="7.5" fill="#FFAB91" opacity="0.6"/>
      <circle cx="130" cy="118" r="7.5" fill="#FFAB91" opacity="0.6"/>
      <!-- Patinhas da Frente segurando o bolo -->
      <ellipse cx="72" cy="142" rx="10" ry="8" fill="#FFE082" stroke="#5D4037" stroke-width="2.5"/>
      <ellipse cx="128" cy="142" rx="10" ry="8" fill="#FFE082" stroke="#5D4037" stroke-width="2.5"/>
      <!-- Patinhas de Baixo -->
      <ellipse cx="78" cy="172" rx="12" ry="7" fill="#FFE082" stroke="#5D4037" stroke-width="3"/>
      <ellipse cx="122" cy="172" rx="12" ry="7" fill="#FFE082" stroke="#5D4037" stroke-width="3"/>
      <!-- Bolo de 18 Anos -->
      <g transform="translate(75, 128)">
        <rect x="5" y="14" width="40" height="22" rx="4" fill="#FFF0F5" stroke="#E91E63" stroke-width="2"/>
        <path d="M 5 20 Q 15 25 25 20 Q 35 25 45 20 L 45 14 L 5 14 Z" fill="#F8BBD0"/>
        <!-- Moranguinhos no topo -->
        <circle cx="12" cy="12" r="3.5" fill="#E91E63"/>
        <circle cx="25" cy="12" r="3.5" fill="#E91E63"/>
        <circle cx="38" cy="12" r="3.5" fill="#E91E63"/>
        <!-- Velinha do bolo com o número 18 -->
        <rect x="23" y="1" width="4" height="11" fill="#FFEB3B" stroke="#F57C00" stroke-width="1"/>
        <path d="M 25 -3 Q 27 0 25 3 Q 23 0 25 -3 Z" fill="#FF9800"/>
        <circle cx="25" cy="0" r="1.5" fill="#FFF"/>
        <!-- Badge 18 -->
        <circle cx="25" cy="25" r="7" fill="#FF4081"/>
        <text x="25" y="28" font-size="7" font-weight="bold" fill="#FFF" text-anchor="middle" font-family="'Quicksand', sans-serif">18</text>
      </g>
    </svg>
  `,

  // Pompompurin Coração (Abraçando um coração apaixonado)
  pompompurinHeart: `
    <svg viewBox="0 0 200 200" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="purinGlow2" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#FFF9E6"/>
          <stop offset="100%" stop-color="#FFE082"/>
        </radialGradient>
      </defs>
      <ellipse cx="100" cy="178" rx="60" ry="10" fill="#D7CCC8" opacity="0.35"/>
      <!-- Orelhas caidinhas fofas -->
      <path d="M 45 90 C 25 80, 20 115, 45 125 C 55 130, 65 115, 52 100 Z" fill="#FFE082" stroke="#5D4037" stroke-width="3"/>
      <path d="M 155 90 C 175 80, 180 115, 155 125 C 145 130, 135 115, 148 100 Z" fill="#FFE082" stroke="#5D4037" stroke-width="3"/>
      <!-- Corpo -->
      <ellipse cx="100" cy="125" rx="65" ry="52" fill="url(#purinGlow2)" stroke="#5D4037" stroke-width="3.5"/>
      <!-- Boina -->
      <path d="M 78 68 C 78 54, 122 54, 122 68 C 122 74, 78 74, 78 68 Z" fill="#5D4037"/>
      <ellipse cx="100" cy="68" rx="26" ry="8" fill="#6D4C41"/>
      <circle cx="100" cy="58" r="3" fill="#5D4037"/>
      <!-- Olhos Piscando Felizes -->
      <path d="M 76 112 Q 83 105 90 112" stroke="#5D4037" stroke-width="3" stroke-linecap="round" fill="none"/>
      <path d="M 110 112 Q 117 105 124 112" stroke="#5D4037" stroke-width="3" stroke-linecap="round" fill="none"/>
      <!-- Narizinho e sorriso -->
      <ellipse cx="100" cy="116" rx="4" ry="3" fill="#5D4037"/>
      <path d="M 95 120 Q 100 126 105 120" stroke="#5D4037" stroke-width="2.5" stroke-linecap="round" fill="none"/>
      <!-- Bochechinhas -->
      <circle cx="68" cy="118" r="8" fill="#FF8A80" opacity="0.5"/>
      <circle cx="132" cy="118" r="8" fill="#FF8A80" opacity="0.5"/>
      <!-- Grande Coração Apaixonado -->
      <g transform="translate(100, 138) scale(0.95)">
        <path d="M 0 -15 C -25 -40, -45 -10, 0 30 C 45 -10, 25 -40, 0 -15 Z" fill="#FF4D6D" stroke="#C2185B" stroke-width="2"/>
        <path d="M -8 -15 Q -15 -25 -2 -22" stroke="#FFF" stroke-width="2" stroke-linecap="round" fill="none" opacity="0.8"/>
      </g>
      <!-- Patinhas abraçando o coração -->
      <ellipse cx="70" cy="140" rx="10" ry="8" transform="rotate(20 70 140)" fill="#FFE082" stroke="#5D4037" stroke-width="2.5"/>
      <ellipse cx="130" cy="140" rx="10" ry="8" transform="rotate(-20 130 140)" fill="#FFE082" stroke="#5D4037" stroke-width="2.5"/>
      <!-- Pezinhos -->
      <ellipse cx="80" cy="172" rx="11" ry="6" fill="#FFE082" stroke="#5D4037" stroke-width="3"/>
      <ellipse cx="120" cy="172" rx="11" ry="6" fill="#FFE082" stroke="#5D4037" stroke-width="3"/>
    </svg>
  `,

  // Hello Kitty (Com laço vermelho clássico, bigodinhos e florzinha)
  helloKitty: `
    <svg viewBox="0 0 150 150" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Cabeça Redonda Fofa -->
      <ellipse cx="75" cy="80" rx="55" ry="42" fill="#FFFFFF" stroke="#4A3E3D" stroke-width="3"/>
      <!-- Orelha Esquerda -->
      <path d="M 32 60 L 25 36 L 50 48 Z" fill="#FFFFFF" stroke="#4A3E3D" stroke-width="3" stroke-linejoin="round"/>
      <!-- Orelha Direita -->
      <path d="M 118 60 L 125 36 L 100 48 Z" fill="#FFFFFF" stroke="#4A3E3D" stroke-width="3" stroke-linejoin="round"/>
      <!-- Laço Vermelho / Rosa Ícone -->
      <g transform="translate(105, 42)">
        <circle cx="0" cy="0" r="7" fill="#FF477E" stroke="#4A3E3D" stroke-width="2.5"/>
        <path d="M -4 -3 C -16 -16, -20 10, -4 4 Z" fill="#FF5D8F" stroke="#4A3E3D" stroke-width="2.5"/>
        <path d="M 4 -3 C 16 -16, 20 10, 4 4 Z" fill="#FF5D8F" stroke="#4A3E3D" stroke-width="2.5"/>
        <circle cx="-1" cy="-1" r="2.5" fill="#FFF" opacity="0.6"/>
      </g>
      <!-- Olhinhos Pretos -->
      <ellipse cx="53" cy="80" rx="4" ry="5.5" fill="#3E2723"/>
      <ellipse cx="97" cy="80" rx="4" ry="5.5" fill="#3E2723"/>
      <!-- Narizinho Amarelo -->
      <ellipse cx="75" cy="88" rx="4.5" ry="3.5" fill="#FFCA28" stroke="#5D4037" stroke-width="1.2"/>
      <!-- Bigodes Clássicos -->
      <line x1="22" y1="76" x2="38" y2="79" stroke="#4A3E3D" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="20" y1="86" x2="38" y2="86" stroke="#4A3E3D" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="23" y1="96" x2="38" y2="92" stroke="#4A3E3D" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="128" y1="76" x2="112" y2="79" stroke="#4A3E3D" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="130" y1="86" x2="112" y2="86" stroke="#4A3E3D" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="127" y1="96" x2="112" y2="92" stroke="#4A3E3D" stroke-width="2.5" stroke-linecap="round"/>
      <!-- Bochechinhas fofas -->
      <circle cx="43" cy="90" r="5" fill="#FF80AB" opacity="0.4"/>
      <circle cx="107" cy="90" r="5" fill="#FF80AB" opacity="0.4"/>
    </svg>
  `,

  // My Melody (Capuz Rosa Doce, orelhinha dobrada e florzinha)
  myMelody: `
    <svg viewBox="0 0 150 150" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Orelha esquerda levantada -->
      <path d="M 45 60 C 25 15, 60 10, 62 55 Z" fill="#FF85A2" stroke="#4A3E3D" stroke-width="3" stroke-linejoin="round"/>
      <!-- Orelha direita dobrada charme -->
      <path d="M 105 60 C 125 25, 120 15, 100 25 C 95 35, 92 48, 88 58 Z" fill="#FF85A2" stroke="#4A3E3D" stroke-width="3" stroke-linejoin="round"/>
      <!-- Capuz Rosa -->
      <ellipse cx="75" cy="80" rx="55" ry="46" fill="#FF85A2" stroke="#4A3E3D" stroke-width="3"/>
      <!-- Florzinha no Capuz -->
      <g transform="translate(50, 48)">
        <circle cx="0" cy="0" r="5" fill="#FFD54F"/>
        <circle cx="-6" cy="0" r="4" fill="#FFFFFF"/>
        <circle cx="6" cy="0" r="4" fill="#FFFFFF"/>
        <circle cx="0" cy="-6" r="4" fill="#FFFFFF"/>
        <circle cx="0" cy="6" r="4" fill="#FFFFFF"/>
      </g>
      <!-- Rostinho Branco Revelado -->
      <ellipse cx="75" cy="88" rx="38" ry="30" fill="#FFFFFF"/>
      <!-- Olhos dócis -->
      <ellipse cx="58" cy="86" rx="3.5" ry="5" fill="#3E2723"/>
      <ellipse cx="92" cy="86" rx="3.5" ry="5" fill="#3E2723"/>
      <!-- Narizinho Amarelo Doce -->
      <ellipse cx="75" cy="92" rx="3.5" ry="2.5" fill="#FFCA28"/>
      <!-- Boquinha meiga -->
      <path d="M 72 98 Q 75 101 78 98" stroke="#4A3E3D" stroke-width="2" stroke-linecap="round" fill="none"/>
      <!-- Bochechinhas -->
      <circle cx="48" cy="94" r="5" fill="#FF4081" opacity="0.3"/>
      <circle cx="102" cy="94" r="5" fill="#FF4081" opacity="0.3"/>
    </svg>
  `,

  // Cinnamoroll (Orelhas longas voando, olhos azuis de céu e rabinho em espiral)
  cinnamoroll: `
    <svg viewBox="0 0 160 140" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Orelha esquerda voando suavemente -->
      <path d="M 45 70 C 10 50, -5 85, 30 92 C 40 93, 48 82, 45 70 Z" fill="#FFFFFF" stroke="#5D6D7E" stroke-width="2.5"/>
      <!-- Orelha direita voando suavemente -->
      <path d="M 115 70 C 150 50, 165 85, 130 92 C 120 93, 112 82, 115 70 Z" fill="#FFFFFF" stroke="#5D6D7E" stroke-width="2.5"/>
      <!-- Cabeça Branca de Nuvem -->
      <ellipse cx="80" cy="75" rx="46" ry="34" fill="#FFFFFF" stroke="#5D6D7E" stroke-width="2.5"/>
      <!-- Olhinhos Azuis Brilhantes -->
      <ellipse cx="62" cy="74" rx="4" ry="5.5" fill="#4FC3F7"/>
      <circle cx="63" cy="72" r="1.5" fill="#FFF"/>
      <ellipse cx="98" cy="74" rx="4" ry="5.5" fill="#4FC3F7"/>
      <circle cx="99" cy="72" r="1.5" fill="#FFF"/>
      <!-- Boquinha de 'W' graciosa -->
      <path d="M 75 80 Q 77 83 80 81 Q 83 83 85 80" stroke="#5D6D7E" stroke-width="2" stroke-linecap="round" fill="none"/>
      <!-- Bochechinhas Rosadas Suaves -->
      <circle cx="52" cy="82" r="6" fill="#FFCDD2" opacity="0.7"/>
      <circle cx="108" cy="82" r="6" fill="#FFCDD2" opacity="0.7"/>
    </svg>
  `,

  // Kuromi (Touca com orelhas pontudas, caveirinha rosa e sorriso rebelde/fofo)
  kuromi: `
    <svg viewBox="0 0 150 150" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Orelha esquerda pontuda -->
      <path d="M 38 65 L 18 18 C 35 25, 45 40, 52 60 Z" fill="#37474F" stroke="#263238" stroke-width="2.5"/>
      <circle cx="18" cy="18" r="4.5" fill="#E91E63"/>
      <!-- Orelha direita pontuda -->
      <path d="M 112 65 L 132 18 C 115 25, 105 40, 98 60 Z" fill="#37474F" stroke="#263238" stroke-width="2.5"/>
      <circle cx="132" cy="18" r="4.5" fill="#E91E63"/>
      <!-- Capuz Preto / Cinza Escuro -->
      <ellipse cx="75" cy="78" rx="52" ry="42" fill="#37474F" stroke="#263238" stroke-width="2.5"/>
      <!-- Caveirinha Fofa Rosa na Testa -->
      <g transform="translate(75, 52)">
        <ellipse cx="0" cy="0" rx="7" ry="6" fill="#FF4081"/>
        <circle cx="-3" cy="-1" r="1.5" fill="#FFF"/>
        <circle cx="3" cy="-1" r="1.5" fill="#FFF"/>
        <path d="M -3 3 L -3 5 M 0 3 L 0 5 M 3 3 L 3 5" stroke="#FFF" stroke-width="1"/>
      </g>
      <!-- Rostinho Branco -->
      <ellipse cx="75" cy="86" rx="38" ry="28" fill="#FFFFFF"/>
      <!-- Olhinhos travessos fofos -->
      <ellipse cx="58" cy="84" rx="4" ry="5.5" fill="#263238"/>
      <circle cx="59" cy="82" r="1.5" fill="#FFF"/>
      <!-- Pestaninha de lado -->
      <line x1="52" y1="80" x2="55" y2="82" stroke="#263238" stroke-width="1.8"/>
      <ellipse cx="92" cy="84" rx="4" ry="5.5" fill="#263238"/>
      <circle cx="93" cy="82" r="1.5" fill="#FFF"/>
      <line x1="98" y1="80" x2="95" y2="82" stroke="#263238" stroke-width="1.8"/>
      <!-- Sorrisinho travesso -->
      <path d="M 72 92 Q 76 96 80 91" stroke="#263238" stroke-width="2" stroke-linecap="round" fill="none"/>
      <!-- Narizinho -->
      <ellipse cx="75" cy="88" rx="2" ry="1.5" fill="#263238"/>
      <!-- Bochechinhas -->
      <circle cx="48" cy="91" r="5" fill="#F48FB1" opacity="0.6"/>
      <circle cx="102" cy="91" r="5" fill="#F48FB1" opacity="0.6"/>
    </svg>
  `,

  // Selo Postal Vintage "Amor Express • 18 Anos"
  stampHeart: `
    <svg viewBox="0 0 120 140" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="stampPerforation" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
          <circle cx="5" cy="0" r="2" fill="#FAF6EE"/>
        </pattern>
      </defs>
      <!-- Fundo do Selo com serrilhado estilizado -->
      <rect x="5" y="5" width="110" height="130" rx="6" fill="#FFF8E7" stroke="#D7CCC8" stroke-width="2"/>
      <rect x="12" y="12" width="96" height="116" rx="4" fill="#FFFFFF" stroke="#F48FB1" stroke-width="1.5" stroke-dasharray="3 3"/>
      <!-- Texto do Selo -->
      <text x="60" y="27" font-size="8" font-family="'Quicksand', sans-serif" font-weight="bold" fill="#FF4D6D" text-anchor="middle" letter-spacing="1">AMOR EXPRESS</text>
      <!-- Pompompurin Mini no Centro -->
      <circle cx="60" cy="65" r="28" fill="#FFF9C4"/>
      <path d="M 46 54 C 46 47, 74 47, 74 54 C 74 57, 46 57, 46 54 Z" fill="#5D4037"/>
      <circle cx="60" cy="50" r="2" fill="#5D4037"/>
      <ellipse cx="60" cy="68" rx="20" ry="16" fill="#FFE082"/>
      <circle cx="54" cy="65" r="2" fill="#5D4037"/>
      <circle cx="66" cy="65" r="2" fill="#5D4037"/>
      <ellipse cx="60" cy="68" rx="2" ry="1.5" fill="#5D4037"/>
      <path d="M 58 70 Q 60 72 62 70" stroke="#5D4037" stroke-width="1.2" fill="none"/>
      <!-- Valor e Celebração -->
      <text x="60" y="105" font-size="12" font-family="'Playfair Display', serif" font-weight="bold" fill="#C2185B" text-anchor="middle">18 ANOS</text>
      <text x="60" y="118" font-size="7" font-family="'Quicksand', sans-serif" fill="#8D6E63" text-anchor="middle">30 • SETEMBRO</text>
    </svg>
  `,

  // Washi Tape Rosa / Amarela (Fita adesiva decorativa)
  washiTape: `
    <svg viewBox="0 0 120 30" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M 5 0 L 115 0 L 118 15 L 115 30 L 5 30 L 2 15 Z" fill="#FFE082" opacity="0.85"/>
      <line x1="15" y1="5" x2="25" y2="25" stroke="#FFA000" stroke-width="1.5" stroke-linecap="round" opacity="0.6"/>
      <line x1="35" y1="5" x2="45" y2="25" stroke="#FFA000" stroke-width="1.5" stroke-linecap="round" opacity="0.6"/>
      <line x1="55" y1="5" x2="65" y2="25" stroke="#FFA000" stroke-width="1.5" stroke-linecap="round" opacity="0.6"/>
      <line x1="75" y1="5" x2="85" y2="25" stroke="#FFA000" stroke-width="1.5" stroke-linecap="round" opacity="0.6"/>
      <line x1="95" y1="5" x2="105" y2="25" stroke="#FFA000" stroke-width="1.5" stroke-linecap="round" opacity="0.6"/>
    </svg>
  `
};
