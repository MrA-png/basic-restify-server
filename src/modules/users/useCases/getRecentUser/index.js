
const getRecentUser= async (req, res) => {
    res.send(200, { message: `succes to get recent user with username ${req.params.username}`});
};

module.exports.getRecentUser = getRecentUser;