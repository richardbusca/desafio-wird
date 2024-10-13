import React from 'react';

interface SearchBarProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
    return (
        <div className="d-flex justify-content-center mt-4 mb-3">
            <input
                type="text"
                placeholder="Buscar Pokémon"
                value={value}
                onChange={onChange}
                className="form-control w-50"
            />
        </div>
    );
};

export default SearchBar;