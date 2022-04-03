# Krondor

This code base describe my personal website http://www.krondor.org. Right now there's a-lot left to do, including implementing user authentication, HTTPS, application state, and much more.

If you want to help me make a cool website and place to share ideas, feel free to clone the repo, make a new branch, and submit a feature request through a functioning pull request. I hope to define a testing infrastructure in the near future in order to make this system more manageable and accessible.

## Tech Stack

- The code base was built using the Angular Framework
- The server hosting its content is written in Node.js; it's an express server
- The compiled source code is then hosted by Heroku, which both:
  - deploys it using its integration with GitHub
  - and encrypts server traffic over SSL (I had to spring for the Hobbyist Version in order to do this)
- The Auth Service is provided by Auth0
- And the data hosting is implemented using MongoDB

## Future Plans

- Port over to AWS
- add more content

## Development server

Currently, you can only add content to the site when running the project in development mode, in conjunction with server.js. 
Run `ng build --watch -c development` in order to build the project correctly, and `node server.js` in order to be able to handle content-change requests from the interface.

You will need to provide your own MongoDb Endpoint in order to test this locally. Input your server url into a file called `mongodb.uri` in the top level directory.
## Production deployment

When run in production mode, the interface doesn't give users the option to add or modify content; this is to stop people from messing with my content before I implement user authentication.
In order to run the server properly when deployd, use `NODE_ENV=prouction node server.js`

The way `server.js` is configured to run and deployed on Heroku, production builds won't run properly when being tested locally.
## Notes and Acknowledgments 
 - This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.1.2.

 - Shout out to [Jordan Scales](https://github.com/jdan) for providing a great retro CSS styling library and examples. You helped make my site what I imagined it to be!

