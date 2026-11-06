const academyConfig = {
  programs: [
    { icon: '01', title: 'Basketball & talent', text: 'Structured basketball training that identifies talent and builds skilled, confident young athletes.' },
    { icon: '02', title: 'Education support', text: 'Academic support, scholarships and tutoring that help young people stay connected to education.' },
    { icon: '03', title: 'Christian values', text: 'Spiritual mentorship that nurtures love, responsibility, discipline and purpose.' },
    { icon: '04', title: 'Leadership', text: 'Teamwork and leadership development that prepare young people to contribute positively.' },
    { icon: '05', title: 'Social inclusion', text: 'Community outreach that includes children with disabilities and from marginalized backgrounds.' }
  ],
  stats: [
    { value: '100+', label: 'Young athletes trained and mentored' },
    { value: '2018', label: 'Academy founded' },
    { value: '01', label: 'Education Through Hoops program' },
    { value: '∞', label: 'Purpose through sport' }
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

$('#join-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const status = form.querySelector('.form-status');
  const button = form.querySelector('button[type="submit"]');
  const age = Number(form.age.value);
  if (!form.checkValidity()) { status.textContent = 'Please complete the required fields before sending your enquiry.'; status.style.color = '#b33d1d'; form.reportValidity(); return; }
  if (age < 18 && !form.guardian.value.trim()) { status.textContent = 'Please provide a parent or guardian contact for applicants under 18.'; status.style.color = '#b33d1d'; form.guardian.focus(); return; }
  button.disabled = true;
  button.querySelector('span').textContent = '…';
  status.textContent = 'Sending your enquiry…';
  status.style.color = '';
  try {
    const response = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
    if (!response.ok) throw new Error('Form submission failed');
    status.textContent = 'Thank you. Your enquiry has been sent to the academy team.';
    status.style.color = '#2c6e49';
    form.reset();
  } catch (error) {
    status.textContent = 'We could not send your enquiry. Please try again or contact the academy directly.';
    status.style.color = '#b33d1d';
  } finally {
    button.disabled = false;
    button.querySelector('span').textContent = '↗';
  }
});

render();
