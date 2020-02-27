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

export const SetRanComents = (recoments, val) => {
    SetLocalStorage(`${recoments}-list`, val)
};

export const GetRanComents = (recoments) => {
    let recoment = GetLocalstorage(`${recoments}-list`);
    if (recoments) {
        return recoment
    } else {
        return null
    }
};

export const SetSinger = (singer, val) => {
    SetLocalStorage(`${singer}-list`, val)
};

export const GetSinger = (singer) => {
    let singers = GetLocalstorage(`${singer}-list`);
    if (singers) {
        return singers
    } else {
        return null
    }
};

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

export const SetToplist = (Toplist, val) => {
    let top = GetLocalstorage(`${Toplist}-info`);
    if (!top) {
        top = {}
    }
    top = val;
    SetLocalStorage(`${Toplist}-info`, top)
};

export const GeToplist = (Toplist) => {
    let top = GetLocalstorage(`${Toplist}-info`);
    if (top) {
        return top
    } else {
        return null
    }
}


export const SaveHeardMusic = (music, val) => {
    let heardMusci = GetLocalstorage(`${music}-heard`);
    if (!heardMusci) {
        heardMusci = []
    }
    heardMusci.push(val);
    SetLocalStorage(`${music}-heard`, heardMusci)
};

export const GetHeardMusic = (music) => {
    let musics = GetLocalstorage(`${music}-heard`);
    if (musics) {
        return musics
    } else {
        return null
    }
}