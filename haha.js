function inner (str) {
    return function (target, name, descriptor) {
        let callback = descriptor.value;
        descriptor.value = function () {
            console.log(str);
            callback();
        }
    }
}

function outter() {
    return function (target) {
        console.log(target);
    }
}



function iii(target, name, descriptor) {
    return function(a,b,c) {
        console.log(a);
        console.log(b);
        console.log(c);
    }
}

// @iii()
class Haha {
    constructor(props) {
        this.props = props;
    }

   @iii()
    say() {
        console.log('haha');
    }    
}

new Haha().say()