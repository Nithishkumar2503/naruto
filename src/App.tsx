import {
  About,
  Akatsuki,
  CharacterDetails,
  Clans,
  Contact,
  Documents,
  Kara,
  KekkeiGenkkai,
  Main,
  TailedBeast,
  Teams,
  Villages,
} from "./pages";
import { Character } from "./pages";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <img
        className="w-screen  h-screen z-40 opacity-10 inset-0 absolute
        min-h-screen 
        bg-[url('/akatsuki-cloud.png')]
        bg-repeat
        bg-size-[60px_60px]
        "
        alt=""
      />
      <div className="lg:min-h-screen z-50 relative  items-center   content-center lg:min-w-screen">
        <div className="lg:w-[80vw]  lg:min-h-screen overflow-hidden items-center content-center m-auto z-40 ">
          <Routes>
            <Route path="/" Component={Main}></Route>
            <Route path="/about" Component={About}></Route>
            <Route path="/contact" Component={Contact}></Route>
            <Route path="/characters" Component={Character}></Route>
            <Route path="/kekkei-genkai" Component={KekkeiGenkkai}></Route>
            <Route path="/tailed-beasts" Component={TailedBeast}></Route>
            <Route
              path="/tailed-beasts/:id"
              Component={CharacterDetails}
            ></Route>
            <Route path="/teams" Component={Teams}></Route>
            <Route path="/docs" Component={Documents}></Route>
            <Route path="/akatsuki" Component={Akatsuki}></Route>
            <Route
              path="/akatsukie/:akatsukiId"
              Component={CharacterDetails}
            ></Route>
            <Route path="/kara" Component={Kara}></Route>
            <Route path="/kara/:id" Component={CharacterDetails}></Route>
            <Route path="/villages" Component={Villages}></Route>
            <Route path="/clans" Component={Clans}></Route>
            <Route path="/characters/:charId" Component={CharacterDetails} />
          </Routes>
        </div>
      </div>

      <footer
        className="fixed bottom-2 left-1/2 z-50  -translate-x-1/2 w-[95%] sm:w-auto flex  sm:flex-row items-center justify-center gap-2 sm:gap-4 text-sm sm:text-base underline px-3 py-1
"
      >
        {location.pathname !== "/" && (
          <a className="lg:px-2  cursor-pointer" href="/">
            Home
          </a>
        )}

        <a className="lg:px-2  cursor-pointer" href="/contact">
          Contact us
        </a>
        <a className="lg:px-2  cursor-pointer" href="/docs">
          Docs
        </a>
        <a className="lg:px-2  cursor-pointer" href="/about">
          About us
        </a>
      </footer>
    </BrowserRouter>
  );
}

export default App;
