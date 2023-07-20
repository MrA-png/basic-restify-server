
const { createUser } = require("../../useCases/createUser");
const { getRecentUser } = require("../../useCases/getRecentUser");
const { getUserByUsername } = require("../../useCases/getUserByUsername");
const { updateUser } = require("../../useCases/updateUser");
const { deleteUser } = require("../../useCases/deleteUser");

const userRouter = (apiVersionPath, app) => {
    //api versionPath : /api/v1
    app.post(apiVersionPath + '/users', createUser);
    app.get(apiVersionPath + '/users', getRecentUser);
    app.get(apiVersionPath + '/users/:username', getUserByUsername);
    app.put(apiVersionPath + '/users/:username', updateUser);
    app.del(apiVersionPath + '/users/:username', deleteUser);
}

module.exports.userRouter = { routes: userRouter};