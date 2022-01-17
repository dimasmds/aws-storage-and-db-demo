const ContactsServiceDynamoDB = require('../ContactsServiceDynamoDB');
const TestHelper = require('./TestHelper');

describe('ContactsServiceDynamoDB', () => {
  const contactService = new ContactsServiceDynamoDB();

  beforeAll(async () => {
    await TestHelper.cleanAllContacts();
  });

  describe('persist', () => {
    it('should persist a contact correctly', async () => {
      const contact = {
        id: 'contact-123',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@dicoding.com',
        phone: '+6281234567890',
      };

      await contactService.persist(contact);

      const results = await TestHelper.findContactsById(contact.id);
      expect(results.length).toBe(1);
    });
  });

  describe('getAll', () => {
    it('should return all saved contacts', async () => {
      const contacts = [
        {
          id: 'contact-123',
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@dicoding.com',
          phone: '+6281234567890',
        },
        {
          id: 'contact-456',
          firstName: 'Jane',
          lastName: 'Doe',
          email: 'jane@dicoding.com',
          phone: '+6281234567891',
        },
        {
          id: 'contact-789',
          firstName: 'Jack',
          lastName: 'Doe',
          email: 'jack@dicoding.com',
          phone: '+6281234567892',
        },
        {
          id: 'contact-101112',
          firstName: 'Albert',
          lastName: 'Doe',
          email: 'albert@dicoding.com',
          phone: '+6281234567893',
        },
      ];
      await Promise.all(contacts.map((contact) => contactService.persist(contact)));

      const results = await contactService.getAll();

      expect(results.length).toBe(4);
    });
  });

  describe('delete', () => {
    it('should delete a contact correctly', async () => {
      const contact = {
        id: 'contact-123',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@dicoding.com',
      };
      await contactService.persist(contact);

      await contactService.delete(contact.id);

      const results = await TestHelper.findContactsById(contact.id);
      expect(results.length).toBe(0);
    });
  });
});
