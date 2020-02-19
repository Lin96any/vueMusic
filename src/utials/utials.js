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
    constructor({ id, name, avatar, aliaName }) {
        this.id = id
        this.name = name
        this.avatar = avatar
        this.aliaName = aliaName
    }
}

let getindex = (el, name, val)=>{
    let prefix = 'data-',
        names = prefix + name;
    if (val) {
        return el.setAttribute(names, val);
    }else{
        return el.getAttribute(names);
    }
}

class SingerMusic{
    constructor(MusicId,MusicName,AlbumId,AlbumName,AlbumImage,SingerID,SingerName,singerImg){
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

export {
    debounce,
    Singer,
    getindex,
    SingerMusic
}