# oauth-locker

This is a library of authentication using telco capabilities (currently implemented using SMS OTP/One time password). This is very similar, but very limited version of Facebook Account Kit

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes

### Prerequisites

- NodeJs version 6.0
- MongoDB as data store
- Twilio Account for sending SMS (you can use trial version for testing)

### Installing


```
git clone https://github.com/saviourcat/telco-auth-kit.git
npm install
```
Create .env file for Twilio configuration at root project folder. The content will be like
```
TWILIO_ACCOUNT_SID=xxx
TWILIO_AUTH_TOKEN=xxx
```
To run the apps (using the hardcoded port 3000)
```
node apps.js
```

## Running the tests

1. OTP authentication
Open in brwoser:
```
http://localhost:3000/api/oauth2/authorize?client_id=this_is_my_id&response_type=code&redirect_uri=http://localhost:3000
```

2. Exchange code into token 
Test with <a href="http://https://www.getpostman.com/">Postman</a>:
```
http://localhost:3000/api/oauth2/token
```
method: POST
------------- Body ---------------
x-www-form-urlencoded
code = <generated-code-from-first-step>
grant_type = authorization_code
redirect_uri = http://localhost:3000
----------------------------------

3. CRUD to recource server 
Test in new <a href="http://https://www.getpostman.com/">Postman</a> tab:
```
localhost:3000/api/items
```
------------ Headers -------------
Authorization = Bearer <generated-token-from-second-step>
----------------------------------

For example, just test with GET method.

## Deployment

N/A

## Built With

* Express - The NodeJS web framework used
* And others. see package.json

## Contributing

Contact me

## Authors

* **Muhammad Rayhan** - *Initial work* - [My Github](https://github.com/saviourcat) - [My website](http://mdray.id)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone who's code was used
* Inspiration
* etc