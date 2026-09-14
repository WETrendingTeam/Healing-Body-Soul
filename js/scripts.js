/* Healing Body & Soul — shared interactions */
const menuBtn=document.getElementById('menuBtn');
const closeMenu=document.getElementById('closeMenu');
const navOverlay=document.getElementById('navOverlay');
const closeNav=()=>{if(navOverlay){navOverlay.classList.remove('active');document.body.classList.remove('menu-open');}};
if(menuBtn) menuBtn.addEventListener('click',()=>{navOverlay.classList.add('active');document.body.classList.add('menu-open');});
if(closeMenu) closeMenu.addEventListener('click',closeNav);
if(navOverlay) navOverlay.addEventListener('click',e=>{if(e.target===navOverlay)closeNav();});
document.querySelectorAll('.nav-menu a').forEach(a=>a.addEventListener('click',closeNav));

const revealItems=document.querySelectorAll('.reveal');
if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}})},{threshold:.12});revealItems.forEach(el=>observer.observe(el));}else revealItems.forEach(el=>el.classList.add('visible'));

const appointmentForm=document.getElementById('appointmentForm');
if(appointmentForm){appointmentForm.addEventListener('submit',e=>{e.preventDefault();const msg=document.getElementById('formMessage');if(msg){msg.classList.add('show');msg.textContent='Your appointment request has been prepared. Please contact the wellness centre directly to confirm your selected date and time.';}appointmentForm.reset();});}
