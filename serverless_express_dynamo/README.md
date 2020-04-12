# Serverless with Express and Dynamo

## Routes
### Insert an user
Method: `POST`

URL: `/{user}`

Body: 
```
{
    userId : '',
    name: '',
}
```

Response: Error message or userId and name of the user inserted. Like this:
```
{
    userId: {userId},
    name: {name},
}
```

### Generic route
Method: `GET`

URL: `/`

Response: Generic message.

### Get all users route
Method: `GET`

URL: `/users`

Response: All the users.