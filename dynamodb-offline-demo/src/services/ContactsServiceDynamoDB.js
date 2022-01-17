const client = require('./dynamodb/client');

class ContactsServiceDynamoDB {
  constructor() {
    this.client = client;
  }

  async persist({
    id, firstName, lastName, email, phone,
  }) {
    const params = {
      TableName: 'Contacts',
      Item: {
        id,
        firstName,
        lastName,
        email,
        phone,
      },
    };

    await this.client.put(params).promise();
  }

  async getAll() {
    const params = {
      TableName: 'Contacts',
    };

    const { Items } = await this.client.scan(params).promise();

    return Items;
  }

  async delete(id) {
    const params = {
      TableName: 'Contacts',
      Key: {
        id,
      },
    };

    await this.client.delete(params).promise();
  }
}

module.exports = ContactsServiceDynamoDB;
