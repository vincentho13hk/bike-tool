import { Fab } from "@mui/material";
import './main.css';
import { Map as MapIcon } from "@mui/icons-material";
import Report from "./report";

function Main() {
    return (
        <div className="Container">
            <header className="App-header">
                <Fab aria-label="add" className="Map-icon">
                    <MapIcon />
                </Fab>
            </header>
            <img className="Bike-big" src="eco_green_bicycle_icon.png" alt="bike icon" />
            <Report />
        </div>
    );
}

export default Main;