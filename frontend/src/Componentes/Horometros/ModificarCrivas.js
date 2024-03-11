import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

function ModificarCrivas() {
    const { id } = useParams()
    const [values, setValues] = useState({
        fecha: '',
        turno: "",
        tolvageneral: "",
        cribav: "",
        mesaswi: "",
        bombafinsa: "",
        bombasmca: "",
        notas: "",
    
    
    
    
      })
      const navigate = useNavigate()

      const handleSubmit = (e) => {
          e.preventDefault()
          axios.put(`http://localhost:8081/updatecrivas/${id}`, values)
  
              .then(res => {
                  console.log(res);
                  // Optionally, you can navigate to a different page or update the UI
                  navigate('/crivas'); // Example: Navigate to the home page
              })
              .catch(err => console.log(err));
      };
      useEffect(() => {
        axios.get(`http://localhost:8081/getrecordcriva/${id}`)
            .then((res) => {
                
                    setValues({
                        ...values,
                        fecha: res.data[0].fecha,
                        turno: res.data[0].turno,
                        tolvageneral: res.data[0].tolvageneral,
                        cribav: res.data[0].cribav,
                        mesaswi: res.data[0].mesaswi,
                        bombafinsa: res.data[0].bombafinsa,
                        bombasmca: res.data[0].bombasmca,
                        notas: res.data[0].notas,
                      
                    });
               
            })
            .catch(err => console.log(err));
    }, []);
  return (
    <div className="d-flex align-items-center flex-column mt-2">
            <h1>Modificar Con.Barita</h1>
            <div className="close-button" onClick={() => navigate('/crivas')}>
                <FontAwesomeIcon icon={faTimes} />
            </div>

            <form className="w-50" onSubmit={handleSubmit} >
                <div className='nnn'>

                    <div className="date">

                        <label form='fecha' > Fecha:</label>
                        <input
                            type="date"
                            class="form-control"
                            id='date'
                            placeholder='Insertar Cantidad'
                            name='fecha'
                            value={values.fecha}
                            onChange={(e) => setValues({ ...values, fecha: e.target.value })}
                            required
                        />
                    </div>
                    <div className="molino">
                        <label>Turno:</label>
                        <select
                            id="seleccion"
                            name="seleccion"
                            class="form-control"
                            value={values.turno}
                            required
                            onChange={(e) => setValues({ ...values, turno: e.target.value })} >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>

                        </select>

                    </div>

                </div>

                <div className='silos'>
                    <div class="mb-2">
                        <label form='text' class="form-label"> Tolva General:</label>
                        <input
                            type="text"
                            class="form-control"
                            id='final'
                            placeholder='Insertar Horas'
                            name='final'
                            value={values.tolvageneral}
                            onChange={(e) => setValues({ ...values, tolvageneral: e.target.value })} required />
                    </div>
                    <div class="mb-2">
                        <label form='text' class="form-label"> Criba Vibratoria:</label>
                        <input
                            type="text"
                            class="form-control"
                            id='finalj2'
                            placeholder='Insertar Horas'
                            name='finalj2'
                            value={values.cribav}
                            onChange={(e) => setValues({ ...values, cribav: e.target.value })} required />
                    </div>
                </div>

                <div className='silos'>
                    <div class="mb-2">
                        <label form='text' class="form-label"> Mesas Wifley:</label>
                        <input
                            type="text"
                            class="form-control"
                            id='final'
                            placeholder='Insertar Horas'
                            name='final'
                            value={values.mesaswi}
                            onChange={(e) => setValues({ ...values, mesaswi: e.target.value })} required />
                    </div>
                    <div class="mb-2">
                        <label form='text' class="form-label"> Bomba FINSA:</label>
                        <input
                            type="text"
                            class="form-control"
                            id='finalj2'
                            placeholder='Insertar Horas'
                            name='finalj2'
                            value={values.bombafinsa}
                            onChange={(e) => setValues({ ...values, bombafinsa: e.target.value })} required />
                    </div>

                </div>
                <div className='silos'>
                    <div class="mb-2">
                        <label form='text' class="form-label"> Bomba S/MCA:</label>
                        <input
                            type="text"
                            class="form-control"
                            id='final'
                            placeholder='Insertar Horas'
                            name='final'
                            value={values.bombasmca}
                            onChange={(e) => setValues({ ...values, bombasmca: e.target.value })} required />
                    </div>
                    <div class="mb-2">
                    <label form='text' class="form-label"> Notas:</label>

                        <textarea
                            placeholder="Inserte Observaciones "
                            className="form-control"
                            name='descripcion'
                            value={values.notas}
                            style={{ height: '100px', width: '100%', whiteSpace: 'pre-wrap', wordWrap: 'break-word', overflowWrap: 'break-word' }}

                            onChange={(e) => setValues({ ...values, notas: e.target.value })}
                        />
                    </div>
                </div>


                <div className="btn-container">
                    <button type="submit" className="BTN"  >MODIFICAR</button>
                </div>


            </form>






        </div>
  )
}

export default ModificarCrivas
