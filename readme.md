# Brasileirão - Sistema de Classificação e Títulos

Aplicação desenvolvida durante a **Imersão DEV Alura com Google Gemini – 10ª Edição**, com foco em criar uma **base de conhecimento interativa** para visualizar a classificação do **Campeonato Brasileiro de Futebol**, com informações detalhadas sobre os times e seus títulos conquistados.

![Status](https://img.shields.io/badge/Status-Ativo-brightgreen)
![Versão](https://img.shields.io/badge/Versao-2.0-blue)
![Licença](https://img.shields.io/badge/Licenca-MIT-yellow)

## **Visão Geral**

Este projeto oferece uma interface moderna e responsiva que mostra a classificação do Brasileirão das temporadas 2022, 2023 e 2024. Os usuários podem visualizar tabelas detalhadas, explorar informações dos times através de cards interativos e descobrir o histórico completo de títulos de cada clube em um modal dedicado.

### **Principais Funcionalidades**

- **Classificação Detalhada**: Tabela completa com pontos, jogos, vitórias, empates, derrotas, gols e aproveitamento
- **Histórico de Títulos**: Modal interativo com títulos internacionais, nacionais e estaduais de cada time
- **Design Responsivo**: Interface adaptada para desktop, tablet e mobile
- **Indicadores Visuais**: Cores diferenciadas para Libertadores, Pré-Libertadores, Sul-Americana e rebaixamento
- **Performance**: Carregamento assíncrono e otimizado dos dados
- **Multi-temporada**: Navegação entre as temporadas 2022, 2023 e 2024

## **Estrutura do Projeto**

```
index.html                # Página principal
style.css                 # Estilos e design responsivo
script.js                 # Lógica da aplicaçãoo
classificacao-2022.json   # Dados da temporada 2022
classificacao-2023.json   # Dados da temporada 2023
classificacao-2024.json   # Dados da temporada 2024
titulos-times.json        # Base de dados dos títulos
README.md                 # Documentação do projeto
```

## **Tecnologias Utilizadas**

### **Frontend**
- **HTML5**: Estrutura semântica moderna
- **CSS3**: Estilos avançados com Flexbox, Grid e CSS Variables
- **JavaScript ES6+**: Programação assíncrona com async/await e Fetch API

### **Design**
- **Google Fonts**: Tipografia Quicksand
- **CSS Variables**: Sistema de cores consistente
- **Media Queries**: Design responsivo completo
- **CSS Animations**: Transições suaves e indicadores de loading

### **Dados**
- **JSON**: Base de dados estruturada
- **REST API Pattern**: Carregamento dinâmico via fetch

## **Como Usar**

### **1. Navegação Principal**
- **Classificação**: Visualize a tabela completa com todos os dados estatásticos
- **Times**: Explore os times através de cards interativos

### **2. Seletor de Temporada**
No topo da página, você encontrará o seletor de temporada. Basta escolher o ano desejado (2022, 2023 ou 2024) para visualizar a classificação final do Campeonato Brasileiro daquela temporada.

### **3. Indicadores de Classificação**
- <span style="color: #001aff; font-weight: bold;">Verde</span>: Libertadores
- <span style="color: #00b8cc; font-weight: bold;">Amarelo</span>: Pré-Libertadores
- <span style="color: #ff9500; font-weight: bold;">Laranja</span>: Sul-Americana
- <span style="color: #ff4757; font-weight: bold;">Vermelho</span>: Rebaixamento

### **4. Modal de Títulos**
Clique em qualquer card de time para visualizar (dados fictícios):
- **Títulos Internacionais**: Libertadores, Intercontinental, etc.
- **Títulos Nacionais**: Brasileirão, Copa do Brasil, etc.
- **Títulos Estaduais**: Campeonatos estaduais

## **Arquitetura Técnica**

### **Estrutura de Dados**
- Dados sobre a classificação do campeonato
#### **Classificação (classificacao-YYYY.json)**
```json
{
  "campeonato": "Campeonato Brasileiro Serie A",
  "temporada": 2024,
  "status": "Finalizado",
  "classificacao": [
    {
      "posicao": 1,
      "time": {
        "nome": "Botafogo",
        "sigla": "BOT",
        "cidade": "Rio de Janeiro",
        "estado": "RJ"
      },
      "pontos": 79,
      "jogos": 38,
      "vitorias": 23,
      "empates": 10,
      "derrotas": 5,
      "gols_pro": 59,
      "gols_contra": 29,
      "saldo_gols": 30,
      "situacao": "Campeao"
    }
  ]
}
```
- Dados sobre os títulos dos times (dados fictícios)
#### **Títulos (titulos-times.json)**
```json
{
  "titulos": {
    "Grêmio": {
      "internacionais": {
        "Copa Libertadores": ["1983", "1995", "2017"],
        "Copa Intercontinental": ["1983"]
      },
      "nacionais": {
        "Campeonato Brasileiro": ["1981", "1996"],
        "Copa do Brasil": ["1989", "1994", "1997", "2001", "2016"]
      },
      "estaduais": {
        "Campeonato Gaúcho": ["1921", "1922", "..."]
      }
    }
  }
}
```

### **Principais Funções JavaScript**

#### **Carregamento de Dados**
```javascript
// Carregamento assíncrono da classificaçãoo
async function carregarClassificacao(temporada = temporadaAtual)

// Carregamento dos títulos dos times  
async function carregarTitulos()
```

#### **Renderizaçãoo**
```javascript
// Renderiza a tabela de classificaçãoo
function renderizarTabelaClassificacao()

// Renderiza os cards dos times
function renderizarCardsTime()

// Preenche o modal com títulos do time
function preencherCategoriaTitulos(idCategoria, titulos)
```

#### **Interatividade**
```javascript
// Alterna entre temporadas
async function trocarTemporada()

// Abre modal com títulos do time
function abrirModalTitulos(nomeTime)

// Calcula percentual de aproveitamento
function calcularAproveitamento(pontos, jogos)
```

## **Design System**

### **Paleta de Cores**
```css
:root {
  --primary-color: #8ab4f8;    /* Azul claro */
  --secondary-color: #e8eaed;  /* Cinza claro */
  --tertiary-color: #9aa0a6;   /* Cinza médio */
  --bg-color: #202124;         /* Cinza escuro */
}
```

### **Breakpoints Responsivos**
```css
@media (max-width: 768px) { /* Tablet */ }
@media (max-width: 480px) { /* Mobile */ }
```

### **Tipografia**
- **Fonte Principal**: Quicksand (Google Fonts)
- **Pesos**: 300, 400, 600, 700

## **Funcionalidades Avançadas**

### **1. Cálculo Dinâmico de Aproveitamento**
```javascript
function calcularAproveitamento(pontos, jogos) {
    if (jogos === 0) return 0;
    return (pontos / (jogos * 3)) * 100;
}
```

### **2. Sistema de Classificaçãoo por Cores**
- Automaticamente aplica cores baseadas na situação do time
- Suporte a múltiplas categorias (Libertadores, Sul-Americana, etc.)

### **3. Modal Interativo**
- Carregamento dinâmico dos títulos
- Organização por categorias (Internacional, Nacional, Estadual)
- Contagem automática de títulos

### **4. Tratamento de Acentos**
```javascript
function obterSituacaoComAcentuacao(situacao) {
    const situacoes = {
        'Pre-Libertadores': 'Pré-Libertadores',
        'Serie A': 'Série A'
        // ...
    };
    return situacoes[situacao] || situacao;
}
```

## **Performance e Otimizações**

- **Carregamento Assíncrono**: Dados carregados em paralelo
- **Lazy Loading**: Modal carregado sob demanda
- **CSS Otimizado**: Uso eficiente de seletores e propriedades
- **JavaScript Limpo**: Código otimizado sem dependências desnecessárias

## **Responsividade**

### **Desktop (> 768px)**
- Layout de 2 colunas para cards
- Tabela completa com todas as colunas
- Modal centralizado

### **Tablet (? 768px)**  
- Layout adaptado com scrolling horizontal na tabela
- Cards em coluna única
- Ajustes de espaçamento

### **Mobile (? 480px)**
- Interface otimizada para toque
- Tabela com colunas essenciais
- Modal em tela cheia

## **Licença**

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## ?**Autor**

**Marcelo Formentini**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/marcelo-formentini74/)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=flat&logo=github&logoColor=white)](https://github.com/MarceloFormentini)

---

**Se este projeto foi útil para você, considere dar uma estrela!**