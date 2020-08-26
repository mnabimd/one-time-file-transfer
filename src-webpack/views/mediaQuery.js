var mq = window.matchMedia("(max-width: 400px)");
if (mq.matches) {
    // window width is at less than 570px
    console.log('Hight')
} else {
    // window width is greater than 570px
    console.log('Low')
}