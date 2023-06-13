function checkAuthStatus(req, res, next) {
  // Meminta (request) uid di dalam database sesuai dengan waktu sessio yang berlaku
  const uid = req.session.uid;

  if (!uid) {
    return next();
  }

  // Membuat (response) uid dan isAuth ke dalam locals (di komputer user)
  res.locals.uid = uid;
  res.locals.isAuth = true;
  next();
}

module.exports = checkAuthStatus;
