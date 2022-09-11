import { Fab } from "@mui/material";
import './main.css';
import { ThumbDown, ThumbUp } from "@mui/icons-material";

function Main() {
    return (
        <div className="Container">
            <header className="App-header">
                <h1>
                    How's the road ahead?
                </h1>
            </header>
            <div className="Button-container">
                <Fab color="primary" aria-label="add">
                    <ThumbUp />
                </Fab>
                <Fab color="primary" aria-label="add">
                    <ThumbDown />
                </Fab>
            </div>
        </div>
    );
}

export default Main;