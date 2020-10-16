# dj

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run express

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

## API Endpoints
<br />
> (Post the data in x-www-form-urlencoded) <br />
<br />
Create User - (POST) /api/user/register <br />
Example - Request body <br />
{ "full_name": "FirstName LastName", // Required <br />
  "email": "email@email.com", // Required <br />
  "password": "123password123" // Required } <br />
<br />
Login User - (POST) /api/user/login <br />
Example - Request body <br />
{ "email": "email@email.com", // Required <br />
  "password": "123password123" // Required } <br />
<br />
Read User - (GET) /api/user/user <br />
Example - Request Header <br />
Authorizathion Bearer/Token <br />
"Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2MDE0MDEzNDEsImV4cCI6MTYzMjkzNzM0MSwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXX0.n8QcR3SJvYAYTfhKTIR22C4551_zncrP7InX59i24QY"
