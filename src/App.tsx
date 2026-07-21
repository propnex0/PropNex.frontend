import AppRoutes from "./routes/AppRoutes";
import "./App.css";

import { FaWhatsapp } from "react-icons/fa";

function App() {
  return (
    <>
      <AppRoutes />

      <a
        href="https://wa.me/919461433343?text=Hi%20PropNex"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float"
      >
        <FaWhatsapp />
      </a>
    </>
  );
}

export default App;