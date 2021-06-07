import axios from 'axios';

// key:     3331f7626717c79c9f4d81b973cc8c2c5928702b
// baseURL: https://api-ssl.bitly.com/v4/


export const key = '3331f7626717c79c9f4d81b973cc8c2c5928702b';

const api = axios.create({
    baseURL: 'https://api-ssl.bitly.com/v4',
    headers: {
        'Authorization': `Bearer ${key}`,
        'Content-Type': 'application/json'
    }
});

export default api;