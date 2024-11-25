window.onload = function() {
    let countdownElement = document.getElementById('countdown');
    let deadlineElement = document.getElementById('deadline');
    let deadlineDate = new Date("nov 11, 2024 14:30:00");
    let deadline = deadlineDate.getTime();
  
    function updateCountdown() {
      let agora = new Date().getTime();
      let t = deadline - agora;
      let dias = Math.floor(t / (1000 * 60 * 60 * 24));
      let horas = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      let minutos = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
      let segundos = Math.floor((t % (1000 * 60)) / 1000);
  
      let deadlineDateString = deadlineDate.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric"
      });
  
      countdownElement.innerHTML = dias + " dias " + horas + ":" + minutos + ":" + segundos;
      deadlineElement.innerHTML = deadlineDateString;
    }
  
    setInterval(updateCountdown, 1000);
  }

  window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;
    const scrollLimit = 200;
    const header = document.querySelector('header');
    const imagem = document.getElementById('logo')
  
    if (scrollPosition > scrollLimit) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }

    if (scrollPosition > scrollLimit) {
        imagem.classList.add('img-header-scrolled');
      } else {
        imagem.classList.remove('img-header-scrolled');
      }
  });

  document.addEventListener('scroll', function() {
    const reveals = document.querySelectorAll('.reveal');

    reveals.forEach(reveal => {
        const windowHeight = window.innerHeight;
        const revealTop = reveal.getBoundingClientRect().top;
        const revealPoint = 200; // Quando começa a aparecer

        if (revealTop < windowHeight - revealPoint) {
            reveal.classList.add('visible');
        } else {
            reveal.classList.remove('visible');
        }
    });
});


document.addEventListener('scroll', function() {
  const reveals = document.querySelectorAll('.reveal-text');

  reveals.forEach(reveal => {
      const windowHeight = window.innerHeight;
      const revealTop = reveal.getBoundingClientRect().top;
      const revealPoint = 200; // Quando começa a aparecer

      if (revealTop < windowHeight - revealPoint) {
          reveal.classList.add('visible');
      }
     else {
      reveal.classList.remove('visible');
  }
  });
});

document.addEventListener('scroll', function() {
  const reveals = document.querySelectorAll('.playlist');

  reveals.forEach(reveal => {
      const windowHeight = window.innerHeight;
      const revealTop = reveal.getBoundingClientRect().top;
      const revealPoint = 200; // Quando começa a aparecer

      if (revealTop < windowHeight - revealPoint) {
          reveal.classList.add('visible');
      }
     else {
      reveal.classList.remove('visible');
  }
  });
});


document.addEventListener('scroll', function() {
  const reveals = document.querySelectorAll('.carousel');

  reveals.forEach(reveal => {
      const windowHeight = window.innerHeight;
      const revealTop = reveal.getBoundingClientRect().top;
      const revealPoint = 200; // Quando começa a aparecer

      if (revealTop < windowHeight - revealPoint) {
          reveal.classList.add('visible');
      }
     else {
      reveal.classList.remove('visible');
  }
  });
});

document.addEventListener('scroll', function() {
  const reveals = document.querySelectorAll('.poetry');

  reveals.forEach(reveal => {
      const windowHeight = window.innerHeight;
      const revealTop = reveal.getBoundingClientRect().top;
      const revealPoint = 200; // Quando começa a aparecer

      if (revealTop < windowHeight - revealPoint) {
          reveal.classList.add('visible');
      }
     else {
      reveal.classList.remove('visible');
  }
  });
});



let currentIndex = 0;

function showSlide(index) {
    const slides = document.querySelector('.slides');
    const totalSlides = document.querySelectorAll('.slide').length;

    if (index >= totalSlides) {
        currentIndex = 0;
    } else if (index < 0) {
        currentIndex = totalSlides - 1;
    } else {
        currentIndex = index;
    }

    slides.style.transform = `translateX(-${currentIndex * 100}%)`;
}

function moveSlide(direction) {
    showSlide(currentIndex + direction);
}

// Inicializa o primeiro slide
showSlide(currentIndex);