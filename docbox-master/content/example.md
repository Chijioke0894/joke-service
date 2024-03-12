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

### Delete a wobble

Deletes a wobble, including all wibbles it contains.

```endpoint
DELETE /wobbles/v1/{username}/{wobble_id}
```

#### Example request

```curl
curl -X DELETE https://wobble.biz/wobbles/v1/{username}/{wobble_id}
```

```bash
$ wbl wobble delete-wobble wobble-id
```

```python
resp = wobbles.delete_wobble(wobble_id)
```

```javascript
client.deleteWobble("wobble-id", function (err) {
  if (!err) console.log("deleted!");
});
```

#### Example response

> HTTP 204

### List wibbles

List all the wibbles in a wobble. The response body will be a
WobbleCollection.

```endpoint
GET /wobbles/v1/{username}/{wobble_id}/wibbles
```

#### Example request

```curl
curl https://wobble.biz/wobbles/v1/{username}/{wobble_id}/wibbles
```

```bash
$ wbl wobble list-wibbles wobble-id
```

```python
collection = wobbles.list_wibbles(wobble_id).json()
```

```javascript
client.listWobbles("wobble-id", {}, function (err, collection) {
  console.log(collection);
});
```

#### Example response

```json
{
  "type": "Wobble",
  "wibbles": [
    {
      "id": "{wibble_id}",
      "type": "Wobble",
      "properties": {
        "prop0": "value0"
      }
    },
    {
      "id": "{wibble_id}",
      "type": "Wobble",
      "properties": {
        "prop0": "value0"
      }
    }
  ]
}
```

### Insert or update a wibble

Inserts or updates a wibble in a wobble. If there's already a wibble
with the given ID in the wobble, it will be replaced. If there isn't
a wibble with that ID, a new wibble is created.

```endpoint
PUT /wobbles/v1/{username}/{wobble_id}/wibbles/{wibble_id}
```

#### Example request

```curl
curl https://wobble.biz/wobbles/v1/{username}/{wobble_id}/wibbles/{wibble_id} \
  -X PUT \
  -d @file.geojson
```

```bash
$ wbl wobble put-wibble wobble-id wibble-id 'geojson-wibble'
```

```javascript
var wibble = {
  type: "Wobble",
  properties: { name: "Null Island" },
};
client.insertWobble(wibble, "wobble-id", function (err, wibble) {
  console.log(wibble);
});
```

#### Example request body

```json
{
  "id": "{wibble_id}",
  "type": "Wobble",
  "properties": {
    "prop0": "value0"
  }
}
```

| Property | Description                                |
| -------- | ------------------------------------------ |
| `id`     | the id of an existing wibble in the wobble |

#### Example response

```json
{
  "id": "{wibble_id}",
  "type": "Wobble",
  "properties": {
    "prop0": "value0"
  }
}
```

### Retrieve a wibble

Retrieves a wibble in a wobble.

```endpoint
GET /wobbles/v1/{username}/{wobble_id}/wibbles/{wibble_id}
```

#### Example request

```curl
curl https://wobble.biz/wobbles/v1/{username}/{wobble_id}/wibbles/{wibble_id}
```

```bash
$ wbl wobble read-wibble wobble-id wibble-id
```

```javascript
client.readWobble("wibble-id", "wobble-id", function (err, wibble) {
  console.log(wibble);
});
```

```python
wibble = wobbles.read_wibble(wobble_id, '2').json()
```

#### Example response

```json
{
  "id": "{wibble_id}",
  "type": "Wobble",
  "properties": {
    "prop0": "value0"
  }
}
```

### Delete a wibble

Removes a wibble from a wobble.

```endpoint
DELETE /wobbles/v1/{username}/{wobble_id}/wibbles/{wibble_id}
```

#### Example request

```javascript
client.deleteWobble("wibble-id", "wobble-id", function (err, wibble) {
  if (!err) console.log("deleted!");
});
```

```curl
curl -X DELETE https://wobble.biz/wobbles/v1/{username}/{wobble_id}/wibbles/{wibble_id}
```

```python
resp = wobbles.delete_wibble(wobble_id, wibble_id)
```

```bash
$ wbl wobble delete-wibble wobble-id wibble-id
```

#### Example response

> HTTP 204
