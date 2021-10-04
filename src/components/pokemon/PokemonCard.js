import React, { Component } from 'react'

export default class PokemonCard extends Component {
    render() {
        return (
            // column medium 3 says 12 / 3 = 4 cards in medium size mode
            // column small 6 says 12 / 6 = 2 cards in small size mode (like if they're on a phone)
            <div className='col-md-3 cold-sm-6 mb-5'>
                <div className="card">
                    <div className="card-header">
                        <h1>Abijit Rangesh</h1>
                    </div>
                </div>
            </div>
        )
    }
}
