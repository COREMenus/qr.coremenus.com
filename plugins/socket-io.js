const {io} = require('socket.io-client')


export default ({app, store}, inject) => {
    console.log(process.env.BASE_URL)
    const socket = io(process.env.BASE_URL)

    inject('socket', socket)
}