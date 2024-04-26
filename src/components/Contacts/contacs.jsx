import PropTypes from 'prop-types';
import css from './contacs.module.css';
import { useState } from 'react'; // Importujemy hook useState

// Definicja komponentu Contacts
export const Contacts = ({ contacts, deleteContact }) => {
  // Stan dla kontaktu, który zostanie zaznaczony do usunięcia
  const [contactToDelete, setContactToDelete] = useState(null);

  // Funkcja obsługująca usuwanie kontaktu
  const handleDelete = (id) => {
    deleteContact(id); // Wywołanie funkcji deleteContact 
  };

  // Funkcja obsługująca zaznaczenie kontaktu do usunięcia
  const handleSelectContact = (id) => {
    setContactToDelete(id);
  };

  // Renderowanie listy kontaktów
  return (
    <ul className={css.contacts}>
      {/* Mapowanie kontaktów na elementy listy */}
      {contacts.map(({ id, name, number }) => (
        <li className={css.item} key={id}>
          {/* Wyświetlenie nazwy i numeru kontaktu */}
          <span>{name}:</span>
          <span>{number}</span>
          {/* Przycisk do usuwania kontaktu */}
          <button
            className={css.btn}
            type="button"
            onClick={() => handleDelete(id)} // Obsługa kliknięcia przycisku usuwania kontaktu
          >
            Delete
          </button>
          {/* Przycisk do zaznaczenia kontaktu do usunięcia */}
          <button
            className={css.btn}
            type="button"
            onClick={() => handleSelectContact(id)} // Obsługa kliknięcia przycisku zaznaczenia kontaktu do usunięcia
          >
            Select
          </button>
        </li>
      ))}
      {/* Wyświetlenie kontaktu, który ma zostać usunięty */}
      {contactToDelete && (
        <li className={css.item}>
          <span>Contact to delete:</span>
          <span>{contacts.find((contact) => contact.id === contactToDelete)?.name}</span>
        </li>
      )}
    </ul>
  );
};

Contacts.propTypes = {
  deleteContact: PropTypes.func.isRequired,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
};

