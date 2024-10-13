import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPokemons, selectPokemons, selectLoading, selectError, selectSearchTerm, setSearchTerm } from '../redux/pokemonSlice';
import { AppDispatch } from '../redux/store';
import PokemonGrid from '../components/PokemonGrid';
import SearchBar from '../components/SearchBar';
import ReadyForBattleGrid from '../components/ReadyForBattleGrid';

const HomePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const pokemons = useSelector(selectPokemons);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const searchTerm = useSelector(selectSearchTerm) as string;

  useEffect(() => {
    dispatch(fetchPokemons());
  }, [dispatch]);

  const handleSearchChange = (term: string) => {
    dispatch(setSearchTerm(term)); // Actualiza el estado del término de búsqueda en Redux
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container-fluid d-flex">
      <div className="row w-100">
        <div className="col-lg-8 col-md-7 col-sm-12 p-3 overflow-auto">
          <h1 className="my-4 text-center">Lista de Pokémon</h1>
          <SearchBar 
            value={searchTerm} 
            onChange={(e) => handleSearchChange(e.target.value)} 
          />
          <PokemonGrid pokemons={pokemons} />
        </div>
        <div className="col-lg-4 col-md-5 col-sm-12 p-3 sticky-top" style={{ height: '100vh', overflowY: 'auto' }}>
          <ReadyForBattleGrid />
        </div>
      </div>
    </div>
  );
};

export default HomePage;