import { BrowserRouter } from "react-router-dom";
import Routes from "./routes";
import NavBar from "./components/NavBar";

function App() {
  const setting = ["Profile", "Account", "Dashboard"];
  return (
    <BrowserRouter>
      <NavBar settings={setting} />
      <main>
        <Routes />
      </main>
    </BrowserRouter>
  );
}

export default App;
