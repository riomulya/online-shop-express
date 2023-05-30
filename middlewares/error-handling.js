function handleErrors(error, req, res, next) {
  console.log(error);
  res.status(500).render('../views/shared/500.ejs');
}

module.exports = handleErrors;
