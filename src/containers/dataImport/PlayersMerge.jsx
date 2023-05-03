import { useState, useEffect } from 'react'

import { getPlayers, mergePlayers } from '../../api/TiltanicaApi';

export default function PlayersMerge() {

    const [inputs, setInputs] = useState({})
    const [players, setPlayers] = useState([])
    const [message, setMessage] = useState("")


    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        mergePlayers(inputs.formerPlayerId,inputs.newPlayerId).then(setMessage("ok"))
    }
    useEffect( () => {
        
        async function fetchPlayers() {
            const {data} = await getPlayers();
            const results = []

            data.forEach(player => {
                results.push({
                    id: player.id,
                    name: player.name
                })
            });

            setPlayers([
                {id: '', name: ''},
                ...results
            ])

         }

         fetchPlayers()

    },[])

    return (
        <div className="container col m-5">
            <div>{message}</div>
            <form onSubmit={handleSubmit}>
                <label> Player a ser alterado:
                    <select name="formerPlayerId"
                        onChange={handleChange}>
                    {players.map((option) => {
                        return (
                            <option key={option.id} value={option.id}>
                            {option.name}
                            </option>
                        );
                    })}
                    </select>
                </label><br />
                <label> Novo Player:
                    <select name="newPlayerId"
                        onChange={handleChange}>
                    {players.map((option) => {
                        return (
                            <option key={option.id} value={option.id}>
                            {option.name}
                            </option>
                        );
                    })}
                    </select>
                </label><br />
                <input type="submit" />
            </form>
        </div>
    )
            
}