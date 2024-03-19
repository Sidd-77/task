import { Button, table } from "@nextui-org/react";
import Page1 from "./page1/page1";
import { Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Page2 from "./page2/page2";

const App = () => {
  const navigate = useNavigate();
  return (
    <div className=" h-screen">
      <div className="flex gap-2 m-2">
        <Button color="secondary" className="flex-grow" onClick={()=>{navigate('/');}}>Page 1</Button>
        <Button color="secondary" className="flex-grow" onClick={()=>{navigate('/table');}}>Page 2</Button>
      </div>
      <Routes>
        <Route path="/" element={<Page1 />} />
        <Route path="/table" element={<Page2 />} />
      </Routes>
    </div>
  );
};

export default App;
