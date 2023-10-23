import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import {
  readRecords,
  insertRecord,
  deleteRecord,
} from './src/utils/records.mjs'

const PORT = 5000

const app = express()
app.use(bodyParser.json())
app.use(cors())

app.get('/todos', async (_, res) => {
  res.send(await readRecords());
});


app.post('/todos', async (req, res) => {
  res.send(await insertRecord(req.body.text)); // Замените `time` на `text` и используйте `req.body.text`.
});

// Вместо `/time/:id` используйте `/api/todos/:id` как роут для удаления задачи (todo) по ее идентификатору.
app.delete('/todos/:id', async (req, res) => {
  res.send(await deleteRecord(req.params.id));
});

app.listen(PORT, () => {
  console.log(`Express web server is running at http://localhost:${PORT}`)
})
