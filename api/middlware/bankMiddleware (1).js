const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).send({ success: false, message: 'Token não fornecido' });
  }

  jwt.verify(token, 'your_secret_key', (err, decoded) => {
    if (err) {
      return res.status(403).send({ success: false, message: 'Token inválido' });
    }

    req.user = decoded;
    next();
  });
};

module.exports = authMiddleware;
