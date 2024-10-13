import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectPokemonById, PokemonState } from '../redux/pokemonSlice';
import PokemonDetailCard from '../components/PokemonDetailCard';
import ReadyForBattleGrid from '../components/ReadyForBattleGrid';

const PokemonDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const pokemon = useSelector((state: { pokemon: PokemonState }) =>
    selectPokemonById(state, Number(id))
  );

  if (!pokemon) {
    return <div>No se encontró el Pokémon.</div>;
  }

  return (
    <div className="container-fluid d-flex">
      <div className="row w-100">
        <div className="col-lg-8 col-md-7 col-sm-12 p-3 overflow-auto">
          <div className="d-flex justify-content-between mb-3">
            <button className="btn btn-secondary" onClick={() => navigate('/')}>
              Volver
            </button>
          </div>
          <PokemonDetailCard pokemon={pokemon} />
        </div>
        <div className="col-lg-4 col-md-5 col-sm-12 p-3 sticky-top" style={{ height: '100vh', overflowY: 'auto' }}>
          <ReadyForBattleGrid />
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;
