const client = require('../dynamodb/client');

const TestHelper = {
  async findContactsById(id) {
    const result = await client.query({
      TableName: 'Contacts',
      KeyConditionExpression: 'id = :id',
      ExpressionAttributeValues: {
        ':id': id,
      },
    }).promise();

    return result.Items;
  },

  async cleanAllContacts() {
    const result = await client.scan({
      TableName: 'Contacts',
    }).promise();

    const deletePromises = result.Items.map((item) => client.delete({
      TableName: 'Contacts',
      Key: {
        id: item.id,
      },
    }).promise());

    await Promise.all(deletePromises);
  },
};

module.exports = TestHelper;
