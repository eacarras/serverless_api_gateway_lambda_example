# Serverless with Express and Dynamo
To work locally with DynamoDb and serverless, you need to run the following commands:
```
sls dynamodb install
```

After that you need to run:
```
sls offline start
```

## Table
The table only have two fields:
- userId
- name

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

Response: Error message or userId and name of the user inserted. The response looks like this:
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

Response: All the users. The response looks like this:
```
{
    success: true,
    message: 'Users getted successfully.',
    users: {users},
}
```

### Get specific user
Method: `GET`

URL: `/user/:userId`

Response: The data of the user specified. Something like this:
```
{
    userId: {userId},
    name: {name}
}
```