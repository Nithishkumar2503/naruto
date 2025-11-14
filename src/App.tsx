import { Main } from "./pages";
import { Character } from "./pages";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter >
      <div className="lg:min-h-screen  items-center   content-center lg:min-w-screen">
        <div className="lg:w-[70vw] lg:min-h-screen overflow-hidden items-center content-center m-auto z-40 ">
          <Routes>
            <Route path="/" Component={Main}></Route>
            <Route path="/characters" Component={Character}>
            </Route>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
