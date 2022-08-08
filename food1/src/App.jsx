import React from 'react'
import './App.css';
import { Route, Routes, BrowserRouter  } from 'react-router-dom';
import Landing from './component/Landing';
import Home from './component/Home';
import CreateRecipe from './component/CreateRecipe'
import Detail from './component/Detail'
import PutRecipe from './component/PutRecipe'
function App() {
  return (
    <BrowserRouter>
  
    <Routes>
      <Route  path= {'/'} element= {<Landing/>} />
      <Route path={'/recipe'} element={<CreateRecipe/>}/>
      <Route path={'/recipes/:id'} element={<Detail/>}/>
      <Route path={'/home'} element= {<Home/>} />
      <Route path={'/putrecipe'} element={<PutRecipe/> }/>
    </Routes>
    
  
    </BrowserRouter>
  );
}

export default App;
