// Niveau 3 : JSON Store

const token =
  '384acaf116afc17709e31732b96ed70ce6c5be65b13b2eec97f43246e384af18';
const baseUrl = `https://www.jsonstore.io/${token}`;

function getUsers() {
  axios.get(`${baseUrl}/users`).then(console.log);
}
//getUsers();

function addUser(newUser, id = Math.floor(Math.random() * 1000)) {
  axios.post(`${baseUrl}/users/${id}`, newUser);
}
//addUser({ name: 'Mel', age: 29 }, Date.now());

function getUser(userId) {
  axios.get(`${baseUrl}/users/${userId}`).then(console.log);
}

//getUser(1);

function addMultipleUsers(nbUsers) {
  if (nbUsers > 0) {
    addUser({ name: `user-${nbUsers}` });
    return addMultipleUsers(nbUsers - 1);
  }
}

//addMultipleUsers(3);

function deleteUser(userId) {
  axios.delete(`${baseUrl}/users/${userId}`);
}

//deleteUser(78);

function deleteUsers() {
  axios.delete(`${baseUrl}/users`);
}

//deleteUsers();

function updateUser(userId, fieldToUpdate, fieldValue) {
  axios.put(`${baseUrl}/users/${userId}/${fieldToUpdate}`, `${fieldValue}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

//updateUser(1573125464077, 'age', 30);
