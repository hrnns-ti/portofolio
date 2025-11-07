const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.querySelector('.theme-icon');
const html = document.documentElement;

let currentTheme = 'dark'; 

function setTheme(theme) {
  currentTheme = theme;
  html.setAttribute('data-color-scheme', theme);
  themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
}

setTheme('dark');

themeToggle.addEventListener('click', () => {
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  setTheme(newTheme);
});


const navLinks = document.querySelectorAll('.nav-links a, .hero-buttons a');

navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    
    
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.substring(1);
      const targetSection = document.getElementById(targetId);
      
      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80; 
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    }
  });
});


const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 100) {
    navbar.style.boxShadow = 'var(--shadow-md)';
  } else {
    navbar.style.boxShadow = 'none';
  }
  
  lastScroll = currentScroll;
});


const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const formData = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    message: document.getElementById('message').value
  };
  
  
  console.log('Form submitted with data:', formData);
  
  
  const successMessage = document.createElement('div');
  successMessage.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: var(--color-success);
    color: var(--color-btn-primary-text);
    padding: 16px 24px;
    border-radius: 8px;
    box-shadow: var(--shadow-lg);
    z-index: 9999;
    animation: slideIn 0.3s ease-out;
    font-weight: 500;
  `;
  successMessage.textContent = '✓ Message sent successfully!';
  
  document.body.appendChild(successMessage);
  
  
  setTimeout(() => {
    successMessage.style.animation = 'slideOut 0.3s ease-out';
    setTimeout(() => {
      document.body.removeChild(successMessage);
    }, 300);
  }, 3000);
  
  
  contactForm.reset();
});


const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      
      
      if (entry.target.classList.contains('skill-category')) {
        animateSkillBars(entry.target);
      }
    }
  });
}, observerOptions);


const animateElements = document.querySelectorAll(
  '.project-card, .skill-category, .timeline-item, .stat-card, .highlight-item, .gallery-item'
);


animateElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
  observer.observe(el);
});


function animateSkillBars(skillCategory) {
  const skillItems = skillCategory.querySelectorAll('.skill-item');
  const skillProgressBars = skillCategory.querySelectorAll('.skill-progress');
  
  skillItems.forEach((item, index) => {
    setTimeout(() => {
      item.classList.add('animated');
    }, index * 100);
  });
  
  skillProgressBars.forEach((bar, index) => {
    const targetWidth = bar.getAttribute('data-progress');
    setTimeout(() => {
      bar.style.width = targetWidth + '%';
    }, index * 100 + 200);
  });
}


const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);


const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
  const text = heroTitle.textContent;
  heroTitle.textContent = '';
  let i = 0;
  
  function typeWriter() {
    if (i < text.length) {
      heroTitle.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, 50);
    }
  }
  
  
  setTimeout(typeWriter, 500);
}




const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    
    const filter = button.getAttribute('data-filter');
    
    
    projectCards.forEach(card => {
      const category = card.getAttribute('data-category');
      
      if (filter === 'all' || category === filter) {
        card.style.display = 'block';
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, 10);
      } else {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
          card.style.display = 'none';
        }, 300);
      }
    });
  });
});


window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const heroBackground = document.querySelector('.hero-background');
  const floatingShapes = document.querySelector('.floating-shapes');
  
  if (heroBackground && scrolled < window.innerHeight) {
    heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
  
  if (floatingShapes && scrolled < window.innerHeight) {
    floatingShapes.style.transform = `translateY(${scrolled * 0.3}px)`;
  }
});


function animateValue(element, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const value = Math.floor(progress * (end - start) + start);
    element.textContent = value + (end > 10 ? '+' : '%');
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}


const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
      entry.target.classList.add('animated');
      // const h3 = entry.target.querySelector('h3');
      const text = h3.textContent;
      const value = parseInt(text);
      if (!isNaN(value)) {
        animateValue(h3, 0, value, 2000);
      }
    }
  });
}, { threshold: 0.5 });

const statCards = document.querySelectorAll('.stat-card');
statCards.forEach(card => statObserver.observe(card));


const galleryItems = document.querySelectorAll('.gallery-item');
galleryItems.forEach(item => {
  item.addEventListener('click', () => {
    
    item.style.transform = 'scale(0.95)';
    setTimeout(() => {
      item.style.transform = 'scale(1.05)';
    }, 100);
  });
});


let cursorTrail = [];
const maxTrailLength = 10;

document.addEventListener('mousemove', (e) => {
  
  if (window.innerWidth > 768) {
    cursorTrail.push({ x: e.clientX, y: e.clientY, time: Date.now() });
    
    
    if (cursorTrail.length > maxTrailLength) {
      cursorTrail.shift();
    }
  }
});


const buttons = document.querySelectorAll('.btn, .filter-btn');
buttons.forEach(button => {
  button.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.5);
      left: ${x}px;
      top: ${y}px;
      transform: scale(0);
      animation: ripple 0.6s ease-out;
      pointer-events: none;
    `;
    
    this.style.position = 'relative';
    this.style.overflow = 'hidden';
    this.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});


const rippleStyle = document.createElement('style');
rippleStyle.textContent += `
  @keyframes ripple {
    to {
      transform: scale(2);
      opacity: 0;
    }
  }
`;
document.head.appendChild(rippleStyle);


const galleryActivityCards = document.querySelectorAll('.gallery-activity-card');
let expandedCard = null;


const backdrop = document.createElement('div');
backdrop.className = 'gallery-backdrop';
document.body.appendChild(backdrop);


galleryActivityCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    
    card.style.transition = 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
  });
  
  card.addEventListener('mousemove', (e) => {
    if (window.innerWidth > 768 && !card.classList.contains('expanded')) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      
      card.style.transform = `translateY(-8px) scale(1.02) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }
  });
  
  card.addEventListener('mouseleave', () => {
    if (!card.classList.contains('expanded')) {
      card.style.transform = 'translateY(0) scale(1) perspective(1000px) rotateX(0) rotateY(0)';
    }
  });
  
  
  card.addEventListener('click', (e) => {
    if (!card.classList.contains('expanded')) {
      
      if (expandedCard) {
        closeExpandedCard();
      }
      
      
      expandedCard = card;
      card.classList.add('expanded');
      backdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
      
      
      e.stopPropagation();
    }
  });
});


function closeExpandedCard() {
  if (expandedCard) {
    expandedCard.classList.remove('expanded');
    expandedCard.style.transform = '';
    backdrop.classList.remove('active');
    document.body.style.overflow = '';
    expandedCard = null;
  }
}


backdrop.addEventListener('click', closeExpandedCard);


document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && expandedCard) {
    closeExpandedCard();
  }
});


function addExtraShapes() {
  const floatingShapes = document.querySelector('.floating-shapes');
  if (!floatingShapes) return;
  
  
  for (let i = 7; i <= 9; i++) {
    const shape = document.createElement('div');
    shape.classList.add('shape', `shape-${i}`);
    floatingShapes.appendChild(shape);
  }
}


addExtraShapes();


const galleryActivityObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const cards = entry.target.querySelectorAll('.gallery-activity-card');
      cards.forEach((card, index) => {
        setTimeout(() => {
          card.style.animation = `galleryFadeIn 0.6s ease-out forwards`;
          card.style.animationDelay = `${index * 0.1}s`;
        }, 50);
      });
    }
  });
}, { threshold: 0.1 });

const activitiesSection = document.querySelector('.activities');
if (activitiesSection) {
  galleryActivityObserver.observe(activitiesSection);
}


let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      const scrolled = window.pageYOffset;
      const shapes = document.querySelectorAll('.shape');
      
      shapes.forEach((shape, index) => {
        const speed = 0.1 + (index * 0.05);
        const yPos = -(scrolled * speed);
        shape.style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.05}deg)`;
      });
      
      ticking = false;
    });
    ticking = true;
  }
});


console.log('%c Welcome to My Portfolio! ', 'background: #21808d; color: white; padding: 10px 20px; font-size: 16px; font-weight: bold;');
console.log('Feel free to explore and reach out if you have any questions!');
console.log('%c 3D Effects Active ✨', 'background: #B537F2; color: white; padding: 5px 10px; border-radius: 3px;');
console.log('%c Photo Gallery Activities Section! 📸', 'background: #FF006E; color: white; padding: 5px 10px; border-radius: 3px;');
console.log('%c Click any activity to expand! ', 'background: #00D9FF; color: white; padding: 5px 10px; border-radius: 3px;');