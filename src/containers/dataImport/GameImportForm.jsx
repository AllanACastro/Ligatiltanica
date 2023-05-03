import { useState, useEffect } from 'react'
import { getRounds, getChampions, insertBans, insertGame } from '../../api/TiltanicaApi';


export default function GameImportForm() {

    const [inputs, setInputs] = useState({});
    const [rounds, setRounds] = useState([]);
    const [champions, setChampions] = useState([]);
    const [message, setMessage] = useState("");

    //trata o textarea. precisa receber um objeto JSON
    const treatData = (objects) => {
        for(let prop in objects){
            if(objects.hasOwnProperty(prop) && objects[prop] !== null && !isNaN(objects[prop])){
                objects[prop] = +objects[prop];   
            }
        }

        for(var i = 0; i < objects.participants.length; i++){
            var obj = objects.participants[i];
            for(let prop in obj){
                if(obj.hasOwnProperty(prop) && obj[prop] !== null && !isNaN(obj[prop])){
                    obj[prop] = +obj[prop];   
                }
            }
        }
        return objects
    }

    const appendData = (data) => {
        for(var key in inputs) {
            if (!isNaN(inputs[key])) {
                data = {...data, [key]: +inputs[key]}
            }
        }
        data = {...data, id: data.matchId, round: { id: data.roundId }, stats: data.participants}
        delete data.roundId
        delete data.matchId
        delete data.participants
        return data 
    } 

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        var object = JSON.parse(inputs.jsonData)
        var newData = treatData(object)
        newData = appendData(newData)
        insertGame(newData).then(response => {
            insertBans(getBansList(response.data.id))
            .then(setMessage("ok"))

            .catch(error => setMessage(error.message))
        }).catch(error => setMessage(error.message))
    }

    //TODO MAKE IT A CHECKBOX, BUT GENERATE IT ONLY BY TYPING, NOT SHOWING THE BOXES
    const getBansList = (matchId) => {
        var bans = []
        if(inputs.ban1AzulId !== undefined && inputs.ban1AzulId !== "" ) {
            bans = [...bans,
                {
                    team: "BLUE",
                    champion: {
                        id: +inputs.ban1AzulId
                    },
                    game: {
                        id: +matchId
                    }
                }
            ]
        }
        if(inputs.ban2AzulId !== undefined && inputs.ban2AzulId !== "" ) {
            bans = [...bans,
                {
                    team: "BLUE",
                    champion: {
                        id: +inputs.ban2AzulId
                    },
                    game: {
                        id: +matchId
                    }
                }
            ]
        }
        if(inputs.ban3AzulId !== undefined && inputs.ban3AzulId !== "" ) {
            bans = [...bans,
                {
                    team: "BLUE",
                    champion: {
                        id: +inputs.ban3AzulId
                    },
                    game: {
                        id: +matchId
                    }
                }
            ]
        }
        if(inputs.ban4AzulId !== undefined && inputs.ban4AzulId !== "" ) {
            bans = [...bans,
                {
                    team: "BLUE",
                    champion: {
                        id: +inputs.ban4AzulId
                    },
                    game: {
                        id: +matchId
                    }
                }
            ]
        }
        if(inputs.ban5AzulId !== undefined && inputs.ban5AzulId !== "" ) {
            bans = [...bans,
                {
                    team: "BLUE",
                    champion: {
                        id: +inputs.ban5AzulId
                    },
                    game: {
                        id: +matchId
                    }
                }
            ]
        }
        if(inputs.ban1VermelhoId !== undefined && inputs.ban1VermelhoId !== "" ) {
            bans = [...bans,
                {
                    team: "RED",
                    champion: {
                        id: +inputs.ban1VermelhoId
                    },
                    game: {
                        id: +matchId
                    }
                }
            ]
        }
        if(inputs.ban2VermelhoId !== undefined && inputs.ban2VermelhoId !== "" ) {
            bans = [...bans,
                {
                    team: "RED",
                    champion: {
                        id: +inputs.ban2VermelhoId
                    },
                    game: {
                        id: +matchId
                    }
                }
            ]
        }
        if(inputs.ban3VermelhoId !== undefined && inputs.ban3VermelhoId !== "" ) {
            bans = [...bans,
                {
                    team: "RED",
                    champion: {
                        id: +inputs.ban3VermelhoId
                    },
                    game: {
                        id: +matchId
                    }
                }
            ]
        }
        if(inputs.ban4VermelhoId !== undefined && inputs.ban4VermelhoId !== "" ) {
            bans = [...bans,
                {
                    team: "RED",
                    champion: {
                        id: +inputs.ban4VermelhoId
                    },
                    game: {
                        id: +matchId
                    }
                }
            ]
        }
        if(inputs.ban5VermelhoId !== undefined && inputs.ban5VermelhoId !== "" ) {
            bans = [...bans,
                {
                    team: "RED",
                    champion: {
                        id: +inputs.ban5VermelhoId
                    },
                    game: {
                        id: +matchId
                    }
                }
            ]
        }

        console.log(bans)

        return bans
    }

    useEffect(() => {
        async function fetchRounds() {

            const { data } = await getRounds()
            const results = []

            data.forEach((value) => {
                results.push({
                    id: value.id,
                    date: value.date
                })
            })

            setRounds([
                {id: '', date: ''},
                ...results
            ])
        }
        async function fetchChampions() {

            const { data } = await getChampions()
            const results = []

            data.forEach((value) => {
                results.push({
                    id: value.id,
                    name: value.name
                })
            })

            setChampions([
                {id: '', name: ''},
                ...results
            ])
        }

        fetchRounds();
        fetchChampions();
    }, [])
    

    return (
        <div className="container col m-5">
            <div>{message}</div>
            <form onSubmit={handleSubmit}>
                <label> Round:
                    <select name="roundId"
                        onChange={handleChange}>
                    {rounds.map((option) => {
                        return (
                            <option key={option.id} value={option.id}>
                            {option.date}
                            </option>
                        );
                    })}
                    </select>
                </label><br />
                <label>Torres time azul:
                    <input 
                        type="number" 
                        name="blueTeamTurrets" 
                        value={inputs.blueTeamTurrets || ""} 
                        onChange={handleChange}
                    />
                </label><br />
                <label>Inibidores time azul:
                    <input 
                        type="number" 
                        name="blueTeamInhibitors" 
                        value={inputs.blueTeamInhibitors || ""} 
                        onChange={handleChange}
                    />
                </label><br />
                <label>Barões time azul:
                    <input 
                        type="number" 
                        name="blueTeamNashors" 
                        value={inputs.blueTeamNashors || ""} 
                        onChange={handleChange}
                    />
                </label><br />
                <label>Dragões time azul:
                    <input 
                        type="number" 
                        name="blueTeamDragons" 
                        value={inputs.blueTeamDragons || ""} 
                        onChange={handleChange}
                    />
                </label><br />
                <label>Arautos time azul:
                    <input 
                        type="number" 
                        name="blueTeamHeralds" 
                        value={inputs.blueTeamHeralds || ""} 
                        onChange={handleChange}
                    />
                </label><br />
                <label>Ban1 time azul:
                    <select name="ban1AzulId"
                            onChange={handleChange}>
                        {champions.map((option) => {
                            return (
                                <option key={option.id} value={option.id}>
                                {option.name}
                                </option>
                            );
                        })}
                    </select>
                </label><br />
                <label>Ban2 time azul:
                    <select name="ban2AzulId"
                            onChange={handleChange}>
                        {champions.map((option) => {
                            return (
                                <option key={option.id} value={option.id}>
                                {option.name}
                                </option>
                            );
                        })}
                    </select>
                </label><br />
                <label>Ban3 time azul:
                    <select name="ban3AzulId"
                            onChange={handleChange}>
                        {champions.map((option) => {
                            return (
                                <option key={option.id} value={option.id}>
                                {option.name}
                                </option>
                            );
                        })}
                    </select>
                </label><br />
                <label>Ban4 time azul:
                    <select name="ban4AzulId"
                            onChange={handleChange}>
                        {champions.map((option) => {
                            return (
                                <option key={option.id} value={option.id}>
                                {option.name}
                                </option>
                            );
                        })}
                    </select>
                </label><br />
                <label>Ban5 time azul:
                    <select name="ban5AzulId"
                            onChange={handleChange}>
                        {champions.map((option) => {
                            return (
                                <option key={option.id} value={option.id}>
                                {option.name}
                                </option>
                            );
                        })}
                    </select>
                </label><br />

                <label>Torres time vermelho:
                    <input 
                        type="number" 
                        name="redTeamTurrets" 
                        value={inputs.redTeamTurrets || ""} 
                        onChange={handleChange}
                    />
                </label><br />
                <label>Inibidores time vermelho:
                    <input 
                        type="number" 
                        name="redTeamInhibitors" 
                        value={inputs.redTeamInhibitors || ""} 
                        onChange={handleChange}
                    />
                </label><br />
                <label>Barões time vermelho:
                    <input 
                        type="number" 
                        name="redTeamNashors" 
                        value={inputs.redTeamNashors || ""} 
                        onChange={handleChange}
                    />
                </label><br />
                <label>Dragões time vermelho:
                    <input 
                        type="number" 
                        name="redTeamDragons" 
                        value={inputs.redTeamDragons || ""} 
                        onChange={handleChange}
                    />
                </label><br />
                <label>Arautos time vermelho:
                    <input 
                        type="number" 
                        name="redTeamHeralds" 
                        value={inputs.redTeamHeralds || ""} 
                        onChange={handleChange}
                    />
                </label><br />
                <label>Ban1 time vermelho:
                    <select name="ban1VermelhoId"
                            onChange={handleChange}>
                        {champions.map((option) => {
                            return (
                                <option key={option.id} value={option.id}>
                                {option.name}
                                </option>
                            );
                        })}
                    </select>
                </label><br />
                <label>Ban2 time vermelho:
                    <select name="ban2VermelhoId"
                            onChange={handleChange}>
                        {champions.map((option) => {
                            return (
                                <option key={option.id} value={option.id}>
                                {option.name}
                                </option>
                            );
                        })}
                    </select>
                </label><br />
                <label>Ban3 time vermelho:
                    <select name="ban3VermelhoId"
                            onChange={handleChange}>
                        {champions.map((option) => {
                            return (
                                <option key={option.id} value={option.id}>
                                {option.name}
                                </option>
                            );
                        })}
                    </select>
                </label><br />
                <label>Ban4 time vermelho:
                    <select name="ban4VermelhoId"
                            onChange={handleChange}>
                        {champions.map((option) => {
                            return (
                                <option key={option.id} value={option.id}>
                                {option.name}
                                </option>
                            );
                        })}
                    </select>
                </label><br />
                <label>Ban5 time vermelho:
                    <select name="ban5VermelhoId"
                            onChange={handleChange}>
                        {champions.map((option) => {
                            return (
                                <option key={option.id} value={option.id}>
                                {option.name}
                                </option>
                            );
                        })}
                    </select>
                </label><br />
                <textarea name="jsonData" value={inputs.jsonData || ""} onChange={handleChange} />
                <input type="submit" />
            </form>
        </div>
    )
}