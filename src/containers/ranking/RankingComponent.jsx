import { useParams } from "react-router-dom"
import { getLeaderboard, getLeaderboardByRole, getSecondaryLeaderboard, getTotalGames } from "../../api/TiltanicaApi"
import { useEffect, useState } from "react"


export default function Leaderboard() {

    let { role } = useParams()

    const [rows, setRows] = useState([])
    const [secondaryRows, setSecondaryRows] = useState([])
    const [total, setTotal] = useState([])

    useEffect(() => retrieveLeaderboard(), [])
    useEffect(() => retrieveSecondaryLeaderboard(), [])
    useEffect(() => retrieveTotalGames(), [])

    function retrieveLeaderboard() {

        if (role === undefined) {
            getLeaderboard()
            .then((response) =>{
                setRows(response.data)
            })
            .catch(error => console.log(error))
        } else {
            getLeaderboardByRole(role)
            .then((response) =>{
                setRows(response.data)
            })
            .catch(error => console.log(error))
        }
    }

    function retrieveSecondaryLeaderboard() {

        if (role === undefined) {
            getSecondaryLeaderboard()
            .then((response) =>{
                setSecondaryRows(response.data)
            })
            .catch(error => console.log(error))
        }

    }

    function retrieveTotalGames() {
        getTotalGames()
        .then((response) =>{
            setTotal(response.data)
        })
        .catch(error => console.log(error))
    }

    return (
        <div>
            <div className="container col m-5">
                <h3>Total de Jogos: {total}</h3>
                <table className="table table-bordered table-dark" style={{textAlign:"center"}}>
                    <thead>
                    <tr>
                        <th scope="col">Posição</th>
                        <th scope="col">Nick</th>
                        <th scope="col">Vitórias</th>
                        <th scope="col">Partidas Jogadas</th>
                        <th scope="col">Kda</th>
                        <th scope="col">Posição Favorita</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            rows.map( (row, index) => (
                                <tr key={row.playerId}>
                                    <td>{index+1}</td>
                                    <td>{row.player.name}</td>
                                    <td>{row.data.winRatio.toFixed(2)}%</td>
                                    <td>{row.data.matchsPlayed}</td>
                                    <td>{row.data.kda.toFixed(2)}</td>
                                    <td>{row.mostCommonRoute}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            <div className="container col m-5">
                <h3>Não classificáveis - partidas insuficientes</h3>
                <table className="table table-bordered table-dark" style={{textAlign:"center"}}>
                    <thead>
                    <tr>
                        <th scope="col">Posição</th>
                        <th scope="col">Nick</th>
                        <th scope="col">Vitórias</th>
                        <th scope="col">Partidas Jogadas</th>
                        <th scope="col">Kda</th>
                        <th scope="col">Posição Favorita</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            secondaryRows.map( (row, index) => (
                                <tr key={row.playerId}>
                                    <td>{index+1}</td>
                                    <td>{row.player.name}</td>
                                    <td>{row.data.winRatio.toFixed(2)}%</td>
                                    <td>{row.data.matchsPlayed}</td>
                                    <td>{row.data.kda.toFixed(2)}</td>
                                    <td>{row.mostCommonRoute}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );

}

export function LeaderboardByRoles() {

    const [rowsJungle, setRowsJungle] = useState([])
    const [rowsAdc, setRowsAdc] = useState([])
    const [rowsSupp, setRowsSupp] = useState([])
    const [rowsMid, setRowsMid] = useState([])
    const [rowsTop, setRowsTop] = useState([])
    const [total, setTotal] = useState([])

    useEffect(() => retrieveLeaderboard(),[])
    useEffect(() => retrieveTotalGames(), [])

    function retrieveLeaderboard() {

        getLeaderboardByRole("JUNGLE")
        .then((response) =>{
            setRowsJungle(response.data)
        })
        .catch(error => console.log(error))

        getLeaderboardByRole("TOP")
        .then((response) =>{
            setRowsTop(response.data)
        })
        .catch(error => console.log(error))

        getLeaderboardByRole("BOTTOM")
        .then((response) =>{
            setRowsAdc(response.data)
        })
        .catch(error => console.log(error))

        getLeaderboardByRole("UTILITY")
        .then((response) =>{
            setRowsSupp(response.data)
        })
        .catch(error => console.log(error))

        getLeaderboardByRole("MIDDLE")
        .then((response) =>{
            setRowsMid(response.data)
        })
        .catch(error => console.log(error))
        
    }

    function retrieveTotalGames() {
        getTotalGames()
        .then((response) =>{
            setTotal(response.data)
        })
        .catch(error => console.log(error))
    }

    return (
        <div className="container m-5">
            <h3>Total de Jogos {total}</h3>
            <div className="row">
                <div className="col">
                    <h3>Top</h3>
                    <table className="table table-bordered table-dark" style={{textAlign:"center"}}>
                        <thead>
                        <tr>
                            <th scope="col">Posição</th>
                            <th scope="col">Nick</th>
                            <th scope="col">Vitórias</th>
                            <th scope="col">Partidas Jogadas</th>
                            <th scope="col">Kda</th>
                            <th scope="col">Posição Favorita</th>
                        </tr>
                        </thead>
                        <tbody>
                            {
                                rowsTop.map( (row, index) => (
                                    <tr key={row.playerId}>
                                        <td>{index+1}</td>
                                        <td>{row.player.name}</td>
                                        <td>{row.data.winRatio.toFixed(2)}%</td>
                                        <td>{row.data.matchsPlayed}</td>
                                        <td>{row.data.kda.toFixed(2)}</td>
                                        <td>{row.mostCommonRoute}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
                <div className="col">
                    <h3>Jungle</h3>
                    <table className="table table-bordered table-dark" style={{textAlign:"center"}}>
                        <thead>
                        <tr>
                            <th scope="col">Posição</th>
                            <th scope="col">Nick</th>
                            <th scope="col">Vitórias</th>
                            <th scope="col">Partidas Jogadas</th>
                            <th scope="col">Kda</th>
                            <th scope="col">Posição Favorita</th>
                        </tr>
                        </thead>
                        <tbody>
                            {
                                rowsJungle.map( (row, index) => (
                                    <tr key={row.playerId}>
                                        <td>{index+1}</td>
                                        <td>{row.player.name}</td>
                                        <td>{row.data.winRatio.toFixed(2)}%</td>
                                        <td>{row.data.matchsPlayed}</td>
                                        <td>{row.data.kda.toFixed(2)}</td>
                                        <td>{row.mostCommonRoute}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <h3>Mid</h3>
                    <table className="table table-bordered table-dark" style={{textAlign:"center"}}>
                        <thead>
                        <tr>
                            <th scope="col">Posição</th>
                            <th scope="col">Nick</th>
                            <th scope="col">Vitórias</th>
                            <th scope="col">Partidas Jogadas</th>
                            <th scope="col">Kda</th>
                            <th scope="col">Posição Favorita</th>
                        </tr>
                        </thead>
                        <tbody>
                            {
                                rowsMid.map( (row, index) => (
                                    <tr key={row.playerId}>
                                        <td>{index+1}</td>
                                        <td>{row.player.name}</td>
                                        <td>{row.data.winRatio.toFixed(2)}%</td>
                                        <td>{row.data.matchsPlayed}</td>
                                        <td>{row.data.kda.toFixed(2)}</td>
                                        <td>{row.mostCommonRoute}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
                <div className="col">
                    <h3>Adc</h3>
                    <table className="table table-bordered table-dark" style={{textAlign:"center"}}>
                        <thead>
                        <tr>
                            <th scope="col">Posição</th>
                            <th scope="col">Nick</th>
                            <th scope="col">Vitórias</th>
                            <th scope="col">Partidas Jogadas</th>
                            <th scope="col">Kda</th>
                            <th scope="col">Posição Favorita</th>
                        </tr>
                        </thead>
                        <tbody>
                            {
                                rowsAdc.map( (row, index) => (
                                    <tr key={row.playerId}>
                                        <td>{index+1}</td>
                                        <td>{row.player.name}</td>
                                        <td>{row.data.winRatio.toFixed(2)}%</td>
                                        <td>{row.data.matchsPlayed}</td>
                                        <td>{row.data.kda.toFixed(2)}</td>
                                        <td>{row.mostCommonRoute}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <h3>Supp</h3>
                    <table className="table table-bordered table-dark" style={{textAlign:"center"}}>
                        <thead>
                        <tr>
                            <th scope="col">Posição</th>
                            <th scope="col">Nick</th>
                            <th scope="col">Vitórias</th>
                            <th scope="col">Partidas Jogadas</th>
                            <th scope="col">Kda</th>
                            <th scope="col">Posição Favorita</th>
                        </tr>
                        </thead>
                        <tbody>
                            {
                                rowsSupp.map( (row, index) => (
                                    <tr key={row.playerId}>
                                        <td>{index+1}</td>
                                        <td>{row.player.name}</td>
                                        <td>{row.data.winRatio.toFixed(2)}%</td>
                                        <td>{row.data.matchsPlayed}</td>
                                        <td>{row.data.kda.toFixed(2)}</td>
                                        <td>{row.mostCommonRoute}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );

}