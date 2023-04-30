import personService from "../services/persons";

const PersonForm = ({
  newName,
  newNumber,
  persons,
  setNewName,
  setNewNumber,
  setPersons,
  setMessege,
}) => {
  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  const renderRes = (res) => {
    setPersons([...persons.filter((person) => person.id !== res.id), res]);
    setNewName("");
    setNewNumber("");

    setMessege({ messege: `Added ${res.name}`, success: true });
    setTimeout(() => {
      setMessege({
        messege: null,
        success: null,
      });
    }, 5000);
  };

  const changePerson = (existPerson) => {
    if (
      window.confirm(
        `${newName} is already in phonebook, replace thr old number with a new one?`
      )
    ) {
      const changePerson = { ...existPerson, number: newNumber };
      personService
        .update(existPerson.id, changePerson)
        .then((res) => {
          console.log(res);
          renderRes(res);
        })
        .catch((ex) => {
          setMessege({
            messege: `Info of ${existPerson.name} has already been removed from server`,
            success: false,
          });
          setTimeout(() => {
            setMessege({
              messege: null,
              success: null,
            });
          }, 5000);
          setPersons(persons.filter((person) => person.id !== existPerson.id));
          console.error(ex);
        })
        .finally(() => {
          console.log(`update person to ${JSON.stringify(changePerson)}`);
        });
    }
  };

  const newPersonF = () => {
    const newPerson = { name: newName, number: newNumber };
    personService
      .create(newPerson)
      .then((res) => {
        renderRes(res);
      })
      .catch((ex) => {
        console.error(ex);
      })
      .finally(() => {
        console.log(`add new person ${JSON.stringify(newPerson)}`);
      });
  };

  const addPerson = (event) => {
    const existPerson = persons.find((person) => person.name === newName);
    event.preventDefault();

    if (existPerson) {
      changePerson(existPerson);
    } else {
      newPersonF();
    }
  };

  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
