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
    const sql = "SELECT * FROM silos ORDER BY id_silos DESC";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.post('/create', (req, res) => {
    const sql = "INSERT INTO silos (fecha, silo1, pes1, silo2, pes2, silo3, pes3, silo4,pes4, silo5,pes5) VALUES (?, ?, ?, ?, ?, ?,?,?,?,?,?)";
    const values = [
        req.body.fecha,
        req.body.silo1,
        req.body.pes1,
        req.body.silo2,
        req.body.pes2,
        req.body.silo3,
        req.body.pes3,
        req.body.silo4,
        req.body.pes4,
        req.body.silo5,
        req.body.pes5,
    ];
    db.query(sql, values, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.put('/update/:id', (req, res) => {
    const sql = "UPDATE silos SET fecha=?, silo1=?, pes1=?, silo2=?, pes2=?, silo3=?, pes3=?, silo4=?,pes4=?, silo5=?,pes5=? WHERE id_silos = ?";
    const values = [
        req.body.fecha,
        req.body.silo1,
        req.body.pes1,
        req.body.silo2,
        req.body.pes2,
        req.body.silo3,
        req.body.pes3,
        req.body.silo4,
        req.body.pes4,
        req.body.silo5,
        req.body.pes5,
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
    const sql = "SELECT * FROM seleccion ORDER BY id DESC";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.post('/createseleccion', async (req, res) => { // Añade 'async' aquí
    try {
        // Obtener el saldo anterior
        const saldoAnteriorData = await new Promise((resolve, reject) => {
            db.query("SELECT saldo FROM seleccion ORDER BY id DESC LIMIT 1", (err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });

        // Si hay registros en la tabla, obtén el saldo anterior, de lo contrario, establece el saldo anterior en 0
        const saldoAnterior = saldoAnteriorData.length > 0 ? saldoAnteriorData[0].saldo : 0;

        // Calcula el nuevo saldo sumando el saldo anterior a las entradas y restando las salidas
        const nuevoSaldo = saldoAnterior + parseFloat(req.body.entrada) - parseFloat(req.body.salida);

        // Realiza la inserción con el nuevo saldo
        const sql = "INSERT INTO seleccion (fecha, entrada, salida, pesp, saldo) VALUES (?, ?, ?, ?, ?)";
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
    const sql = "SELECT * FROM produccionjigs ORDER BY id DESC";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});
app.get('/reportediariojch', (req, res) => {
    const sql = "SELECT * FROM jigschinos ORDER BY id DESC LIMIT 3;";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});
app.get('/reportediariomesas', (req, res) => {
    const sql = "SELECT * FROM mesas ORDER BY id DESC LIMIT 3";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});
app.get('/reportediariograno', (req, res) => {
    const sql = "SELECT * FROM prodseleccion ORDER BY id DESC LIMIT 3";
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
    req.body.colasjsec = req.body.colasjsec - (req.body.colasjsec * 0.109);
    req.body.desenjch = req.body.desenjch - (req.body.desenjch * 0.108);
    req.body.concjsec = req.body.concjsec - (req.body.concjsec * 0.14);
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
    req.body.concgrano = req.body.concgrano - (req.body.concgrano * 0.14);
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
    const fecha = req.params.fecha;
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
    const fecha = req.params.fecha;
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
    const fecha = req.params.fecha;
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
    const fecha = req.params.fecha;
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

//////////////////GranoBarbigth//////////

app.get('/granobaribright', (req, res) => {
    const sql = "SELECT * FROM granobaribright";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});
app.post('/creategranobaribright', async (req, res) => {
    try {
        // Obtener el saldo anterior
        const saldoAnteriorData = await new Promise((resolve, reject) => {
            db.query("SELECT saldo FROM granobaribright ORDER BY id DESC LIMIT 1", (err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });

        // Si hay registros en la tabla, obtén el saldo anterior, de lo contrario, establece el saldo anterior en 0
        const saldoAnterior = saldoAnteriorData.length > 0 ? saldoAnteriorData[0].saldo : 0;

        // Calcula el nuevo saldo sumando el saldo anterior a las entradas y restando las salidas
        const nuevoSaldo = saldoAnterior + parseFloat(req.body.entradas) - parseFloat(req.body.salidas);

        // Realiza la inserción con el nuevo saldo
        const sql = "INSERT INTO granobaribright (fecha, entradas, salidas, pe, saldo) VALUES (?, ?, ?, ?, ?)";
        const values = [
            req.body.fecha,
            req.body.entradas,
            req.body.salidas,
            req.body.pe,
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

app.delete('/deletegranobaribright/:id', (req, res) => {
    const sql = "DELETE FROM granobaribright WHERE id = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});
app.put('/updategranobaribright/:id', async (req, res) => {
    try {
        const obtenerSaldoAnterior = async (id) => {
            return new Promise((resolve, reject) => {
                db.query("SELECT saldo FROM granobaribright WHERE id = ?", [id], (err, data) => {
                    if (err) reject(err);
                    else resolve(data);
                });
            });
        };

        // Obtener el saldo anterior antes de realizar la actualización
        const saldoAnteriorData = await obtenerSaldoAnterior(req.params.id);

        // Verificar si se encontró el saldo anterior
        if (saldoAnteriorData.length > 0) {
            const saldoAnterior = saldoAnteriorData[0].saldo;

            // Calcula el nuevo saldo utilizando el saldo anterior
            const nuevoSaldo = saldoAnterior + parseFloat(req.body.entradas) - parseFloat(req.body.salidas);

            // Realiza la actualización en la base de datos utilizando el nuevo saldo
            const sql = "UPDATE granobaribright SET fecha = ?, entradas = ?, salidas = ?, pe = ?, saldo = ? WHERE id = ?";
            const values = [
                req.body.fecha,
                req.body.entradas,
                req.body.salidas,
                req.body.pe,
                nuevoSaldo,
                req.params.id
            ];

            db.query(sql, values, (err, data) => {
                if (err) {
                    console.error('Error al actualizar los datos:', err);
                    return res.status(500).json({ error: "Error al actualizar los datos" });
                }

                console.log('Datos actualizados correctamente.');
                return res.json(data);
            });
        } else {
            console.error('No se encontró el saldo anterior.');
            return res
        }
    } catch (error) {
        console.error('Error al obtener el saldo anterior:', error);
        return res.status(500).json({ error: "Error al obtener el saldo anterior" });
    }


});

app.get('/getrecorgranobaribright/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM granobaribright WHERE id = ?"
    db.query(sql, [id], (err, data) => {
        if (err) {
            return res.json({ Error: "Error" })
        }

        return res.json(data)
    })
})


//////////////////ConcentradoBarbigth//////////

app.get('/concentradobaribaright', (req, res) => {
    const sql = "SELECT * FROM concentradobaribaright";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});
app.post('/createconcentradobaribaright', async (req, res) => {
    try {
        // Obtener el saldo anterior
        const saldoAnteriorData = await new Promise((resolve, reject) => {
            db.query("SELECT saldo FROM concentradobaribaright ORDER BY id DESC LIMIT 1", (err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });

        // Si hay registros en la tabla, obtén el saldo anterior, de lo contrario, establece el saldo anterior en 0
        const saldoAnterior = saldoAnteriorData.length > 0 ? saldoAnteriorData[0].saldo : 0;

        // Calcula el nuevo saldo sumando el saldo anterior a las entradas y restando las salidas
        const nuevoSaldo = saldoAnterior + parseFloat(req.body.entradas) - parseFloat(req.body.salidas);

        // Realiza la inserción con el nuevo saldo
        const sql = "INSERT INTO concentradobaribaright (fecha, entradas, salidas, pe, saldo) VALUES (?, ?, ?, ?, ?)";
        const values = [
            req.body.fecha,
            req.body.entradas,
            req.body.salidas,
            req.body.pe,
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

app.delete('/deleteconcentradobaribaright/:id', (req, res) => {
    const sql = "DELETE FROM concentradobaribaright WHERE id = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});
app.put('/updateconcentradobaribaright/:id', async (req, res) => {
    try {
        const obtenerSaldoAnterior = async (id) => {
            return new Promise((resolve, reject) => {
                db.query("SELECT saldo FROM concentradobaribaright WHERE id = ?", [id], (err, data) => {
                    if (err) reject(err);
                    else resolve(data);
                });
            });
        };

        // Obtener el saldo anterior antes de realizar la actualización
        const saldoAnteriorData = await obtenerSaldoAnterior(req.params.id);

        // Verificar si se encontró el saldo anterior
        if (saldoAnteriorData.length > 0) {
            const saldoAnterior = saldoAnteriorData[0].saldo;

            // Calcula el nuevo saldo utilizando el saldo anterior
            const nuevoSaldo = saldoAnterior + parseFloat(req.body.entradas) - parseFloat(req.body.salidas);

            // Realiza la actualización en la base de datos utilizando el nuevo saldo
            const sql = "UPDATE concentradobaribaright SET fecha = ?, entradas = ?, salidas = ?, pe = ?, saldo = ? WHERE id = ?";
            const values = [
                req.body.fecha,
                req.body.entradas,
                req.body.salidas,
                req.body.pe,
                nuevoSaldo,
                req.params.id
            ];

            db.query(sql, values, (err, data) => {
                if (err) {
                    console.error('Error al actualizar los datos:', err);
                    return res.status(500).json({ error: "Error al actualizar los datos" });
                }

                console.log('Datos actualizados correctamente.');
                return res.json(data);
            });
        } else {
            console.error('No se encontró el saldo anterior.');
            return res
        }
    } catch (error) {
        console.error('Error al obtener el saldo anterior:', error);
        return res.status(500).json({ error: "Error al obtener el saldo anterior" });
    }


});

app.get('/getrecorconcentradobaribaright/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM concentradobaribaright WHERE id = ?"
    db.query(sql, [id], (err, data) => {
        if (err) {
            return res.json({ Error: "Error" })
        }

        return res.json(data)
    })
})

//////////////CONCENTRADOMESAS////////////////
app.get('/concmesas', (req, res) => {
    const sql = "SELECT * FROM concmesas ORDER BY id DESC";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});
app.post('/createconcmesas', async (req, res) => {
    try {
        //Obtener el total concentrado de las mesas para la fecha especificada
        const totalConcentradoMesas = await new Promise((resolve, reject) => {
            const query = "SELECT (SUM(conm12) + SUM(conm34) + SUM(conm5) + SUM(conm6)) AS total_concentrado FROM mesas WHERE fecha = ?;";
            db.query(query, [req.body.fecha], (err, data) => {
                if (err) reject(err);
                else resolve(data[0].total_concentrado); // Obtenemos el total concentrado de la primera fila
            });
        });
        const totalSalidasMesas = await new Promise((resolve, reject) => {
            const query = "SELECT (SUM(concmesas)) AS total_salidas FROM molienda WHERE fecha = ?;";
            db.query(query, [req.body.fecha], (err, data) => {
                if (err) reject(err);
                else resolve(data[0].total_salidas); // Obtenemos el total concentrado de la primera fila
            });
        });
        const totalpe = await new Promise((resolve, reject) => {
            const query = "SELECT fecha, SUM(pecnm12) AS total_pecnm12, SUM(pecnm34) AS total_pecnm34, SUM(pecnm5) AS total_pecnm5, SUM(pecnm6) AS total_pecnm6, COUNT(*) AS count_peconcmesas, (SUM(pecnm12) + SUM(pecnm34) + SUM(pecnm5) + SUM(pecnm6)) / COUNT(*) AS average_concmesas FROM mesas WHERE fecha = ? GROUP BY fecha;";
        
            db.query(query, [req.body.fecha], (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    if (data.length > 0) {
                        const average = data[0].average_concmesas;
                        resolve(average);
                    } else {
                        resolve(0); // Si no hay registros para esa fecha, el promedio es 0
                    }
                }
            });
        });
        
        
        // Obtener el saldo anterior
        const saldoAnteriorData = await new Promise((resolve, reject) => {
            db.query("SELECT saldo FROM concmesas ORDER BY id DESC LIMIT 1", (err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });

        // Si hay registros en la tabla, obtén el saldo anterior, de lo contrario, establece el saldo anterior en 0
        const saldoAnterior = saldoAnteriorData.length > 0 ? saldoAnteriorData[0].saldo : 0;

        // Calcula el nuevo saldo sumando el saldo anterior a las entradas y restando las salidas
        const nuevoSaldo = saldoAnterior + parseFloat(totalConcentradoMesas) - parseFloat(totalSalidasMesas);

        // Realizar la inserción en la tabla concmesas
        const sql = "INSERT INTO concmesas (fecha, entradas, salidas, saldo, pe) VALUES (?, ?, ?, ?, ?)";
        const values = [
            req.body.fecha,
            totalConcentradoMesas,
            totalSalidasMesas,
            nuevoSaldo,
            totalpe,
        ];

        db.query(sql, values, (err, result) => {
            if (err) throw err;
            console.log("Registro insertado en concmesas con éxito.");
            res.send("Registro insertado en concmesas con éxito.");
        });
    } catch (error) {
        console.error("Error al crear el registro en concmesas:", error);
        res.status(500).send("Error al crear el registro en concmesas.");
    }
});


app.put('/updateconcmesas/:id',async(req, res) => {
    try {
        //Obtener el total concentrado de las mesas para la fecha especificada
        const totalConcentradoMesas = await new Promise((resolve, reject) => {
            const query = "SELECT (SUM(conm12) + SUM(conm34) + SUM(conm5) + SUM(conm6)) AS total_concentrado FROM mesas WHERE fecha = ?;";
            db.query(query, [req.body.fecha], (err, data) => {
                if (err) reject(err);
                else resolve(data[0].total_concentrado); // Obtenemos el total concentrado de la primera fila
            });
        });
        const totalSalidasMesas = await new Promise((resolve, reject) => {
            const query = "SELECT (SUM(concmesas)) AS total_salidas FROM molienda WHERE fecha = ?;";
            db.query(query, [req.body.fecha], (err, data) => {
                if (err) reject(err);
                else resolve(data[0].total_salidas); // Obtenemos el total concentrado de la primera fila
            });
        });

        // Obtener el saldo anterior
        const saldoAnteriorData = await new Promise((resolve, reject) => {
            db.query("SELECT saldo FROM concmesas ORDER BY id DESC LIMIT 1", (err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });

        // Si hay registros en la tabla, obtén el saldo anterior, de lo contrario, establece el saldo anterior en 0
        const saldoAnterior = saldoAnteriorData.length > 0 ? saldoAnteriorData[0].saldo : 0;

        // Calcula el nuevo saldo sumando el saldo anterior a las entradas y restando las salidas
        const nuevoSaldo = saldoAnterior + parseFloat(totalConcentradoMesas) - parseFloat(totalSalidasMesas);
        const sql = "UPDATE concmesas SET fecha=?, entradas=?, salidas=?, saldo=?, pe=? WHERE id = ?";
        const values = [
            req.body.fecha,
            totalConcentradoMesas,
            totalSalidasMesas,
            nuevoSaldo,
            req.body.pe,
        ];
        const id = req.params.id;
        db.query(sql, [...values, id], (err, data) => {
            if (err) return res.json(err);
            return res.json(data);
        });
    } catch (error) {
        console.error("Error al crear el registro en concmesas:", error);
        res.status(500).send("Error al crear el registro en concmesas.");
    }
    });

app.delete('/deleteconcmesas/:id', (req, res) => {
    const sql = "DELETE FROM concmesas WHERE id = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.get('/getrecordconcmesas/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM concmesas WHERE id = ?"
    db.query(sql, [id], (err, data) => {
        if (err) {
            return res.json({ Error: "Error" })
        }

        return res.json(data)
    })
})
///////////////////MOLIENDAMEZCLAS////////////
app.get('/mezclasmolienda', (req, res) => {
    const sql = "SELECT * FROM molienda ORDER BY id DESC";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});
app.delete('/deletemezclasmolienda/:id', (req, res) => {
    const sql = "DELETE FROM molienda WHERE id = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});
app.post('/createmezclasmolienda', (req, res) => {
    // Convierte los valores de req.body a números antes de sumarlos
    const concmesas = parseFloat(req.body.concmesas);
    const medios = parseFloat(req.body.medios);
    const desenslovez = parseFloat(req.body.desenslovez);
    const conjigs = parseFloat(req.body.concjigs);

    // Calcula la mezcla total como la suma de concmesas, medios, desenslovez y conjigs
    const mezclaTotal = concmesas + medios + desenslovez + conjigs;

    const sql = "INSERT INTO molienda (fecha, turno, concmesas, pecm, medios, pem, desenslovez, pedese, concjigs, pejig, mezclatotal, pemt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [
        req.body.fecha,
        req.body.turno,
        concmesas,
        req.body.pecm,
        medios,
        req.body.pem,
        desenslovez,
        req.body.pedese,
        conjigs,
        req.body.pejig,
        mezclaTotal, // Usamos la mezcla total calculada
        req.body.pemt,
    ];

    db.query(sql, values, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.put('/updatemezclasmolienda/:id', (req, res) => {
    const sql = "UPDATE molienda SET fecha=?,turno=?, concmesas=?, pecm=?, medios=?, pem=?,desenslovez=?,pedese=?,pemt=?,concjigs=?,pejig=? WHERE id = ?";
    const values = [
        req.body.fecha,
        req.body.turno,
        req.body.concmesas,
        req.body.pecm,
        req.body.medios,
        req.body.pem,
        req.body.desenslovez,
        req.body.pedese,
        req.body.pemt,
        req.body.concjigs,
        req.body.pejig,

    ];
    const id = req.params.id;
    db.query(sql, [...values, id], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});
app.get('/getrecordmezclasmolienda/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM molienda WHERE id = ?"
    db.query(sql, [id], (err, data) => {
        if (err) {
            return res.json({ Error: "Error" })
        }

        return res.json(data)
    })
})
////////////////PROMEDIOS//////////////7777
app.get('/promedios', (req, res) => {
    const sql = "SELECT * FROM promedios ORDER BY id DESC";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});
app.delete('/deletepromedios/:id', (req, res) => {
    const sql = "DELETE FROM promedios WHERE id = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});
app.post('/createpromedios', (req, res) => {

    const sql = "INSERT INTO promedios (fecha,turno, pemolino1, malla200mo1, malla325mo1, calciosmo1,humedadmo1,pemolino2,malla200mo2,malla325mo2,calciosmo2,humedadmo2) VALUES (?,?, ?, ?, ?, ?,?,?,?,?,?,?)";
    const values = [
        req.body.fecha,
        req.body.turno,
        req.body.pemolino1,
        req.body.malla200mo1,
        req.body.malla325mo1,
        req.body.calciosmo1,
        req.body.humedadmo1,
        req.body.pemolino2,
        req.body.malla200mo2,
        req.body.malla325mo2,
        req.body.calciosmo2,
        req.body.humedadmo2,

    ];
    db.query(sql, values, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});
app.put('/updatepromedios/:id', (req, res) => {
    const sql = "UPDATE promedios SET fecha=?, turno=?, pemolino1=?, malla200mo1=?, malla325mo1=?, calciosmo1=?,humedadmo1=?,pemolino2=?,malla200mo2=?,malla325mo2=?,calciosmo2=?,humedadmo2=? WHERE id = ?";
    const values = [
        req.body.fecha,
        req.body.turno,
        req.body.pemolino1,
        req.body.malla200mo1,
        req.body.malla325mo1,
        req.body.calciosmo1,
        req.body.humedadmo1,
        req.body.pemolino2,
        req.body.malla200mo2,
        req.body.malla325mo2,
        req.body.calciosmo2,
        req.body.humedadmo2,

    ];
    const id = req.params.id;
    db.query(sql, [...values, id], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});
app.get('/getrecordpromedios/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM promedios WHERE id = ?"
    db.query(sql, [id], (err, data) => {
        if (err) {
            return res.json({ Error: "Error" })
        }

        return res.json(data)
    })
})

/////////////EXPORTACION POR FECHA REPORTE Molienda///////////7
app.get('/getmezclas/:fecha', (req, res) => {
    const fecha = req.params.fecha;
    const sql = "SELECT * FROM molienda WHERE fecha = ?"
    db.query(sql, [fecha], (err, data) => {
        if (err) {
            console.error("Error en la consulta SQL:", err);
            return res.status(500).json({ error: "Error en la consulta SQL. Por favor, inténtalo de nuevo más tarde." });
        }

        return res.json(data);
    });
})
app.get('/getpromedios/:fecha', (req, res) => {
    const fecha = req.params.fecha;
    const sql = "SELECT * FROM promedios WHERE fecha = ?"
    db.query(sql, [fecha], (err, data) => {
        if (err) {
            console.error("Error en la consulta SQL:", err);
            return res.status(500).json({ error: "Error en la consulta SQL. Por favor, inténtalo de nuevo más tarde." });
        }

        return res.json(data);
    });
})


//////////////CONCENTRADOJIGSSEC////////////////
app.get('/concjigssec', (req, res) => {
    const sql = "SELECT * FROM concjigssec ORDER BY id DESC";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});
app.post('/createconcjigssec', async (req, res) => {
    try {
        //Obtener el total concentrado de las mesas para la fecha especificada
        const totalConcentradojigss = await new Promise((resolve, reject) => {
            const query = "SELECT (SUM(concjsec	)) AS total_concjigs FROM jigschinos WHERE fecha = ?;";
            db.query(query, [req.body.fecha], (err, data) => {
                if (err) reject(err);
                else resolve(data[0].total_concjigs); // Obtenemos el total concentrado de la primera fila
            });
        });
        const totalSalidasConcjigs = await new Promise((resolve, reject) => {
            const query = "SELECT (SUM(concjigs)) AS total_concjig FROM molienda WHERE fecha = ?;";
            db.query(query, [req.body.fecha], (err, data) => {
                if (err) reject(err);
                else resolve(data[0].total_concjig); // Obtenemos el total concentrado de la primera fila
            });
        });
        const totalpe = await new Promise((resolve, reject) => {
            const query = "SELECT (SUM(pecojsec)) AS total_concjig, COUNT(pecojsec) AS count_pecojsec FROM jigschinos WHERE fecha = ?;";
            db.query(query, [req.body.fecha], (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    const totalConcjig = data[0].total_concjig;
                    const countPecojsec = data[0].count_pecojsec;
                    let average = 0;
                    
                    if (countPecojsec > 0) {
                        average = totalConcjig / countPecojsec;
                    }
                    
                    resolve(average);
                }
            });
        });
        
        // Obtener el saldo anterior
        const saldoAnteriorData = await new Promise((resolve, reject) => {
            db.query("SELECT saldo FROM concjigssec ORDER BY id DESC LIMIT 1", (err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });

        // Si hay registros en la tabla, obtén el saldo anterior, de lo contrario, establece el saldo anterior en 0
        const saldoAnterior = saldoAnteriorData.length > 0 ? saldoAnteriorData[0].saldo : 0;

        // Calcula el nuevo saldo sumando el saldo anterior a las entradas y restando las salidas
        const nuevoSaldo = saldoAnterior + parseFloat(totalConcentradojigss) - parseFloat(totalSalidasConcjigs);

        // Realizar la inserción en la tabla concmesas
        const sql = "INSERT INTO concjigssec (fecha, entradas, salidas, saldo, pe) VALUES (?, ?, ?, ?, ?)";
        const values = [
            req.body.fecha,
            totalConcentradojigss,
            totalSalidasConcjigs,
            nuevoSaldo,
            totalpe
        ];

        db.query(sql, values, (err, result) => {
            if (err) throw err;
            console.log("Registro insertado en concmesas con éxito.");
            res.send("Registro insertado en concmesas con éxito.");
        });
    } catch (error) {
        console.error("Error al crear el registro en concmesas:", error);
        res.status(500).send("Error al crear el registro en concmesas.");
    }
});


app.put('/updatenconcjigssec/:id',async(req, res) => {
    try {
        const totalConcentradojigss = await new Promise((resolve, reject) => {
            const query = "SELECT (SUM(concjsec	)) AS total_concjigs FROM jigschinos WHERE fecha = ?;";
            db.query(query, [req.body.fecha], (err, data) => {
                if (err) reject(err);
                else resolve(data[0].total_concjigs); // Obtenemos el total concentrado de la primera fila
            });
        });
        const totalSalidasConcjigs = await new Promise((resolve, reject) => {
            const query = "SELECT (SUM(concjigs)) AS total_concjig FROM molienda WHERE fecha = ?;";
            db.query(query, [req.body.fecha], (err, data) => {
                if (err) reject(err);
                else resolve(data[0].total_concjig); // Obtenemos el total concentrado de la primera fila
            });
        });

        // Obtener el saldo anterior
        const saldoAnteriorData = await new Promise((resolve, reject) => {
            db.query("SELECT saldo FROM concjigssec ORDER BY id DESC LIMIT 1", (err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });

        // Si hay registros en la tabla, obtén el saldo anterior, de lo contrario, establece el saldo anterior en 0
        const saldoAnterior = saldoAnteriorData.length > 0 ? saldoAnteriorData[0].saldo : 0;

        // Calcula el nuevo saldo sumando el saldo anterior a las entradas y restando las salidas
        const nuevoSaldo = saldoAnterior + parseFloat(totalSalidasConcjigs) - parseFloat(totalSalidasConcjigs);

        const sql = "UPDATE concjigssec SET fecha=?, entradas=?, salidas=?, saldo=?, pe=? WHERE id = ?";
        const values = [
            req.body.fecha,
            totalConcentradojigss,
            totalSalidasConcjigs,
            nuevoSaldo,
            req.body.pe,
        ];
        const id = req.params.id;
        db.query(sql, [...values, id], (err, data) => {
            if (err) return res.json(err);
            return res.json(data);
        });
    } catch (error) {
        console.error("Error al crear el registro en concmesas:", error);
        res.status(500).send("Error al crear el registro en concmesas.");
    }
    });

app.delete('/deleteconcjigssec/:id', (req, res) => {
    const sql = "DELETE FROM concjigssec WHERE id = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.get('/getrecordconcjigssec/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM concjigssec WHERE id = ?"
    db.query(sql, [id], (err, data) => {
        if (err) {
            return res.json({ Error: "Error" })
        }

        return res.json(data)
    })
})