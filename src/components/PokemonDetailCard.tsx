import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pokemon } from '../types/types';
import { PokemonState } from '../redux/pokemonSlice';
import {
  addReadyForBattlePokemon,
  removeReadyForBattlePokemon,
  selectIsPokemonReadyForBattle,
} from '../redux/pokemonSlice';

interface PokemonDetailCardProps {
  pokemon: Pokemon;
}

const PokemonDetailCard: React.FC<PokemonDetailCardProps> = ({ pokemon }) => {
  const dispatch = useDispatch();
  const isReadyForBattle = useSelector((state: { pokemon: PokemonState }) =>
    selectIsPokemonReadyForBattle(state, pokemon.id)
  );

  const handleAddRemovePokemon = () => {
    if (isReadyForBattle) {
      dispatch(removeReadyForBattlePokemon(pokemon.id));
    } else {
      dispatch(addReadyForBattlePokemon(pokemon.id));
    }
  };

  return (
    <div className="d-flex flex-column align-items-center">
      <h2 className="text-center mb-4">Detalles del Pokémon {pokemon.name}</h2>
      <img
        src={pokemon.image}
        alt={pokemon.name}
        className="img-fluid mb-4"
        style={{ maxWidth: '300px' }}
      />
      <div className="text-start" style={{ maxWidth: '300px' }}>
        <p><strong>Numero:</strong> {pokemon.id}</p>
        <p><strong>Altura:</strong> {pokemon.height}</p>
        <p><strong>Tipos:</strong> {pokemon.types.join(', ')}</p>
        <h5>Estadísticas Base:</h5>
        <ul>
          <li><strong>Ataque:</strong> {pokemon.baseStats.attack}</li>
          <li><strong>Defensa:</strong> {pokemon.baseStats.defense}</li>
          <li><strong>Ataque Especial:</strong> {pokemon.baseStats.specialAttack}</li>
          <li><strong>Defensa Especial:</strong> {pokemon.baseStats.specialDefense}</li>
          <li><strong>Velocidad:</strong> {pokemon.baseStats.speed}</li>
        </ul>
      </div>
      <button
        className="btn btn-outline-primary mt-3"
        onClick={handleAddRemovePokemon}
        title={isReadyForBattle ? "Eliminar de Pokémon listos para el combate" : "Agregar a Pokémon listos para el combate"}
      >
        {isReadyForBattle ? "Quitar de listos para el combate" : "Agregar a listos para el combate"}
      </button>
    </div>
  );
};

export default PokemonDetailCard;
