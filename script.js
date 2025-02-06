const sobre = document.querySelector(".sobre");
const projects = document.querySelector(".projects");


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
  
    const response = await fetch("https://graphql.datocms.com/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer d7b25d0581ed794313da676e1d7fa9`
      },
      body: JSON.stringify({ query })
    });
  
    const { data } = await response.json();
    return data;
}

var data = await fetchData();

sobre.innerHTML = `<p>${data.section.sobreMim}</p><p>${data.section.sobreMim2}</p>`;

var projetos = [...data.allProjetos]
projetos.map(e => {
    projects.innerHTML += `
            <div class="proj">
                        <a href="${e.link}"><h3>${e.titulo}<img src="./assets/link.svg" ></h3>

                        <div class="card">
                            <img src=${e.imagem.url}>
                            <div class="text">
                                <p>${e.descricao}</p>
                                <h1>acessar</h1>
                            </div></a>
                        </div>
            </div>
    `;
})

console.log(data);