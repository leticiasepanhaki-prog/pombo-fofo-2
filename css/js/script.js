// ==========================================
// ELEMENTOS DO SITE
// ==========================================

const etapaTema = document.getElementById("etapa-tema");
const etapaTipo = document.getElementById("etapa-tipo");

const resultadoSection = document.getElementById("resultado-section");

const temasContainer = document.getElementById("temas-container");
const tiposContainer = document.getElementById("tipos-container");


// ==========================================
// DADOS DOS FILTROS
// ==========================================

const temas = [

    {
        id: "educacao",
        nome: "Educação",
        descricao: "Ensino, conhecimento e formação",
        icone: "📚"
    },

    {
        id: "desigualdade",
        nome: "Desigualdade",
        descricao: "Pobreza, exclusão e diferenças sociais",
        icone: "⚖️"
    },

    {
        id: "tecnologia",
        nome: "Tecnologia",
        descricao: "Internet, IA, redes e sociedade",
        icone: "💻"
    },

    {
        id: "meioambiente",
        nome: "Meio ambiente",
        descricao: "Natureza, clima e sustentabilidade",
        icone: "🌱"
    },

    {
        id: "direitos",
        nome: "Direitos humanos",
        descricao: "Cidadania, igualdade e liberdade",
        icone: "🕊️"
    },

    {
        id: "sociedade",
        nome: "Sociedade",
        descricao: "Comportamento, relações e cultura",
        icone: "👥"
    }

];


const tipos = [

    {
        id: "filosofo",
        nome: "Filósofo",
        descricao: "Ideias e conceitos filosóficos",
        icone: "🏛️"
    },

    {
        id: "sociologo",
        nome: "Sociólogo",
        descricao: "Teorias sobre sociedade",
        icone: "👥"
    },

    {
        id: "literatura",
        nome: "Literatura",
        descricao: "Livros e obras literárias",
        icone: "📖"
    },

    {
        id: "filme",
        nome: "Filme",
        descricao: "Filmes que podem enriquecer sua argumentação",
        icone: "🎬"
    },

    {
        id: "serie",
        nome: "Série",
        descricao: "Séries e produções audiovisuais",
        icone: "📺"
    },

    {
        id: "historia",
        nome: "História",
        descricao: "Documentos e acontecimentos históricos",
        icone: "🏛️"
    }

];


// ==========================================
// ESTADO DO JOGO
// ==========================================

let temaSelecionado = null;
let tipoSelecionado = null;

let repertoriosEncontrados = [];

let repertorioAtual = null;

let favoritado = false;


// ==========================================
// MOSTRAR TEMAS
// ==========================================

function mostrarTemas() {

    temasContainer.innerHTML = "";

    temas.forEach(tema => {

        const botao = document.createElement("div");

        botao.className = "opcao";

        botao.innerHTML = `
            <div class="opcao-icon">
                ${tema.icone}
            </div>

            <h3>${tema.nome}</h3>

            <p>${tema.descricao}</p>
        `;

        botao.addEventListener("click", () => selecionarTema(tema.id));

        temasContainer.appendChild(botao);

    });

}


// ==========================================
// SELECIONAR TEMA
// ==========================================

function selecionarTema(tema) {

    temaSelecionado = tema;

    mostrarTipos();

    etapaTema.classList.remove("ativa");

    etapaTipo.classList.add("ativa");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


// ==========================================
// MOSTRAR TIPOS
// ==========================================

function mostrarTipos() {

    tiposContainer.innerHTML = "";

    tipos.forEach(tipo => {

        const botao = document.createElement("div");

        botao.className = "opcao";

        botao.innerHTML = `
            <div class="opcao-icon">
                ${tipo.icone}
            </div>

            <h3>${tipo.nome}</h3>

            <p>${tipo.descricao}</p>
        `;

        botao.addEventListener("click", () => selecionarTipo(tipo.id));

        tiposContainer.appendChild(botao);

    });

}


// ==========================================
// SELECIONAR TIPO
// ==========================================

function selecionarTipo(tipo) {

    tipoSelecionado = tipo;

    repertoriosEncontrados = repertorios.filter(repertorio => {

        return (
            repertorio.tema === temaSelecionado &&
            repertorio.tipo === tipoSelecionado
        );

    });


    // Se houver repertórios correspondentes

    if (repertoriosEncontrados.length > 0) {

        mostrarRepertorio(repertoriosEncontrados);

    } else {

        // Se ainda não existir um repertório para
        // aquela combinação, procura apenas pelo tema.

        repertoriosEncontrados = repertorios.filter(repertorio => {

            return repertorio.tema === temaSelecionado;

        });


        if (repertoriosEncontrados.length > 0) {

            mostrarRepertorio(repertoriosEncontrados);

        } else {

            alert("Ainda não temos repertórios cadastrados para esse tema.");

        }

    }

}


// ==========================================
// MOSTRAR REPERTÓRIO
// ==========================================

function mostrarRepertorio(lista) {

    const indice = Math.floor(Math.random() * lista.length);

    repertorioAtual = lista[indice];

    preencherResultado(repertorioAtual);

    etapaTema.classList.remove("ativa");

    etapaTipo.classList.remove("ativa");

    resultadoSection.classList.add("ativo");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


// ==========================================
// PREENCHER CARD
// ==========================================

function preencherResultado(repertorio) {

    document.getElementById("resultado-titulo").textContent =
        repertorio.nome;

    document.getElementById("resultado-subtitulo").textContent =
        repertorio.subtitulo;

    document.getElementById("resultado-icone").textContent =
        repertorio.icone;

    document.getElementById("resultado-descricao").textContent =
        repertorio.descricao;

    document.getElementById("resultado-como-usar").textContent =
        repertorio.comoUsar;

    document.getElementById("resultado-exemplo").textContent =
        repertorio.exemplo;


    document.getElementById("tag-tema").textContent =
        nomeTema(repertorio.tema);

    document.getElementById("tag-tipo").textContent =
        nomeTipo(repertorio.tipo);


    const palavras = document.getElementById("resultado-palavras");

    palavras.innerHTML = "";

    repertorio.palavras.forEach(palavra => {

        const span = document.createElement("span");

        span.className = "palavra";

        span.textContent = palavra;

        palavras.appendChild(span);

    });


    favoritado = false;

    atualizarBotaoFavorito();

}


// ==========================================
// OUTRO REPERTÓRIO
// ==========================================

function novoRepertorio() {

    if (repertoriosEncontrados.length === 0) {
        return;
    }


    let novo;

    do {

        const indice =
            Math.floor(Math.random() * repertoriosEncontrados.length);

        novo = repertoriosEncontrados[indice];

    } while (
        repertoriosEncontrados.length > 1 &&
        novo.id === repertorioAtual.id
    );


    repertorioAtual = novo;

    preencherResultado(repertorioAtual);

}


// ==========================================
// REPERTÓRIO ALEATÓRIO
// ==========================================

function repertorioAleatorio() {

    const indice =
        Math.floor(Math.random() * repertorios.length);

    repertorioAtual = repertorios[indice];

    preencherResultado(repertorioAtual);

    repertoriosEncontrados = repertorios.filter(
        repertorio => repertorio.tema === repertorioAtual.tema
    );


    etapaTema.classList.remove("ativa");

    etapaTipo.classList.remove("ativa");

    resultadoSection.classList.add("ativo");


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


// ==========================================
// FAVORITOS
// ==========================================

function alternarFavorito() {

    favoritado = !favoritado;

    atualizarBotaoFavorito();

}


function atualizarBotaoFavorito() {

    const botao =
        document.getElementById("botao-favorito");

    if (favoritado) {

        botao.textContent = "♥";

        botao.classList.add("favoritado");

    } else {

        botao.textContent = "♡";

        botao.classList.remove("favoritado");

    }

}


// ==========================================
// VOLTAR
// ==========================================

function voltarParaTemas() {

    etapaTipo.classList.remove("ativa");

    resultadoSection.classList.remove("ativo");

    etapaTema.classList.add("ativa");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


function voltarParaTipos() {

    resultadoSection.classList.remove("ativo");

    etapaTipo.classList.add("ativa");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


// ==========================================
// RECOMEÇAR
// ==========================================

function recomecar() {

    temaSelecionado = null;

    tipoSelecionado = null;

    repertoriosEncontrados = [];

    repertorioAtual = null;

    favoritado = false;


    resultadoSection.classList.remove("ativo");

    etapaTipo.classList.remove("ativa");

    etapaTema.classList.add("ativa");


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


// ==========================================
// NOMES DOS FILTROS
// ==========================================

function nomeTema(id) {

    const tema = temas.find(
        item => item.id === id
    );

    return tema ? tema.nome : id;

}


function nomeTipo(id) {

    const tipo = tipos.find(
        item => item.id === id
    );

    return tipo ? tipo.nome : id;

}


// ==========================================
// INICIALIZAÇÃO
// ==========================================

mostrarTemas();

