const redis = require("redis");

const redisClient = redis.createClient({
    url: "redis://localhost:6379"  // Default Redis port
});

redisClient.on("error", (err) => console.error("Redis error:", err));
redisClient.on("connect", () => console.log("Connected to Redis"));

(async () => {
    await redisClient.connect();
})().catch(err => console.error("Redis connection error:", err));

module.exports = redisClient; 