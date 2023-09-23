document.addEventListener('DOMContentLoaded', () => {
    // Selecionando elementos do DOM
    const button = document.querySelector('.button-add-task'); // Botão de adicionar tarefa
    const input = document.querySelector('.input-task'); // Campo de entrada
    const listaCompleta = document.querySelector('.list-tasks'); // Lista de tarefas
    let minhaListaDeItens = []; // Inicializando uma lista vazia para armazenar as tarefas
  
    // Função para adicionar uma nova tarefa
    function adicionarNovaTarefa() {
      const tarefa = input.value.trim(); // Obter o valor do campo de entrada, removendo espaços em branco
  
      if (tarefa) {
        // Se a tarefa não estiver em branco
        minhaListaDeItens.push({ tarefa, concluida: false }); // Adicionar a tarefa à lista de tarefas
        input.value = ''; // Limpar o campo de entrada
        mostrarTarefas(); // Atualizar a exibição das tarefas na lista
      }
    }
  
    // Função para atualizar a exibição das tarefas na lista
    function mostrarTarefas() {
      const tarefaListItems = minhaListaDeItens.map((item, posicao) => {
        // Mapear a lista de tarefas em elementos HTML
        return `
          <li class="task ${item.concluida ? 'done' : ''}">
            <img src="./img/checked.png" alt="check-na-tarefa" data-posicao="${posicao}" class="check-task">
            <p>${item.tarefa}</p>
            <img src="./img/trash.png" alt="tarefa-para-o-lixo" data-posicao="${posicao}" class="delete-task">
          </li>
        `;
      }).join(''); // Unir os elementos HTML em uma string
  
      listaCompleta.innerHTML = tarefaListItems; // Atualizar o conteúdo da lista de tarefas no DOM
      localStorage.setItem('lista', JSON.stringify(minhaListaDeItens)); // Armazenar a lista de tarefas no localStorage
    }
  
    // Função para marcar ou desmarcar uma tarefa como concluída
    function concluirTarefa(posicao) {
      minhaListaDeItens[posicao].concluida = !minhaListaDeItens[posicao].concluida; // Alternar o status de conclusão da tarefa
      mostrarTarefas(); // Atualizar a exibição das tarefas na lista
    }
  
    // Função para deletar uma tarefa
    function deletarItem(posicao) {
      minhaListaDeItens.splice(posicao, 1); // Remover a tarefa da lista
      mostrarTarefas(); // Atualizar a exibição das tarefas na lista
    }
  
    // Função para recarregar as tarefas do localStorage
    function recarregarTarefas() {
      const tarefasDoLocalStorage = localStorage.getItem('lista'); // Obter as tarefas armazenadas no localStorage
  
      if (tarefasDoLocalStorage) {
        // Se houver tarefas no localStorage
        minhaListaDeItens = JSON.parse(tarefasDoLocalStorage); // Carregar as tarefas na lista
      }
  
      mostrarTarefas(); // Atualizar a exibição das tarefas na lista
    }
  
    // Função para lidar com a tecla Enter pressionada no campo de entrada
    function handleKeyPress(event) {
      if (event.key === 'Enter') {
        adicionarNovaTarefa(); // Chamar a função para adicionar uma nova tarefa
      }
    }
  
    // Função para lidar com cliques na lista de tarefas
    function handleListClick(event) {
      const target = event.target; // Elemento clicado na lista de tarefas
  
      if (target.classList.contains('check-task')) {
        // Se o elemento clicado for um botão de conclusão de tarefa
        concluirTarefa(target.getAttribute('data-posicao')); // Chamar a função para marcar/desmarcar a tarefa como concluída
      } else if (target.classList.contains('delete-task')) {
        // Se o elemento clicado for um botão de exclusão de tarefa
        deletarItem(target.getAttribute('data-posicao')); // Chamar a função para deletar a tarefa
      }
    }
  
    // Inicialização: recarregar as tarefas e configurar os event listeners
    recarregarTarefas(); // Carregar as tarefas ao iniciar a página
    button.addEventListener('click', adicionarNovaTarefa); // Adicionar tarefa quando o botão é clicado
    input.addEventListener('keyup', handleKeyPress); // Adicionar tarefa quando a tecla Enter é pressionada no campo de entrada
    listaCompleta.addEventListener('click', handleListClick); // Lidar com cliques na lista de tarefas
  });  