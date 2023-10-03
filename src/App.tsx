import "./App.css";
// import "./assets/css/main.css";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./AppRouter";

function App() {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
