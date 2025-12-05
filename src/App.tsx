import { Main } from "./pages";
import { Character } from "./pages";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <img
        className="w-screen hidden h-screen z-40 opacity-10 inset-0 absolute"
        src="/akatsuki.gif"
        alt=""
      />
      <div className="lg:min-h-screen z-50 relative  items-center   content-center lg:min-w-screen">
        <div className="lg:w-[70vw] lg:min-h-screen overflow-hidden items-center content-center m-auto z-40 ">
          {location.pathname !== "/" && (
            <h1
              className="cursor-pointer absolute "
              onClick={() => {
                history.back();
              }}
            >
              {"Go Back"}
            </h1>
          )}

          <Routes>
            <Route path="/" Component={Main}></Route>
            <Route path="/characters" Component={Character}></Route>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
