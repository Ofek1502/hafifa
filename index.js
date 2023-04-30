import utils from "./utils.js";
import express from "express";
import morgan from "morgan";
import cors from 'cors'

morgan.token("body", (req, res) => {
  return JSON.stringify(req.body);
});

const app = express();
const port = 3000;
app.use(express.static('dist'))
app.use(express.json());
app.use(cors())
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :body"));

let data = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/info", (req, res) => {
  res.send(
    `<div>Phonebook has info for ${
      data.length
    } people</div><div>${new Date()}</div>`
  );
});

app.get("/api/persons", (req, res) => {
  res.send(data);
});

app.get("/api/persons/:id", (req, res) => {
  const personId = Number(req.params.id);
  const person = data.find((person) => person.id === personId);

  person ? res.send(person) : res.status(404).send("Not found");
});

app.delete("/api/persons/:id", (req, res) => {
  const personId = Number(req.params.id);
  data = data.filter((person) => person.id !== personId);

  res.status(204).end();
});

app.post("/api/persons", (req, res) => {
  if (!req.body.name) {
    return res.status(400).json({
      error: "name missing",
    });
  } else if (!req.body.number) {
    return res.status(400).json({
      error: "number missing",
    });
  } else if (data.find((person) => person.name === req.body.name)) {
    return res.status(400).json({
      error: "name must be unique",
    });
  }

  const personId = utils.generateId(data.map((person) => person.id));
  const person = { ...req.body, id: personId };
  console.log(person);

  data = data.concat(person);

  res.send(person);
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
