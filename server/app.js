require('dotenv').config();

const express = require('express');
const { createHandler } = require('graphql-http/lib/use/express');
const cors = require('cors');

const schema = require('./schema/schema');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const app = express();

// MongoDB connection and app startup
(async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    // Check connection
    mongoose.connection.on('connected', () => {
      console.log('Connected to MongoDB');
    });

    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });

    app.use(express.json());
    app.use(cors());

    app.use((req, res, next) => {
      const authHeader = req.headers.authorization;
      if (authHeader) {
        const token = authHeader.replace('Bearer ', '');
        try {
          const decoded = jwt.verify(token, 'supersecretkey');
          req.user = decoded;
        } catch (err) {
          req.user = null;
        }
      }
      next();
    });

    // GraphQL endpoint - supports both GET and POST
    app.all(
      '/graphql',
      createHandler({
        schema,
        context: (req) => ({ user: req.raw ? req.raw.user : req.user })
      })
    );

    // Serve the GraphiQL IDE
    app.get('/graphiql', (req, res) => {
      res.type('html').send(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>GraphiQL</title>
            <style>
              body {
                height: 100%;
                margin: 0;
                width: 100%;
                overflow: hidden;
              }
              #graphiql {
                height: 100vh;
              }
            </style>
            <script
              crossorigin
              src="https://unpkg.com/react@18/umd/react.production.min.js"
            ></script>
            <script
              crossorigin
              src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"
            ></script>
            <link rel="stylesheet" href="https://unpkg.com/graphiql@3.0.6/graphiql.min.css" />
          </head>
          <body>
            <div id="graphiql">Loading...</div>
            <script
              src="https://unpkg.com/graphiql@3.0.6/graphiql.min.js"
              type="application/javascript"
            ></script>
            <script>
              const fetcher = GraphiQL.createFetcher({
                url: '/graphql',
              });
              
              ReactDOM.render(
                React.createElement(GraphiQL, { fetcher: fetcher }),
                document.getElementById('graphiql'),
              );
            </script>
          </body>
        </html>
      `);
    });


    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log(`Now listening for requests on port ${PORT}`);
      console.log(`GraphiQL available at http://localhost:${PORT}/graphiql`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
})();
