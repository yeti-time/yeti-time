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

module.exports = cookieController;