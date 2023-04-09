## E-com 
###### using MERN with redux+tailwind css

- Backend Authentication

- Install necessary dependencies like bcrypt, jsonwebtoken, and express-validator.
- Create User model schema using mongoose for storing user data in MongoDB.
- Implement login, register, reset/forgot password, and email verification endpoints using Express.js.

- Role-based Authorization

- Create two types of user roles: general user and admin.
- Use jsonwebtoken to generate and verify tokens for authenticated users.
- Implement middleware functions that check if the user has the correct role before granting access to specific routes.
- Pagination, Filtering, and Searching Products
- Use mongoose's built-in methods to handle pagination and filtering on the server-side.
- Implement searching products by name, category, or any other relevant criteria using MongoDB's text search feature.

- User Profile Management

- Allow users to update their profile information, including address and contact details.
- Secure these endpoints by requiring authentication and role-based authorization.

- Stripe Payment Method Integration

- Use Stripe API to embed payment functionality into your website.
- Process payments securely and store relevant transaction and order data in your database.
- Order History and Delivery Tracking
- Allow users to view their purchase history and track their orders' delivery status.
- Use webhooks to notify users about order updates in real-time.
- Admin Dashboard for Product Management
- Create a separate dashboard for admins to manage products, categories, and other details.
- Use a UI framework like React, Tailwind CSS to make it more user-friendly.

- a fully functional eCommerce website built using the MERN stack. 

## Used Tech :

##### Frontend 
- react-js
- redux toolkit
- rtk query
- tailwind-css
- stripe payment

##### Backend
- node-js
- express-js
- mongodb
- mongoose
- jsonwebtoken
- joi
- bcrypt
- mailgun
- lodash

###### -----------# end for now 😀
