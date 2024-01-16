import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './FrmReporte.css'


function FrmReporte() {


  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (

   <div>
     <Button variant="danger" size="lg"   onClick={handleShow}  >
       <FontAwesomeIcon icon={faPlus}/> <strong >Insertar Reporte </strong>
      </Button>

      <Modal className='modal' show={show}   {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      animation={false} 
      onHide={handleClose}>
        
        <Modal.Header closeButton>
          <Modal.Title>
         
          <div className="headert">
          <div className="texto">Reporte Diario</div>
          <div className="linea"></div>
        </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form>
           <div className='fecha'>
          <label> Fecha:</label>
              <input type="date" placeholder="cantidad" />
              </div>
          
          <div className="columns">
            {/* Primera columna */}
           
            <div className="columna">
           
              <div className="lavar">
              <label> Crivada Silvia a Lavar:</label>
              <input type="crivada" placeholder="cantidad" />
              </div>

              <div className="lavar">
              <label> Consentrado a Moler 123y4:</label>
              <input type="moler" placeholder="cantidad" />
              </div>

              <div className="lavar">
              <label> Tric. Tolva General:</label>
              <input type="tolvagen" placeholder="cantidad" />
              </div>

              <div className="lavar">
              <label> Grano a Moler:</label>
              <input type="tolvagen" placeholder="cantidad" />
              </div>

              <div className="lavar">
              <label>Patio a Tolva General:</label>
              <input type="patiotg" placeholder="cantidad" />
              </div>

              <div className="lavar">
              <label> Patio a Tolva #2:</label>
              <input type="patiot2" placeholder="cantidad" />
              </div>

            </div>



            {/* Segunda columna */}
            <div className="columna">
              <div className="lavar">
              <label>Grano a Moler:</label>
              <input type="granom" placeholder="cantidad" />
              </div>

              <div className="lavar"> 
              <label>Medios 5 y 6:</label>
              <input type="medio5y6" placeholder="cantidad" />
              </div>

              <div className="lavar"> 
              <label> Medios a Lavar:</label>
              <input type="medioslavar" placeholder="cantidad" />
              </div>

              <div className="lavar">
              <label>  Grano produc. JIGS#1:</label>
              <input type="jigs1" placeholder="cantidad" />
              </div>

              <div className="lavar">
              <label> Tepetate JIGS#1:</label>
              <input type="tepetatejigs1" placeholder="cantidad" />
              </div>

              <div className="lavar"> 
              <label> Consentrado Mesa 5:</label>
              <input type="concentradom5" placeholder="cantidad" />
              </div>

             


            </div>



            {/* Tercera columna */}
            <div className="columna">

              <div className="lavar">
              <label> Consentrado Mesa 6:</label>
              <input type="concentradom6" placeholder="cantidad" />
              </div>

              <div className="lavar">
              <label>Consentrado JIGS SECU:</label>
              <input type="concentraoJIGS2" placeholder="cantidad" />
              </div>

              <div className="lavar">
              <label>Grano Produccion JIGS1:</label>
              <input type="graPRODJIGS1" placeholder="cantidad" />
              </div>

              <div className="lavar">
              <label> Consentrado Mesa 3y4:</label>
              <input type="conm3y4" placeholder="cantidad" />
              </div>

              <div className="lavar">
              <label> Consentrado Mesa 1y2:</label>
              <input type="conm1y2" placeholder="cantidad" />
              </div>

              <div className="lavar">
              <label> Polvo CTS:</label>
              <input type="POLVO" placeholder="cantidad" />
              </div>


            </div>
           
          </div>
          

        </form>
        

        </Modal.Body>
        <Modal.Footer>
        <div className="btn-container">
            <button className="BTN"  >GUARDAR</button>
            </div>
          
          {/* Puedes agregar más botones en el pie de la modal si es necesario */}
        </Modal.Footer>
      </Modal>
      </div>
     

  );
}

export default FrmReporte;