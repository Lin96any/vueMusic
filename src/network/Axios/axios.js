let axios = require('axios');
function createAxios(url){
    let Axios = axios.create({
        baseURL:'http://server.attribute.top/music/api',
        timeout:1500
    })
    Axios.interceptors.request.use(config=>{
        return config
    });

    Axios.interceptors.response.use(res=>{
        return res.data
    });
    return Axios(url)
}

export default createAxios