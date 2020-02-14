import Storage from 'web-storage-cache';

let localStorage = new Storage();

export const SetLocalStorage = (key,val)=>{
    return localStorage.set(key,val);
}

export const GetLocalstorage = (key) => {
    return localStorage.get(key)
};

export const RemoveLocalstorage = (key, val) => {
    return localStorage.delete(key)
};

export const ClearLocalstorage = (key, val) => {
    return localStorage.clear()
};

