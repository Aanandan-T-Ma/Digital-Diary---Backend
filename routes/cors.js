const cors = require('cors')

const whiteList = ['http://localhost:4000']
var corsOptionsDelegate = (req, callback) => {
    var corsOptions
    if(whiteList.indexOf(req.header('Origin')) !== -1){
        corsOptions = { origin: true }
    }
    else{
        corsOptions = { origin: false }
    }
    callback(null, corsOptions)
}

exports.cors = cors()
exports.corsWithOptions = cors(corsOptionsDelegate)