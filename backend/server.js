const express = require('express');
const bodyParser = require('body-parser');
const db = require('./config/firebase');

const app = express();
app.use(bodyParser.json());

// Import routes
const gameRoutes = require('./routes/games');
app.use('/api/games', gameRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});