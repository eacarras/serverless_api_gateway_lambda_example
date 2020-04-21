# serverless_api_gateway_lambda_example
This is a repository to show how to use serverless with some services of AWS. We have for the moment 4 projects:

- Example of creation of endpoints using NodeJs, Serverless and others..
- - Folder name (endpoints_examples)
- Check password strength endpoint.
- - Folder name (password_strenth)
- Simple CRUD with Express and Dynamo using Serverless
- - Folder name and documentation (serverless_express_dynamo)
- Simple CRUD to an RDS instance with Serverless
- - Folder name (crud_rd)(mini quick project)(just a template not worked at all)
- Simple application connected to a s3 bucket
- - Folder name (s3)

And some utils:

- Example about use API_Keys with serverless
-- Folder name (api_keys)

## Endpoints
In the password strength project we only have one endpoint:

```
{route}/password/{password}
```

### Deploy lambda services
Just run the command:

`sls deploy`

With a specific stage you need to do:

`sls deploy --stage {stage}`

### Test your lambda uploaded
You can run the following command in order to test your lambda:

```
sls invoke -f {functionName} -s {environment}
```

If you want you can omit the use of the flag `-s` and by default the values would be `dev`.

If you can to test your function without call to AWS you can run:

```
sls invoke local -f {functionName} -s {environment}
```

This last command will help you to work locally with your changes.

If you want to pass any parameter one way to do it is using the following command:

```
sls invoke local -f {functionName} -s {environment} -d {data}
```

If you will pass a object in the data maybe you can considerer to have this struture

```
'{"key": "value", ..... , "keyN": "valueN"}'
```

NOTE: This project have a setup to be worker offline

### Delete all our process in the cloud

You can delete all our process and configurations in AWS using the following command

```
sls remove
```

NOTE: This command delete the lambdas and the endpoints created in AWS. NOT WILL DELETE YOUR LOCAL WORK.

### Profile
Remember in the manage of the credentials in the aws console you can manage some credentials to your differents users.

Yoy can manage your own credential locally in the file
```
~/.aws/credentials
```

### Others
Take into account when you are in some services like `S3` we need to add the permissions to role.