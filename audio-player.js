/**
 * Audio Player Romântico & Melodia Web Audio API
 * Toca uma caixinha de música suave estilo lofi romântico com sintetizador Web Audio,
 * e também permite ao casal carregar a sua música especial (.mp3) se quiserem!
 */

class RomanticAudioPlayer {
  constructor() {
    this.isPlaying = false;
    this.audioCtx = null;
    this.synthInterval = null;
    this.currentStep = 0;
    this.volume = 0.35;
    this.customAudio = null;

    // Notas da melodia romântica suave (estilo caixinha de música mágica)
    // Escala pentatônica/maior afetuosa em Dó/Sol (Hz)
    this.melody = [
      { note: 523.25, dur: 0.6 }, // C5
      { note: 659.25, dur: 0.6 }, // E5
      { note: 783.99, dur: 0.8 }, // G5
      { note: 987.77, dur: 0.8 }, // B5
      { note: 880.00, dur: 0.6 }, // A5
      { note: 783.99, dur: 0.6 }, // G5
      { note: 659.25, dur: 1.0 }, // E5
      { note: 587.33, dur: 0.6 }, // D5
      { note: 659.25, dur: 0.6 }, // E5
      { note: 783.99, dur: 1.2 }, // G5
      { note: 659.25, dur: 0.6 }, // E5
      { note: 523.25, dur: 1.4 }, // C5
      { note: 440.00, dur: 0.8 }, // A4
      { note: 523.25, dur: 0.8 }, // C5
      { note: 587.33, dur: 1.4 }  // D5
    ];
  }

  init() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext && !this.audioCtx) {
      this.audioCtx = new AudioContext();
    }
  }

  playNote(frequency, duration) {
    if (!this.audioCtx || this.audioCtx.state === 'suspended') {
      this.audioCtx?.resume();
    }
    if (!this.audioCtx) return;

    try {
      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      // Som doce de celesta / caixinha de música: onda sinusoidal com harmônico suave
      osc.type = 'sine';
      osc.frequency.setValueAtTime(frequency, now);

      // Segundo oscilador para timbre aveludado e brilho suave
      const osc2 = this.audioCtx.createOscillator();
      const gain2 = this.audioCtx.createGain();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(frequency * 2, now); // oitava acima mais sutil

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(this.volume * 0.4, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      gain2.gain.setValueAtTime(0.001, now);
      gain2.gain.exponentialRampToValueAtTime(this.volume * 0.1, now + 0.03);
      gain2.gain.exponentialRampToValueAtTime(0.0001, now + duration * 0.7);

      osc.connect(gain);
      osc2.connect(gain2);
      gain.connect(this.audioCtx.destination);
      gain2.connect(this.audioCtx.destination);

      osc.start(now);
      osc2.start(now);
      osc.stop(now + duration);
      osc2.stop(now + duration);
    } catch (e) {
      console.warn("Audio playback error:", e);
    }
  }

  startMusic() {
    this.init();
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }

    if (this.customAudio) {
      this.customAudio.volume = this.volume;
      this.customAudio.play();
      this.isPlaying = true;
      this.updateUI();
      return;
    }

    this.isPlaying = true;
    this.updateUI();

    const tick = () => {
      if (!this.isPlaying) return;
      const current = this.melody[this.currentStep];
      this.playNote(current.note, current.dur);
      this.currentStep = (this.currentStep + 1) % this.melody.length;
      
      const nextDelay = current.dur * 900 + 150;
      this.synthInterval = setTimeout(tick, nextDelay);
    };

    tick();
  }

  stopMusic() {
    this.isPlaying = false;
    if (this.synthInterval) {
      clearTimeout(this.synthInterval);
      this.synthInterval = null;
    }
    if (this.customAudio) {
      this.customAudio.pause();
    }
    this.updateUI();
  }

  toggle() {
    if (this.isPlaying) {
      this.stopMusic();
    } else {
      this.startMusic();
    }
  }

  loadCustomFile(file) {
    if (!file) return;
    const url = URL.createObjectURL(file);
    if (this.customAudio) {
      this.customAudio.pause();
    }
    this.customAudio = new Audio(url);
    this.customAudio.loop = true;
    this.customAudio.volume = this.volume;
    if (this.isPlaying) {
      if (this.synthInterval) clearTimeout(this.synthInterval);
      this.customAudio.play();
    }
  }

  setVolume(val) {
    this.volume = parseFloat(val);
    if (this.customAudio) {
      this.customAudio.volume = this.volume;
    }
  }

  updateUI() {
    const playBtn = document.getElementById('music-toggle-btn');
    const disk = document.getElementById('music-disk');
    const statusText = document.getElementById('music-status-text');
    if (!playBtn) return;

    if (this.isPlaying) {
      playBtn.innerHTML = '⏸️';
      playBtn.setAttribute('title', 'Pausar Melodia Romântica');
      disk?.classList.add('playing');
      if (statusText) statusText.textContent = 'Tocando Melodia Romântica ✨';
    } else {
      playBtn.innerHTML = '🎵';
      playBtn.setAttribute('title', 'Tocar Melodia Romântica');
      disk?.classList.remove('playing');
      if (statusText) statusText.textContent = 'Música Pausada 💤';
    }
  }
}

window.romanticAudio = new RomanticAudioPlayer();
