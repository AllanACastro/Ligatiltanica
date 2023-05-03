import "./Navbar.css"

export default function Navbar () {
    return (
        <div>
            
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav nav-custom">
                        <a href="/ranking"><img src="/logo.png" alt="logo"   width="80px" height="75px" style={{paddingLeft: "5px"}} /></a>
                    <li className="nav-item active botao">
                        <img src="/trofeu.png" alt="rank"/>
                        <a className="nav-link"  href="/ranking">Ranking</a>
                    </li>
                    <li className="nav-item botao">
                        <img src="/lane.png" alt="rank"/>
                        <a className="nav-link" href="/ranking/roles">Lanes</a>
                    </li>
                    <li className="nav-item botao">
                        <img src="/confronto.png" alt="rank"/>
                        <a className="nav-link"  href="/duels">Confrontos Diretos</a>
                    </li>
                    <li className="nav-item botao">
                        <img src="/duo.png" alt="rank"/>
                        <a className="nav-link" href="/duos/best">Duos de sucesso</a>
                    </li>
                    <li className="nav-item botao">
                        <img src="/caveira.png" alt="rank"/>
                        <a className="nav-link" href="/duos/worst">Duos polêmicos</a>
                    </li>
                    <a href="https://www.leagueoflegends.com/pt-br/"><img src="/lol.png" alt="logo"   width="80px" height="75px" style={{paddingRight: "5px"}} /></a>
                    </ul> 
                </div>
            </nav>
        </div>
    )
}