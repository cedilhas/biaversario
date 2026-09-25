# 🎂 Website de 18 Anos & Declaração de Amor para o Meu Neném 💖🐾

Um website romântico completo e interativo feito com todo o carinho para celebrar o aniversário de **18 anos** em **30 de Setembro às 00:00**, inspirado na delicadeza visual do **qartinha.com.br**, com tema dos personagens da Sanrio com foco especial no **Pompompurin** 🍮 e seus companheiros (Hello Kitty, My Melody, Cinnamoroll e Kuromi).

---

## ✨ Funcionalidades Incluídas

### 🔐 0. Proteção por Senha de Acesso ("meowversario")
- Tela inicial de bloqueio charmosa que protege todo o conteúdo do site.
- **Senha configurada:** `meowversario` (funciona tanto maiúscula quanto minúscula).
- Animação de vibração e aviso fofo se digitar a senha errada.
- Ao acertar, a tela se dissolve suavemente com som delicado e chuva de confetes, revelando a caixa de presentes!
- Opção no rodapé ("🔒 Bloquear com Senha") para rebloquear a qualquer momento.

### 🎁 1. Abertura Interativa "Um Presente Para Você"
- Tela cheia com caixa de presente 3D pastel e laço de cetim.
- Ao clicar, o laço se desfaz, a tampa se abre com som suave de carrilhão, explode uma chuva de confetes e corações dourados, e o site entra suavemente na aba principal.
- Possibilidade de rever a abertura a qualquer momento pelo rodapé.

### 💖 2. Aba Principal: Temporizador de 18 Anos & Carta de Amor
- **Contador Regressivo Dinâmico**: Calculado para **30/09 às 00:00** (mostra Dias, Horas, Minutos e Segundos). Quando a data é atingida, exibe uma faixa comemorativa festiva de maioridade e o tempo que vocês celebram juntos.
- **Carta de Declaração de Amor**: Estilo papel de carta artesanal (`qartinha.com.br`), com fitas adesivas washi tape, selo postal comemorativo dos 18 anos, carimbo de correio e palavras profundas de amor e admiração.
- **Quintal dos Mascotes Sanrio**: Vitrine interativa com **Pompompurin** segurando o bolo de 18 anos, além de Hello Kitty, My Melody, Cinnamoroll e Kuromi (ao clicar neles, reagem com corações e sons!).

### 📸 3. Aba 2: "Mural de Galeria do Meu Neném"
- Título exatamente como solicitado: **Mural de Galeria do Meu Neném**.
- **Salvo Para Sempre**: Utiliza a tecnologia **IndexedDB** do navegador, o que significa que todas as fotos enviadas pelo botão **"+ Adicionar Nova Fotinha"** ficam salvas de forma permanente, mesmo fechando o navegador ou reiniciando o computador.
- Estilo **Polaroids vintage**, com inclinações suaves, fita adesiva fixando a foto, legenda romântica e data.
- **Lightbox**: Clique em qualquer foto para vê-la em tamanho grande com sua legenda especial.
- Opção de excluir fotos quando desejar.

### 🧩 4. Aba 3: Jogo de Palavras ("Termo do Amor")
- Jogo interativo estilo Termo / Wordle com palavras românticas de 5 letras (`PURIN`, `NENEM`, `AMADA`, `LINDA`, `SONHO`, `BEIJO`, `DOCIN`).
- Teclado virtual e suporte ao teclado físico do computador ou celular.
- Dicas do Pompompurin e feedback de cores (verde para letra certa no lugar certo, amarelo para letra presente, cinza para não existente).
- Ao acertar, estoura confetes e revela uma mensagem afetuosa exclusiva!

### 🌳 5. Aba 4: Árvore Mágica de Presentes
- Ilustração interativa de uma árvore florida com caixas de presentes balançando nos galhos.
- **Imagens Manuais**: Ao clicar em qualquer caixinha de presente, ela se expande em uma janela modal com a descrição do vale/presente e a foto associada.
- **Adição e Troca Manual de Imagens**: Há um botão direto para você carregar qualquer foto ou comprovante do presente do seu aparelho, salvando de forma permanente no banco de dados local.
- **Pendurar Novos Presentes**: Você pode criar novas caixinhas de presentes e pendurá-las nos galhos da árvore!

### 💌 6. Aba 5: Conclusão ("O Começo da Vida Adulta & O Começo de Nós")
- Reflexão emocionante sobre o significado de fazer 18 anos: a transição para a vida adulta e a certeza de que, acima de tudo, este é o **começo oficial da vida de vocês como um casal juntos**.
- Declaração de que este é apenas o **primeiro de infinitos aniversários e anos que vocês passarão lado a lado**.
- **Pacto de Amor dos 18 Anos**: Campo interativo para colocar o nome do casal e selar a promessa eterna oficialmente.
- Botão **"Chuva de Amor & Parabéns"** com explosão de confetes e corações na tela toda!

### 🎵 7. Trilha Sonora Romântica
- Player no topo com caixinha de música suave (sintetizador Web Audio API puro, sem risco de falha de carregamento).
- Botão "Colocar nossa música" para carregar qualquer arquivo `.mp3` que seja a música oficial do casal.

---

## 🚀 Como Abrir e Testar no Seu Computador

1. Você pode abrir o arquivo `index.html` diretamente em qualquer navegador (Google Chrome, Microsoft Edge, Safari, Firefox, Opera):
   - Basta dar um **duplo clique no arquivo `index.html`** dentro da pasta:
     `C:\Users\fragm\.gemini\antigravity\scratch\aniversario-18-amor\index.html`
2. Ou, se preferir rodar como servidor local, abra o terminal nesta pasta e execute:
   ```bash
   python -m http.server 8000
   ```
   E acesse no navegador: `http://localhost:8000`

---

## 🌐 Como Publicar na Internet (Para Enviar o Link para Ela/Ele)

Este projeto foi construído em tecnologia padrão (HTML, CSS e JavaScript puros), sem depender de frameworks pesados, o que o torna **100% compatível com qualquer plataforma de hospedagem gratuita**:

- **Vercel / Netlify**: Basta arrastar a pasta `aniversario-18-amor` no dashboard do Netlify Drop ou Vercel e você terá um link instantâneo `https://aniversario-do-meu-nenem.vercel.app` para mandar pelo WhatsApp!
- **GitHub Pages**: Crie um repositório no GitHub, suba os arquivos e ative o GitHub Pages nas configurações.
