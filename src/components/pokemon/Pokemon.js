import React, { Component } from 'react';
import axios from 'axios';
import { ThemeConsumer } from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';

const COLORS_OF_TYPES = {
    bug: '#9FAE19',
    dark: '#3D3022',
    dragon: '#7A63DE',
    electric: '#F9BB1C',
    fairy: '#DB97DD',
    fighting: '#80311A',
    fire: '#CA2401',
    flying: '#6478D3',
    ghost: '#5C5EAC',
    grass: '#7AC63E',
    ground: '#D4B96B',
    ice: '#6CD3F4',
    normal: '#C7C2B9',
    poison: '#944895',
    psychic: '#EC4780',
    rock: '#B9A059',
    steel: '#B2B1C1',
    water: '#429EF2'
}

export default class Pokemon extends Component {
    state = {
        name: '',
        pokemonIndex: '',
        imageUrl: '',
        types: [],
        description: '',
        stats: {
            hp: '',
            attack: '',
            defense: '',
            speed: '',
            specialAttack: '',
            specialDefense: ''
        },
        height: '',
        weight: '',
        eggGroups: '',
        abilities: '',
        genderRatioMale: '',
        genderRatioFemale: '',
        evs: '',
        hatchSteps: ''
    }

    async componentDidMount() {
        const { pokemonIndex } = this.props.match.params;


        const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}/`;
        const pokemonSpeciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemonIndex}/`;

        const pokemonResponse = await axios.get(pokemonUrl);

        const name = pokemonResponse.data.name;
        const imageUrl = pokemonResponse.data.sprites.front_default;

        let { hp, attack, defense, speed, specialAttack, specialDefense } = '';

        pokemonResponse.data.stats.map(stat => {
            switch (stat.stat.name) {
                case 'hp':
                    hp = stat['base_stat'];
                    break;
                case 'attack':
                    attack = stat['base_stat'];
                    break;
                case 'defense':
                    defense = stat['base_stat'];
                    break;
                case 'speed':
                    speed = stat['base_stat'];
                    break;
                case 'special-attack':
                    specialAttack = stat['base_stat'];
                    break;
                case 'special-defense':
                    specialDefense = stat['base_stat'];
                    break;
            }
        });

        // Convert Decimeters to Meters : divide length value by 10
        const height = +(pokemonResponse.data.height / 10).toFixed(2);

        // Convert Hectagrams to Kilograms : divide value by 10
        const weight = +(pokemonResponse.data.weight / 10).toFixed(2);

        const types = pokemonResponse.data.types.map(type => type.type.name);

        const themeColor = pokemonResponse.data.themeColor // not done

        const abilities = pokemonResponse.data.abilities.map(ability => {
            return ability.ability.name.toLowerCase().split('-').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
        }).join(", ");

        const evs = pokemonResponse.data.stats.filter(stat => (stat > 0) ? true : false).map(stat => {
            return `${stat.effort} ${stat.stat.name}`
                .toLowerCase()
                .split('-')
                .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                .join(' ');
        }).join(', ');


        await axios.get(pokemonSpeciesUrl).then(res => {
            let desc = '';
            res.data.flavor_text_entries.some(flavor => {
                if (flavor.language.name === 'en') {
                    desc = flavor.flavor_text;
                    return;
                }
            });

            const femaleRate = res.data['gender_rate'];
            const genderRatioFemale = 12.5 * femaleRate;
            const genderRatioMale = 12.5 * (8 - femaleRate);

            const catchRate = Math.round((100 / 255) * res.data['capture_rate']);

            const eggGroups = res.data['egg_groups'].map(group => {
                return group.name.toLowerCase().split('-').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
            }).join(", ");

            const hatchSteps = 255 * (res.data['hatch_counter'] + 1);

            this.setState({
                description: desc,
                genderRatioFemale,
                genderRatioMale,
                catchRate,
                eggGroups,
                hatchSteps


            })

            this.setState({
                imageUrl,
                pokemonIndex,
                name,
                types,
                stats: {
                    hp,
                    attack,
                    defense,
                    speed,
                    specialAttack,
                    specialDefense
                },
                height,
                weight,
                abilities,
                evs


            })

        });
    }

    render() {
        return (
            <div className="col">
                <div className="card">
                    <div className="card-header">
                        <div className="row">
                            <div className="col-5">
                                <h5>{this.state.pokemonIndex}</h5>
                            </div>
                            <div className="col-7">
                                <div className="float-end">
                                    {this.state.types.map(type => (
                                        <span
                                            key={type}
                                            className="badge rounded-pill m-1 text-capitalize"
                                            style={{
                                                backgroundColor: COLORS_OF_TYPES[type],
                                                color: "white"
                                            }}>
                                            {type}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="row align-items-center">
                            <div className="col-md-3">
                                <img src={this.state.imageUrl}
                                    className="card-img-top rounded mx-auto mt-2">
                                </img>
                            </div>
                            <div className="col-md-9">
                                <h4 className="mx-auto text-capitalize">
                                    {this.state.name}
                                </h4>
                                <div className="row align-items-center">
                                    <div className="col-12 col-md">
                                        HP
                                    </div>
                                    <div className="col-12 col-md-9">
                                        <div className="progress">
                                            <div className="progress-bar" role="progressbar" style={{
                                                width: `${this.state.stats.hp}%`
                                            }}
                                                aria-valuenow="25"
                                                aria-valuemin="0"
                                                aria-valuemax="100">
                                                <small>
                                                    {this.state.stats.hp}
                                                </small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row align-items-center">
                                    <div className="col-12 col-md">
                                        Atk
                                    </div>
                                    <div className="col-12 col-md-9">
                                        <div className="progress">
                                            <div className="progress-bar" role="progressbar" style={{
                                                width: `${this.state.stats.attack}%`
                                            }}
                                                aria-valuenow="25"
                                                aria-valuemin="0"
                                                aria-valuemax="100">
                                                <small>
                                                    {this.state.stats.attack}
                                                </small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row align-items-center">
                                    <div className="col-12 col-md">
                                        Sp. Atk
                                    </div>
                                    <div className="col-12 col-md-9">
                                        <div className="progress">
                                            <div className="progress-bar" role="progressbar" style={{
                                                width: `${this.state.stats.specialAttack}%`
                                            }}
                                                aria-valuenow="25"
                                                aria-valuemin="0"
                                                aria-valuemax="100">
                                                <small>
                                                    {this.state.stats.specialAttack}
                                                </small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row align-items-center">
                                    <div className="col-12 col-md">
                                        Def
                                    </div>
                                    <div className="col-12 col-md-9">
                                        <div className="progress">
                                            <div className="progress-bar" role="progressbar" style={{
                                                width: `${this.state.stats.defense}%`
                                            }}
                                                aria-valuenow="25"
                                                aria-valuemin="0"
                                                aria-valuemax="100">
                                                <small>
                                                    {this.state.stats.defense}
                                                </small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row align-items-center">
                                    <div className="col-12 col-md">
                                        Sp. Def
                                    </div>
                                    <div className="col-12 col-md-9">
                                        <div className="progress">
                                            <div className="progress-bar" role="progressbar" style={{
                                                width: `${this.state.stats.specialDefense}%`
                                            }}
                                                aria-valuenow="25"
                                                aria-valuemin="0"
                                                aria-valuemax="100">
                                                <small>
                                                    {this.state.stats.specialDefense}
                                                </small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row align-items-center">
                                    <div className="col-12 col-md">
                                        Speed
                                    </div>
                                    <div className="col-12 col-md-9">
                                        <div className="progress">
                                            <div className="progress-bar" role="progressbar" style={{
                                                width: `${this.state.stats.speed}%`
                                            }}
                                                aria-valuenow="25"
                                                aria-valuemin="0"
                                                aria-valuemax="100">
                                                <small>
                                                    {this.state.stats.speed}
                                                </small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-1">
                                <div className="col">
                                    <p className="p-2">{this.state.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr></hr>
                    <div className="card-body">
                        <div className="card-title text-center">
                            <h5>
                                Profile
                            </h5>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <h6 className="float-end">Height:</h6>
                                        </div>
                                        <div className="col-md-6">
                                            <h6 className="float-start">
                                                {this.state.height} m.
                                            </h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <h6 className="float-end">Weight:</h6>
                                        </div>
                                        <div className="col-md-6">
                                            <h6 className="float-start">
                                                {this.state.weight} kg.
                                            </h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <h6 className="float-end">Abilities:</h6>
                                        </div>
                                        <div className="col-md-6">
                                            <h6 className="float-start">
                                                {this.state.abilities}
                                            </h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <h6 className="float-end">Egg Group(s):</h6>
                                        </div>
                                        <div className="col-md-6">
                                            <h6 className="float-start">
                                                {this.state.eggGroups}
                                            </h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
