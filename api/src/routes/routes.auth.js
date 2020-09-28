// Vendor libs
const jwt = require('jsonwebtoken'); // Vendor libs

// Custom libs
const users = require('../../data/users.json');

// Save cookie to browser
function saveCookie(res, refreshToken) {
  res.cookie('jid', refreshToken, {
    httpOnly: true,
    domain: process.env.DOMAIN || 'localhost'
  });
}

module.exports.login = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(403).json('Invalid data');
  }

  // Validate user
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(403).json('Invalid data');
  }

  // Generate tokens
  const { accessToken, refreshToken } = generateTokens(user);

  // Save refresh token in cookie
  saveCookie(res, refreshToken);

  return res.json({
    accessToken,
    refreshToken
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
    roles: ['USER']
  };

  // Save user
  users.push(user);

  // Return tokens
  const { accessToken, refreshToken } = generateTokens(user);
  return res.json({
    accessToken,
    refreshToken
  });
};

module.exports.refresh_token = async (req, res) => {
  const token = req && req.cookies ? req.cookies.jid : null;

  // Check there is refresh token in cookie jid
  if (!token) {
    return res.json({ ok: false, accessToken: '' });
  }

  let payload;
  try {
    const { REFRESH_TOKEN_SECRET } = process.env;

    // Verify refresh token is valid
    payload = await jwt.verify(token, REFRESH_TOKEN_SECRET);

    // Check refresh-token exists in cookie
    if (!payload) {
      return res
        .status(403)
        .json({ ok: false, accessToken: '', refreshToken: '' });
    }

    // Get user
    const user = users.find(u => u.id === payload.userId);
    if (!user) {
      return res
        .status(403)
        .json({ ok: false, accessToken: '', refreshToken: '' });
    }

    // Return tokens
    const { accessToken, refreshToken } = generateTokens(user);

    // Save refresh token in cookie
    saveCookie(res, refreshToken);

    return res.json({
      accessToken,
      refreshToken
    });
  } catch (err) {
    return res
      .status(403)
      .json({ ok: false, accessToken: '', refreshToken: '' });
  }
};

module.exports.remove_refresh_token = (req, res) => {
  // Save refresh token in cookie
  saveCookie(res, '');
  res.json({ ok: true });
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
    REFRESH_TOKEN_EXPIRATION
  } = process.env;

  const accessToken = jwt.sign(
    {
      userId: user.id,
      email: user.email,
      username: user.username
    },
    ACCESS_TOKEN_SECRET,
    {
      expiresIn: ACCESS_TOKEN_EXPIRATION
    }
  );

  const refreshToken = jwt.sign(
    {
      userId: user.id
    },
    REFRESH_TOKEN_SECRET,
    {
      expiresIn: REFRESH_TOKEN_EXPIRATION
    }
  );

  return { accessToken, refreshToken };
}
