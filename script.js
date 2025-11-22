let cardContainer = document.querySelector('.card-container');
let campoBusca = document.querySelector('header input');
let dados = [];

async function pesquisar() {
    if (dados.length === 0) {
        try {
            let resposta = await fetch('data.json')
            dados = await resposta.json();
        } catch (error) {
            console.error('Erro ao carregar os dados:', error);
            return;
        }
    }

    let termoBusca = campoBusca.value.toLowerCase();
    const dadosFiltrados = dados.filter(dado =>
        dado.nome.toLowerCase().includes(termoBusca) ||
        dado.ano.toString().includes(termoBusca) ||
        dado.criador.toLowerCase().includes(termoBusca) ||
        dado.descricao.toLowerCase().includes(termoBusca)
    );
    renderizarCards(dadosFiltrados);
}

function renderizarCards(dados) {
    cardContainer.innerHTML = '';
    for (let dado of dados){
        let article = document.createElement('article');
        article.classList.add('card');
        article.innerHTML = `
            <h1>${dado.nome}</h1>
            <p>${dado.ano}</p>
            <p>${dado.criador}</p>
            <p>${dado.descricao}</p>
            <a href="${dado.link}" target="_blank">Documentação</a>
        `;
        cardContainer.appendChild(article);
    }
}