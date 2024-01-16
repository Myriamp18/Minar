import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './FrmSilos.css'
import Form from 'react-bootstrap/Form';


function FrmSilos() {

    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false); 

    return(
     <div>
      <Button variant="danger" size="lg"   onClick={handleShow}  >
      <FontAwesomeIcon icon={faPlus}/> <strong >Insertar </strong>
      </Button>

      <Modal show={show} onHide={handleClose}  animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>
          <div className="headert">
          <div className="texto">Minerales Silos</div>
          <div className="linea"></div>
        </div>
         </Modal.Title>

        </Modal.Header>
        <Modal.Body>
        <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Fecha:</Form.Label>
              <Form.Control
                type="date"  
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlInput2">
              <Form.Label>Silo 1:</Form.Label>
              <Form.Control type="text"  placeholder="cantidad"  />
            </Form.Group>


            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlInput2">
              <Form.Label>Silo 2:</Form.Label>
              <Form.Control type="text"  placeholder="cantidad"  />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlInput2">
              <Form.Label>Silo 3:</Form.Label>
              <Form.Control type="text"  placeholder="cantidad"  />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlInput2">
              <label>Silo 4:</label>
              <Form.Control type="text"  placeholder="cantidad"  />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlInput2">
              <Form.Label>Silo 5:</Form.Label>
              <Form.Control type="text"  placeholder="cantidad"  />
            </Form.Group>




          </Form>
        
        </Modal.Body>
        <Modal.Footer>
        <div className="btn-container">
            <button className="BTN"  >GUARDAR</button>
            </div>
         
        </Modal.Footer>
      </Modal>
    

    </div>
        
    )
}

export default FrmSilos