const port = process.env.PORT || 8080;

exports.welcomeMessage = (req, res) => {
  res.json({
    message: `Welcome. The api-url is localhost:${port}/api.`
  });
};
