import "./App.css";
import GlobalState from "./context";
import AppNav from "./navigation/AppNav";

function App() {
    return (
        <GlobalState>
            <AppNav />
        </GlobalState>
        
    );
}

export default App;
