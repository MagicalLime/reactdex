import React, { Component } from 'react'
import axios from 'axios';
import PokemonCard from './PokemonCard'

export default class PokemonList extends Component {
    state = {
        url: "https://pokeapi.co/api/v2/pokemon",
        pokemon: null

    };

    async componentDidMount() {
        // we use await so that we can wait for the fetch request to return and then we can update the state after the fetch request has come through 
        const response = await axios.get(this.state.url);
        this.setState({ pokemon: response.data['results'] }); 
    }


    render() {
        return (
            <div className="row">
                <PokemonCard />
                <PokemonCard />
                <PokemonCard />
                <PokemonCard />
                <PokemonCard />
                <PokemonCard />
                <PokemonCard />
                <PokemonCard />
                <PokemonCard />
                <PokemonCard />

            </div>
        )
    }
}
