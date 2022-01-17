### run local dynamodb using Docker
```shell
docker run -p 8000:8000 -d amazon/dynamodb-local -jar DynamoDBLocal.jar -inMemory -sharedDb
```

### create table in local dynamodb
```shell
aws dynamodb create-table \
   --table-name Contacts \
   --attribute-definitions AttributeName=id,AttributeType=S \
   --key-schema AttributeName=id,KeyType=HASH \
   --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5 \
   --endpoint-url http://localhost:8000

```
