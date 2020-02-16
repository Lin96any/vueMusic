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

export {
    debounce,
    Singer,
    getindex
}