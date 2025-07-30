const sobre = document.querySelector(".sobre");
const projects = document.querySelector(".projects");
const shareBtn = document.querySelector("#share");

function share() {
    if (navigator.share) {
        navigator
            .share({
                title: "Thadeu Alves - Desenvolvedor Web",
                text: "Conheça o portfólio de Thadeu Alves, Desenvolvedor Web",
                url: "https://thadeualves.vercel.app/",
            })
            .catch(console.error);
    } else {
        window.open(
            "https://api.whatsapp.com/send?text=Conheça%20o%20portfólio%20de%20Thadeu%20Alves%20-%20https%3A%2F%2Fthadeualves.vercel.app%2F",
            "_blank"
        );
    }
    return false;
}

shareBtn.addEventListener("click", share);

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
            imagem {
            url
            }
        }
      }
    `;

    const response = await fetch(
        "https://graphql.datocms.com/",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer d7b25d0581ed794313da676e1d7fa9`,
            },
            body: JSON.stringify({ query }),
        }
    );

    const { data } = await response.json();
    return data;
}

var data = await fetchData();

sobre.innerText = data.section.sobreMim;

var projetos = [...data.allProjetos];
projetos.map((e) => {
    projects.innerHTML += `
            <div class="proj">
                <a href="${e.link}">
                    <h3>
                        <img src="./assets/link.svg" alt="icone de link">${e.titulo}
                    </h3>

                    <div>
                        <p>${e.descricao}</p>
                    </div>
                        
                    <img src=${e.imagem.url} class="proj-img" alt="imagem do site do/da ${e.titulo}">
                </a>
            </div>
    `;
});

console.log(data);
