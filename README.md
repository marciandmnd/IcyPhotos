# IcyPhotos

Photo sharing and gallery application. Built with Node/Express/MongoDB

## Getting Started

```
git clone https://github.com/marciandmnd/IcyPhotos.git
cd IcyPhotos
npm install
```

Next, configure the necessary environment variables. See Prerequisites section below.

```
npm start
```

### Prerequisites

IcyPhotos uses AWS S3 for storing photos. Also, MongoDB is used to store photo meta data and user data. So, the following environment variables are required: 

```
AWS_ACCESS_KEY_ID=xxx
AWS_SECRET_ACCESS_KEY=xxx
S3_BUCKET=xx
MONGODB_URI=xx
```

These environement variables should be placed in a `.env` file in the project's root directory.

### Installing

A step by step series of examples that tell you have to get a development env running

Say what the step will be

```
Give the example
```

And repeat

```
until finished
```

End with an example of getting some data out of the system or using it for a little demo

## Running the tests

`npm test`

## Deployment

IcyPhotos is pre-configured to be easily deployed to Heroku. Simply push the repo to your Heroku node application.

## Built With

* [Node](https://nodejs.org/en/) - The web framework used
* [Express](https://expressjs.com/) - Dependency Management
* [https://www.mongodb.com/](https://rometools.github.io/rome/) - Used to generate RSS Feeds

## Contributing

Pull requests welcome!

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Marcian Diamond** - *Initial work* - [marcian.guru](https://www.marcian.guru)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

Authors of *Node.js in Action*:
* Mike Cantelon
* Marc Harter
* T.J. Holowaychuk
* Nathan Rajlich
