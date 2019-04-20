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


@outter()
class Haha {
    constructor(props) {
        this.props = props;
    }

    say() {
        console.log('haha');
    }    


}

new Haha().say()