const express = require('express');
const router = express.Router();
const db = require('../config/firebase');

// Get all games
router.get('/', async (req, res) => {
  try {
    const snapshot = await db.collection('games').get();
    const games = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(games);
  } catch (error) {
    res.status(500).send('Error getting games: ' + error.message);
  }
});

// Create a new game
router.post('/', async (req, res) => {
  try {
    const { name, maxPlayers, minPlayers, description, complexityLevel } = req.body;
    const newGame = {
      name,
      maxPlayers,
      minPlayers,
      description,
      complexityLevel
    };
    const docRef = await db.collection('games').add(newGame);
    res.status(201).json({ id: docRef.id, ...newGame });
  } catch (error) {
    res.status(500).send('Error creating game: ' + error.message);
  }
});

// Additional routes for update and delete can be added here

module.exports = router;