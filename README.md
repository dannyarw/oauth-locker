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

To run the apps (using the hardcoded port 3000)
```
node apps.js
```

## Running the tests

We need <a href="http://https://www.getpostman.com/">Postman</a> to test this app:

Step 1. Input user
http://localhost:3000/api/users
method : post
username = <username>
password = <password>

Step 2. Add client
http://localhost:3000/api/clients
method : post
name = <client-name>
id = this_is_my_id
secret = this_is_my_secret

Step 3. OTP authentication
Open in your browser:
```
http://localhost:3000/api/oauth2/authorize?client_id=this_is_my_id&response_type=code&redirect_uri=http://localhost:3000
```
You will get a code in this step. Just keep it.

Step 4. Exchange code into token 
```
http://localhost:3000/api/oauth2/token
```
method : POST
In body
content-type : x-www-form-urlencoded
code = <generated-code-from-first-step>
grant_type = authorization_code
redirect_uri = http://localhost:3000

Step 5. CRUD to recource server 
Test in new <a href="http://https://www.getpostman.com/">Postman</a> tab:
```
http://localhost:3000/api/items
```
In headers
Authorization = Bearer <generated-token-from-second-step>

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