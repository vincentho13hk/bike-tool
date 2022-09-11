import { ThumbUp, ThumbDown, LocationOn } from "@mui/icons-material";
import { Button, Chip } from "@mui/material";
import { Link } from "react-router-dom";
import './report.css';

function Report() {
    return (
        <div className="Report">
            <h1>
                How's the road ahead?
            </h1>
            <div className="Button-container">
                <Link to="/thumb">
                    <Button color="success" variant="contained" className="Thumb-btn" aria-label="Thumbs up" sx={{ padding: '5rem 3.5rem' }}>
                        <ThumbUp />
                    </Button>
                </Link>
                <Link to="/thumb">
                    <Button color="error" variant="contained" className="Thumb-btn" aria-label="Thumbs down" sx={{ padding: '5rem 3.5rem' }}>
                        <ThumbDown />
                    </Button>
                </Link>
            </div>
            <Chip icon={<LocationOn />} variant='outlined' label='~ 18 York road' sx={{
                margin: '2rem',
                color: 'white',
                borderColor: 'gray'
            }} />
        </div>
    )
}

export default Report;