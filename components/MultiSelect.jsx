import React, { useState, useEffect } from 'react';
import CreatableSelect from 'react-select/creatable';


export default function CreatableInputOnly(props) {

    const [inputValue, setInputValue] = useState();
    const [value, setValue] = useState([]);

    const { handleSenders } = props;

    useEffect(() => setValue([...value, createOption(props.email)]), [])

    const createOption = (label) => ({
        label,
        value: label,
    })

    const handleInputChange = (inputValue) => {
        setInputValue(inputValue);

    };

    const handleChange = (value) => {
        setValue(value);
        handleSenders(value);

    }

    const handleKeyDown = (event) => {

        if (!inputValue) return;
        switch (event.key) {
            case 'Enter':
            case 'Tab':
                setValue([...value, createOption(inputValue)]);
                setInputValue('');
                handleSenders([...value, createOption(inputValue)]);
        }
    }

    return (
        <CreatableSelect
            inputValue={inputValue}
            onChange={handleChange}
            isClearable
            isMulti
            menuIsOpen={false}
            onInputChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Destinatario..."
            value={value}
        />
    );
}
