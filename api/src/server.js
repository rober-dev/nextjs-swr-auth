// Vendor libs
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

// Apollo libs
const { ApolloServer } = require('apollo-server-express');

// Custom libs
const authRoutes = require('./routes/routes.auth');

// GraphQL members
const resolvers = require('./graphql/resolvers');
const typeDefs = require('./graphql/type-defs');

// Load environment variables
dotenv.config();

const { WEB_PWA, WEB_ADMIN, PORT, NODE_ENV, FALLBACK_LANGUAGE } = process.env;

const run = async () => {
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    tracing: true,
    subscriptions: false,
    engine: false,
    context: async ({ req, res }) => {
      const lng = req.headers.lng || FALLBACK_LANGUAGE;
      const storeKey = req.headers['store-key'];
      const userId = req.headers['authorization'];
      return {
        lng,
        storeKey,
        userId
      };
    }
  });

  // Add express to GraphQL server
  const app = express();
  app.use(cookieParser());
  app.use(bodyParser.json({ extended: false }));

  // Setup cors
  const corsOptions = {
    credentials: true,
    origin: [WEB_PWA, WEB_ADMIN]
  };
  app.use(cors(corsOptions));

  // Express routes
  app.get('/healthcheck', (req, res) => res.json('ok'));
  app.post('/auth/login', authRoutes.login);
  app.post('/auth/register', authRoutes.register);
  app.get('/auth/refresh-token/', authRoutes.refresh_token);
  app.post('/auth/remove-refresh-token/', authRoutes.remove_refresh_token);

  apolloServer.applyMiddleware({ app });

  // Start server
  app.listen({ port: PORT }, () => {
    console.log(
      `🚀 Server ready at http://localhost:${PORT}${apolloServer.graphqlPath}`
    );
  });
};

// ---------------------------------------------------
// START SERVER
// ---------------------------------------------------
try {
  run();
} catch (e) {
  logger.error(`Error starting server on ${NODE_ENV} mode`, e.message, e.stack);
}
