# Nessus - Node server

Node server that provides the API for [nessu-ui](https://github.com/guglio/nessus-ui) project.

You can see the response here (with 2 hosts):   
    [https://nessus-ui.herokuapp.com/download/request?host=2](https://nessus-ui.herokuapp.com/download/request?host=2)


## Structure of the application

```ANSI
.
├── README.md
├── package-lock.json
├── package.json
├── data
│   ├── ports.json
│   └── usernames.json
└── server.js

```
- __ports.json__ : list of ports numbers and corresponding name. The structure is the following:
```json
[
  {
    "name": "port name",
    "number": "port number"
  }
]
```
- __usernames.json__ : array of names.
- __server.js__ : Node server that:
    1. get the request if the `/download/request?host=` is called
    2. get the value of `host`
    3. create an array of object(s) with random data, using `ports.json` and `usernames.json`
    4. set this array as the value of `configurations`
    5. send back the response

## API structure

The API called use this schema: 'http://[server]/download/request?host=2'</br>
For this project, the server is hosted on [Heroku](https://www.heroku.com).
The response's return uses this schema:
```json
{
  "configurations" : [
    {
      "name" : "name of the host",
      "hostname" : "hostname",
      "port" : "port number",
      "username" : "username"
    }
  ]
}
```
Based on the query `host`, the server generates random hosts.

This API can be tested even without the application, just open the browser and insert into the address bar [https://nessus-ui.herokuapp.com/download/request?host=2](https://nessus-ui.herokuapp.com/download/request?host=2) (change the host=2 to host=100 to request 100 random hosts).

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need a local machine with [Node.js](https://nodejs.org/en/) installed and [npm](https://www.npmjs.com/) to install the required packages

### Installing

To install this project, you need to clone or download the repository (more info [here](https://help.github.com/articles/cloning-a-repository/) on how to clone with different platforms):

__MacOS__

Open terminal and type:
```shell
git clone https://github.com/guglio/nessus.git
cd nessus
npm install
```

## Running the application

To start the development environment run in the project directory the following command:
```shell
npm start
```

Then open the browser and type in the address bar [`http://localhost:8080/`](http://localhost:8080/)

If the terminal gives you errors, it's probably because the port 8080 is already been in use, so I suggest to change it to a different port number.
The code to change is the follow:
from this...
```javascript
    HTTP_PORT   = process.env.PORT || 8080;
```
to this (just to give you an example)
```javascript
    HTTP_PORT   = process.env.PORT || 1025;
```

## Built With

* [Express](https://expressjs.com/) - Web framework for Node.js
* [Heroku](https://www.heroku.com) - cloud application server
* [npm](https://www.npmjs.com/) - Package manager
* [Atom](https://atom.io/) - text editor


## Versioning

I use git for versioning.

## Author

[Guglielmo Turco](https://github.com/guglio)
