const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3002;

// Configurar o CORS e o body-parser
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));


// Conexão com o MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Substitua pelo seu usuário do MySQL
  password: 'g3d1te2016', // Substitua pela sua senha do MySQL
  database: 'ToDoListDB',
});

db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao MySQL:', err);
  } else {
    console.log('Conectado ao banco de dados MySQL.');
  }
});

// Endpoint para listar tarefas
app.get('/tasks', (req, res) => {
  const query = 'SELECT * FROM tasks'; // Buscar todas as tarefas

  connection.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results); // Enviar todas as tarefas
  });
});

// Endpoint para adicionar uma nova tarefa
app.post('/tasks', (req, res) => {
  const { task } = req.body;
  const query = 'INSERT INTO tasks (task) VALUES (?)'; // 'task' é o nome da coluna no banco

  connection.query(query, [task], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: 'Tarefa criada com sucesso' });
  });
});

// Endpoint para atualizar o status de uma tarefa
app.put('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  db.query(
    'UPDATE tasks SET completed = ? WHERE id = ?',
    [completed, id],
    (err) => {
      if (err) return res.status(500).send(err);
      res.sendStatus(200);
    }
  );
});

// Endpoint para deletar uma tarefa
app.delete('/tasks/:id', (req, res) => {
  const id = req.params.id;
  const query = 'DELETE FROM tasks WHERE id = ?';
  
  connection.query(query, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: 'Tarefa deletada com sucesso' });
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
