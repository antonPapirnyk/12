import axios from 'axios';

export const createData =  (endpoint, data, token)=>{
     return axios({
        method: 'post',
        url: `http://localhost:3000/v1/${endpoint}`,
        data: data,
        headers: {
            authorization:
              `Bearer ${token}`,
          }
      })
    
    
}
