// FIN ARS – Main JS

document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 40);
    });
  }

  const menuToggle = document.getElementById('menuToggle');
  const nav = document.getElementById('nav');
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      nav.classList.toggle('open');
      document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
    });
    nav.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        nav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('[data-category]');
  if (filterBtns.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        projectCards.forEach(card => {
          if (filter === 'all' || card.dataset.category === filter) {
            card.style.display = '';
            card.style.animation = 'fadeIn 0.5s ease';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // Lightbox – Zoom In for all galleries including detail pages
  const galleryItems = document.querySelectorAll(
    '.gallery-item img, .project-img-wrap img, .detail-gallery .item img, .gallery-card .img-wrap img'
  );
  let lightbox = document.querySelector('.lightbox');
  if (!lightbox) {
    lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = '<img src="" alt="Povečana slika">';
    document.body.appendChild(lightbox);
  }

  galleryItems.forEach(img => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
      const lbImg = lightbox.querySelector('img');
      lbImg.src = img.src
        .replace('w=800', 'w=1600')
        .replace('w=700', 'w=1600')
        .replace('w=1200', 'w=1920')
        .replace('w=900', 'w=1600');
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  lightbox.addEventListener('click', () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  });

  const reveals = document.querySelectorAll('.project-card, .service-item, .team-card, .news-card, .gallery-card');
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  reveals.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    revealObs.observe(el);
  });
});

const style = document.createElement('style');
style.textContent = `@keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }`;
document.head.appendChild(style);
