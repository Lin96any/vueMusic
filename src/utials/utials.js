/* 防抖函数 */
let debounce = function(fn,delay){
    let timer;
    return function(){
        let contenx = this;
        let ags = arguments;
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this, ags)
        }, delay)
    }
}

export {
    debounce
}