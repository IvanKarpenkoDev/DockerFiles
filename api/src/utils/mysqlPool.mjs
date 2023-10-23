import mysql from 'mysql2'
// Создаем подключение к базе данных
const pool = mysql.createPool({
  connectionLimit: 100,
  host: 'mysql',
  port: '3306',
  user: 'root',
  password: 'password',
  database: 'time_db', // Измените на имя базы данных для задач (todos)
});

// Создаем таблицу todos, если она не существует
const CREATE_TODOS_TABLE_SQL = `CREATE TABLE IF NOT EXISTS todos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  text TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;

pool.getConnection((err, connection) => {
  if (!err) {
    console.log('Connected to the MySQL DB - ID is ' + connection.threadId)
    const createTodosTable = CREATE_TODOS_TABLE_SQL
    connection.query(createTodosTable, (err) => {
      if (!err) {
        console.log('Todos table was created')
      }
    })
    connection.release()
  }
});

export default pool

// app.use(bodyParser.json());

// // Роуты для API
// app.get('/api/todos', (req, res) => {
//   // Реализация получения всех задач (todos) из базы данных и отправка их клиенту
// });

// app.post('/api/todos', (req, res) => {
//   // Реализация создания новой задачи (todo) и сохранение ее в базе данных
// });

// app.put('/api/todos/:id', (req, res) => {
//   // Реализация обновления существующей задачи (todo) по ее идентификатору
// });

// app.delete('/api/todos/:id', (req, res) => {
//   // Реализация удаления задачи (todo) по ее идентификатору
// });

// const port = process.env.PORT || 3000;

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
