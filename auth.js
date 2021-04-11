const auth = require('basic-auth');

const admins = {
  'username': { password: 'password' },
};

module.exports = function (request, response, next) {
  const user = auth(request);
  if (admins[user?.name]?.password !== user?.pass) {
    response.set('WWW-Authenticate', 'Basic');
    return response.status(401).send();
  }
  return next();
};