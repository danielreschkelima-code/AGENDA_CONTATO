const API_URL = 'http://localhost:3000/contatos';
 
const formContato = document.getElementById('cadastro-telefone');
const listaContatos = document.getElementById('lista-contatos');
const inputId = document.getElementById('telefone-id');
const btnCancelar = document.getElementById('btn-cancelar');
 
async function carregarTelefones(query = '') {
  const resposta = await fetch(`${API_URL}${query}`);
  const contatos = await resposta.json();
  renderizarContatos(contatos);
}
 
function renderizarContatos(contatos) {
  listaContatos.innerHTML = '';
 
  contatos.forEach((contato) => {
    const linha = document.createElement('tr');
    linha.innerHTML = `
      <td>${contatos.nome}</td>
      <td>${contato.telefone}</td>
      <td>${contato.email ?? '-'}</td>
      <td>${contato.cidade}</td>
      <td>
        <button class="btn-editar" data-id="${contato.id}">Editar</button>
        <button class="btn-excluir" data-id="${contato.id}">Excluir</button>
      </td>
    `;
    listaJogos.appendChild(linha);
  });
}

// Carrega a lista assim que a página abre
carregarJogos();
 
// Querys
const fitroNome = document.getElementById('filtro-nome');
const filtroCidade = document.getElementById('filtro-cidade');
const btnFiltrar = document.getElementById('btn-filtrar');
const btnLimparFiltro = document.getElementById('btn-limpar-filtro');
 
btnFiltrar.addEventListener('click', () => {
    const parametros = new URLSearchParams();
 
    if (filtroNome.value) parametros.append('nome', filtroGenero.value);
    if (filtroCidade.value) parametros.append('cidade', filtroPlataforma.value);
 
    const query = parametros.toString();
    carregarJogos(query ? `?${query}` : '');
});
 
btnLimparFiltro.addEventListener('click', () => {
    filtroNome.value = '';
    filtroCidade.value = '';
    carregarJogos();
});

formContato.addEventListener('submit', async (evento) => {
    evento.preventDefault();
 
    const jogo = {
        nome: document.getElementById('cadastro-nome').value,
        telefone: document.getElementById('cadastro-numero').value,
        email: document.getElementById('cadastro-email').value ? document.getElementById('cadastro-email').value : null,
        cidade: document.getElementById('cadastro-cidade').value,
    };
 
    const id = inputId.value;
 
    if (id) {
        await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(jogo)
    });
  } else {
    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(jogo)
    });
  }
 
  formJogo.reset();
  inputId.value = '';
  tituloForm.textContent = 'Cadastrar jogo';
  carregarJogos();
});
 
btnCancelar.addEventListener('click', () => {
  formJogo.reset();
  inputId.value = '';
  tituloForm.textContent = 'Cadastrar jogo';
});