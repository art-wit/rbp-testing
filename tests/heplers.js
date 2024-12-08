export const getAuthorisationToken = async (url) => {
  const response = await fetch(`${url}auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: process.env.USER,
      password: process.env.PASSWORD,
    })
  });
  return response.headers.get('Set-cookie').match(/token=([^;]+)/)[1];
}  