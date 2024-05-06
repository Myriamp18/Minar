import React, { useState, useEffect } from 'react';
import './App.css';
import Login from './Componentes/Usuarios/Login'
import { BrowserRouter as Router, Routes, Route, BrowserRouter, Navigate } from 'react-router-dom'
import Inicio from './Componentes/Inicio'
import FrmSilos from './Componentes/Silos/FrmSilos';
import 'bootstrap/dist/css/bootstrap.min.css'
import ModificarSilos from './Componentes/Silos/ModificarSilos';
import InsertarUsuario from './Componentes/Usuarios/InsertarUsuario';
import FrmBandas from './Componentes/GranoBandas/FrmBandas';
import ModificarGrano from './Componentes/GranoBandas/ModificarGrano';
import FrmSeleccion from './Componentes/Seleccion/FrmSeleccion';
import ModificarSeleccion from './Componentes/Seleccion/ModificarSeleccion';
import FrmPMoler from './Componentes/ConcPMoler/FrmPMoler';
import ModificarCPMoler from './Componentes/ConcPMoler/ModificarCPMoler';
import ConcPMoler from './Componentes/ConcPMoler/ConcPMoler';
import Menu from './Componentes/Menu'
import Silos from './Componentes/Silos/Silos';
import Seleccion from './Componentes/Seleccion/Seleccion';
import GranoBandas from './Componentes/GranoBandas/GranoBandas';

import ReporteExistencia from './Componentes/ReporteExistencia/ReporteExistencia ';
import Pdf from './Componentes/ReporteDiario/Pdf';
import Modificarjigs from './Componentes/ReporteDiario/Modificarjigs';
import Modificarjigsch from './Componentes/ReporteDiario/Modificarjigsch';
import Modificarmesas from './Componentes/ReporteDiario/Modificarmesas';
import Modificargrano from './Componentes/ReporteDiario/Modificargrano';
import PP from './Componentes/ReporteExistencia/PP';
import PT from './Componentes/ReporteExistencia/PT';
import GranoBaribright from './Componentes/GranoBaribright/GranoBaribright';
import FrmGranoBaribright from './Componentes/GranoBaribright/FrmGranoBaribright';
import ModificarGranoBaribrigth from './Componentes/GranoBaribright/ModificarGranoBaribrigth';
import ConcBaribright from './Componentes/ConcBaribright/ConcBaribright';
import FrmConcBaribright from './Componentes/ConcBaribright/FrmConcBaribright';

import Molienda from './Componentes/Molienda/Molienda';
import Mezclas from './Componentes/Molienda/Mezclas';
import FrmMezclas from './Componentes/Molienda/FrmMezclas';
import ModificarMezclas from './Componentes/Molienda/ModificarMezclas';
import Promedios from './Componentes/Molienda/Promedios';
import FrmPromedios from './Componentes/Molienda/FrmPromedios';
import ModificarPromedios from './Componentes/Molienda/ModificarPromedios';
import PdfMolienda from './Componentes/Molienda/PdfMolienda';
import ConcMesas from './Componentes/ConcMesas/ConcMesas';
import FrmConcMesas from './Componentes/ConcMesas/FrmConcMesas';
import ModificrConcMesas from './Componentes/ConcMesas/ModificrConcMesas';
import ConcJigsSec from './Componentes/ConcJigsSec/ConcJigsSec';
import FrmConcJigsSec from './Componentes/ConcJigsSec/FrmConcJigsSec';
import ModificarJigsSec from './Componentes/ConcJigsSec/ModificarJigsSec';
import Medios from './Componentes/Medios/Medios';
import AllMedios from './Componentes/Medios/AllMedios';
import FrmAllMedios from './Componentes/Medios/FrmAllMedios';
import ModificarAllMedios from './Componentes/Medios/ModificarAllMedios';
import Medios4 from './Componentes/Medios/Medios4';
import FrmMedios4 from './Componentes/Medios/FrmMedios4';
import ModificarMedios4 from './Componentes/Medios/ModificarMedios4';
import Medios3 from './Componentes/Medios/Medios3';
import FrmMedios3 from './Componentes/Medios/FrmMedios3';
import ModificarMedios3 from './Componentes/Medios/ModificarMedios3';
import GranoPMoler from './Componentes/GranoPMoler/GranoPMoler';
import FrmGranoPMoler from './Componentes/GranoPMoler/FrmGranoPMoler';
import ModificarGranoPMoler from './Componentes/GranoPMoler/ModificarGranoPMoler';
import GranoJigsChino from './Componentes/GranoJigsChino/GranoJigsChino';
import FrmGranoJigs from './Componentes/GranoJigsChino/FrmGranoJigs';
import ModificarGranojigs from './Componentes/GranoJigsChino/ModificarGranojigs';
import Desensolvech from './Componentes/Desensolvech/Desensolvech';
import FrmDesensolvech from './Componentes/Desensolvech/FrmDesensolvech';
import ModificarDesensolvech from './Componentes/Desensolvech/ModificarDesensolvech';
import Desensolve from './Componentes/Desensolve/Desensolve';
import FrmDesensolve from './Componentes/Desensolve/FrmDesensolve';
import ModificarDesensolve from './Componentes/Desensolve/ModificarDesensolve';
import DesechoSeleccion from './Componentes/DesechoSeleccion/DesechoSeleccion';
import Desecho43 from './Componentes/DesechoSeleccion/Desecho43';
import FrmDesecho43 from './Componentes/DesechoSeleccion/FrmDesecho43';
import ModificarDesecho43 from './Componentes/DesechoSeleccion/ModificarDesecho43';
import Desecho39 from './Componentes/DesechoSeleccion/Desecho39';
import FrmDesecho39 from './Componentes/DesechoSeleccion/FrmDesecho39';
import ModificarDesecho39 from './Componentes/DesechoSeleccion/ModificarDesecho39';
import Baritron from './Componentes/Baritron/Baritron';
import FrmBaritron from './Componentes/Baritron/FrmBaritron';
import ModificarBaritron from './Componentes/Baritron/ModificarBaritron';
import TolvasMolinos from './Componentes/TolvasMolinos/TolvasMolinos';
import FrmTolvasMolinos from './Componentes/TolvasMolinos/FrmTolvasMolinos';
import ModificarTolvasMolinos from './Componentes/TolvasMolinos/ModificarTolvasMolinos';
import MP from './Componentes/ReporteExistencia/MP';
import FrmMezclasMLT from './Componentes/Mezclas/FrmMezclasMLT';
import MezclasMLE from './Componentes/Mezclas/MezclasMLE';
import MezclasMLT from './Componentes/Mezclas/MezclasMLT';

import MMezclas from './Componentes/Mezclas/MMezclas';
import FrmMezclasMLE from './Componentes/Mezclas/FrmMezclasMLE';
import ModificarMezclasMLE from './Componentes/Mezclas/ModificarMezclasMLE';
import ModificarMezclasMLT from './Componentes/Mezclas/ModificarMezclasMLT';
import MPatio from './Componentes/MPatio/MPatio';
import PatioMLE from './Componentes/MPatio/PatioMLE';
import PatioMLT from './Componentes/MPatio/PatioMLT';
import FrmPatioMLE from './Componentes/MPatio/FrmPatioMLE';
import FrmPatioMLT from './Componentes/MPatio/FrmPatioMLT';
import ModificarPatioMLE from './Componentes/MPatio/ModificarPatioMLE';
import ModificarPatioMLT from './Componentes/MPatio/ModificarPatioMLT';
import Triturada from './Componentes/Triturada/Triturada';
import TrituradaMLE from './Componentes/Triturada/TrituradaMLE';
import TrituradaMLT from './Componentes/Triturada/TrituradaMLT';
import TolvaG from './Componentes/Triturada/TolvaG';
import FrmTrituradaMLE from './Componentes/Triturada/FrmTrituradaMLE';
import FrmTrituradaMLT from './Componentes/Triturada/FrmTrituradaMLT';
import FrmTolvaG from './Componentes/Triturada/FrmTolvaG';
import ModificarTrituradaMLE from './Componentes/Triturada/ModificarTrituradaMLE';
import ModificarTrituradaMLT from './Componentes/Triturada/ModificarTrituradaMLT';
import ModificarTolvaG from './Componentes/Triturada/ModificarTolvaG';
import PdfExistencia from './Componentes/ReporteExistencia/PdfExistencia';
import Notas from './Componentes/Notas/Notas';
import FrmNotas from './Componentes/Notas/FrmNotas';
import ModificarNotas from './Componentes/Notas/ModificarNotas';
import Horometros from './Componentes/Horometros/Horometros';
import HorometroJigs from './Componentes/Horometros/HorometroJigs';
import FrmHorometroJigs from './Componentes/Horometros/FrmHorometroJigs';
import ModificarConcBaribrigjt from './Componentes/ConcBaribright/ModificarConcBaribrigjt';
import Excel from './Componentes/ReporteDiario/Excel';
import MofificarHJigs from './Componentes/Horometros/MofificarHJigs';
import FrmHorometroM12 from './Componentes/Horometros/FrmHorometroM12';
import HorometrosM12 from './Componentes/Horometros/HorometrosM12';
import ModificarHM12 from './Componentes/Horometros/ModificarHM12';
import HorometroM34 from './Componentes/Horometros/HorometroM34';
import FrmHorometroM34 from './Componentes/Horometros/FrmHorometroM34';
import FrmHorometroM5 from './Componentes/Horometros/FrmHorometroM5';
import HorometroM5 from './Componentes/Horometros/HorometroM5';
import ModificarHM34 from './Componentes/Horometros/ModificarHM34';
import ModifcarHM5 from './Componentes/Horometros/ModifcarHM5';
import FrmHorometroM6 from './Componentes/Horometros/FrmHorometroM6';
import HorometroM6 from './Componentes/Horometros/HorometroM6';
import ModificarHM6 from './Componentes/Horometros/ModificarHM6';
import Molinos from './Componentes/Horometros/Molinos';
import HorometroMolinos from './Componentes/Horometros/HorometroMolinos';
import FrmHMolinos from './Componentes/Horometros/FrmHMolinos';
import ModificarHMolinos from './Componentes/Horometros/ModificarHMolinos';
import ProdMolinos from './Componentes/Horometros/ProdMolinos';
import FrmPMolinos from './Componentes/Horometros/FrmPMolinos';
import ModificarPMolinos from './Componentes/Horometros/ModificarPMolinos';
import Criva from './Componentes/Horometros/Criva';
import FrmCrivas from './Componentes/Horometros/FrmCrivas';
import ModificarCrivas from './Componentes/Horometros/ModificarCrivas';
import Horno from './Componentes/Horometros/Horno';
import FrmHorno from './Componentes/Horometros/FrmHorno';
import ModificarHorno from './Componentes/Horometros/ModificarHorno';
import PdfHorometro from './Componentes/Horometros/PdfHorometro';
import Diario from './Componentes/ReporteDiario/Diario';
import Jigs from './Componentes/ReporteDiario/Jigs';
import FrmJigs from './Componentes/ReporteDiario/FrmJigs';
import JigsCh from './Componentes/ReporteDiario/JigsCh';
import FrmJigsch from './Componentes/ReporteDiario/FrmJigsch';
import Mesas from './Componentes/ReporteDiario/Mesas';
import FrmMesas from './Componentes/ReporteDiario/FrmMesas';
import Piedra from './Componentes/ReporteDiario/Piedra';
import FrmPiedra from './Componentes/ReporteDiario/FrmPiedra';
import Usuarios from './Componentes/Usuarios/Usuarios';
import ModificarUsuario from './Componentes/Usuarios/ModificarUsuario';
import Excelmolienda from './Componentes/Molienda/Excelmolienda';
import Excelexistencias from './Componentes/ReporteExistencia/Excelexistencias';
import CerrarSesion from './Componentes/CerrarSesion';
import ExcelHorometros from './Componentes/Horometros/ExcelHorometros';
import { RutasPrivadas } from './Componentes/RutasPrivadas';
import Modal from './Componentes/Usuarios/Modal';
import OlvContra from './Componentes/Usuarios/OlvContra';
import ReporteM from './Componentes/R.Mensual/ReporteM';


function App() {

      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

     


      return (
            <Router>
                  <Menu >
                        <Routes>
                              {/* Ruta pública para el inicio de sesión */}
                              
                              <Route path="/" element={<Login />} />
                              <Route path="/olvcontra" element={<OlvContra />}/>
                    

                              <Route element={<RutasPrivadas isLoggedIn={isLoggedIn} />}>
                              
                                    <Route path="/Inicio" element={<Inicio />} />
                                    <Route path="/close" element={<CerrarSesion />} />
                                    <Route path="/diario" element={<Diario />} />
                                    <Route path="/djigss" element={<Jigs />} />
                                    <Route path="/createdjigss" element={<FrmJigs />} />
                                    <Route path="/djigsch" element={<JigsCh />} />
                                    <Route path="/createdjigsch" element={<FrmJigsch />} />
                                    <Route path="/dmesas" element={<Mesas />} />
                                    <Route path="/createdmesas" element={<FrmMesas />} />
                                    <Route path="/dseleccion" element={<Piedra />} />
                                    <Route path="/createdseleccion" element={<FrmPiedra />} />
                                    <Route path="/pdfdiario" element={<Pdf />} />
                                    <Route path="/excel" element={<Excel />} />
            /////////SILOS///////
                                    <Route path="/create" element={<FrmSilos />} />
                                    <Route path="/update/:id" element={<ModificarSilos />} />
                                    <Route path="/silos" element={<Silos />} />

              ////USUARIO/////////
                                    <Route path="/createusuario" element={<InsertarUsuario />} />
                                    <Route path="/updateusuarios/:id" element={<ModificarUsuario />} />
                                    <Route path="/usuarios" element={<Usuarios />} />
                                    <Route path="/modal" element={<Modal />}/>




       /////////GRANOBANDAS/////
                                    <Route path="/creategrano" element={<FrmBandas />} />
                                    <Route path="/updategrano/:id" element={<ModificarGrano />} />
                                    <Route path="/granobandas" element={<GranoBandas />} />

       ////////SELECCION/////
                                    <Route path="/createseleccion" element={<FrmSeleccion />} />
                                    <Route path="/updateseleccion/:id" element={<ModificarSeleccion />} />
                                    <Route path="/seleccion" element={<Seleccion />} />

       ///////////CONC.P/MOLER/////////7
                                    <Route path="/createconcpmoler" element={<FrmPMoler />} />
                                    <Route path="/updateconcpmoler/:id" element={<ModificarCPMoler />} />
                                    <Route path="/concpmoler" element={<ConcPMoler />} />

       //////////REPORTESDIARIOS//////////7

                                    <Route path="/updatejigs/:id" element={<Modificarjigs />} />
                                    <Route path="/updatejigsch/:id" element={<Modificarjigsch />} />
                                    <Route path="/updatemesas/:id" element={<Modificarmesas />} />
                                    <Route path="/updategranoseleccion/:id" element={<Modificargrano />} />
                                    <Route path="/reporteexistencia" element={<ReporteExistencia />} />

         ////////////REPORTEEXISTENCIA////////
                                    <Route path="/existencia" element={<ReporteExistencia />} />
                                    <Route path="/pp" element={<PP />} />
                                    <Route path="/pt" element={<PT />} />
                                    <Route path="/mp" element={<MP />} />
                                    <Route path="/pdfexistencia" element={<PdfExistencia />} />




         ///////////////////granobaribright///
                                    <Route path="/granobaribright" element={<GranoBaribright />} />
                                    <Route path="/creategranobaribright" element={<FrmGranoBaribright />} />
                                    <Route path="/updategranobaribright/:id" element={<ModificarGranoBaribrigth />} />

         ///////////////////concentradobaribright///
                                    <Route path="/concentradobaribright" element={<ConcBaribright />} />
                                    <Route path="/createconcentradobaribaright" element={<FrmConcBaribright />} />
                                    <Route path="/updateconcentradobaribaright/:id" element={<ModificarConcBaribrigjt />} />

          ////////////////////////////MOLIENDA//////
                                    <Route path="/molienda" element={<Molienda />} />
                                    <Route path="/mezclas" element={<Mezclas />} />
                                    <Route path="/createmezclasmolienda" element={<FrmMezclas />} />
                                    <Route path="/updatemezclasmolienda/:id" element={<ModificarMezclas />} />
                                    <Route path="/promedios" element={<Promedios />} />
                                    <Route path="/createpromedios" element={<FrmPromedios />} />
                                    <Route path="/updatepromedios/:id" element={<ModificarPromedios />} />
                                    <Route path="/pdfmolienda" element={<PdfMolienda />} />
         //////////conmesas////////////
                                    <Route path="/concmesas" element={<ConcMesas />} />
                                    <Route path="/createconcmesas" element={<FrmConcMesas />} />
                                    <Route path="/updateconcmesas/:id" element={<ModificrConcMesas />} />

         ////////////CONCJIGSSEC/////////
                                    <Route path="/concjigssec" element={<ConcJigsSec />} />
                                    <Route path="/createconcjigssec" element={<FrmConcJigsSec />} />
                                    <Route path="/updatenconcjigssec/:id" element={<ModificarJigsSec />} />


         /////////Medios//////////
                                    <Route path="/medios" element={<Medios />} />
                                    <Route path="/medios46" element={<AllMedios />} />
                                    <Route path="/createmedios46" element={<FrmAllMedios />} />
                                    <Route path="/updatemedios46/:id" element={<ModificarAllMedios />} />
                                    <Route path="/medios4" element={<Medios4 />} />
                                    <Route path="/createmedios4" element={<FrmMedios4 />} />
                                    <Route path="/updatemedios4/:id" element={<ModificarMedios4 />} />
                                    <Route path="/medios3" element={<Medios3 />} />
                                    <Route path="/createmedios3" element={<FrmMedios3 />} />
                                    <Route path="/updatemedios3/:id" element={<ModificarMedios3 />} />


         ////////////GRANOP/MOLER////////////
                                    <Route path="/granomoler" element={<GranoPMoler />} />
                                    <Route path="/creategranomoler" element={<FrmGranoPMoler />} />
                                    <Route path="/updategranomoler/:id" element={<ModificarGranoPMoler />} />

         /////////GRANOJIGS////////////
                                    <Route path="/granojigs" element={<GranoJigsChino />} />
                                    <Route path="/creategranojigs" element={<FrmGranoJigs />} />
                                    <Route path="/updategranojigs/:id" element={<ModificarGranojigs />} />

         /////////DESENSOLVECH////////////
                                    <Route path="/desensolvech" element={<Desensolvech />} />
                                    <Route path="/createdesensolvech" element={<FrmDesensolvech />} />
                                    <Route path="/updatedesensolvech/:id" element={<ModificarDesensolvech />} />
         /////////DESENSOLVE////////////
                                    <Route path="/desensolve" element={<Desensolve />} />
                                    <Route path="/createdesensolve" element={<FrmDesensolve />} />
                                    <Route path="/updatedesensolve/:id" element={<ModificarDesensolve />} />

         /////DESECHOSELECCION//////
                                    <Route path="/desechoseleccion" element={<DesechoSeleccion />} />
                                    <Route path="/desecho43" element={<Desecho43 />} />
                                    <Route path="/createdesecho43" element={<FrmDesecho43 />} />
                                    <Route path="/updatedesecho43/:id" element={<ModificarDesecho43 />} />
                                    <Route path="/desecho39" element={<Desecho39 />} />
                                    <Route path="/createdesecho39" element={<FrmDesecho39 />} />
                                    <Route path="/updatedesecho39/:id" element={<ModificarDesecho39 />} />

         /////////BARITRON////////////
                                    <Route path="/baritron" element={<Baritron />} />
                                    <Route path="/createbaritron" element={<FrmBaritron />} />
                                    <Route path="/updatebaritron/:id" element={<ModificarBaritron />} />

         /////////TOLVAS MOLINOS////////////
                                    <Route path="/tolvas" element={<TolvasMolinos />} />
                                    <Route path="/createtolvas" element={<FrmTolvasMolinos />} />
                                    <Route path="/updatetolvas/:id" element={<ModificarTolvasMolinos />} />

         ////////////////MP//////////
                                    <Route path="/mineral" element={<MMezclas />} />
                                    <Route path="/mmlt" element={<MezclasMLT />} />
                                    <Route path="/createmmlt" element={<FrmMezclasMLT />} />
                                    <Route path="/updatemmlt/:id" element={<ModificarMezclasMLT />} />
                                    <Route path="/mmle" element={<MezclasMLE />} />
                                    <Route path="/createmmle" element={<FrmMezclasMLE />} />
                                    <Route path="/updatemmle/:id" element={<ModificarMezclasMLE />} />

                                    <Route path="/patio" element={<MPatio />} />
                                    <Route path="/mpmle" element={<PatioMLE />} />
                                    <Route path="/creatempmle" element={<FrmPatioMLE />} />
                                    <Route path="/updatempmle/:id" element={<ModificarPatioMLE />} />
                                    <Route path="/mpmlt" element={<PatioMLT />} />
                                    <Route path="/creatempmlt" element={<FrmPatioMLT />} />
                                    <Route path="/updatempmlt/:id" element={<ModificarPatioMLT />} />

                                    <Route path="/triturada" element={<Triturada />} />
                                    <Route path="/tmle" element={<TrituradaMLE />} />
                                    <Route path="/tmlt" element={<TrituradaMLT />} />
                                    <Route path="/tolvag" element={<TolvaG />} />
                                    <Route path="/createtmle" element={<FrmTrituradaMLE />} />
                                    <Route path="/createtmlt" element={<FrmTrituradaMLT />} />
                                    <Route path="/createtolvag" element={<FrmTolvaG />} />
                                    <Route path="/updatetmle/:id" element={<ModificarTrituradaMLE />} />
                                    <Route path="/updatetmlt/:id" element={<ModificarTrituradaMLT />} />
                                    <Route path="/updatetolvag/:id" element={<ModificarTolvaG />} />
                                    <Route path="/notas" element={<Notas />} />
                                    <Route path="/createnotas" element={<FrmNotas />} />
                                    <Route path="/updatenotas/:id" element={<ModificarNotas />} />



         /////////HOROMETROS//////////
                                    <Route path="/horometros" element={<Horometros />} />
                                    <Route path="/hjigs" element={<HorometroJigs />} />
                                    <Route path="/createhjigs" element={<FrmHorometroJigs />} />
                                    <Route path="/updatehjigs/:id" element={<MofificarHJigs />} />
                                    <Route path="/hmesa12" element={<HorometrosM12 />} />
                                    <Route path="/createhmesa12" element={<FrmHorometroM12 />} />
                                    <Route path="/updatehmesa12/:id" element={<ModificarHM12 />} />
                                    <Route path="/hmesa34" element={<HorometroM34 />} />
                                    <Route path="/createhmesa34" element={<FrmHorometroM34 />} />
                                    <Route path="/updatehmesa34/:id" element={<ModificarHM34 />} />
                                    <Route path="/hmesa5" element={<HorometroM5 />} />
                                    <Route path="/createhmesa5" element={<FrmHorometroM5 />} />
                                    <Route path="/updatehmesa5/:id" element={<ModifcarHM5 />} />
                                    <Route path="/hmesa6" element={<HorometroM6 />} />
                                    <Route path="/createhmesa6" element={<FrmHorometroM6 />} />
                                    <Route path="/updatehmesa6/:id" element={<ModificarHM6 />} />
                                    <Route path="/hmolinos" element={<Molinos />} />
                                    <Route path="/Horomolinos" element={<HorometroMolinos />} />
                                    <Route path="/createhmolinos" element={<FrmHMolinos />} />
                                    <Route path="/updatehmolinos/:id" element={<ModificarHMolinos />} />
                                    <Route path="/molinos" element={<ProdMolinos />} />
                                    <Route path="/createhrsmolinos" element={<FrmPMolinos />} />
                                    <Route path="/updatehrsmolinos/:id" element={<ModificarPMolinos />} />
                                    <Route path="/crivas" element={<Criva />} />
                                    <Route path="/createcrivas" element={<FrmCrivas />} />
                                    <Route path="/updatecrivas/:id" element={<ModificarCrivas />} />


                                    <Route path="/horno" element={<Horno />} />
                                    <Route path="/createhorno" element={<FrmHorno />} />
                                    <Route path="/updatehorno/:id" element={<ModificarHorno />} />
                                    <Route path="/pdfhorometro" element={<PdfHorometro />} />

                                    <Route path="/excel" element={<Excel />} />
                                    <Route path="/excelmolienda" element={<Excelmolienda />} />
                                    <Route path="/excelexistencias" element={<Excelexistencias />} />
                                    <Route path="/excelhorometro" element={<ExcelHorometros />} />

                                    <Route path="/reportem" element={<ReporteM/>} />


                              </Route>
                        </Routes>

                  </Menu>
            </Router >
      );
}


export default App;
