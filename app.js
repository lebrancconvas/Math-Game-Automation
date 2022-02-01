const psg = require('./src/product-sum-game/psg');

const app = async() => {
    try {
        const result = await psg();
        if (result === undefined) {
            console.log("App is Running.");
        } else {
            console.log(result);
        }
    } catch (err) {
        console.log(err);
    }
}

app();