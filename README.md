
# Knix A Social media Web App

Knix is an in-progress social media app that lets users chat with friends, make new connections, and upload posts such as images. The app is under development and aims to provide an engaging platform for social interaction.

## Screenshots

![App Screenshot](https://github.com/amardas9127/knix-socialmedia-webapp/blob/main/Screenshot%202024-11-23%20153548.png)
![App Screenshot](https://github.com/amardas9127/knix-socialmedia-webapp/blob/main/Screenshot%202024-11-23%20153634.png)
![App Screenshot](https://github.com/amardas9127/knix-socialmedia-webapp/blob/main/Screenshot%202024-11-23%20153601.png)
![App Screenshot](https://github.com/amardas9127/knix-socialmedia-webapp/blob/main/Screenshot%202024-11-23%20153601.png)


## How to setup ?


Change this to your mongoDb connection string Backend/server.js

```javascript
    mongoose
  .connect("YOUR MONGODB CONNECTION STRING", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
```


In the Backend folder run the following commands.

```bash
    npm install

```

In the knixfrontend folder run the following commands.

```bash
    npm install
```


## How to Run ? (*note that it is still under developement)


In the Backend folder run the following commands.

```bash
     nodemon server.js
```
```bash
    ctrl+c then Y  //to stop the server
```

In the knixfrontend folder run the following commands.

```bash
    npm run dev
```
```bash
    ctrl+c then Y  //to stop the server
```

