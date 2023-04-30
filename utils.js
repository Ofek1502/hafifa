const getRandomInt = (max) => {
  return Math.floor(Math.random() * max + 2);
};

const generateId = (data) => {
  const max = Math.max(...data);
  let randomNum;

  do {
    randomNum = getRandomInt(max);
  } while (data.includes(randomNum));

  return randomNum;
};

export default { generateId };
