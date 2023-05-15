const cookieController = {};

cookieController.setCookie = (req, res ,next) => {
  const { name } = req.body

  if (req.cookies && req.cookies.name) {
    return next();
  }

  res.cookie('name', name, {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // Expires in 30 days
    httpOnly: true // Cookies is accessible only via HTTP(S)
  })
  return next();
};

cookieController.checkCookie = (req, res, next) => {
  const { id } = req.params;
  const name = req.cookies && req.cookies.name;

  if (name) {
    console.log('cookie name exists', name)
    return next();
  } else {
    console.log('Cookie name not found, redirecting to modal')
    res.redirect(`/event/${id}`)
  }
}

module.exports = cookieController;