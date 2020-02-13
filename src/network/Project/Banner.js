import createAxios from '../Axios/axios';


function Banner(number) {
    let url = 'banner?type=' + number + '';
    return createAxios(url)
}

export default Banner