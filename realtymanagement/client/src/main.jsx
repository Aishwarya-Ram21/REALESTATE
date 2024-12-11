import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.scss";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { CloudinaryScriptProvider } from "./components/uploadWidget/UploadWidget.jsx";
import { CloudinaryScript1Provider} from "./routes/uploadWidget/UploadWidget.jsx";
import { SocketContextProvider } from "./context/SocketContext.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    
    <CloudinaryScript1Provider>
    <CloudinaryScriptProvider>
      <AuthContextProvider>
        <SocketContextProvider>
        <App />
        </SocketContextProvider>
      </AuthContextProvider>
      </CloudinaryScriptProvider>
      </CloudinaryScript1Provider>
      

    
  </React.StrictMode>
);
