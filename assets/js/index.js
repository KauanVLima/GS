const botaoEmergencia = document.getElementById('emergencia');
const context = new (window.AudioContext || window.webkitAudioContext)();

function playBeep(freq, duration, delay) {
  const oscillator = context.createOscillator();
  const gainNode = context.createGain();

  oscillator.type = 'sawtooth'; // som mais áspero e alarmante
  oscillator.frequency.setValueAtTime(freq, context.currentTime + delay);

  gainNode.gain.setValueAtTime(0, context.currentTime + delay);
  gainNode.gain.linearRampToValueAtTime(1, context.currentTime + delay + 0.01); // volume máximo rápido
  gainNode.gain.linearRampToValueAtTime(0, context.currentTime + delay + duration); // fade out

  oscillator.connect(gainNode);
  gainNode.connect(context.destination);

  oscillator.start(context.currentTime + delay);
  oscillator.stop(context.currentTime + delay + duration);
}

botaoEmergencia.addEventListener('click', function () {
  alert('ALERTA DE EMERGÊNCIA! Você será redirecionado para as rotas de evacuação.');

  // Sequência rápida e variada de apitos para som alarmante
  playBeep(1000, 0.2, 0);
  playBeep(1400, 0.15, 0.25);
  playBeep(900, 0.2, 0.45);
  playBeep(1300, 0.15, 0.7);
  playBeep(1100, 0.25, 0.9);

  setTimeout(() => {
    window.location.href = 'rotas.html';
  }, 1400);
});
