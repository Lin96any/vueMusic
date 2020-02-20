import Storage from 'web-storage-cache';

let localStorage = new Storage();

export const SetLocalStorage = (key, val) => {
    return localStorage.set(key, val);
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

export const SetObject = (singername, val) => {
    let singer = GetLocalstorage(`${singername}-info`);
    if (!singer) {
        singer = {}
    }
    singer = val;
    SetLocalStorage(`${singername}-info`,singer)
};

export const GetObject = (singername) => {
    let singer = GetLocalstorage(`${singername}-info`);
    if (singer){
        return singer
    }else{
        return null
    }
}

export const SetlikeMusic = (musiclike, val) => {
    let music = GetLocalstorage(`${musiclike}-like`);
    if (!music) {
        music = []
    }
    music.push(val);
    SetLocalStorage(`${musiclike}-like`, music)
};

export const GetlikeMusic = (musiclike) => {
    let music = GetLocalstorage(`${musiclike}-like`);
    if (music) {
        return music
    } else {
        return null
    }
}