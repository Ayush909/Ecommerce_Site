const sendToken = (user,statuscode, res) => {
    const token = user.getJWTToken();

    res.status(statuscode).cookie('token',token).json({
        success : true,
        user,
        token
    })
}

module.exports = sendToken;