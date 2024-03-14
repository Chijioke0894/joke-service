## My Jokes

This is our high-quality wobbles API. You can use this API to request
and remove different wobbles at a low wibble price.

### get a random joke

Lists all wobbles for a particular account.

```endpoint
GET /jokes/random
```

#### Example request

```curl
$ curl http://localhost:3000/jokes/random
```

#### Example response

```json
[
  {
    "id": 1,
    "category": "music",
    "joke": "How do you make a bandstand? Take away their chairs",
    "like_count": 0,
    "dislike_count": 0
  }
]
```

### Create A new Joke category

Creates a new, empty wobble.

```endpoint
POST /categories
```

#### Example request

```curl
curl -X POST https://localhost:3000/categories
```

```bash
$ wbl wobbles create
```

#### Example request body

```json
{
  "category": "engineering"
}
```

#### Example response

```json
{
  "message": "Category added successfully",
  "id": 2
}
```

### Retrieve a random joke from a category

Returns a single wobble.

```endpoint
GET /jokes/random/:category
```

Retrieve information about an existing wobble.

#### Example request

```curl
curl http://localhost:3000/jokes/random/music
```

#### Example response

```json
{
  "id": 1,
  "category": "music",
  "joke": "How do you make a bandstand? Take away their chairs",
  "like_count": 0,
  "dislike_count": 0
}
```

### Retrieve a list of categories

Returns a single wobble.

```endpoint
GET /categories
```

Retrieve information about an existing wobble.

#### Example request

```curl
curl http://localhost:3000/categories
```

#### Example response

```json
["music", "engineering"]
```

### Retrieve all jokes for a category

Returns all jokes in a category.

```endpoint
GET jokes/:category
```

Retrieve information about an existing wobble.

#### Example request

```curl
curl http://localhost:3000/jokes/music
```

#### Example response

```json
{
  "id": 1,
  "category": "music",
  "joke": "How do you make a bandstand? Take away their chairs",
  "like_count": 0,
  "dislike_count": 0
}
```

### Retrieve a joke by id

Returns a joke by its id number

```endpoint
GET jokes/:id
```

Retrieve information about an existing wobble.

#### Example request

```curl
curl http://localhost:3000/jokes/1
```

#### Example response

```json
{
  "id": 1,
  "category": "music",
  "joke": "How do you make a bandstand? Take away their chairs",
  "like_count": 0,
  "dislike_count": 0
}
```

### Add A new Joke to a category

Creates a new joke in a named category.

```endpoint
POST /jokes
```

#### Example request

```curl
curl -X POST https://localhost:3000/jokes
```

```bash
$ wbl wobbles create
```

#### Example request body

```json
{
  "category": "engineering"
  "joke": "Architects are just engineers who can't do math"
}
```

#### Example response

```json
{
  "message": "Joke added successfully",
  "id": 3
}
```

### Add an existing joke to a category by id

Updates an existing joke to a new category.

```endpoint
PUT /jokes/:id/category
```

#### Example request

```curl
curl -X POST https://localhost:3000/jokes/3/category
```

```bash
$ wbl wobbles create
```

#### Example request body

```json
{
  "id": 3
  "category": "music"
}
```

#### Example response

```json
{
  "message": "Joke 3 updated with category music"
}
```

### Give a joke by id a a vote of like or dislike

Gives a joke a vote.

```endpoint
PUT /jokes/:id/vote
```

#### Example request

```curl
curl -X POST https://localhost:3000/jokes/3/vote
```

```bash
$ wbl wobbles create
```

#### Example request body

```json
{
  "id": 3
  "vote": "like"
}
```

#### Example response

```json
{
  "message": "Vote recorded for joke 3"
}
```
