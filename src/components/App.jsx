import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import css from './App.module.css';
import Form from './Form/Form';
import { Contacts } from './Contacts/contacs';
import { Filter } from './Filter/Filter';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const storedContacts = JSON.parse(localStorage.getItem('contacts')) || [];
    setContacts(storedContacts);
  }, []);

  const onChangeInput = event => {
    const { value } = event.currentTarget;
    setFilter(value);
  };

  const addContact = ({ name, number }) => {
    if (
      contacts.some(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      alert(`${name} is already in contacts`);
    } else {
      const newContact = { id: nanoid(), name: name, number: number };
      const updatedContacts = [...contacts, newContact];
      setContacts(updatedContacts);
      localStorage.setItem('contacts', JSON.stringify(updatedContacts));
    }
  };

  const deleteContact = id => {
    const filteredContacts = contacts.filter(contact => contact.id !== id);
    setContacts(filteredContacts);
    localStorage.setItem('contacts', JSON.stringify(filteredContacts));
  };

  const filterContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  return (
    <div className={css.main}>
      <h1>Phonebook</h1>
      <Form addContact={addContact} />
      <h2>Contacts</h2>
      <Filter filter={filter} onChangeInput={onChangeInput} />
      <Contacts deleteContact={deleteContact} contacts={filterContacts()} />
    </div>
  );
};
