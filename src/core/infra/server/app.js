const restify = require('restify');
const { v1Router } = require('./api');

// const getRecentUser = async (req, res) => {
//     res.send(200, { message: 'succes to create user'});
// };

const createApp = async () => {
    const app = restify.createServer({
        name: 'server coba',
        version: '1.0.0'
    })
    
    app.use(restify.plugins.bodyParser());
    app.use(restify.plugins.queryParser());

    app.get('/', function (req, res, next){
        res.send(200, { message: 'success to get main server' });
    })

    //app.get('/users', getRecentUser);

    v1Router.routes(app);

    return app;
}

module.exports.createApp = createApp;