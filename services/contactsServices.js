import { readFile, writeFile } from "fs/promises";
import { nanoid } from "nanoid";
import { join } from "path";

const contactsPath = join("db", "contacts.json");

export async function listContacts() {
  const data = await readFile(contactsPath, "utf8");
  const contacts = JSON.parse(data);
  return contacts;
}

export async function getContactById(contactId) {
  // ... код. Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
  const contacts = await listContacts();
  return contacts.find((contact) => contact.id === contactId) || null;
}

export async function addContact(name, email, phone) {
  // ...код. Повертає об'єкт доданого контакту (з id).
  const contact = {
    name,
    email,
    phone,
    id: nanoid(),
  };
  const contacts = await listContacts();
  contacts.push(contact);
  const data = JSON.stringify(contacts);
  await writeFile(contactsPath, data);
  return contact;
}

export async function removeContact(contactId) {
  // ...код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  const [removedContact] = contacts.splice(index, 1);
  await writeFile(contactsPath, JSON.stringify(contacts));
  return removedContact;
}
