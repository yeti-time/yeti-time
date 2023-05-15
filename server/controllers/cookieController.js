const cookieController = {};

cookieController.setCookie = (req, res ,next) => {
  const { name } = req.body
  // if cookie with stored name exists, go to next middleware
  if (req.cookies && req.cookies.name) {
    return next();
  }
  // otherwise, create a cookie called name with the value of the name from req body
  res.cookie('name', name, {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // Expires in 30 days
  })
  return next();
};

cookieController.checkCookie = (req, res, next) => {
  const { id } = req.params;
  const name = req.cookies && req.cookies.name;

  // if cookie exists, go to next middleware
  if (name) {
    return next();
  } else {
    // if it does not exist, redirect to Modal (so we can create the cookie with the name they input)
    res.redirect(`/event/${id}`)
  }
}

module.exports = cookieController;