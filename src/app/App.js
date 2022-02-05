import { BrowserRouter } from "react-router-dom";
import Routes from "./routes";
import NavBar from "./components/NavBar";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <main>
        <Routes />
      </main>
    </BrowserRouter>
  );
}

export default App;
