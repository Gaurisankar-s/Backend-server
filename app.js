const express = require('express');
const cors = require('cors');
const redisRoutes = require('./routes/redis');

const app = express();

// CORS configuration
app.use(cors({
    origin: 'http://localhost:4200', // Your Angular app URL
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}));

app.use(express.json());

// Redis routes
app.use('/api/redis', redisRoutes);

// ... your other routes ...

const PORT = process.env.PORT || 3010;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 