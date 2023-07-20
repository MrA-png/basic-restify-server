
const updateUser = async (req, res) => {
    res.send(200, { message: `succes to update user with username ${req.params.username}`});
};

module.exports.updateUser = updateUser;