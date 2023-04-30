import axios from "axios";

const url = "http://localhost:3000/api/persons";

const getAll = () => {
  return axios.get(url).then((res) => res.data);
};

const create = (person) => {
  return axios.post(url, person).then((res) => res.data);
};

const deletePerson = (id) => {
  return axios.delete(`${url}/${id}`);
};

const update = (id, person) => {
    return axios.put(`${url}/${id}`, {...person}).then((res) => res.data);
}

export default { getAll, create, deletePerson, update };
