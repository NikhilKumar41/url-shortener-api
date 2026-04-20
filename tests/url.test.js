// Import required modules
const request = require('supertest'); // used to test APIs
const app = require('../src/app');    // import our app

// -----------------------------
// TEST: Home Route
// -----------------------------
describe('Basic API Test', () => {

    // Test if server is running
    it('should return API running message', async () => {

        // Send GET request to root
        const res = await request(app).get('/');

        // Expect response status 200
        expect(res.statusCode).toBe(200);

        // Expect correct message
        expect(res.text).toBe('URL Shortener API Running');
    });
});

// -----------------------------
// TEST: Create Short URL
// -----------------------------
describe('POST /shorten', () => {

    it('should create a short URL', async () => {

        // Send POST request
        const res = await request(app)
            .post('/shorten')
            .send({
                originalUrl: "https://google.com"
            });

        // Expect success
        expect(res.statusCode).toBe(200);

        // Check if shortUrl exists
        expect(res.body.shortUrl).toBeDefined();
    });
});