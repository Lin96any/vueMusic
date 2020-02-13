let rem = (width)=>{
    let clientWidth = document.documentElement.clientWidth;
    let rem = clientWidth/width*100;
    rem = rem>50?50:rem;
    /* 创建style标签 */
    let style = document.createElement('style');
    style.innerHTML = 'html{font-size:'+rem+'px !important}';
    document.head.appendChild(style)
}

export default rem