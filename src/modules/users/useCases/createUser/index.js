
const createUser = async (req, res) => {
    res.send(200, { message: 'succes to create user'});
};

module.exports.createUser = createUser;