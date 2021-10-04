import React, { Component } from 'react'

export default class PokemonCard extends Component {

    state = {
        name: '',
        imageUrl: '',
        pokemonIndex: ''
    }

    componentDidMount() {
        const { name, url } = this.props;
        const pokemonIndex = url.split('/')[url.split('/').length - 2];
        const imageUrl = `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${pokemonIndex}.png?raw=true`

        this.setState({
            name,
            imageUrl,
            pokemonIndex
        })

    }

    render() {

        return (
            // column medium 3 says 12 / 3 = 4 cards in medium size mode
            // column small 6 says 12 / 6 = 2 cards in small size mode (like if they're on a phone)
            <div className='col-md-3 cold-sm-6 mb-5'>
                <div className="card">
                    <h5 className="card-header">{this.state.pokemonIndex}</h5>
                    <div class="card-body mx-auto">
                        <h6 className="card-title">
                            {this.state.name.split("-").map(str => 
                                str.charAt(0).toUpperCase() + str.substring(1)
                            ).join(" ")
                            }
                        </h6>
                    </div>
                </div>
            </div>
        )
    }
}
