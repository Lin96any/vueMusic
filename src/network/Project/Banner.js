import createAxios from '../Axios/axios';

function Banner(number = 2) {
    let url = 'banner?type=' + number + '';
    return createAxios(url)
}

export default Banner