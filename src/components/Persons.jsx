import personService from "../services/persons";

const Persons = ({ persons, setPersons, filter }) => {
  const handlePersonDelete = (deleteToPerson) => {
    if (window.confirm(`delete ${deleteToPerson.name} ?`)) {
      personService
        .deletePerson(deleteToPerson.id)
        .then(() =>
          setPersons(persons.filter((person) => person.id !== deleteToPerson.id))
        )
        .catch((ex) => console.log(ex))
        .finally(() => console.log(`${deleteToPerson.id} was deleted`));
    }
  };

  const createPersons = () => {
    const personsList = persons
      .filter((person) =>
        person.name.toUpperCase().includes(filter.toUpperCase())
      )
      .map((person) => {
        return (
          <div key={person.id}>
            {person.name} {person.number}
            <button onClick={() => handlePersonDelete(person)}>delete</button>
          </div>
        );
      });

    return personsList;
  };

  return <div>{createPersons()}</div>;
};

export default Persons;
