const express = require('express');
const router = express.Router();
const redisClient = require('../redis-client'); // Your Redis client configuration

// Store passkey
router.post('/store', async (req, res) => {
  try {
    const { email, passkey } = req.body;
    await redisClient.set(email, passkey, {
      EX: 3600 // Expires in 1 hour
    });
    res.json({ message: 'Passkey stored successfully' });
  } catch (error) {
    console.error('Redis store error:', error);
    res.status(500).json({ error: 'Failed to store passkey' });
  }
});

// Get passkey
router.get('/get/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const passkey = await redisClient.get(email);
    if (!passkey) {
      return res.status(404).json({ error: 'Passkey not found' });
    }
    res.json({ passkey });
  } catch (error) {
    console.error('Redis get error:', error);
    res.status(500).json({ error: 'Failed to retrieve passkey' });
  }
});

module.exports = router; 