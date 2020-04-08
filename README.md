# serverless_api_gateway_lambda_example
This is a repository to show how to use serverless with some services of AWS.

## Deploy lambda services
Just run the command:

`sls deploy`

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