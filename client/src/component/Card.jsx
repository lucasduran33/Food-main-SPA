import React from 'react';
import { Link } from 'react-router-dom';
import '../component/cssComponents/Card.css'
export default function Card({name, img , diet,id}){
    
    
    
   
  
return (
    <div className='ui-conteiner'>
     
      <div className='ui-card'>
        <img  src={img}  />
      </div>
      <div className='description'>
      <h3>{name}</h3> 
      <h5>{diet}</h5>
      <Link to={`/recipes/${id}`}>
         <button >Más info</button>
         </Link>
      </div>
    </div>
);
}
        

      
      
        



