# l2a3-cow-hut-backend-assignment-JawadJisan

### All Route Endpoints

#### User

https://digital-cow-hut-jawadjisan.vercel.app/

- https://digital-cow-hut-jawadjisan.vercel.app/api/v1/auth/signup (POST)
- https://digital-cow-hut-jawadjisan.vercel.app/api/v1/users (GET)
- https://digital-cow-hut-jawadjisan.vercel.app/api/v1/users/6177a5b87d32123f08d2f5d4 (Single GET) Include an id that is saved in your database
- https://digital-cow-hut-jawadjisan.vercel.app/api/v1/users/6177a5b87d32123f08d2f5d4 (PATCH)
- https://digital-cow-hut-jawadjisan.vercel.app/api/v1/users/6177a5b87d32123f08d2f5d4 (DELETE) Include an id that is saved in your database

#### Cows

- https://digital-cow-hut-jawadjisan.vercel.app/api/v1/cows (POST)
- https://digital-cow-hut-jawadjisan.vercel.app/api/v1/cows (GET)
- https://digital-cow-hut-jawadjisan.vercel.app/api/v1/cows/6177a5b87d32123f08d2f5d4 (Single GET) Include an id that is saved in your database
- https://digital-cow-hut-jawadjisan.vercel.app/api/v1/cows/6177a5b87d32123f08d2f5d4 (PATCH)
- https://digital-cow-hut-jawadjisan.vercel.app/api/v1/cows/6177a5b87d32123f08d2f5d4 (DELETE) Include an id that is saved in your database

#### Orders

- https://digital-cow-hut-jawadjisan.vercel.app/api/v1/orders (POST)
- https://digital-cow-hut-jawadjisan.vercel.app/api/v1/orders (GET)

### Create Order:

Request body:

```json
{
  "cow": "6473c6a50c56d0d40b9bb6a3", // cow reference _id
  "buyer": "“6473c6a50c56d0d40b9bb6a3" // user reference  _id
}
```
