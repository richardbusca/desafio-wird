import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addReadyForBattlePokemon, removeReadyForBattlePokemon, selectIsPokemonReadyForBattle, PokemonState } from '../redux/pokemonSlice';
import { useNavigate } from 'react-router-dom';
interface PokemonCardProps {
  id: number;
  name: string;
  image: string;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ id, name, image }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isReadyForBattle = useSelector((state: { pokemon: PokemonState }) => 
    selectIsPokemonReadyForBattle(state, id)
  );

  const handleAddPokemon = () => {
    dispatch(addReadyForBattlePokemon(id));
  };

  const handleRemovePokemon = () => {
    dispatch(removeReadyForBattlePokemon(id));
  };

  const handleCardClick = () => {
    navigate(`/pokemon/${id}`);
  };

  return (
    <div className="card text-center position-relative" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
      <img src={image} alt={name} className="card-img-top mx-auto d-block" style={{ maxWidth: '60%' }} />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <button
          className="btn btn-outline-secondary position-absolute"
          style={{ top: '10px', right: '10px' }}
          onClick={(e) => {
            e.stopPropagation(); // Evita que el click en el botón redirija a la página de detalles
            isReadyForBattle ? handleRemovePokemon() : handleAddPokemon();
          }}
          title={isReadyForBattle ? "Eliminar de Pokémon listos para el combate" : "Agregar a Pokémon listos para el combate"}
        >
          {isReadyForBattle ? '-' : '+'}
        </button>
      </div>
    </div>
  );
};

export default PokemonCard;
