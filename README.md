Project Name :##

Foodies Zone

Purpose :

This is the backend API for Local Food Lovers Network, built with Node.js, Express.js, and MongoDB. It manages all CRUD operations for reviews, favorites, and user data. The server handles data storage, retrieval, and authentication checks for the frontend client, ensuring a secure and efficient food review experience.

 Live API: https://foodies-zone-eta.vercel.app/

 Server Repository: https://github.com/Foyzullah9988/food_lovers_server

 Key Features
 Review Management (CRUD)

POST /reviews — Add a new review (only for logged-in users).

GET /reviews — Get all reviews.

GET /reviews/:id — Get a single review by ID.

GET /top-reviews — Get top 6 rated reviews for homepage.

PUT /reviews/:id — Update an users existing review.

DELETE /reviews/:id — Delete a user review by ID.

 Favorite System

POST /favorites — Add a review to the user’s favorites list.


DELETE /favorites/:id — Remove a review from users favorites .

 Search Feature

GET /reviews/search?food= — Search reviews by food name using MongoDB $regex operator .



Technologies Used

Node.js

Express.js

MongoDB 

dotenv for environment variables

CORS for client-server communication

 npm Packages Used
"express"
"cors"
"dotenv"
"mongodb"
"nodemon"

 Deployment

Hosted on Vercel

Connected to MongoDB Atlas

Deployed with environment variables for DB credentials and Firebase config

 API Example
// Example: Add Review
app.post('/reviews', async (req, res) => {
  const newReview = req.body;
  const result = await reviewCollection.insertOne(newReview);
  res.send(result);
});