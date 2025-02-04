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
  
    const response = await fetch(process.env.API_URL || CONFIG.API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.API_KEY ||CONFIG.API_KEY}`
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
                                <h1>view demo</h1>
                            </div></a>
                        </div>
            </div>
    `;
})

console.log(data);
