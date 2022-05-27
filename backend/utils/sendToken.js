const sendToken = (user,statuscode, res) => {
    const token = user.getJWTToken();

    res.status(statuscode).cookie('token',token, {
        httpOnly  :true,
        expires : new Date( Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 *1000)
    }).json({
        success : true,
        token
    })
}

module.exports = sendToken;