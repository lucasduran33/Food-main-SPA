import React from 'react';
import { Link } from 'react-router-dom';

export default function Card({name, img , diet, id, nombre}){
    
    
    
   
  
return (
    <div>
        <h3>{name ? name : nombre}</h3> 
        <img  src={img}  alt='img' width='200px' height='250px'/>
        <h5>{diet}</h5>
      
      
        <Link to={`/recipes/${id}`}>
         <button >Más info</button>
         </Link>
    </div>
);
}



