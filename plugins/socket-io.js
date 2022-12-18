const {io} = require('socket.io-client')


export default ({app, store}, inject) => {
    const socket = io(process.env.BASE_URL)

    inject('socket', socket)
}