import React, { Component } from 'react'
import axios from 'axios';
import PokemonCard from './PokemonCard'

export default class PokemonList extends Component {
    state = {
        url: "https://pokeapi.co/api/v2/pokemon?offset=0&limit=1000",
        pokemon: null

    };

    async componentDidMount() {
        // we use await so that we can wait for the fetch request to return and then we can update the state after the fetch request has come through 
        const response = await axios.get(this.state.url);
        this.setState({ pokemon: response.data['results'] });
    }


    render() {
        return (
            <>
            {
                this.state.pokemon ? (<div className="row">
                    {
                        this.state.pokemon.map(pokemon => (
                            <PokemonCard 
                                key={pokemon.name}
                                name={pokemon.name}
                                url={pokemon.url}
                            />
                        ))
                    }
                </div>) : (<h1>Loading Pokemon</h1>)
            }
            </>
        )
    }
}
