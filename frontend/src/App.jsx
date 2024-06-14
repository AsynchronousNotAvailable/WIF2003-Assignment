import { useEffect } from "react";
import "./App.css";
import GlobalState from "./context";
import AppNav from "./navigation/AppNav";
import {gapi} from 'gapi-script';
import {SocketContextProvider} from "./context/SocketContext";
const clientId = "293042637519-berhpp046ij2pndgr3e42jf8obnt3rko.apps.googleusercontent.com";

function App() {
    useEffect(() => {
        function start() {
            gapi.client.init({
                clientId: clientId,
                scope: ""
            })
        };
        gapi.load('client:auth2', start);
    });

    return (
        <GlobalState>
            <SocketContextProvider>
            <AppNav />
            </SocketContextProvider>
        </GlobalState>
        
    );
}

export default App;
