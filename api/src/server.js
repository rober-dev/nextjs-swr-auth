// Vendor libs
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');

// Apollo libs
const { ApolloServer } = require('apollo-server-express');

// Custom libs
const authRoutes = require('./routes/routes.auth');
const catalogRoutes = require('./routes/routes.catalog');
const stockRoutes = require('./routes/routes.stock');

// GraphQL members
const resolvers = require('./graphql/resolvers');
const typeDefs = require('./graphql/type-defs');

// Load environment variables
dotenv.config();
const { PORT, NODE_ENV } = process.env;

const run = async () => {
  const apolloServer = new ApolloServer({ typeDefs, resolvers });

  // Add express to GraphQL server
  const app = express();
  app.use(bodyParser.json({ extended: false }));

  app.post('/auth/login', authRoutes.login);
  app.post('/auth/register', authRoutes.register);
  app.get('/catalog/brands', catalogRoutes.brands);
  app.get('/catalog/brands/:id', catalogRoutes.brandById);
  app.get('/catalog/products', catalogRoutes.products);
  app.get('/catalog/products/:id', catalogRoutes.productById);
  app.get('/catalog/products/:id/stock', stockRoutes.stockByProduct);

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
