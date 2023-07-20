
const getUserByUsername = async (req, res) => {
    res.send(200, { message: `succes to get user by username ${req.params.username}`});
};

module.exports.getUserByUsername = getUserByUsername;