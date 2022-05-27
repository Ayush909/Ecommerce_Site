module.exports = (theFunc) => (req,res,next) => {
    Promise.resolve(theFunc(req,res,next)).catch(next);
}

// currying is used here
/*
function catchAsyncError(theFunc){
    return function(req,res,next) {
        Promise.resolve(theFunc(req,res,next))
            .catch(next);
    }
}
*/