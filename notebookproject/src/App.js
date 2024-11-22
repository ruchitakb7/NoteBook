
import React,{Fragment} from "react"
import Home from "./components/home";
import ContextProvider from "./store/ContextProvider";


function App() {
  return (
    <ContextProvider>
       <Home></Home>
    </ContextProvider>
      
  );
}

export default App;
