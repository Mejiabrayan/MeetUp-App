import React, { useState } from 'react';
import { InfoAlert } from './Alerts';

const CitySearch = ({ locations, updateEvents }) => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(undefined);
    const [infoText, setInfoText] = useState('');


    const handleInputChanged = (event) => {
        const value = event.target.value;
        const filteredSuggestions = locations.filter((location) => {
            return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
        });

        if (filteredSuggestions.length === 0) {
            setInfoText('Not found, try again ');
        } else {
            setSuggestions(filteredSuggestions);
            setInfoText('');
        }

        setQuery(value);
    };

    const handleItemClicked = (suggestion) => {
        setQuery(suggestion);
        setShowSuggestions(false);
        setInfoText('');
        updateEvents(suggestion);
    };

    return (
        <div>
            <InfoAlert text={infoText} />
            <div className='relative rounded-md shadow-md bg-white w-64 mx-auto text-center'>
                <div className='absolute bottom-0 right-0 pl-3 flex items-center pointer-events-none'>
                    <svg className='h-5 w-5 text-gray-400' fill='currentColor' viewBox='0 0 20 20'>
                        <path fill-rule='evenodd' d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z' clip-rule='evenodd' />
                    </svg>
                </div>
                <input
                    placeholder='Search for city'
                    type='text'
                    className='form-input px-4 py-2 pr-10 rounded-md leading-5 text-gray-700 bg-white focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5'
                    value={query}
                    onChange={handleInputChanged}
                    onFocus={() => setShowSuggestions(true)}
                />
            </div>
            <div
                className='absolute rounded-md shadow-lg z-10 text-center'
                style={{
                    display: showSuggestions ? 'block' : 'none',
                    width: '100%',
                    left: '50%',
                    transform: 'translateX(-50%)'
                }}
            >
                <ul className='max-h-56 rounded-md overflow-auto py-1 text-base leading-6 font-medium text-gray-700 bg-white shadow-xs'>
                    {suggestions

                        .map((suggestion, index) => (
                            <li
                                key={index}
                                className='cursor-pointer hover:bg-gray-50 px-4 py-2 text-sm leading-5 shadow-sm text-gray-700 '
                                onClick={() => handleItemClicked(suggestion)}
                            >
                                {suggestion}
                            </li>
                        ))}
                </ul>
            </div>
        </div>
    );
};

export default CitySearch;