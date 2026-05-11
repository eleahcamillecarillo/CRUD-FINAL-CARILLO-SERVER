
import axios from 'axios';

const api = axios.create({
   baseURL: 'http://localhost:3300',
   header: {
    'Content-Type': 'application/json',
    },
});
export default api;