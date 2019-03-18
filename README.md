# Authentic-Couch | JWT boilerplate auth implementation

Install and run the client `cd frontend && npm install && npm start`  
Install and run the API `cd backend && npm install && npm start`  

Api on localhost:8080

Seeded in database:

```
Location = [
    "Oranienburg",
    "Potsdam",
    "Eisenhuettenstadt",
    "Stuttgart",
    "Rostock",
    "Hamburg"
];

User = {
    name: "alice",
    password: "password",
    admin: true
};
```

## Todos

Improve authentic couch to get: 
* Fork the repo and set it up on your github account
* Modularize the backend auth flow. Routerfiles, Controllerfiles, Folderstructure. Consider:
    * Seperate mail function  https://github.com/FBW-10/promisified-webscraper/blob/master/helper.js#L6
    * https://github.com/i0natan/nodebestpractices 1.1 Structure your solution by components
    * https://codeburst.io/fractal-a-nodejs-app-structure-for-infinite-scale-d74dda57ee11
* Implement this token auth flow https://softwareengineering.stackexchange.com/questions/318768/is-this-a-correct-jwt-authentication-implementation

* Registration flow: 
    * When click on register, send mail with verification link to user
    * mail contains smth. like http://DOMAIN:PORT/verify/VERIFICATION-TOKEN
    * User clicks and goes to GET verify route that flags the user as verifiedAt
