

//const { userRouter } =  require("../../../../modules/users/infra/routes");//routes tidak menggunakan module-alias
//const { userRouter } =  require("@modules/users/infra/routes");//routes dengan menggunakan module-alias @modules
const { userRouter } =  require("@users");//routes dengan menggunakan module-alias @modules
const v1Router = (app) => {
    const apiVersionPath = '/api/v1';
    app.get('/api/v1', (req, res, next) => {
        res.send(200, { message : 'Server is up on version 1.0.0'});
    });

    userRouter.routes(apiVersionPath, app);
}

module.exports.v1Router = { routes : v1Router };