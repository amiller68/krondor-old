# Krondor

This code base describe my personal website http://www.krondor.org. Right now there's a-lot left to do, including implementing user authentication, HTTPS, application state, and much more.

If you want to help me make a cool website and place to share ideas, feel free to clone the repo, make a new branch, and submit a feature request through a functioning pull request. I hope to define a testing infrastructure in the near future in order to make this system more manageable and accessible.


## Development server

Currently, you can only add content to the site when running the project in development mode, in conjunction with server.js. 
Run `ng build --watch -c development` in order to build the project correctly, and `node server.js` in order to be able to handle content-change requests from the interface.

## Production deployment

When run in production mode, the interface doesn't give users the option to add or modify content; this is to stop people from messing with my content before I implement user authentication.
In order to run the server properly when deployd, use `NODE_ENV=prouction node server.js`

The way `server.js` is configured to run and deployed on Heroku, production builds won't run properly when being tested locally. in my development framework, Production implies the use of HTTPS, which isn't implemented natively, but through Heroku's load balancer.
## Notes and Acknowledgments 
 - This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.1.2.

 - Shout out to [Jordan Scales](https://github.com/jdan) for providing a great retro CSS styling library and examples. You helped make my site what I imagined it to be!

