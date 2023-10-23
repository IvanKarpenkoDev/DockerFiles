import pool from './mysqlPool.mjs'
const baseURL = 'http://localhost:3000/api/todos'; // Замените на фактический URL вашего сервера

// Функция для получения задач (todos) из сервера.
const readRecords = () =>
  new Promise((resolve, reject) =>
    pool.getConnection((err, connection) => {
      if (err) return reject(err)
      connection.query(
        'SELECT * FROM `todos`',
        (err, results) => {
          if (err) return reject(err)
          resolve(results)
        }
      )
      connection.release()
    })
  )
// Функция для создания задачи (todo) на сервере.
const insertRecord = (text) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) return reject(err);

      connection.query(
        'INSERT INTO `todos` (text) VALUES (?)',
        [text],
        (err, result) => {
          if (err) return reject(err);

          const insertedId = result.insertId;
          console.log(`Задача с ID ${insertedId} была добавлена в базу данных`);
          resolve(insertedId);
          connection.release();
        }
      );
    });
  });
};

const deleteRecord = (id) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) return reject(err);

      connection.query(
        'DELETE FROM `todos` WHERE `id` = ?',
        [id],
        (err, result) => {
          if (err) return reject(err);

          console.log(`Задача с ID ${id} была удалена из базы данных`);
          resolve();
          connection.release();
        }
      );
    });
  });
};

export { readRecords, insertRecord, deleteRecord };
