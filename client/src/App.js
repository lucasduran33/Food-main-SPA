import React from 'react'
import './App.css';
import { Route, Routes, BrowserRouter  } from 'react-router-dom';
import Landing from './component/Landing';
import Home from './component/Home';
import CreateRecipe from './component/CreateRecipe'
import Detail from './component/Detail'
function App() {
  return (
    <BrowserRouter>
  
    <Routes>
      <Route  path= {'/'} element= {<Landing/>} />
      <Route path={'/recipe'} element={<CreateRecipe/>}/>
      <Route path={'/recipes/:id'} element={<Detail/>}/>
      <Route path={'/home'} element= {<Home/>} />
    </Routes>
    
  
    </BrowserRouter>
  );
}

export default App;
