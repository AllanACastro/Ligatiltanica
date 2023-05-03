import axios from 'axios'
import BaseUrl from './apiBaseUrl'

const apiClient = axios.create(
    {baseURL: BaseUrl()}
)

export const insertGame = (body) => apiClient.post('/games', body)
export const getLeaderboard = () => apiClient.get('/stats/leaderboard')
export const getSecondaryLeaderboard = () => apiClient.get('/stats/secondaryLeaderboard')
export const getLeaderboardByRole = (role) => apiClient.get('/stats/leaderboard/'+role)
export const getTotalGames = () => apiClient.get('/games/total')
export const getMostCommonDuels = () => apiClient.get('/stats/duels')
export const getBestDuos = () => apiClient.get('/stats/bestDuos')
export const getWorstDuos = () => apiClient.get('/stats/worstDuos')
export const getRounds = () => apiClient.get('/rounds')
export const getChampions = () => apiClient.get('/champions')
export const getPlayers = () => apiClient.get('/players')


export const insertBans = (body) => apiClient.post('/bans/list',body)
export const insertChampion = (body) => apiClient.post('/champions',body)
export const mergePlayers = (formerId, newId) => apiClient.patch('/players/merge/'+formerId+'/'+newId)


export const cacheClear = () => apiClient.get('/cache/clear')