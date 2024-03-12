import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

function ModificarHorno() {
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
          axios.put(`http://localhost:8081/updatehorno/${id}`, values)
  
              .then(res => {
                  console.log(res);
                  // Optionally, you can navigate to a different page or update the UI
                  navigate('/horno'); // Example: Navigate to the home page
              })
              .catch(err => console.log(err));
      };
      useEffect(() => {
        axios.get(`http://localhost:8081/getrecordhorno/${id}`)
            .then((res) => {
                
                    setValues({
                        ...values,
                        fecha: res.data[0].fecha,
                        turno: res.data[0].turno,
                        quebradora: res.data[0].quebradora,
                        hrotatorio: res.data[0].hrotatorio,
                        elvmolinos: res.data[0].elvmolinos,
                        colectoresp: res.data[0].colectoresp,
                        ensacadora: res.data[0].ensacadora,
                        ensacadora1: res.data[0].ensacadora1,
                        elvsilos: res.data[0].elvsilos,
                        gusanof1: res.data[0].gusanof1,
                        gusanof5: res.data[0].gusanof5,
                        quebradorapr: res.data[0].quebradorapr,
                        notas: res.data[0].notas,
                    });
               
            })
            .catch(err => console.log(err));
    }, []);
  return (
    <div className="d-flex align-items-center flex-column mt-2">
    <h1>Insertar Molienda Barita</h1>
    <div className="close-button" onClick={() => navigate('/horno')}>
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
                <label form='text' class="form-label"> Quebradora:</label>
                <input
                    type="text"
                    class="form-control"
                    id='final'
                    placeholder='Insertar Horas'
                    name='final'
                    value={values.quebradora}
                    onChange={(e) => setValues({ ...values, quebradora: e.target.value })} required />
            </div>
            <div class="mb-2">
                <label form='text' class="form-label"> Horno Rotatorio:</label>
                <input
                    type="text"
                    class="form-control"
                    id='finalj2'
                    placeholder='Insertar Horas'
                    name='finalj2'
                    value={values.hrotatorio}
                    onChange={(e) => setValues({ ...values, hrotatorio: e.target.value })} required />
            </div>
        </div>

        <div className='silos'>
            <div class="mb-2">
                <label form='text' class="form-label"> ELV. CANJ MOLINOS 1-2:</label>
                <input
                    type="text"
                    class="form-control"
                    id='final'
                    placeholder='Insertar Horas'
                    name='final'
                    value={values.elvmolinos}
                    onChange={(e) => setValues({ ...values, elvmolinos: e.target.value })} required />
            </div>
            <div class="mb-2">
                <label form='text' class="form-label">Colectores Polvo:</label>
                <input
                    type="text"
                    class="form-control"
                    id='finalj2'
                    placeholder='Insertar Horas'
                    name='finalj2'
                    value={values.colectoresp}
                    onChange={(e) => setValues({ ...values, colectoresp: e.target.value })} required />
            </div>

        </div>
        <div className='silos'>
            <div class="mb-2">
                <label form='text' class="form-label"> ELV. CANJ Ensacadora No.:</label>
                <input
                    type="text"
                    class="form-control"
                    id='final'
                    placeholder='Insertar Horas'
                    name='final'
                    value={values.ensacadora}
                    onChange={(e) => setValues({ ...values, ensacadora: e.target.value })} required />
            </div>
            <div class="mb-2">
                <label form='text' class="form-label">Ensacadora No.1:</label>
                <input
                    type="text"
                    class="form-control"
                    id='final'
                    placeholder='Insertar Horas'
                    name='final'
                    value={values.ensacadora1}
                    onChange={(e) => setValues({ ...values, ensacadora1: e.target.value })} required />
            </div>
        </div>
        <div className='silos'>
            <div class="mb-2">
                <label form='text' class="form-label"> ELV. CANJ Silos:</label>
                <input
                    type="text"
                    class="form-control"
                    id='final'
                    placeholder='Insertar Horas'
                    name='final'
                    value={values.elvsilos}
                    onChange={(e) => setValues({ ...values, elvsilos: e.target.value })} required />
            </div>
            <div class="mb-2">
                <label form='text' class="form-label">Gusano Fino silo 1:</label>
                <input
                    type="text"
                    class="form-control"
                    id='final'
                    placeholder='Insertar Horas'
                    name='final'
                    value={values.gusanof1}
                    onChange={(e) => setValues({ ...values, gusanof1: e.target.value })} required />
            </div>
        </div>
        <div className='silos'>
            <div class="mb-2">
                <label form='text' class="form-label"> Gusano Fino Silo 5:</label>
                <input
                    type="text"
                    class="form-control"
                    id='final'
                    placeholder='Insertar Horas'
                    name='final'
                    value={values.gusanof5}
                    onChange={(e) => setValues({ ...values, gusanof5: e.target.value })} required />
            </div>
            <div class="mb-2">
                <label form='text' class="form-label">Quebradora Primaria:</label>
                <input
                    type="text"
                    class="form-control"
                    id='final'
                    placeholder='Insertar Horas'
                    name='final'
                    value={values.quebradorapr}
                    onChange={(e) => setValues({ ...values, quebradorapr: e.target.value })} required />
            </div>
        </div>
        <label form='text'> Observaciones:</label>

        <textarea
            placeholder="Inserte los medios a lavar a mesas y a jigss ."
            className="form-control"
            name='descripcion'
            style={{ height: '50px', width: '100%', whiteSpace: 'pre-wrap', wordWrap: 'break-word', overflowWrap: 'break-word' }}
            value={values.notas}
            onChange={(e) => setValues({ ...values, notas: e.target.value })}
        />

        <div className="btn-container">
            <button type="submit" className="BTN"  >GUARDAR</button>
        </div>


    </form>






</div>
  )
}

export default ModificarHorno
