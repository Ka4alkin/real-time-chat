import './App.scss';
import {BrowserRouter as Router, Route} from "react-router-dom";
import LongPulling from "../longPulling/LongPulling";
import {Container} from "react-bootstrap";


function App() {
    return (
        <Router>
            <Container>
                <LongPulling/>
            </Container>
        </Router>
    );
}

export default App;
