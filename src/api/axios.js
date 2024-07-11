import axios from 'axios';

export default axios.create({
    baseURL: 'http://localhost/api',
    headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer 10|oV4AW5OAcO0P2ff7NukvAgiW7JlZm8J24xBNMVdGf83d1f50'
      }
});
