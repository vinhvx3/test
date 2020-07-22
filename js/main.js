document.onkeydown = function (event) {
    switch (event.keyCode) {
        case 37:
            //console.log('Left key pressed');
            demo.left();
            break;
        case 38:
            //console.log('Up key pressed');
            demo.up();
            break;
        case 39:
            //console.log('Right key pressed');
            demo.right();
            break;
        case 40:
            //console.log('Down key pressed');
            demo.down();
            break;
        case 13:
            //console.log('Enter key pressed');
            demo.enter();
            break;
    }
};