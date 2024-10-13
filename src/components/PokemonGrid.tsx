import React from 'react';
import PokemonCard from './PokemonCard';

interface Pokemon {
  id: number;
  name: string;
  image: string;
}

interface PokemonGridProps {
  pokemons: Pokemon[];
}

const PokemonGrid: React.FC<PokemonGridProps> = ({ pokemons }) => {
  return (
    <div className="row mt-4">
      {pokemons.length > 0 ? (
        pokemons.map((pokemon, index) => (
          <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
            <PokemonCard id={pokemon.id} name={pokemon.name} image={pokemon.image} />
          </div>
        ))
      ) : (
        <div className="col-12 text-center">
          <p className="mt-4">No se encontró ningún Pokémon que coincida con tu búsqueda.</p>
        </div>
      )}
    </div>
  );
};

export default PokemonGrid;