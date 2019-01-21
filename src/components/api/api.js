const URL = 'http://172.25.15.158:3000';
const HEADERS = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
};

async function registerUser(payload) {
  try {
    let response = await fetch(`${URL}/user/signup`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify(payload)
    })

    return await response.json();

  } catch (e) {
    return e;
  }

}


async function loginUser(payload) {
  try {
    let response = await fetch(`${URL}/user/signin`, {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify(payload)
    })

    return await response.json();

  } catch (e) {
    return e;
  }

}


module.exports = {
  registerUser,
  loginUser
}
