const musicas = [
  { nome: "2Pac - Run Tha Streetz", arquivo: "/musica1.mp3" },
  { nome: "Cartola - Preciso me encontrar", arquivo: "/musica2.mp3" },
  { nome: "Racionais - Capitulo 2 Versiculo 3", arquivo: "/musica3.mp3" }
];

let index = 0;
let iniciouInteracao = false;

const audio = document.getElementById("audio");
const titulo = document.getElementById("titulo-musica");
const playPauseBtn = document.getElementById("playPause");

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const source = audioCtx.createMediaElementSource(audio);
const analyser = audioCtx.createAnalyser();
analyser.fftSize = 128;

source.connect(analyser);
analyser.connect(audioCtx.destination);

function carregarMusica(i, autoPlay = true) {
  audio.src = musicas[i].arquivo;
  titulo.textContent = musicas[i].nome;

  if (autoPlay && iniciouInteracao) {
    audio.play().then(() => {
      playPauseBtn.textContent = "❚❚";
    }).catch(err => {
      console.warn("Erro ao tocar música:", err);
      playPauseBtn.textContent = "▶";
    });
  } else {
    playPauseBtn.textContent = "▶";
  }
}

document.getElementById("proximo").addEventListener("click", async () => {
  await iniciarAudioContext();
  index = (index + 1) % musicas.length;
  carregarMusica(index);
});

document.getElementById("anterior").addEventListener("click", async () => {
  await iniciarAudioContext();
  index = (index - 1 + musicas.length) % musicas.length;
  carregarMusica(index);
});

playPauseBtn.addEventListener("click", async () => {
  await iniciarAudioContext();

  if (audio.paused) {
    audio.play().then(() => {
      playPauseBtn.textContent = "❚❚";
    }).catch(err => {
      console.error("Erro ao tentar tocar:", err);
    });
  } else {
    audio.pause();
    playPauseBtn.textContent = "▶";
  }
});

// Retoma o AudioContext e marca que houve interação
async function iniciarAudioContext() {
  if (!iniciouInteracao) {
    iniciouInteracao = true;
  }
  if (audioCtx.state === "suspended") {
    await audioCtx.resume();
  }
}

// Espectrograma
const canvas = document.getElementById("espectrograma");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = canvas.clientWidth * window.devicePixelRatio;
  canvas.height = canvas.clientHeight * window.devicePixelRatio;
  ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);

function desenharEspectrograma() {
  requestAnimationFrame(desenharEspectrograma);

  analyser.getByteFrequencyData(dataArray);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const larguraBarra = 4;
  const espaco = 3;
  let x = 0;

  for (let i = 0; i < bufferLength; i++) {
    const altura = (dataArray[i] / 255) * canvas.height * 0.8;
    const y = canvas.height / window.devicePixelRatio - altura;

    ctx.fillStyle = "#7e340f";
    ctx.beginPath();
    ctx.roundRect(x, y, larguraBarra, altura, 3);
    ctx.fill();

    x += larguraBarra + espaco;
  }
}

if (!CanvasRenderingContext2D.prototype.roundRect) {
  CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
    if (w < 2 * r) r = w / 2;
    if (h < 2 * r) r = h / 2;
    this.beginPath();
    this.moveTo(x + r, y);
    this.arcTo(x + w, y, x + w, y + h, r);
    this.arcTo(x + w, y + h, x, y + h, r);
    this.arcTo(x, y + h, x, y, r);
    this.arcTo(x, y, x + w, y, r);
    this.closePath();
    return this;
  }
}

carregarMusica(index, false); // Não auto-play no início
desenharEspectrograma();
