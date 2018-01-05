import axios from 'axios'

function update() {
    setTimeout(function () {
        axios.get('https://api.gdax.com/products/BTC-USD/book')
            .then(function (response) {
                document.querySelector('#btc-price .bid').innerHTML = response.data.bids[0][0];
                document.querySelector('#btc-price .ask').innerHTML = response.data.asks[0][0];
            })
        axios.get('https://api.gdax.com/products/BCH-USD/book')
            .then(function (response) {
                document.querySelector('#bch-price .bid').innerHTML = response.data.bids[0][0];
                document.querySelector('#bch-price .ask').innerHTML = response.data.asks[0][0];
                document.querySelector('#bch-price .btc').innerHTML = (response.data.asks[0][0] / document.querySelector('#btc-price .ask').innerHTML).toFixed(4);
                document.querySelector('title').innerHTML = '$' + response.data.asks[0][0];
            })
        axios.get('https://api.gdax.com/products/ETH-USD/book')
            .then(function (response) {
                document.querySelector('#eth-price .bid').innerHTML = response.data.bids[0][0];
                document.querySelector('#eth-price .ask').innerHTML = response.data.asks[0][0];
                document.querySelector('#eth-price .btc').innerHTML = (response.data.asks[0][0] / document.querySelector('#btc-price .ask').innerHTML).toFixed(4);
            })
        update()
    }, 2000)
}

update()