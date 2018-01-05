import axios from 'axios'

class gdax {
    constructor() {
        this.BTCUSD = { asks: [[0]] }
        this.BCHUSD = { asks: [[0]] }
        this.ETHUSD = { asks: [[0]] }
    }

    getBook(left, right) {
        var bookname = left + '-' + right;
        axios.get('https://api.gdax.com/products/' + bookname + '/book')
            .then(response => {
                this[left + right] = response.data
                document.querySelector('#' + bookname + '-price .bid').innerHTML = this[left + right].bids[0][0];
                document.querySelector('#' + bookname + '-price .ask').innerHTML = this[left + right].asks[0][0];
            })
    }

    update() {
        var book = ['BTC', 'USD']
        this.getBook('BTC', 'USD')
        this.getBook('BCH', 'USD')
        this.getBook('ETH', 'USD')

        document.querySelector('#BCH-USD-price .btc').innerHTML = (this.BCHUSD.asks[0][0] / this.BTCUSD.asks[0][0]).toFixed(8);
        document.querySelector('#ETH-USD-price .btc').innerHTML = (this.ETHUSD.asks[0][0] / this.BTCUSD.asks[0][0]).toFixed(8);
        document.querySelector('title').innerHTML = '$' + this.BCHUSD.asks[0][0];
    }
}

gdax = new gdax()

function update() {
    setTimeout(function () {
        gdax.update()
        update()
    }, 2000)
}
update()