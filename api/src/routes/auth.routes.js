// Vendor libs
const jwt = require('jsonwebtoken');
const users = require('../../data/users.json');

module.exports.login = (req, res) => {
  // Get environment variable
  const {
    ACCESS_TOKEN_SECRET,
    ACCESS_TOKEN_EXPIRATION,
    REFRESH_TOKEN_SECRET,
    REFRESH_TOKEN_EXPIRATION,
  } = process.env;

  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(403).json('Invalid data');
  }

  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) {
    return res.status(403).json('Invalid data');
  }

  const accessToken = jwt.sign(
    {
      userId: user.id,
      email: user.email,
      username: user.username,
    },
    ACCESS_TOKEN_SECRET,
    {
      expiresIn: ACCESS_TOKEN_EXPIRATION,
    }
  );

  const refreshToken = jwt.sign(
    {
      userId: user.id,
    },
    REFRESH_TOKEN_SECRET,
    {
      expiresIn: REFRESH_TOKEN_EXPIRATION,
    }
  );

  return res.json({
    accessToken,
    refreshToken,
  });
};

module.exports.profile = (req, res) => {
  res.json('profile');
};
