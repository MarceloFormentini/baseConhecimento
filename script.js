let dadosClassificacao = [];
let temporadaAtual = 2024;
let titulosTimes = {};

// Carrega os dados na inicialização do DOM
document.addEventListener('DOMContentLoaded', async function () {
    try {
        mostrarCarregando();
        
        // Carrega dados em paralelo
        await Promise.all([
            carregarClassificacao(2024),
            carregarTitulos()
        ]);
        
    } catch (error) {
        // Mesmo com erro, tenta carregar os títulos de fallback
        await carregarTitulos();
    }
});

// Função para carregar dados da classificação
async function carregarClassificacao(temporada = temporadaAtual) {
    try {
        const resposta = await fetch(`classificacao-${temporada}.json`);

        if (!resposta.ok) {
            throw new Error(`Erro HTTP: ${resposta.status}`);
        }

        dadosClassificacao = await resposta.json();

        if (dadosClassificacao && dadosClassificacao.classificacao) {
            temporadaAtual = temporada;
            atualizarTitulo();
            mostrarClassificacao(); // Mostra a classificação por padrão
        } else {
            throw new Error('Estrutura de dados inválida no arquivo JSON');
        }
    } catch (error) {
        mostrarErroCarregamento(error.message);
    }
}

// Função para mostrar erro de carregamento
function mostrarErroCarregamento(mensagem) {
    const tabelaElement = document.getElementById('tabela-classificacao');
    if (tabelaElement) {
        tabelaElement.innerHTML = `
            <div class="erro-carregamento">
                <h3>Erro ao Carregar Dados</h3>
                <p>Não foi possível carregar a classificação do Brasileirão.</p>
                <p><strong>Erro:</strong> ${mensagem}</p>
                <button onclick="carregarClassificacao()">Tentar Novamente</button>
            </div>
        `;
    }
}

// Função para mostrar indicador de carregamento
function mostrarCarregando() {
    const tabelaElement = document.getElementById('tabela-classificacao');
    if (tabelaElement) {
        tabelaElement.innerHTML = `
            <div class="loading-container">
                <div class="loading-spinner"></div>
                <p class="loading-text">Carregando classificação...</p>
            </div>
        `;
    }
}

// Função para mostrar a classificação
function mostrarClassificacao() {
    // Oculta a seção de times
    document.getElementById('times-section').classList.add('hidden');
    document.getElementById('times-section').classList.remove('visible');
    // Mostra a seção de classificação
    document.getElementById('classificacao-section').classList.remove('hidden');
    document.getElementById('classificacao-section').classList.add('visible');

    // Atualiza os botões
    document.querySelector('.btn-primary').classList.add('active');
    document.querySelector('.btn-secondary').classList.remove('active');

    // Renderiza a tabela
    renderizarTabelaClassificacao();
}

// Função para mostrar os times
function mostrarTimes() {
    // Oculta a seção de classificação
    document.getElementById('classificacao-section').classList.add('hidden');
    document.getElementById('classificacao-section').classList.remove('visible');
    // Mostra a seção de times
    document.getElementById('times-section').classList.remove('hidden');
    document.getElementById('times-section').classList.add('visible');

    // Atualiza os botões
    document.querySelector('.btn-primary').classList.remove('active');
    document.querySelector('.btn-secondary').classList.add('active');

    // Renderiza os cards dos times
    renderizarCardsTime();
}

// Função para renderizar a tabela de classificação
function renderizarTabelaClassificacao() {
    const container = document.getElementById('tabela-classificacao');

    if (!dadosClassificacao || !dadosClassificacao.classificacao || dadosClassificacao.classificacao.length === 0) {
        container.innerHTML = '<p>Dados não encontrados.</p>';
        return;
    }

    let html = `
        <div class="tabela-wrapper">
            <table class="tabela-brasileirao">
                <thead>
                    <tr>
                        <th>Pos</th>
                        <th>Time</th>
                        <th>Pts</th>
                        <th>J</th>
                        <th>V</th>
                        <th>E</th>
                        <th>D</th>
                        <th>GP</th>
                        <th>GC</th>
                        <th>SG</th>
                        <th>%</th>
                    </tr>
                </thead>
                <tbody>
    `;

    dadosClassificacao.classificacao.forEach(time => {
        let situacaoClass = '';
        if (time.situacao === 'Campeao' || time.situacao === 'Libertadores') {
            situacaoClass = 'libertadores';
        } else if (time.situacao === 'Pre-Libertadores') {
            situacaoClass = 'pre-libertadores';
        } else if (time.situacao === 'Sul-Americana') {
            situacaoClass = 'sulamericana';
        } else if (time.situacao === 'Rebaixado') {
            situacaoClass = 'rebaixamento';
        }

        html += `
            <tr class="${situacaoClass}">
                <td class="posicao">${time.posicao}</td>
                <td class="time">
                    <span class="nome-time">${time.time.nome}</span>
                </td>
                <td class="pontos"><strong>${time.pontos}</strong></td>
                <td>${time.jogos}</td>
                <td>${time.vitorias}</td>
                <td>${time.empates}</td>
                <td>${time.derrotas}</td>
                <td>${time.gols_pro}</td>
                <td>${time.gols_contra}</td>
                <td>${time.saldo_gols > 0 ? '+' : ''}${time.saldo_gols}</td>
                <td>${calcularAproveitamento(time.pontos, time.jogos).toFixed(1)}%</td>
            </tr>
        `;
    });

    html += `
                </tbody>
            </table>
        </div>
        <div class="legenda">
            <div class="legenda-item"><span class="cor-libertadores"></span> Libertadores</div>
            <div class="legenda-item"><span class="cor-pre-libertadores"></span> Pré-Libertadores</div>
            <div class="legenda-item"><span class="cor-sulamericana"></span> Sul-Americana</div>
            <div class="legenda-item"><span class="cor-rebaixamento"></span> Rebaixamento</div>
        </div>
    `;

    container.innerHTML = html;
}

// Função para renderizar os cards dos times
function renderizarCardsTime() {
    const container = document.getElementById('cards-times');

    if (!dadosClassificacao.classificacao) {
        container.innerHTML = '<p>Dados não encontrados.</p>';
        return;
    }

    let html = '';
    dadosClassificacao.classificacao.forEach(time => {
        html += `
            <article class="card-time clickable" onclick="abrirModalTitulos('${time.time.nome}')">
                <div class="card-header">
                    <h3>${time.time.nome}</h3>
                    <span class="posicao-card">${time.posicao}º lugar</span>
                </div>
                <div class="card-stats">
                    <div class="stat">
                        <span class="label">Pontos:</span>
                        <span class="value">${time.pontos}</span>
                    </div>
                    <div class="stat">
                        <span class="label">Vitórias:</span>
                        <span class="value">${time.vitorias}</span>
                    </div>
                    <div class="stat">
                        <span class="label">Gols:</span>
                        <span class="value">${time.gols_pro}</span>
                    </div>
                    <div class="stat">
                        <span class="label">Aproveitamento:</span>
                        <span class="value">${calcularAproveitamento(time.pontos, time.jogos).toFixed(1)}%</span>
                    </div>
                </div>
                <div class="card-situacao ${time.situacao.toLowerCase().replace(/[áàâãä]/g, 'a').replace(/[éèêë]/g, 'e').replace(/[íìîï]/g, 'i').replace(/[óòôõö]/g, 'o').replace(/[úùûü]/g, 'u').replace(/[ç]/g, 'c').replace(/\s+/g, '-')}">${obterSituacaoComAcentuacao(time.situacao)}</div>
            </article>
        `;
    });

    container.innerHTML = html;
}

// Função para trocar temporada
async function trocarTemporada() {
    const selectElement = document.getElementById('select-temporada');
    const novaTemporada = selectElement.value;
    
    if (novaTemporada != temporadaAtual) {
        mostrarCarregando();
        await carregarClassificacao(parseInt(novaTemporada));
    }
}

// Função para calcular aproveitamento
function calcularAproveitamento(pontos, jogos) {
    if (jogos === 0) return 0;
    return (pontos / (jogos * 3)) * 100;
}

// Função para obter situação com acentuação
function obterSituacaoComAcentuacao(situacao) {
    const situacoes = {
        'Campeao': 'Campeão',
        'Libertadores': 'Libertadores',
        'Pre-Libertadores': 'Pré-Libertadores',
        'Sul-Americana': 'Sul-Americana',
        'Rebaixado': 'Rebaixado',
        'Serie A': 'Série A'
    };
    
    return situacoes[situacao] || situacao;
}

// Função para atualizar título com a temporada
function atualizarTitulo() {
    const tituloElement = document.getElementById('titulo-campeonato');
    const selectElement = document.getElementById('select-temporada');
    
    if (tituloElement) {
        tituloElement.textContent = `Classificação Brasileirão ${temporadaAtual}`;
    }
    
    if (selectElement) {
        selectElement.value = temporadaAtual.toString();
    }
}

// Função para carregar títulos dos times
async function carregarTitulos() {
    try {
        const resposta = await fetch('titulos-times.json');
        if (!resposta.ok) {
            throw new Error(`Erro HTTP: ${resposta.status}`);
        }
        const dadosTitulos = await resposta.json();
        titulosTimes = dadosTitulos.titulos;

    } catch (error) {
        throw new Error(`Erro ao carregar títulos: ${error.message}`);
    }
}

// Função para abrir modal com títulos do time
function abrirModalTitulos(nomeTime) {
    const modal = document.getElementById('modal-titulos');
    const nomeTimeElement = document.getElementById('modal-nome-time');
    
    nomeTimeElement.textContent = nomeTime;
    
    // Busca títulos do time
    const titulos = titulosTimes[nomeTime];
    
    const titulosComFallback = titulos || {
        internacionais: {},
        nacionais: {},
        estaduais: {}
    };
    
    // Preenche as categorias
    preencherCategoriaTitulos('titulos-internacionais', titulosComFallback.internacionais);
    preencherCategoriaTitulos('titulos-nacionais', titulosComFallback.nacionais);
    preencherCategoriaTitulos('titulos-estaduais', titulosComFallback.estaduais);
    
    // Mostra o modal
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden'; // Impede scroll da página
}

// Função para fechar modal
function fecharModal() {
    const modal = document.getElementById('modal-titulos');
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto'; // Restaura scroll da página
}

// Função para preencher categoria de títulos
function preencherCategoriaTitulos(idCategoria, titulos) {
    const container = document.getElementById(idCategoria);
    const listaElement = container.querySelector('.titulos-lista');

    listaElement.innerHTML = '';

    if (!titulos || Object.keys(titulos).length === 0) {
        listaElement.innerHTML = '<div class="sem-titulos">Nenhum título conquistado</div>';
        return;
    }

    Object.entries(titulos).forEach(([competicao, anos]) => {
        if (anos && anos.length > 0) {
            const tituloDiv = document.createElement('div');
            tituloDiv.className = 'titulo-item';
            
            tituloDiv.innerHTML = `
                <div class="titulo-nome">${competicao}</div>
                <div class="titulo-anos">${anos.join(', ')} (${anos.length} ${anos.length === 1 ? 'título' : 'títulos'})</div>
            `;

            listaElement.appendChild(tituloDiv);
        }
    });
    
    if (listaElement.children.length === 0) {
        listaElement.innerHTML = '<div class="sem-titulos">Nenhum título conquistado</div>';
    }
}

// Fechar modal ao clicar fora dele
document.addEventListener('click', function(event) {
    const modal = document.getElementById('modal-titulos');
    if (event.target === modal) {
        fecharModal();
    }
});

// Fechar modal com tecla ESC
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        fecharModal();
    }
});
