import { BrowserRouter, Route, Routes } from "react-router-dom";
import HOME from "./home/home";
import Details from "./Details/Details";
import ADDRECIPE from "./add/add";
import UPDATE from "./edit/update";

function App() {
return(
<BrowserRouter>
  <Routes>
        <Route path="/" element={<HOME/>}/> 
        <Route path="/:id" element={<Details/>}/> 
        <Route path="/add" element={<ADDRECIPE/>}/> 
        <Route path="/update/:id" element={<UPDATE/>}/> 
  </Routes>
</BrowserRouter>

);

}

export default App;
