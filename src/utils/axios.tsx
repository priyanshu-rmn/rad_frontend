import axios from 'axios';

const BACKEND_URL =
  'https://e78ee7df-8847-4452-bd42-7b77577e8c2d.mock.pstmn.io';

const api = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to handle login
export const loginn = async (
  email: string,
  password: string
): Promise<string> => {
  console.log("trying to login...")
  return api
    .post('/login/', { email, password })
    .then((res) => {
      console.dir(res.data);
      if (res.data && 'access_token' in res.data) {
        const token = res.data['access_token']; // Assuming the backend res contains { access_token: "JWT_TOKEN" }
        localStorage.setItem('jwtToken', token);
        return token;
      } else {
        throw new Error(`access_key not found in response data.`);
      }
    })
    .catch((error) => {
      console.error('Login failed:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Login failed');
    });
};
