import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

function ModificarPromedios() {
    const { id } = useParams()
    const [values, setValues] = useState({
        fecha: '',
        turno: "1",
        pemolino1: "",
        malla200mo1:"",
        malla325mo1: "",
        calciosmo1:"",
        humedadmo1: "",
        pemolino2:"",
        malla200mo2: "",
        malla325mo2:"",
        calciosmo2: "",
        humedadmo2:"",
       
    
    
      })
      const navigate = useNavigate()

      const handleSubmit = (e) => {
          e.preventDefault()
          axios.put(`http://localhost:8081/updatepromedios/${id}`, values)
  
              .then(res => {
                  console.log(res);
                  // Optionally, you can navigate to a different page or update the UI
                  navigate('/promedios'); // Example: Navigate to the home page
              })
              .catch(err => console.log(err));
      };
  
      useEffect(() => {
          axios.get(`http://localhost:8081/getrecordpromedios/` + id)
              .then((res) => {
  
                  setValues({
                      ...values,
                      fecha: res.data[0].fecha,
                      pemolino1:res.data[0].pemolino1,
                      malla200mo1: res.data[0].malla200mo1,
                      malla325mo1:res.data[0].malla325mo1,
                      calciosmo1:res.data[0].calciosmo1,
                      humedadmo1:res.data[0].humedadmo1,
                      pemolino2:res.data[0].pemolino2,
                      malla200mo2:res.data[0].malla200mo2,
                      malla325mo2:res.data[0].malla325mo2,
                      calciosmo2:res.data[0].calciosmo2,
                      humedadmo2:res.data[0].humedadmo2,
                  });
  
              })
              .catch(err => console.log(err));
      }, []);
  return (
    <div className="d-flex align-items-center flex-column mt-3" >
            <h1>Modificar Promedio</h1>
            <div className="close-button" onClick={() => navigate('/promedios')}>
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
                                required
                                value={values.fecha}
                                onChange={(e) => setValues({ ...values, fecha: e.target.value })}
                            />
                        </div>
                        <div className="molino">
                            <label>Turno:</label>
                            <select
                                id="seleccion"
                                name="seleccion"
                                class="form-control"
                                required
                                value={values.turno}
                                onChange={(e) => setValues({ ...values, turno: e.target.value })} >
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>

                            </select>

                        </div>
                        
                        </div>
                        <div className="molinos">
                    <div className="molinos-columns">
                  <center>  <label form='text'> MOLINO 1</label></center>


                        <div className="molino">
                            <label form='text'> P.ESP</label>

                            <input
                                type="tolvagen"
                                placeholder="Insertar Promedio."
                                class="form-control"
                                name='pemolino1'
                                required
                                value={values.pemolino1}
                                onChange={(e) => setValues({ ...values, pemolino1: e.target.value })} />

                        </div>

                        <div className="molino">
                            <label form='text' > % Ret. Malla 200:</label>
                            <input
                                placeholder="Insertar Promedio"
                                class="form-control"
                                name='malla200mo1'
                                required
                                value={values.malla200mo1}
                                onChange={(e) => setValues({ ...values, malla200mo1: e.target.value })} />
                        </div>

                        <div className="molino">
                            <label form='text'> % Ret. Malla 325:</label>
                            <input
                                placeholder="Insertar Promedio"
                                class="form-control"
                                name=' malla325mo1'
                                required
                                value={values.malla325mo1}
                                onChange={(e) => setValues({ ...values, malla325mo1: e.target.value })} />
                        </div>

                        <div className="molino">
                            <label form='text' >Calcios P.P.M</label>
                            <input
                                placeholder="Insertar Promedio"
                                class="form-control"
                                name='calciosmo1'
                                required
                                value={values.calciosmo1}
                                onChange={(e) => setValues({ ...values, calciosmo1: e.target.value })} />
                        </div>

                        <div className="molino">
                            <label form='text' > %Humedad:</label>
                            <input
                                placeholder="Insertar Promedio"
                                class="form-control"
                                required
                                name=' humedadmo1'
                                value={values.humedadmo1}
                                onChange={(e) => setValues({ ...values, humedadmo1: e.target.value })} />
                        </div>
                       
                    </div>
                    





                    <div className="molinos-columns">
                    <center>  <label form='text'> MOLINO 2</label></center>
                    <div className="molino">
                            <label form='text'> P.ESP</label>

                            <input
                                type="tolvagen"
                                placeholder="Insertar Promedio."
                                class="form-control"
                                name='pemolino2'
                                required
                                value={values.pemolino2}
                                onChange={(e) => setValues({ ...values, pemolino2: e.target.value })} />

                        </div>

                        <div className="molino">
                            <label form='text' > % Ret. Malla 200:</label>
                            <input
                                placeholder="Insertar Promedio"
                                class="form-control"
                                name='malla200mo2'
                                required
                                value={values.malla200mo2}
                                onChange={(e) => setValues({ ...values, malla200mo2: e.target.value })} />
                        </div>

                        <div className="molino">
                            <label form='text'> % Ret. Malla 325:</label>
                            <input
                                placeholder="Insertar Promedio"
                                class="form-control"
                                required
                                name=' malla325mo2'
                                value={values.malla325mo2}
                                onChange={(e) => setValues({ ...values, malla325mo2: e.target.value })} />
                        </div>

                        <div className="molino">
                            <label form='text' >Calcios P.P.M</label>
                            <input
                                placeholder="Insertar Promedio"
                                class="form-control"
                                required
                                name='calciosmo2'
                                value={values.calciosmo2}
                                onChange={(e) => setValues({ ...values, calciosmo2: e.target.value })} />
                        </div>

                        <div className="molino">
                            <label form='text' > %Humedad:</label>
                            <input
                                placeholder="Insertar Promedio"
                                class="form-control"
                                name=' humedadmo2'
                                required
                                value={values.humedadmo2}
                                onChange={(e) => setValues({ ...values, humedadmo2: e.target.value })} />
                        </div>
                       



                </div>
                </div>

                <div className="btnmolino-container">
                    <button type="submit" className="BTNmolino"  >MODIFICAR</button>
                </div>


            </form>






        </div>
  )
}

export default ModificarPromedios
