import axios from 'axios';

export default axios.create({
    baseURL: 'http://localhost/api',
    headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer 13|FtDP8hDXy045sUf4OdcFPaUxP731uguGe2LIBKx5fa7f012b'
      }
});
