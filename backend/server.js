const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); // Added to parse JSON in the request body

const db = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: '',
    database: 'minar',
    dateStrings: 'date',
});

app.get('/', (req, res) => {
    return res.json("from backend side");
});

app.listen(8081, () => {
    console.log("listening");
});

////////////USUARIOs////////////////////////
app.post('/createusuarios', (req, res) => {
    const sql = "INSERT INTO usuarios (nombrecompleto, telefono, cargo, nombreusuario, contra) VALUES (?, ?, ?, ?, ?)";
    const values = [
        req.body.nombrecompleto,
        req.body.telefono,
        req.body.cargo,
        req.body.nombreusuario,
        req.body.contra

    ];
    db.query(sql, values, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.post('/login', (req, res) => {
    // Consulta SQL
    const sql = "SELECT * FROM usuarios WHERE nombreusuario = ? AND contra = ?";
    db.query(sql, [req.body.nombreusuario, req.body.contra], (err, data) => {
        if (err) return res.json("Error")
        if (data.length > 0) {
            return res.json("Loadin Successfuly")
        } else {
            return res.json("No Record")
        }
    })


});

/////////////SILOS//////////
app.get('/silos', (req, res) => {
    const sql = "SELECT * FROM silos";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.post('/create', (req, res) => {
    const sql = "INSERT INTO silos (fecha, silo1, silo2, silo3, silo4, silo5) VALUES (?, ?, ?, ?, ?, ?)";
    const values = [
        req.body.fecha,
        req.body.silo1,
        req.body.silo2,
        req.body.silo3,
        req.body.silo4,
        req.body.silo5
    ];
    db.query(sql, values, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.put('/update/:id', (req, res) => {
    const sql = "UPDATE silos SET fecha = ?, silo1 = ?, silo2 = ?, silo3 = ?, silo4 = ?, silo5 = ? WHERE id_silos = ?";
    const values = [
        req.body.fecha,
        req.body.silo1,
        req.body.silo2,
        req.body.silo3,
        req.body.silo4,
        req.body.silo5
    ];
    const id = req.params.id;
    db.query(sql, [...values, id], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.delete('/delete/:id', (req, res) => {
    const sql = "DELETE FROM silos WHERE id_silos = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.get('/getrecord/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM silos WHERE id_silos = ?"
    db.query(sql, [id], (err, data) => {
        if (err) {
            return res.json({ Error: "Error" })
        }

        return res.json(data)
    })
})

////////////////////////GRANO BANDAS/////////

app.get('/granobandas', (req, res) => {
    const sql = "SELECT * FROM granobandas";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.post('/creategrano', (req, res) => {
    const sql = "INSERT INTO granobandas (fecha, entrada, salidas, pesp, saldo) VALUES (?, ?, ?, ?, ?)";
    const values = [
        req.body.fecha,
        req.body.entrada,
        req.body.salidas,
        req.body.pesp,
        req.body.saldo
    ];
    db.query(sql, values, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.delete('/deletegrano/:id', (req, res) => {
    const sql = "DELETE FROM granobandas WHERE id = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.put('/updategrano/:id', (req, res) => {
    const sql = "UPDATE granobandas SET fecha = ?, entrada = ?, salidas = ?, pesp = ?, saldo = ? WHERE id = ?";
    const values = [
        req.body.fecha,
        req.body.entrada,
        req.body.salidas,
        req.body.pesp,
        req.body.saldo

    ];
    const id = req.params.id;
    db.query(sql, [...values, id], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.get('/getrecordgrano/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM granobandas WHERE id = ?"
    db.query(sql, [id], (err, data) => {
        if (err) {
            return res.json({ Error: "Error" })
        }

        return res.json(data)
    })
})

/////////////////////////SELECCION///////////

app.get('/seleccion', (req, res) => {
    const sql = "SELECT * FROM seleccion";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.post('/createseleccion', (req, res) => {
    const sql = "INSERT INTO seleccion (fecha, entrada, salida, pesp, saldo) VALUES (?, ?, ?, ?, ?)";
    const values = [
        req.body.fecha,
        req.body.entrada,
        req.body.salida,
        req.body.pesp,
        req.body.saldo
    ];
    db.query(sql, values, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.delete('/deleteseleccion/:id', (req, res) => {
    const sql = "DELETE FROM seleccion WHERE id = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.put('/updateseleccion/:id', (req, res) => {
    const sql = "UPDATE seleccion SET fecha = ?, entrada = ?, salida = ?, pesp = ?, saldo = ? WHERE id = ?";
    const values = [
        req.body.fecha,
        req.body.entrada,
        req.body.salida,
        req.body.pesp,
        req.body.saldo

    ];
    const id = req.params.id;
    db.query(sql, [...values, id], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.get('/getrecorseleccion/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM seleccion WHERE id = ?"
    db.query(sql, [id], (err, data) => {
        if (err) {
            return res.json({ Error: "Error" })
        }

        return res.json(data)
    })
})

//////////////CONC P/MOLER//////////////
app.get('/concpmoler', (req, res) => {
    const sql = "SELECT * FROM concpmoler";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});
app.post('/createconcpmoler', async (req, res) => {
    try {
        // Obtener el saldo anterior
        const saldoAnteriorData = await new Promise((resolve, reject) => {
            db.query("SELECT saldo FROM concpmoler ORDER BY id DESC LIMIT 1", (err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });

        // Si hay registros en la tabla, obtén el saldo anterior, de lo contrario, establece el saldo anterior en 0
        const saldoAnterior = saldoAnteriorData.length > 0 ? saldoAnteriorData[0].saldo : 0;

        // Calcula el nuevo saldo sumando el saldo anterior a las entradas y restando las salidas
        const nuevoSaldo = saldoAnterior + parseFloat(req.body.entrada) - parseFloat(req.body.salida);

        // Realiza la inserción con el nuevo saldo
        const sql = "INSERT INTO concpmoler (fecha, entrada, salida, pesp, saldo) VALUES (?, ?, ?, ?, ?)";
        const values = [
            req.body.fecha,
            req.body.entrada,
            req.body.salida,
            req.body.pesp,
            nuevoSaldo
        ];

        db.query(sql, values, (err, data) => {
            if (err) {
                console.error('Error al insertar datos:', err);
                return res.status(500).json({ error: "Error al insertar datos" });
            }

            console.log('Datos insertados correctamente.');
            return res.json(data);
        });
    } catch (error) {
        console.error('Error al manejar la solicitud:', error);
        return res.status(500).json({ error: "Error al manejar la solicitud" });
    }
});

app.delete('/deleteconcpmoler/:id', (req, res) => {
    const sql = "DELETE FROM concpmoler WHERE id = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});
app.put('/updateconcpmoler/:id', async (req, res) => {
    try {
        // Obtener el saldo anterior de forma síncrona
        const saldoAnteriorData = await new Promise((resolve, reject) => {
            db.query("SELECT saldo FROM concpmoler WHERE id = ?", [req.params.id], (err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });

        // Si hay registros en la tabla, obtén el saldo anterior, de lo contrario, establece el saldo anterior en 0
        const segundoSaldoAnterior = segundoSaldoAnterior.length > 0 ? segundoSaldoAnterior[0].saldo : 0;

        // Calcula el nuevo saldo sumando el saldo anterior a las entradas y restando las salidas
        const nuevoSaldo = segundoSaldoAnterior + parseFloat(req.body.entrada) - parseFloat(req.body.salida);

        // Realiza la actualización con el nuevo saldo
        const sql = "UPDATE concpmoler SET fecha = ?, entrada = ?, salida = ?, pesp = ?, saldo = ? WHERE id = ?";
        const values = [
            req.body.fecha,
            req.body.entrada,
            req.body.salida,
            req.body.pesp,
            nuevoSaldo
        ];
        const id = req.params.id;

        db.query(sql, [...values, id], (err, data) => {
            if (err) {
                console.error('Error al actualizar datos:', err);
                return res.status(500).json({ error: "Error al actualizar datos" });
            }

            console.log('Datos actualizados correctamente.');
            // Enviar el nuevo saldo al cliente
            return res.json({ nuevoSaldo });
        });
    } catch (error) {
        console.error('Error al manejar la solicitud:', error);
        return res.status(500).json({ error: "Error al manejar la solicitud" });
    }
});

app.get('/getrecorconcpmoler/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM concpmoler WHERE id = ?"
    db.query(sql, [id], (err, data) => {
        if (err) {
            return res.json({ Error: "Error" })
        }

        return res.json(data)
    })
})
app.get('/obtenerSaldoAnterior', (req, res) => {
    const sql = "SELECT saldo FROM concpmoler ORDER BY id DESC LIMIT 1"; // Obtén el último saldo registrado
    db.query(sql, (err, data) => {
        if (err) {
            console.error('Error al obtener saldo anterior:', err);
            return res.status(500).json({ error: "Error al obtener saldo anterior" });
        }

        // Verifica si hay registros en la tabla
        if (data.length > 0) {
            const saldoAnterior = data[0].saldo;
            return res.json({ saldoAnterior });
        } else {
            // Si no hay registros, devuelve 0 como saldo anterior (o el valor que desees)
            return res.json({ saldoAnterior: 0 });
        }
    });
});
app.get('/updateobtenerSaldoAnterior', (req, res) => {
    const sql = "SELECT saldo FROM concpmoler ORDER BY id DESC LIMIT 2"; // Obtén los dos saldos más recientes
    db.query(sql, (err, data) => {
        if (err) {
            console.error('Error al obtener saldos anteriores:', err);
            return res.status(500).json({ error: "Error al obtener saldos anteriores" });
        }

        // Verifica si hay al menos dos registros en la tabla
        if (data.length >= 2) {
            const segundoSaldoAnterior = data[1].saldo;
            return res.json({ segundoSaldoAnterior });
        } else {
            // Si no hay suficientes registros, devuelve 0 como segundo saldo anterior (o el valor que desees)
            return res.json({ segundoSaldoAnterior: 0 });
        }
    });
});
//////////////////////REPORTEDIAIRIO//////////
app.get('/reportediario', (req, res) => {
    const sql = "SELECT * FROM produccionjigs";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});
app.get('/reportediariojch', (req, res) => {
    const sql = "SELECT * FROM jigschinos ";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});
app.get('/reportediariomesas', (req, res) => {
    const sql = "SELECT * FROM mesas";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});
app.get('/reportediariograno', (req, res) => {
    const sql = "SELECT * FROM prodseleccion ";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.post('/createrreportejigs', (req, res) => {
     // Restar el 1.80% de los valores antes de la inserción
     req.body.granoj1 = req.body.granoj1 - (req.body.granoj1 * 0.018);
     req.body.granoj2 = req.body.granoj2 - (req.body.granoj2 * 0.018);

     req.body.colasj1 = req.body.colasj1 - (req.body.colasj1 * 0.109);
     req.body.colasj2 = req.body.colasj2 - (req.body.colasj2 * 0.109);
     
     req.body.desenj1 = req.body.desenj1 - (req.body.desenj1 * 0.108);
     req.body.desenj2 = req.body.desenj2 - (req.body.desenj2 * 0.108);
    const sql = "INSERT INTO produccionjigs (fecha, turno, alimj1, peaj1, granoj1, pegj1, colasj1, pecj1, desenj1, pedj1, alimj2, peaj2, granoj2, pegj2, colasj2, pecj2, desenj2, pedj2) VALUES (?, ?, ?, ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
    const values = [
        req.body.fecha,
        req.body.turno,
        req.body.alimj1,
        req.body.peaj1,
        req.body.granoj1,
        req.body.pegj1,
        req.body.colasj1,
        req.body.pecj1,
        req.body.desenj1,
        req.body.pedj1,
        req.body.alimj2,
        req.body.peaj2,
        req.body.granoj2,
        req.body.pegj2,
        req.body.colasj2,
        req.body.pecj2,
        req.body.desenj2,
        req.body.pedj2
    ];
    db.query(sql, values, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.post('/createrreportejigsch', (req, res) => {
    req.body.granojch = req.body.granojch - (req.body.granojch * 0.018);
    req.body.colasjch = req.body.colasjch - (req.body.colasjch * 0.109);
    req.body.colasjsec = req.body.colasjsec - (req.body.colasjsec *0.109);
    req.body.desenjch = req.body.desenjch - (req.body.desenjch * 0.108);
    req.body.concjsec = req.body.concjsec - (req.body. concjsec * 0.14);
    const sql = "INSERT INTO jigschinos (fecha, turno, alimjch, peajch, granojch, pegjch, colasjch, pecjch, desenjch, pedjch, horasec, alimjsec, peajsec, concjsec, pecojsec, colasjsec, pecjsec) VALUES (?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?)";
    const values = [
        req.body.fecha,
        req.body.turno,
        req.body.alimjch,
        req.body.peajch,
        req.body.granojch,
        req.body.pegjch,
        req.body.colasjch,
        req.body.pecjch,
        req.body.desenjch,
        req.body.pedjch,
        req.body.horasec,
        req.body.alimjsec,
        req.body.peajsec,
        req.body.concjsec,
        req.body.pecojsec,
        req.body.colasjsec,
        req.body.pecjsec
    ];
    db.query(sql, values, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.post('/createrreportemesas', (req, res) => {
    req.body.conm12 = req.body.conm12 - (req.body.conm12 * 0.14);
    req.body.conm34 = req.body.conm34 - (req.body.conm34 * 0.14);
    req.body.conm5 = req.body.conm5 - (req.body.conm5 * 0.14);
    req.body.conm6 = req.body.conm6 - (req.body.conm6 * 0.14);

    req.body.mediom12 = req.body.medio3y4 - (req.body.medio3y4 * 0.089);
    req.body.mediosm34 = req.body.mediosm34 - (req.body.mediosm34 * 0.089);
    req.body.mediosm5 = req.body.mediosm5 - (req.body.mediosm5 * 0.089);
    req.body.mediosm6 = req.body.mediosm6 - (req.body.mediosm6 * 0.089);

    req.body.colasm12 = req.body.colasm12 - (req.body.colasm12 * 0.109);
    req.body.colasm34 = req.body.colasm34 - (req.body.colasm34 * 0.109);
    req.body.colasm5 = req.body.colasm5 - (req.body.colasm5 * 0.109);
    req.body.colasm6 = req.body.colasm6 - (req.body.colasm6 * 0.109);


    const sql = "INSERT INTO mesas (fecha, turno, alimm12, peam12, conm12, pecnm12, mediom12, pemm12, colasm12, pecm12, alimm34, peam34, conm34, pecnm34, mediosm34, pemm34, colasm34, pecm34, alimm5, peam5, conm5, pecnm5, mediosm5, pemm5, colasm5, pecm5, alimm6, peam6, conm6, pecnm6, mediom6, pemm6, colasm6, pecm6) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?)";
    const values = [
        req.body.fecha,
        req.body.turno,
        req.body.alimm12,
        req.body.peam12,
        req.body.conm12,
        req.body.pecnm12,
        req.body.mediom12,
        req.body.pemm12,
        req.body.colasm12,
        req.body.pecm12,
        req.body.alimm34,
        req.body.peam34,
        req.body.conm34,
        req.body.pecnm34,
        req.body.mediosm34,
        req.body.pemm34,
        req.body.colasm34,
        req.body.pecm34,
        req.body.alimm5,
        req.body.peam5,
        req.body.conm5,
        req.body.pecnm5,
        req.body.mediosm5,
        req.body.pemm5,
        req.body.colasm5,
        req.body.pecm5,
        req.body.alimm6,
        req.body.peam6,
        req.body.conm6,
        req.body.pecnm6,
        req.body.mediom6,
        req.body.pemm6,
        req.body.colasm6,
        req.body.pecm6
    ];
    db.query(sql, values, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.post('/createrreportegrano', (req, res) => {
    req.body.concgrano = req.body.concgrano- (req.body.concgrano * 0.14);
    req.body.colasgrano = req.body.colasgrano - (req.body.colasgrano * 0.109);

    const sql = "INSERT INTO prodseleccion (fecha, turno, alimgrano, peag, concgrano, pecng, colasgrano, pecg, tonpiedra, petp, aminale, minale, pemle, aminals, minals, pemls, apatiole, patiols, peple, apatiols, tolvageneral, pepls, amedio34, medio3y4, psm34, adesensolve, desensolve, pedese, acolas, colas, pecolas) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
    const values = [
        req.body.fecha,
        req.body.turno,
        req.body.alimgrano,
        req.body.peag,
        req.body.concgrano,
        req.body.pecng,
        req.body.colasgrano,
        req.body.pecg,
        req.body.tonpiedra,
        req.body.petp,
        req.body.aminale,
        req.body.minale,
        req.body.pemle,
        req.body.aminals,
        req.body.minals,
        req.body.pemls,
        req.body.apatiole,
        req.body.patiols,
        req.body.peple,
        req.body.apatiols,
        req.body.tolvageneral,
        req.body.pepls,
        req.body.amedio34,
        req.body.medio3y4,
        req.body.psm34,
        req.body.adesensolve,
        req.body.desensolve,
        req.body.pedese,
        req.body.acolas,
        req.body.colas,
        req.body.pecolas,


      
    ];

    db.query(sql, values, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});
app.delete('/deletediariojigs/:id', (req, res) => {
    const sql = "DELETE FROM produccionjigs WHERE id = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});
app.delete('/deletediariojigsch/:id', (req, res) => {
    const sql = "DELETE FROM jigschinos WHERE id = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});
app.delete('/deletediariomesas/:id', (req, res) => {
    const sql = "DELETE FROM mesas WHERE id = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.delete('/deletediariograno/:id', (req, res) => {
    const sql = "DELETE FROM prodseleccion WHERE id = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});
/////////////EXPORTACION POR FECHA REPORTE PROD.PLANTA///////////7
app.get('/getjigs/:fecha', (req, res) => {
    const fecha= req.params.fecha;
    const sql = "SELECT * FROM produccionjigs WHERE fecha = ?"
    db.query(sql, [fecha], (err, data) => {
        if (err) {
            console.error("Error en la consulta SQL:", err);
            return res.status(500).json({ error: "Error en la consulta SQL. Por favor, inténtalo de nuevo más tarde." });
        }

        return res.json(data);
    });
})
app.get('/getjch/:fecha', (req, res) => {
    const fecha= req.params.fecha;
    const sql = "SELECT * FROM jigschinos WHERE fecha = ?"
    db.query(sql, [fecha], (err, data) => {
        if (err) {
            console.error("Error en la consulta SQL:", err);
            return res.status(500).json({ error: "Error en la consulta SQL. Por favor, inténtalo de nuevo más tarde." });
        }

        return res.json(data);
    });
})
app.get('/getmesas/:fecha', (req, res) => {
    const fecha= req.params.fecha;
    const sql = "SELECT * FROM mesas WHERE fecha = ?"
    db.query(sql, [fecha], (err, data) => {
        if (err) {
            console.error("Error en la consulta SQL:", err);
            return res.status(500).json({ error: "Error en la consulta SQL. Por favor, inténtalo de nuevo más tarde." });
        }

        return res.json(data);
    });
})
app.get('/getgrano/:fecha', (req, res) => {
    const fecha= req.params.fecha;
    const sql = "SELECT * FROM prodseleccion WHERE fecha = ?"
    db.query(sql, [fecha], (err, data) => {
        if (err) {
            console.error("Error en la consulta SQL:", err);
            return res.status(500).json({ error: "Error en la consulta SQL. Por favor, inténtalo de nuevo más tarde." });
        }

        return res.json(data);
    });
})
//////////////////////////MODIFICACIONES/////////
app.put('/updatejigs/:id', (req, res) => {
    const sql = "UPDATE produccionjigs  SET fecha = ?, turno = ?, alimj1 = ?, peaj1= ?, granoj1 = ?, pegj1 = ?, colasj1 = ?, pecj1 = ?, desenj1 = ?, pedj1 = ?, alimj2 = ?, peaj2 = ?, granoj2 = ?, pegj2 = ?, colasj2 = ?, pecj2 = ?, desenj2 = ?, pedj2 = ? WHERE id = ?";
    const values = [
        req.body.fecha,
        req.body.turno,
        req.body.alimj1,
        req.body.peaj1,
        req.body.granoj1,
        req.body.pegj1,
        req.body.colasj1,
        req.body.pecj1,
        req.body.desenj1,
        req.body.pedj1,
        req.body.alimj2,
        req.body.peaj2,
        req.body.granoj2,
        req.body.pegj2,
        req.body.colasj2,
        req.body.pecj2,
        req.body.desenj2,
        req.body.pedj2

    ];
    const id = req.params.id;
    db.query(sql, [...values, id], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});
app.put('/updatejigsch/:id', (req, res) => {
    const sql = "UPDATE jigschinos  SET fecha = ?, turno = ?, alimjch = ?, peajch =?, granojch =?, pegjch=?, colasjch=?, pecjch=?, desenjch=?, pedjch=?, horasec = ?,alimjsec=?, peajsec=?, concjsec=?, pecojsec=?, colasjsec=?, pecjsec=? WHERE id = ?";
    const values = [
        req.body.fecha,
        req.body.turno,
        req.body.alimjch,
        req.body.peajch,
        req.body.granojch,
        req.body.pegjch,
        req.body.colasjch,
        req.body.pecjch,
        req.body.desenjch,
        req.body.pedjch,
        req.body.horasec,
        req.body.alimjsec,
        req.body.peajsec,
        req.body.concjsec,
        req.body.pecojsec,
        req.body.colasjsec,
        req.body.pecjsec

    ];
    const id = req.params.id;
    db.query(sql, [...values, id], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});
app.put('/updatemesas/:id', (req, res) => {
    const sql = "UPDATE mesas SET fecha=?, turno=?, alimm12=?, peam12=?, conm12=?, pecnm12=?, mediom12=?, pemm12=?, colasm12=?, pecm12=?, alimm34=?, peam34=?, conm34=?, pecnm34=?, mediosm34=?, pemm34=?, colasm34=?, pecm34=?, alimm5=?, peam5=?, conm5=?, pecnm5=?, mediosm5=?, pemm5=?, colasm5=?, pecm5=?, alimm6=?, peam6=?, conm6=?, pecnm6=?, mediom6=?, pemm6=?, colasm6=?, pecm6=? WHERE id = ?";
    const values = [
        req.body.fecha,
        req.body.turno,
        req.body.alimm12,
        req.body.peam12,
        req.body.conm12,
        req.body.pecnm12,
        req.body.mediom12,
        req.body.pemm12,
        req.body.colasm12,
        req.body.pecm12,
        req.body.alimm34,
        req.body.peam34,
        req.body.conm34,
        req.body.pecnm34,
        req.body.mediosm34,
        req.body.pemm34,
        req.body.colasm34,
        req.body.pecm34,
        req.body.alimm5,
        req.body.peam5,
        req.body.conm5,
        req.body.pecnm5,
        req.body.mediosm5,
        req.body.pemm5,
        req.body.colasm5,
        req.body.pecm5,
        req.body.alimm6,
        req.body.peam6,
        req.body.conm6,
        req.body.pecnm6,
        req.body.mediom6,
        req.body.pemm6,
        req.body.colasm6,
        req.body.pecm6

    ];
    const id = req.params.id;
    db.query(sql, [...values, id], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});
app.put('/updategranoseleccion/:id', (req, res) => {
    const sql = "UPDATE prodseleccion SET fecha=?, turno=?, alimgrano=?, peag=?, concgrano=?, pecng=?, colasgrano=?, pecg=?, tonpiedra=?, petp=?, aminale=?, minale=?, pemle=?, aminals=?, minals=?, pemls=?, apatiole=?, patiols=?, peple=?, apatiols=?, tolvageneral=?, pepls=?, amedio34=?, medio3y4=?, psm34=?, adesensolve=?, desensolve=?, pedese=?, acolas=?, colas=?, pecolas=? WHERE id = ?";
    const values = [
        req.body.fecha,
        req.body.turno,
        req.body.alimgrano,
        req.body.peag,
        req.body.concgrano,
        req.body.pecng,
        req.body.colasgrano,
        req.body.pecg,
        req.body.tonpiedra,
        req.body.petp,
        req.body.aminale,
        req.body.minale,
        req.body.pemle,
        req.body.aminals,
        req.body.minals,
        req.body.pemls,
        req.body.apatiole,
        req.body.patiols,
        req.body.peple,
        req.body.apatiols,
        req.body.tolvageneral,
        req.body.pepls,
        req.body.amedio34,
        req.body.medio3y4,
        req.body.psm34,
        req.body.adesensolve,
        req.body.desensolve,
        req.body.pedese,
        req.body.acolas,
        req.body.colas,
        req.body.pecolas,


    ];
    const id = req.params.id;
    db.query(sql, [...values, id], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});
app.get('/getrecorjigs/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM produccionjigs WHERE id = ?"
    db.query(sql, [id], (err, data) => {
        if (err) {
            return res.json({ Error: "Error" })
        }

        return res.json(data)
    })
})
app.get('/getrecorjigsch/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM  jigschinos WHERE id = ?"
    db.query(sql, [id], (err, data) => {
        if (err) {
            return res.json({ Error: "Error" })
        }

        return res.json(data)
    })
})
app.get('/getrecormesas/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM  mesas WHERE id = ?"
    db.query(sql, [id], (err, data) => {
        if (err) {
            return res.json({ Error: "Error" })
        }

        return res.json(data)
    })
})
app.get('/getrecorgrano/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM prodseleccion  WHERE id = ?"
    db.query(sql, [id], (err, data) => {
        if (err) {
            return res.json({ Error: "Error" })
        }

        return res.json(data)
    })
})