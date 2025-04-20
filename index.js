import express from 'express'
const app = express();
let port = 8000
app.use(express.json())
app.get('/', (req, res) => { res.json('Hii') })
let id = 2
let array = [{
  id: "1",
  title: "Task title",
  description: "Task description",
  status: "pending" // or "completed"
}]
app.get('/all', (req, res) => {
  res.send(array.length ? array : "No Data Found")
  console.log("get all data")
})
app.post('/add', (req, res) => {
  console.log(req.body)
  const { title, status, description } = req.body;
  if (!title) {
    res.send("Name is reqird")
    console.log("Name is reqird")
  }
  if (!status) {
    res.send("Email is reqird")
    console.log("Emal is reqird")
  }
  if (!description) {
    res.send("description is reqird")
    console.log("description is reqird")
  }
  if (status && title && description) {
    res.send("You are successfully regesterd")
    console.log("You are successfully regesterd")
    let x = { id: id++, title, description, status }
    array.push(x)
    console.log(array)
  }
})
app.put('/edit/:id', (req, res) => {
  let idx = req.params.id
  const { title, status, description } = req.body;
  let findid = array.find((e) => e.id == idx)
  findid.title = title
  findid.status = status
  findid.description = description
  res.send({ message: "sucess", id: findid })
  console.log("YUpdate Sucess")
})
app.delete('/delete/:id', (req, res) => {
  let idx = req.params.id;
  try {
    let filterdata = array.filter((e) => e.id != idx)
    console.log(filterdata)
    array = filterdata
    res.send(array)
    console.log("delete sucess")
  } catch (error) {
    console.log('Deletion problem', error)
  }
})
app.listen(port, () => {
  console.log("server stated on " + port)
})