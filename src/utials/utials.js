/* 防抖函数 */
let debounce = function (fn, delay) {
    let timer;
    return function () {
        let contenx = this;
        let ags = arguments;
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this, ags)
        }, delay)
    }
}

class Singer {
    constructor({ id, name, avatar, aliaName='' }) {
        this.id = id
        this.name = name
        this.avatar = avatar
        this.aliaName = aliaName
    }
}

let getindex = (el, name, val) => {
    let prefix = 'data-',
        names = prefix + name;
    if (val) {
        return el.setAttribute(names, val);
    } else {
        return el.getAttribute(names);
    }
}

class SingerMusic {
    constructor(MusicId = '', MusicName = '', AlbumId = '', 
        AlbumName = '', AlbumImage = '', SingerID = '',
         SingerName = '', singerImg='') {
        /* 歌曲ID */
        this.MusicId = MusicId;
        /* 歌曲名字 */
        this.MusicName = MusicName;
        /* 专辑ID */
        this.AlbumId = AlbumId;
        /* 专辑图片 */
        this.AlbumImage = AlbumImage;
        /* 专辑名字 */
        this.AlbumName = AlbumName;
        /* 歌手id */
        this.SingerID = SingerID;
        /* 歌手名字 */
        this.SingerName = SingerName;
        /* 歌手图片 */
        this.singerImg = singerImg
    }
}

const playMode = {
    sequence: 0,
    loop: 1,
    random: 2
}


/* 洗牌算法实现 */

let getrandom = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

let shuffle = (arr) => {
    for (let i = 0; i < arr.length; i++) {
        let random = getrandom(0,i);
        let t = arr[i];
        arr[i] = arr[random];
        arr[random] =t
    }
    return arr
}

/* 歌单类 */
class SongList{
    constructor(id, name, cover, description){
        this.id = id;
        this.name = name;
        this.cover = cover;
        this.description = description;
    }
}

/* 榜单处理 */

class TopSort{
    constructor(name, id, tracks, coverImgUrl){
        this.name = name;
        this.id = id;
        this.tracks = tracks;
        this.coverImgUrl = coverImgUrl;
    }
}

export {
    debounce,
    Singer,
    getindex,
    SingerMusic,
    playMode,
    shuffle,
    SongList,
    TopSort
}