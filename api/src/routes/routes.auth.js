// Vendor libs
const jwt = require('jsonwebtoken');

// Custom libs
const users = require('../../data/users.json');

module.exports.login = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(403).json('Invalid data');
  }

  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) {
    return res.status(403).json('Invalid data');
  }

  const { accessToken, refreshToken } = generateTokens(user);
  return res.json({
    accessToken,
    refreshToken,
  });
};

module.exports.register = (req, res) => {
  // Verify data
  const { email, password, username, fullname } = req.body;
  if (!email || !password || !username) {
    return res.status(422).json('Invalid data');
  }

  // Create user
  const user = {
    id: users.length + 1,
    email,
    username,
    password,
    fullname,
    roles: ['USER'],
  };

  // Save user
  users.push(user);

  // Return tokens
  const { accessToken, refreshToken } = generateTokens(user);
  return res.json({
    accessToken,
    refreshToken,
  });
};

function generateTokens(user) {
  if (!user || !user.id || !user.email || !user.username) {
    return null;
  }

  // Get environment variable
  const {
    ACCESS_TOKEN_SECRET,
    ACCESS_TOKEN_EXPIRATION,
    REFRESH_TOKEN_SECRET,
    REFRESH_TOKEN_EXPIRATION,
  } = process.env;

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

  return { accessToken, refreshToken };
}
