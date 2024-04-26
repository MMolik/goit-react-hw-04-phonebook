import PropTypes from 'prop-types';
import css from './Filter.module.css';
import { useState } from 'react'; // Importujemy hook useState

export const Filter = ({ filter, onChangeInput }) => {
  const [inputValue, setInputValue] = useState(filter); // Stan dla wartości wprowadzonej w polu input

  // Funkcja obsługująca zmianę wprowadzonej wartości
  const handleChange = (event) => {
    setInputValue(event.target.value); // Ustawienie wartości wprowadzonej w stanie
    onChangeInput(event); // Wywołanie funkcji onChangeInput przekazanej z propsów
  };

  return (
    <>
      <label className={css.text}>
        Find contacts by name
        <br />
        <input
          className={css.newContacts}
          onChange={handleChange} // Obsługa zmiany wartości w polu input
          value={inputValue} // Ustawienie wartości pola input na wartość ze stanu
          type="text"
          name="filter"
        />
      </label>
    </>
  );
};

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  onChangeInput: PropTypes.func.isRequired,
};
