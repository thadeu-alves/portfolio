/* ══════════════════════
   TYPEWRITER
══════════════════════ */
const phrases = [
    'Desenvolvedor Web',
    'React Developer',
    'Frontend Engineer',
    'TypeScript Enthusiast',
    'Node.js Developer',
];
let phraseIndex = 0, charIndex = 0, deleting = false;
const twEl = document.getElementById('tw-text');

function typewriterTick() {
    const phrase = phrases[phraseIndex];
    if (!deleting) {
        twEl.textContent = phrase.slice(0, ++charIndex);
        if (charIndex === phrase.length) {
            deleting = true;
            setTimeout(typewriterTick, 1600);
            return;
        }
    } else {
        twEl.textContent = phrase.slice(0, --charIndex);
        if (charIndex === 0) {
            deleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
        }
    }
    setTimeout(typewriterTick, deleting ? 50 : 90);
}
typewriterTick();


/* ══════════════════════
   NAVBAR — scroll + active
══════════════════════ */
const navbar  = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-links a[data-section]');
const sections = document.querySelectorAll('section[id], footer[id]');
const menuBtn = document.getElementById('nav-menu-btn');
const navLinksList = document.querySelector('.nav-links');

// scrolled state
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// active link via IntersectionObserver
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.id;
            navLinks.forEach(a => {
                a.classList.toggle('active', a.dataset.section === id);
            });
        }
    });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => sectionObserver.observe(s));

// mobile hamburger
menuBtn.addEventListener('click', () => {
    navLinksList.classList.toggle('open');
});

// close on link click
navLinks.forEach(a => {
    a.addEventListener('click', () => navLinksList.classList.remove('open'));
});


/* ══════════════════════
   TECH MARQUEE
══════════════════════ */
const techs = [
    { name: 'JavaScript', img: 'assets/tech/js.svg'       },
    { name: 'TypeScript', img: 'assets/tech/ts.svg'       },
    { name: 'React.js',   img: 'assets/tech/react.svg'    },
    { name: 'Next.js',    img: 'assets/tech/next.svg'     },
    { name: 'Node.js',    img: 'assets/tech/node.svg'     },
    { name: 'Tailwind',   img: 'assets/tech/tailwind.svg' },
    { name: 'HTML5',      img: 'assets/tech/html.svg'     },
    { name: 'CSS3',       img: 'assets/tech/css.svg'      },
];

function makeMarqueeCard(tech) {
    const div = document.createElement('div');
    div.className = 'marquee-card';
    const img = document.createElement('img');
    img.src = tech.img;
    img.alt = tech.name;
    const span = document.createElement('span');
    span.textContent = tech.name;
    div.appendChild(img);
    div.appendChild(span);
    return div;
}

const track = document.getElementById('marquee-track');
// duplicate for seamless loop
[...techs, ...techs].forEach(t => track.appendChild(makeMarqueeCard(t)));


/* ══════════════════════
   CMS DATA (DatoCMS)
══════════════════════ */
const sobre    = document.querySelector('.sobre');
const projects = document.querySelector('.projects');

async function fetchData() {
    const query = `
      {
        section {
            sobreMim
            sobreMim2
        }
        allProjetos {
            link
            titulo
            id
            descricao
            imagem { url }
        }
      }
    `;

    const response = await fetch('https://graphql.datocms.com/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer d7b25d0581ed794313da676e1d7fa9`,
        },
        body: JSON.stringify({ query }),
    });

    const { data } = await response.json();
    return data;
}

const data = await fetchData();

/* About */
sobre.innerHTML += `<p>${data.section.sobreMim}</p><p>${data.section.sobreMim2}</p>`;

/* Projects */
const projetos = [...data.allProjetos];

projetos.forEach((e) => {
    const tagsHTML = '';

    projects.innerHTML += `
        <div class="proj">
            <div class="proj-header">
                <h3>${e.titulo}</h3>
                <a class="proj-link-badge" href="${e.link}" target="_blank" rel="noopener" title="Abrir projeto"><img src="assets/link.svg" alt="" /></a>
            </div>
            ${tagsHTML}
            <a href="${e.link}" target="_blank" rel="noopener">
                <div class="card">
                    <img src="${e.imagem.url}" class="proj-img" alt="imagem do site do/da ${e.titulo}" />
                    <div class="text">
                        <p>${e.descricao}</p>
                    </div>
                </div>
            </a>
        </div>
    `;
});


/* ══════════════════════
   SCROLL REVEAL — projects
══════════════════════ */
function setupReveal() {
    const cards = document.querySelectorAll('.projects .proj');
    if (!cards.length) return;

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    cards.forEach((card, i) => {
        // stagger each card slightly
        card.style.transitionDelay = `${i * 80}ms`;
        revealObserver.observe(card);
    });
}

setupReveal();
