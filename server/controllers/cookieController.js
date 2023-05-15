const cookieController = {};

cookieController.setCookie = (req, res ,next) => {
  res.cookie('name', req.body.user.name)
  return next();
}