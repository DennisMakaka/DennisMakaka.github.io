const academyConfig = {
  programs: [
    { icon: '01', title: 'Training & talent', text: 'Structured basketball sessions that help young players build skills, confidence and a love for the game.' },
    { icon: '02', title: 'Mentorship', text: 'Supportive guidance that connects sport with personal development, education and purpose.' },
    { icon: '03', title: 'Leadership', text: 'Practical opportunities to build discipline, responsibility and the courage to lead.' },
    { icon: '04', title: 'Competition', text: 'Friendly matches and competitive experiences that turn preparation into learning.' },
    { icon: '05', title: 'Community', text: 'Outreach and connection that use basketball as a bridge to positive change.' }
  ],
  stats: [
    { value: '—', label: 'Verified milestone data coming soon' },
    { value: '—', label: 'Verified athlete stories coming soon' },
    { value: '—', label: 'Verified partnerships coming soon' },
    { value: '—', label: 'Verified community updates coming soon' }
  ],
  gallery: [
    { title: 'Training sessions', image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1000&q=80' },
    { title: 'Matches', image: 'https://images.unsplash.com/photo-1518065896235-a4c93e088e7d?auto=format&fit=crop&w=1000&q=80' },
    { title: 'Tournaments', image: null },
    { title: 'Mentorship', image: null },
    { title: 'Community activities', image: null },
    { title: 'Your next story', image: null }
  ]
};

const $ = (selector) => document.querySelector(selector);
const render = () => {
  $('#program-grid').innerHTML = academyConfig.programs.map((program) => `<article class="program-card"><span class="icon">${program.icon}</span><h3>${program.title}</h3><p>${program.text}</p></article>`).join('');
  $('#stats-grid').innerHTML = academyConfig.stats.map((stat) => `<div class="stat"><strong>${stat.value}</strong><span>${stat.label}</span></div>`).join('');
  $('#gallery-grid').innerHTML = academyConfig.gallery.map((item) => `<figure class="gallery-item">${item.image ? `<img loading="lazy" src="${item.image}" alt="${item.title}" />` : `<div class="placeholder"><span>Photo placeholder<br /><small>${item.title}</small></span></div>`}<figcaption>${item.title}</figcaption></figure>`).join('');
  $('#year').textContent = new Date().getFullYear();
};

const menuToggle = $('.menu-toggle');
const nav = $('#primary-nav');
menuToggle.addEventListener('click', () => { const open = nav.classList.toggle('open'); menuToggle.setAttribute('aria-expanded', String(open)); });
nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => { nav.classList.remove('open'); menuToggle.setAttribute('aria-expanded', 'false'); }));

$('#join-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const status = form.querySelector('.form-status');
  const age = Number(form.age.value);
  if (!form.checkValidity()) { status.textContent = 'Please complete the required fields before sending your enquiry.'; status.style.color = '#b33d1d'; form.reportValidity(); return; }
  if (age < 18 && !form.guardian.value.trim()) { status.textContent = 'Please provide a parent or guardian contact for applicants under 18.'; status.style.color = '#b33d1d'; form.guardian.focus(); return; }
  status.textContent = 'Thank you. Your enquiry has been prepared securely for the academy team. Connect this form to your preferred email or backend endpoint before launch.';
  status.style.color = '#2c6e49';
  form.reset();
});

render();
