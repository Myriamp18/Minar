import React, { useEffect, useState } from 'react';
import '../Silos/Silos.css'
import { Link } from 'react-router-dom';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios'
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import {useNavigate} from 'react-router-dom'


function TolvasMolinos() {
    const [data, setData] = useState([]);
    const navigate = useNavigate()
  
    useEffect(() => {
      fetch('http://localhost:8081/tolvas')
        .then(res => res.json())
        .then(data => setData(data))
        .catch(err => console.log(err));
    }, [])
  
    const handleDelete = (id) => {
      axios.delete(`http://localhost:8081/deletetolvas/${id}`)
        .then(res => {
          // Actualiza la lista de datos excluyendo el registro eliminado
          const updatedData = data.filter(item => item.id !== id);
          setData(updatedData);
    
         
        })
        .catch(err => console.log(err));
    };
  return (
    <>
   
   <h1>Tolvas de Molinos:</h1>

   <div className="text-center">
     <Link to="/createtolvas" className="btn btn-danger btn-lg font-weight-bold   text-lg" >
       <FontAwesomeIcon icon={faPlus} />Insertar</Link>
   </div>
   <div className="close-button" onClick={() => navigate('/pp')}>
           <FontAwesomeIcon icon={faTimes} />
           </div>
   <div className='row mt-3'>
     {data.length !== 0 ?
       <div className='col-12 col-lg-8 offset-0 offset-lg-2'>
            <div className='table-container'>
             <div className='table-top-scroll'> {/* Nuevo contenedor */}
               <div className='table-responsive'>

                 <table class="table table-bordered">
             <thead>
               <tr  >
                 <th>ID</th>
                 <th>Fecha</th>
                 <th>Tolva Molinos</th>
                 <th>P.ESP</th>
                 <th>Mezclas Moler</th>
                 <th>P.ESP</th>
                 <th></th>

               </tr>
             </thead>
             <tbody className='table-group-divider'>
              {data.map((d, i) => (
                 <tr key={i}>
                   <td>{d.id}</td>
                   <td>{d.fecha}</td>
                   <td>{typeof d.tolvamolinos === 'number' ? d.tolvamolinos.toFixed(3) : 'N/A'}</td>
                   <td>{typeof d.petm === 'number' ? d.petm.toFixed(2) : 'N/A'}</td>
                   <td>{typeof d.mezclasmoler === 'number' ? d.mezclasmoler.toFixed(3) : 'N/A'}</td>
                   <td>{typeof d.pememo === 'number' ? d.pememo.toFixed(2) : 'N/A'}</td>

                 

                   <td>
                     <div style={{ display: 'flex', alignItems: 'center' }}>
                       <Link to={`/updatetolvas/${d.id}`} className='btn btn-warning'>
                         <i className='fa-solid fa-edit'></i>
                       </Link>
                       &nbsp;

                       <button className='btn btn-danger' onClick={() => handleDelete(d.id)}>
                         <i className='fa-solid fa-trash'></i>
                       </button>
                     </div>

                   </td>
                 </tr>
               ))}

               {/* Puedes agregar más filas según sea necesario */}
             </tbody>
           </table>

         </div>
         </div>
         </div>
       </div>
       : <h2 className='aling-itemns-center'>Sin Datos</h2>
     }
   </div>
 </>
  )
}

export default TolvasMolinos
