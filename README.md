# dj

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

## API Endpoints

(Post the data in x-www-form-urlencoded)

Create User - (POST) /api/user/register
Example - Request body 
{ 
  "full_name": "FirstName LastName", // Required
  "email": "email@email.com",        // Required
  "password": "123password123"       // Required
}

Login User - (POST) /api/user/login
Example - Request body 
{ 
  "email": "email@email.com",        // Required
  "password": "123password123"       // Required
}

Read User - (GET) /api/user/user
Example - Request Header 
Authorizathion Bearer/Token
"Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2MDE0MDEzNDEsImV4cCI6MTYzMjkzNzM0MSwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXX0.n8QcR3SJvYAYTfhKTIR22C4551_zncrP7InX59i24QY"
