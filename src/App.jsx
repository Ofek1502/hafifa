import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "../src/services/persons";
import SuccessfulNotific from "./components/SuccessfulNotific/SuccessfulNotific";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [messege, setMessege] = useState({
    messege: null,
    success: null,
  });

  useEffect(() => {
    personService.getAll().then((res) => {
      console.log(`init ${res.length} persons`);
      setPersons(res);
    });
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <SuccessfulNotific messege={messege}></SuccessfulNotific>
      <Filter filter={filter} setFilter={setFilter}></Filter>
      <h2>Add a new</h2>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        persons={persons}
        setNewName={setNewName}
        setPersons={setPersons}
        setNewNumber={setNewNumber}
        setMessege={setMessege}
      ></PersonForm>
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        setPersons={setPersons}
        filter={filter}
      ></Persons>
    </div>
  );
};

export default App;
