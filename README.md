# Full Stack Route Generator
## An application which generates a circular walking route based on the length of a given album

![image](https://github.com/Matt-HarveyCook/Full-Stack-Route-Generator/blob/main/assets/dashboard.png)

The dashboard showing the user's current routes

I built this web application independently over the summer to further my knowledge of web development and the MERN stack. It generates a circular route which you can walk while listening to a given album.

### Initial Objectives
1. Manage users and routes with a MongoDB database so that the data can be accessed through Express.js requests
2. Interact with both the Google and Spotify API to fetch albums and represent walking routes 
3. Create a responsive React.js user interface

### Outcomes
1. An easy to use website which requires only a single click to produce routes of varying lengths
2. Accesses the Spotify API to calculate the length of an album and fetch the album art
3. Users can manage their routes which updates instantly in browswer and sends a request to the database

### Moving Forward
1. Host the website using a service such as Heroku to begin finding users
2. Develop the route generation system so that different modes of transport can be used
3. Create a page for editing existing routes



![image](https://github.com/Matt-HarveyCook/Full-Stack-Route-Generator/blob/main/assets/login.png)

Showing the login page for existing users


![image](https://github.com/Matt-HarveyCook/Full-Stack-Route-Generator/blob/main/assets/albumDB.png)

An image of the MongoDB database storing the routes
