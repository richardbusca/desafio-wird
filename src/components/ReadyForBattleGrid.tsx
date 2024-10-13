import React from 'react';
import { useSelector } from 'react-redux';
import { selectReadyForBattlePokemons } from '../redux/pokemonSlice';
import PokemonCard from './PokemonCard';

const ReadyForBattleGrid: React.FC = () => {
  const readyForBattlePokemons = useSelector(selectReadyForBattlePokemons);

  return (
    <div 
      className="bg-light border rounded p-3" 
      style={{ 
        maxWidth: '80%',
        height: '80%',  
        margin: '100px auto 0' 
      }}>
      <h2 className="mb-3 text-center">Listos para la batalla</h2>
      {readyForBattlePokemons.length > 0 ? (
        <div className="row">
          {readyForBattlePokemons.map((pokemon) => (
            <div key={pokemon.id} className="col-6 mb-2">
              <PokemonCard id={pokemon.id} name={pokemon.name} image={pokemon.image} />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">No hay Pokémon listos para la batalla.</p>
      )}
    </div>
  );
};

export default ReadyForBattleGrid;