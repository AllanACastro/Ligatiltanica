
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GameImportForm from './containers/dataImport/GameImportForm.jsx';
import Leaderboard from './containers/ranking/RankingComponent';
import {LeaderboardByRoles} from './containers/ranking/RankingComponent';
import DuelsComponent from './containers/ranking/DuelsComponent';
import ChampionCreate from './containers/dataImport/ChampionCreate';
import Navbar from './components/menus/Navbar';
import PlayersMerge from './containers/dataImport/PlayersMerge';
import CacheClear from './containers/dataImport/CacheClear';
import DuosComponent from './containers/ranking/DuosComponent';

function App() {


  return (
    <div className="App" style={{backgroundColor: "#6679a169", paddingBottom: "1rem"}}>
      <Navbar />
      <header className="App-header">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Leaderboard />} />
            <Route path="/import" element={<GameImportForm />} />
            <Route path="/ranking" element={<Leaderboard />} />
            <Route path="/ranking/:role" element={<Leaderboard />} />
            <Route path="/ranking/roles" element={<LeaderboardByRoles />} />
            <Route path="/duels" element={<DuelsComponent />} />
            <Route path="/duos/:type" element={<DuosComponent />} />
            <Route path="/champion/add" element={<ChampionCreate />} />
            <Route path="/players/merge" element={<PlayersMerge />} />
            <Route path="/cacheClear" element={<CacheClear />} />
          </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;