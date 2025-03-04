const express = require("express")
const data = require("./MOCK_DATA.json")
const app = express()
const port = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));




// return random user

app.get("/random", (req, res) => {
  var n = Math.random();
  n = n * 1000;
  n = Math.floor(n) + 1

  const randomUser = data.find(user => user.id === n)
  res.json(randomUser);

})


app.get("/api/users", (req, res) => {
  res.json(data);
});

app.get("/user/:id", (req, res) => {
  const id = Number(req.params.id)
  const user = data.find((user) => user.id === id);
  return res.json(user);
})

app.post("/new", (req, res) => {
  const newUser = {
    id: data.length + 1,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    gender: req.body.gender,
    size: req.body.size
  }
  data.push(newUser)
  res.json(newUser)
  console.log(newUser)
})

// update 

app.put("/user/:id", (req, res) => {
  const Id = parseInt(req.params.id);

  const edit = {
    id: Id,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    gender: req.body.gender,
    size: req.body.size

  }

  const index = data.findIndex((user) => user.id === Id);
  data[index] = edit
  console.log("user update successfull", edit)
  res.json({
    massage: "Done",
    user: data[index]

  })

})






app.listen(port, () => {
  console.log(`server running on localhost:${port}`)
});