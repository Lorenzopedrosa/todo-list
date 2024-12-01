document.addEventListener('DOMContentLoaded', () => {
    // Selecionando elementos do DOM
    const button = document.querySelector('.button-add-task'); // Botão de adicionar tarefa
    const input = document.querySelector('.input-task'); // Campo de entrada
    const listaCompleta = document.querySelector('.list-tasks'); // Lista de tarefas
    let minhaListaDeItens = []; // Inicializando uma lista vazia para armazenar as tarefas
  
    // Função para adicionar uma nova tarefa
    function adicionarNovaTarefa() {
      const tarefa = input.value.trim();
    
      if (tarefa) {
        fetch('http://localhost:3002/tasks', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ task: tarefa }),
        })
        .then((response) => response.json())
        .then(() => {
          input.value = '';  // Limpar o campo de input
          recarregarTarefas();  // Recarregar a lista de tarefas
        });
      }
    }
    
  
    // Função para atualizar a exibição das tarefas na lista
    function mostrarTarefas() {
      const tarefaListItems = minhaListaDeItens.map((item, posicao) => {
        // Verificar o nome da tarefa
        console.log(item); // Isso ajudará a verificar se o nome da tarefa está correto
    
        return `
          <li class="task ${item.concluida ? 'done' : ''}">
            <img src="/img/checked.png" alt="check-na-tarefa" data-posicao="${posicao}" class="check-task">
            <p>${item.task}</p>  <!-- Aqui você deve usar o nome correto do campo -->
            <img src="/img/trash.png" alt="tarefa-para-o-lixo" data-posicao="${posicao}" class="delete-task">
          </li>
        `;
      }).join('');
    
      listaCompleta.innerHTML = tarefaListItems;
      localStorage.setItem('lista', JSON.stringify(minhaListaDeItens));
    }
  
    // Função para marcar ou desmarcar uma tarefa como concluída
    function concluirTarefa(posicao) {
      minhaListaDeItens[posicao].concluida = !minhaListaDeItens[posicao].concluida; // Alternar o status de conclusão da tarefa
      mostrarTarefas(); // Atualizar a exibição das tarefas na lista
    }
  
    // Função para deletar uma tarefa
    function deletarItem(posicao) {
      const tarefa = minhaListaDeItens[posicao];
      
      // Deletar a tarefa no backend
      fetch(`http://localhost:3002/tasks/${tarefa.id}`, {
        method: 'DELETE',
      })
      .then((response) => {
        if (response.ok) {
          // Remover a tarefa da lista local
          minhaListaDeItens.splice(posicao, 1); 
          mostrarTarefas(); // Atualizar a exibição das tarefas
        } else {
          console.error('Erro ao deletar tarefa no backend');
        }
      })
      .catch((error) => {
        console.error('Erro ao conectar com o servidor:', error);
      });
    }
  
    // Função para recarregar as tarefas do localStorage
    function recarregarTarefas() {
      fetch('http://localhost:3002/tasks')
        .then((response) => response.json())
        .then((data) => {
          console.log(data); // Verifique o que é retornado aqui
          minhaListaDeItens = data;
          mostrarTarefas();
        })
        .catch((error) => {
          console.error('Erro ao carregar tarefas:', error);
        });
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