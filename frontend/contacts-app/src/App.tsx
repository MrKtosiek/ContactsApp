import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { MainMenu } from "./pages/MainMenu";
import { Login } from "./pages/Login";
import { LOGIN_ROUTE, MAIN_MENU_ROUTE } from "./Constants";

function App() {
  return <Router>
    <Routes>
      <Route path={MAIN_MENU_ROUTE} element={<MainMenu/>} />
      <Route path={LOGIN_ROUTE} element={<Login />} />
      <Route path="*" element={<MainMenu />} />
    </Routes>
  </Router>;
}

export default App;
