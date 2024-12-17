import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Shop from "./Pages/Shop";
import SingleRecipe from "./Pages/SingleRecipe";
import Error from "./Pages/Error";
import NavBar from "./Components/NavBar";
import Footer from "./Components/Footer";
import { Box } from "@mui/material";

function App() {
  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <Box sx={{ minHeight: "100vh" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/recipe/:id" element={<SingleRecipe />} />
            <Route path="/*" element={<Error />} />
          </Routes>
        </Box>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
