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
        const totalEntradasSelecc = await new Promise((resolve, reject) => {
            const query = "SELECT (SUM(tonpiedra)) AS total_entradas FROM prodseleccion WHERE fecha = ?;";
            db.query(query, [req.body.fecha], (err, data) => {
                if (err) reject(err);
                else resolve(data[0].total_entradas); // Obtenemos el total concentrado de la primera fila
            });
        });


        // Si hay registros en la tabla, obtén el saldo anterior, de lo contrario, establece el saldo anterior en 0
        const saldoAnterior = saldoAnteriorData.length > 0 ? saldoAnteriorData[0].saldo : 0;

        // Calcula el nuevo saldo sumando el saldo anterior a las entradas y restando las salidas
        const nuevoSaldo = saldoAnterior + parseFloat(totalEntradasSelecc) - parseFloat(req.body.salida);

        // Realiza la inserción con el nuevo saldo
        const sql = "INSERT INTO seleccion (fecha, entrada, salida, pesp, saldo) VALUES (?, ?, ?, ?, ?)";
        const values = [
            req.body.fecha,
            totalEntradasSelecc,
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

app.put('/updateseleccion/:id', async (req, res) => {
    try {
        // Obtener el saldo anterior
        const saldoAnteriorData = await new Promise((resolve, reject) => {
            db.query("SELECT saldo FROM seleccion ORDER BY id DESC LIMIT 1, 1", (err, data) => {
                if (err) reject(err);
                else resolve(data[0].saldo || 0); // Si no hay saldo anterior, establecerlo en 0
            });
        });

        // Obtener el total de entradas para la fecha proporcionada
        const totalEntradasSelecc = await new Promise((resolve, reject) => {
            const query = "SELECT IFNULL(SUM(tonpiedra), 0) AS total_entradas FROM prodseleccion WHERE fecha = ?;";
            db.query(query, [req.body.fecha], (err, data) => {
                if (err) reject(err);
                else resolve(data[0].total_entradas); // Si no hay entradas para la fecha, devolver 0
            });
        });

        // Calcular el nuevo saldo
        let nuevoSaldo = saldoAnteriorData + parseFloat(totalEntradasSelecc) - parseFloat(req.body.salida);

        // Realizar la actualización con el nuevo saldo
        const sql = "UPDATE seleccion SET fecha = ?, entrada = ?, salida = ?, pesp = ?, saldo = ? WHERE id = ?";
        const values = [
            req.body.fecha,
            totalEntradasSelecc,
            req.body.salida,
            req.body.pesp,
            nuevoSaldo,
            req.params.id
        ];

        db.query(sql, values, (err, data) => {
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
    const sql = "SELECT * FROM concpmoler ORDER BY id DESC";
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
        const saldoAnteriorData = await new Promise((resolve, reject) => {
            db.query("SELECT saldo FROM concpmoler ORDER BY id DESC LIMIT 1, 1", (err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });

        // Si hay registros en la tabla, obtén el saldo anterior, de lo contrario, establece el saldo anterior en 0
        ;

        // Calcula el nuevo saldo sumando el saldo anterior a las entradas y restando las salidas
        const nuevoSaldo = saldoAnteriorData + parseFloat(req.body.entrada) - parseFloat(req.body.salida);

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
    const sql = "SELECT * FROM granobaribright ORDER BY id DESC";
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
        const saldoAnteriorData = await new Promise((resolve, reject) => {
            db.query("SELECT saldo FROM granobaribright ORDER BY id DESC LIMIT 1, 1", (err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });
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
    const sql = "SELECT * FROM concentradobaribaright ORDER BY id DESC";
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
        const saldoAnteriorData = await new Promise((resolve, reject) => {
            db.query("SELECT saldo FROM concentradobaribaright ORDER BY id DESC LIMIT 1, 1", (err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });

        // Obtener el saldo anterior antes de realizar la actualización


        // Verificar si se encontró el saldo anterior


        // Calcula el nuevo saldo utilizando el saldo anterior
        const nuevoSaldo = saldoAnteriorData + parseFloat(req.body.entradas) - parseFloat(req.body.salidas);

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
            const query = `
        SELECT 
            fecha, 
            (SUM(pecnm12) + SUM(pecnm34) + SUM(pecnm5) + SUM(pecnm6)) / (COUNT(*) * 3) AS total_promedio
        FROM 
            mesas 
        WHERE 
            fecha = ? 
        GROUP BY 
            fecha;
    `;

            db.query(query, [req.body.fecha], (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    if (data.length > 0) {
                        const totalPromedio = data[0].total_promedio;
                        resolve(totalPromedio);
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
                else resolve(data[0].saldo || 0);
            });
        });

        // Si hay registros en la tabla, obtén el saldo anterior, de lo contrario, establece el saldo anterior en 0


        // Calcula el nuevo saldo sumando el saldo anterior a las entradas y restando las salidas
        const nuevoSaldo = saldoAnteriorData + parseFloat(totalConcentradoMesas) - parseFloat(totalSalidasMesas);

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


app.put('/updateconcmesas/:id', async (req, res) => {
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
            db.query("SELECT saldo FROM concmesas ORDER BY id DESC LIMIT 1, 1", (err, data) => {
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

    const sql = "INSERT INTO molienda (fecha, turno, concmesas, pecm, medios, pem, desenslovez, pedese, concjigs, pejig, mezclatotal, pemt,pmlt,pmle,otrassalidas) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?)";
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
        req.body.pmlt,
        req.body.pmle,
        req.body.otrassalidas,

    ];

    db.query(sql, values, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.put('/updatemezclasmolienda/:id', (req, res) => {
    const sql = "UPDATE molienda SET fecha=?,turno=?, concmesas=?, pecm=?, medios=?, pem=?,desenslovez=?,pedese=?,pemt=?,concjigs=?,pejig=?,pmlt=?,pmle=?,otrassalidas=? WHERE id = ?";
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
        req.body.pmlt,
        req.body.pmle,
        req.body.otrassalidas,

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


app.put('/updatenconcjigssec/:id', async (req, res) => {
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
            db.query("SELECT saldo FROM concjigssec ORDER BY id DESC LIMIT 1, 1", (err, data) => {
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
//////////////MEDIOS/////////
app.get('/medios46', (req, res) => {
    const sql = "SELECT * FROM medios46 ORDER BY id DESC";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});
app.post('/createmedios46', async (req, res) => {
    try {


        // Obtener el saldo anterior
        const saldoAnteriorData = await new Promise((resolve, reject) => {
            db.query("SELECT saldo46 FROM medios46 ORDER BY id DESC LIMIT 1", (err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });

        // Si hay registros en la tabla, obtén el saldo anterior, de lo contrario, establece el saldo anterior en 0
        const saldoAnterior = saldoAnteriorData.length > 0 ? saldoAnteriorData[0].saldo46 : 0;

        // Calcula el nuevo saldo sumando el saldo anterior a las entradas y restando las salidas
        const nuevoSaldo = saldoAnterior + parseFloat(req.body.entradasm46) - parseFloat(req.body.salidasm46);


        // Realizar la inserción en la tabla concmesas
        const sql = "INSERT INTO medios46 (fecha, entradasm46, salidasm46, saldo46, pe46) VALUES (?, ?, ?, ?, ?)";
        const values = [
            req.body.fecha,
            req.body.entradasm46,
            req.body.salidasm46,
            nuevoSaldo,
            req.body.pe46,
        ];

        db.query(sql, values, (err, result) => {
            if (err) throw err;
            console.log("Registro insertado en medios46 con éxito.");
            res.send("Registro insertado en medios46 con éxito.");
        });
    } catch (error) {
        console.error("Error al crear el registro en medios46:", error);
        res.status(500).send("Error al crear el registro en medios46.");
    }
});
app.delete('/deletemedios46/:id', (req, res) => {
    const sql = "DELETE FROM medios46 WHERE id = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.put('/updatemedios46/:id', async (req, res) => {
    try {
        const id = req.params.id; // Obtener el ID del parámetro de la URL

        const saldoAnteriorData = await new Promise((resolve, reject) => {
            db.query("SELECT saldo FROM medios46 ORDER BY id DESC LIMIT 1, 1", (err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });

        // Si hay registros en la tabla, obtén el saldo anterior, de lo contrario, establece el saldo anterior en 0
        const saldoAnterior = saldoAnteriorData.length > 0 ? saldoAnteriorData[0].saldo46 : 0;

        // Calcula el nuevo saldo sumando el saldo anterior a las entradas y restando las salidas
        const nuevoSaldo = saldoAnterior + parseFloat(req.body.entradasm46) - parseFloat(req.body.salidasm46);

        // Realizar la actualización en la tabla medios46
        const sql = "UPDATE medios46 SET fecha=?, entradasm46=?, salidasm46=?, saldo46=?, pe46=? WHERE id=?";
        const values = [
            req.body.fecha,
            req.body.entradasm46,
            req.body.salidasm46,
            nuevoSaldo,
            req.body.pe46,
            id // Utilizar el ID del registro que se desea actualizar
        ];

        db.query(sql, values, (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(data);
        });
    } catch (error) {
        console.error("Error al actualizar el registro en medios46:", error);
        res.status(500).send("Error al actualizar el registro en medios46.");
    }
});

app.get('/getrecordmedios46/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM medios46 WHERE id = ?"
    db.query(sql, [id], (err, data) => {
        if (err) {
            return res.json({ Error: "Error" })
        }

        return res.json(data)
    })
})
app.get('/medios4', (req, res) => {
    const sql = "SELECT * FROM medios4 ORDER BY id DESC";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});
app.post('/createmedios4', async (req, res) => {
    try {


        // Obtener el saldo anterior
        const saldoAnteriorData = await new Promise((resolve, reject) => {
            db.query("SELECT saldo FROM medios4 ORDER BY id DESC LIMIT 1", (err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });

        // Si hay registros en la tabla, obtén el saldo anterior, de lo contrario, establece el saldo anterior en 0
        const saldoAnterior = saldoAnteriorData.length > 0 ? saldoAnteriorData[0].saldo : 0;

        // Calcula el nuevo saldo sumando el saldo anterior a las entradas y restando las salidas
        const nuevoSaldo = saldoAnterior + parseFloat(req.body.entradas) - parseFloat(req.body.salidas);

        // Realizar la inserción en la tabla concmesas
        const sql = "INSERT INTO medios4 (fecha, entradas, salidas, saldo, pe) VALUES (?, ?, ?, ?, ?)";
        const values = [
            req.body.fecha,
            req.body.entradas,
            req.body.salidas,
            nuevoSaldo,
            req.body.pe,
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
app.put('/updatemedios4/:id', async (req, res) => {
    try {
        const id = req.params.id; // Obtener el ID del parámetro de la URL

        const saldoAnteriorData = await new Promise((resolve, reject) => {
            db.query("SELECT saldo FROM medios4 ORDER BY id DESC LIMIT 1, 1", (err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });

        // Si hay registros en la tabla, obtén el saldo anterior, de lo contrario, establece el saldo anterior en 0
        const saldoAnterior = saldoAnteriorData.length > 0 ? saldoAnteriorData[0].saldo : 0;

        // Calcula el nuevo saldo sumando el saldo anterior a las entradas y restando las salidas
        const nuevoSaldo = saldoAnterior + parseFloat(req.body.entradas) - parseFloat(req.body.salidas);

        // Realizar la actualización en la tabla medios46
        const sql = "UPDATE medios4 SET fecha=?, entradas=?, salidas=?, saldo=?, pe=? WHERE id=?";
        const values = [
            req.body.fecha,
            req.body.entradas,
            req.body.salidas,
            nuevoSaldo,
            req.body.pe,
            id // Utilizar el ID del registro que se desea actualizar
        ];

        db.query(sql, values, (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(data);
        });
    } catch (error) {
        console.error("Error al actualizar el registro en medios46:", error);
        res.status(500).send("Error al actualizar el registro en medios46.");
    }
});
app.delete('/deletemedios4/:id', (req, res) => {
    const sql = "DELETE FROM medios4 WHERE id = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});
app.get('/getrecordmedios4/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM medios4 WHERE id = ?"
    db.query(sql, [id], (err, data) => {
        if (err) {
            return res.json({ Error: "Error" })
        }

        return res.json(data)
    })
})

app.get('/medios3', (req, res) => {
    const sql = "SELECT * FROM medios3 ORDER BY id DESC";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});
app.post('/createmedios3', async (req, res) => {
    try {


        // Obtener el saldo anterior
        const saldoAnteriorData = await new Promise((resolve, reject) => {
            db.query("SELECT saldo FROM medios3 ORDER BY id DESC LIMIT 1", (err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });

        // Si hay registros en la tabla, obtén el saldo anterior, de lo contrario, establece el saldo anterior en 0
        const saldoAnterior = saldoAnteriorData.length > 0 ? saldoAnteriorData[0].saldo : 0;

        // Calcula el nuevo saldo sumando el saldo anterior a las entradas y restando las salidas
        const nuevoSaldo = saldoAnterior + parseFloat(req.body.entradas) - parseFloat(req.body.salidas);

        // Realizar la inserción en la tabla concmesas
        const sql = "INSERT INTO medios3 (fecha, entradas, salidas, saldo, pe) VALUES (?, ?, ?, ?, ?)";
        const values = [
            req.body.fecha,
            req.body.entradas,
            req.body.salidas,
            nuevoSaldo,
            req.body.pe,
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
app.put('/updatemedios3/:id', async (req, res) => {
    try {
        const id = req.params.id; // Obtener el ID del parámetro de la URL

        // Obtener el saldo anterior
        const saldoAnteriorData = await new Promise((resolve, reject) => {
            db.query("SELECT saldo FROM medios3 ORDER BY id DESC LIMIT 1, 1", (err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });

        // Si hay registros en la tabla, obtén el saldo anterior, de lo contrario, establece el saldo anterior en 0
        const saldoAnterior = saldoAnteriorData.length > 0 ? saldoAnteriorData[0].saldo : 0;

        // Calcula el nuevo saldo sumando el saldo anterior a las entradas y restando las salidas
        const nuevoSaldo = saldoAnterior + parseFloat(req.body.entradas) - parseFloat(req.body.salidas);

        // Realizar la actualización en la tabla medios46
        const sql = "UPDATE medios3 SET fecha=?, entradas=?, salidas=?, saldo=?, pe=? WHERE id=?";
        const values = [
            req.body.fecha,
            req.body.entradas,
            req.body.salidas,
            nuevoSaldo,
            req.body.pe,
            id // Utilizar el ID del registro que se desea actualizar
        ];

        db.query(sql, values, (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(data);
        });
    } catch (error) {
        console.error("Error al actualizar el registro en medios46:", error);
        res.status(500).send("Error al actualizar el registro en medios46.");
    }
});
app.delete('/deletemedios3/:id', (req, res) => {
    const sql = "DELETE FROM medios3 WHERE id = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});
app.get('/getrecordmedios3/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM medios3 WHERE id = ?"
    db.query(sql, [id], (err, data) => {
        if (err) {
            return res.json({ Error: "Error" })
        }

        return res.json(data)
    })
})
/////////GranoPMOLER//////////////7777
app.get('/granomoler', (req, res) => {
    const sql = "SELECT * FROM granopmoler ORDER BY id DESC";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});
app.post('/creategranomoler', async (req, res) => {
    try {
        const totalgrano = await new Promise((resolve, reject) => {
            const query = "SELECT (SUM(granoj1)+SUM(granoj2)) AS total_grano FROM produccionjigs WHERE fecha = ?;";
            db.query(query, [req.body.fecha], (err, data) => {
                if (err) reject(err);
                else resolve(data[0].total_grano); // Obtenemos el total concentrado de la primera fila
            });
        });
        const totalsalidasgrano = await new Promise((resolve, reject) => {
            const query = "SELECT (SUM(concjigs)) AS total_salidasgrano FROM molienda WHERE fecha = ?;";
            db.query(query, [req.body.fecha], (err, data) => {
                if (err) reject(err);
                else resolve(data[0].total_salidasgrano); // Obtenemos el total concentrado de la primera fila
            });
        });
        const totalpesp = await new Promise((resolve, reject) => {
            const query = "SELECT AVG((IF(pegj1 IS NOT NULL, pegj1, 0) + IF(pegj2 IS NOT NULL, pegj2, 0)) / (IF(peaj1 IS NOT NULL, 1, 0) + IF(pegj2 IS NOT NULL, 1, 0))) AS promedio_peso FROM produccionjigs WHERE fecha =?";
            db.query(query, [req.body.fecha], (err, data) => {
                if (err) reject(err);
                else resolve(data[0].promedio_peso); // Obtenemos el total concentrado de la primera fila
            });
        });

        // Obtener el saldo anterior
        const saldoAnteriorData = await new Promise((resolve, reject) => {
            db.query("SELECT saldo FROM granopmoler ORDER BY id DESC LIMIT 1", (err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });

        // Si hay registros en la tabla, obtén el saldo anterior, de lo contrario, establece el saldo anterior en 0
        const saldoAnterior = saldoAnteriorData.length > 0 ? saldoAnteriorData[0].saldo : 0;

        // Calcula el nuevo saldo sumando el saldo anterior a las entradas y restando las salidas
        const nuevoSaldo = saldoAnterior + parseFloat(totalgrano) - parseFloat(totalsalidasgrano);

        // Realizar la inserción en la tabla concmesas
        const sql = "INSERT INTO granopmoler (fecha, entradas, salidas, saldo, pe) VALUES (?, ?, ?, ?, ?)";
        const values = [
            req.body.fecha,
            totalgrano,
            totalsalidasgrano,
            nuevoSaldo,
            totalpesp
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
app.put('/updategranomoler/:id', async (req, res) => {
    try {
        const id = req.params.id; // Obtener el ID del parámetro de la URL

        // Obtener el saldo anterior
        const saldoAnteriorData = await new Promise((resolve, reject) => {
            db.query("SELECT saldo FROM granopmoler ORDER BY id DESC LIMIT 1, 1", (err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });

        // Si hay registros en la tabla, obtén el saldo anterior, de lo contrario, establece el saldo anterior en 0
        const saldoAnterior = saldoAnteriorData.length > 0 ? saldoAnteriorData[0].saldo : 0;

        // Calcula el nuevo saldo sumando el saldo anterior a las entradas y restando las salidas
        const nuevoSaldo = saldoAnterior + parseFloat(req.body.entradas) - parseFloat(req.body.salidas);

        // Realizar la actualización en la tabla medios46
        const sql = "UPDATE granopmoler SET fecha=?, entradas=?, salidas=?, saldo=?, pe=? WHERE id=?";
        const values = [
            req.body.fecha,
            req.body.entradas,
            req.body.salidas,
            nuevoSaldo,
            req.body.pe,
            id // Utilizar el ID del registro que se desea actualizar
        ];

        db.query(sql, values, (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(data);
        });
    } catch (error) {
        console.error("Error al actualizar el registro en medios46:", error);
        res.status(500).send("Error al actualizar el registro en medios46.");
    }
});
app.delete('/deletegranomoler/:id', (req, res) => {
    const sql = "DELETE FROM granopmoler WHERE id = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});
app.get('/getrecordgranomoler/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM granopmoler WHERE id = ?"
    db.query(sql, [id], (err, data) => {
        if (err) {
            return res.json({ Error: "Error" })
        }

        return res.json(data)
    })
})

////////////////////////GRANO BANDAS/////////

app.get('/granobandas', (req, res) => {
    const sql = "SELECT * FROM granobandas  ORDER BY id DESC";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.post('/creategranobandas', async (req, res) => {
    try {









        // Obtener el saldo anterior
        const saldoAnteriorData = await new Promise((resolve, reject) => {
            db.query("SELECT saldo FROM granobandas ORDER BY id DESC LIMIT 1", (err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });

        // Si hay registros en la tabla, obtén el saldo anterior, de lo contrario, establece el saldo anterior en 0
        const saldoAnterior = saldoAnteriorData.length > 0 ? saldoAnteriorData[0].saldo : 0;

        // Calcula el nuevo saldo sumando el saldo anterior a las entradas y restando las salidas
        const nuevoSaldo = saldoAnterior + parseFloat(req.body.entrada) - parseFloat(req.body.salidas);

        // Realizar la inserción en la tabla concmesas
        const sql = "INSERT INTO granobandas (fecha, entrada, salidas, saldo, pesp) VALUES (?, ?, ?, ?, ?)";
        const values = [
            req.body.fecha,
            req.body.entrada,
            req.body.salidas,
            nuevoSaldo,
            req.body.pesp
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

app.put('/updategranobandas/:id', async (req, res) => {

    const saldoAnteriorData = await new Promise((resolve, reject) => {
        db.query("SELECT saldo FROM granobandas ORDER BY id DESC LIMIT 1, 1", (err, data) => {
            if (err) reject(err);
            else resolve(data);
        });
    });



    // Si hay registros en la tabla, obtén el saldo anterior, de lo contrario, establece el saldo anterior en 0
    const saldoAnterior = saldoAnteriorData.length > 0 ? saldoAnteriorData[0].saldo : 0;

    // Calcula el nuevo saldo sumando el saldo anterior a las entradas y restando las salidas
    const nuevoSaldo = saldoAnterior + parseFloat(req.body.entrada) - parseFloat(req.body.salidas);
    const sql = "UPDATE granobandas SET fecha = ?, entrada = ?, salidas = ?, pesp = ?, saldo = ? WHERE id = ?";
    const values = [
        req.body.fecha,
        req.body.entrada,
        req.body.salidas,
        req.body.pesp,
        nuevoSaldo

    ];
    const id = req.params.id;
    db.query(sql, [...values, id], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.get('/getrecordgranobandas/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM granobandas WHERE id = ?"
    db.query(sql, [id], (err, data) => {
        if (err) {
            return res.json({ Error: "Error" })
        }

        return res.json(data)
    })
})
app.delete('/deletegranobandas/:id', (req, res) => {
    const sql = "DELETE FROM granobandas WHERE id = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

////////////////////////GRANO JIGS/////////

app.get('/granojigs', (req, res) => {
    const sql = "SELECT * FROM granojigs  ORDER BY id DESC";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.post('/creategranojigs', async (req, res) => {
    try {
        const totalgranojigs = await new Promise((resolve, reject) => {
            const query = "SELECT (SUM(granojch))AS total_granojigs FROM jigschinos WHERE fecha = ?;";
            db.query(query, [req.body.fecha], (err, data) => {
                if (err) reject(err);
                else resolve(data[0].total_granojigs); // Obtenemos el total concentrado de la primera fila
            });
        });
        // Obtener el saldo anterior
        const saldoAnteriorData = await new Promise((resolve, reject) => {
            db.query("SELECT saldo FROM granojigs ORDER BY id DESC LIMIT 1", (err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });

        // Si hay registros en la tabla, obtén el saldo anterior, de lo contrario, establece el saldo anterior en 0
        const saldoAnterior = saldoAnteriorData.length > 0 ? saldoAnteriorData[0].saldo : 0;

        // Calcula el nuevo saldo sumando el saldo anterior a las entradas y restando las salidas
        const nuevoSaldo = saldoAnterior + parseFloat(totalgranojigs) - parseFloat(req.body.salidas);

        // Realizar la inserción en la tabla concmesas
        const sql = "INSERT INTO granojigs (fecha, entradas, salidas, saldo, pe) VALUES (?, ?, ?, ?, ?)";
        const values = [
            req.body.fecha,
            totalgranojigs,
            req.body.salidas,
            nuevoSaldo,
            req.body.pe
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

app.put('/updategranojigs/:id', async (req, res) => {

    const totalgranojigs = await new Promise((resolve, reject) => {
        const query = "SELECT (SUM(granojch)) AS total_granojigs FROM jigschinos WHERE fecha = ?;";
        db.query(query, [req.body.fecha], (err, data) => {
            if (err) reject(err);
            else resolve(data[0].total_granojigs); // Obtenemos el total concentrado de la primera fila
        });
    });
    const saldoAnteriorData = await new Promise((resolve, reject) => {
        db.query("SELECT saldo FROM granojigs ORDER BY id DESC LIMIT 1, 1", (err, data) => {
            if (err) reject(err);
            else resolve(data);
        });
    });



    // Si hay registros en la tabla, obtén el saldo anterior, de lo contrario, establece el saldo anterior en 0
    const saldoAnterior = saldoAnteriorData.length > 0 ? saldoAnteriorData[0].saldo : 0;

    // Calcula el nuevo saldo sumando el saldo anterior a las entradas y restando las salidas
    const nuevoSaldo = saldoAnterior + parseFloat(totalgranojigs) - parseFloat(req.body.salidas);
    const sql = "UPDATE granojigs SET fecha = ?, entradas = ?, salidas = ?, pe = ?, saldo = ? WHERE id = ?";
    const values = [
        req.body.fecha,
        totalgranojigs,
        req.body.salidas,
        req.body.pe,
        nuevoSaldo

    ];
    const id = req.params.id;
    db.query(sql, [...values, id], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.get('/getrecordgranojigs/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM granojigs WHERE id = ?"
    db.query(sql, [id], (err, data) => {
        if (err) {
            return res.json({ Error: "Error" })
        }

        return res.json(data)
    })
})
app.delete('/deletegranojigs/:id', (req, res) => {
    const sql = "DELETE FROM granojigs WHERE id = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

////////////////////////DESENSOLVECH/////////

app.get('/desensolvech', (req, res) => {
    const sql = "SELECT * FROM desensolvech  ORDER BY id DESC";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.post('/createdesensolvech', async (req, res) => {
    try {
        const totaldesensolve = await new Promise((resolve, reject) => {
            const query = "SELECT (SUM(desenjch))AS total_desensolvejigs FROM jigschinos WHERE fecha = ?;";
            db.query(query, [req.body.fecha], (err, data) => {
                if (err) reject(err);
                else resolve(data[0].total_desensolvejigs); // Obtenemos el total concentrado de la primera fila
            });
        });
        // Obtener el saldo anterior
        const saldoAnteriorData = await new Promise((resolve, reject) => {
            db.query("SELECT saldo FROM desensolvech ORDER BY id DESC LIMIT 1", (err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });

        // Si hay registros en la tabla, obtén el saldo anterior, de lo contrario, establece el saldo anterior en 0
        const saldoAnterior = saldoAnteriorData.length > 0 ? saldoAnteriorData[0].saldo : 0;

        // Calcula el nuevo saldo sumando el saldo anterior a las entradas y restando las salidas
        const nuevoSaldo = saldoAnterior + parseFloat(totaldesensolve) - parseFloat(req.body.salidas);

        // Realizar la inserción en la tabla concmesas
        const sql = "INSERT INTO desensolvech (fecha, entradas, salidas, saldo, pe) VALUES (?, ?, ?, ?, ?)";
        const values = [
            req.body.fecha,
            totaldesensolve,
            req.body.salidas,
            nuevoSaldo,
            req.body.pe
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

app.put('/updatedesensolvech/:id', async (req, res) => {

    const totaldesensolve = await new Promise((resolve, reject) => {
        const query = "SELECT (SUM(desenjch))AS total_desensolvejigs FROM jigschinos WHERE fecha = ?;";
        db.query(query, [req.body.fecha], (err, data) => {
            if (err) reject(err);
            else resolve(data[0].total_desensolvejigs); // Obtenemos el total concentrado de la primera fila
        });
    });
    const saldoAnteriorData = await new Promise((resolve, reject) => {
        db.query("SELECT saldo FROM desensolvech ORDER BY id DESC LIMIT 1, 1", (err, data) => {
            if (err) reject(err);
            else resolve(data);
        });
    });



    // Si hay registros en la tabla, obtén el saldo anterior, de lo contrario, establece el saldo anterior en 0
    const saldoAnterior = saldoAnteriorData.length > 0 ? saldoAnteriorData[0].saldo : 0;

    // Calcula el nuevo saldo sumando el saldo anterior a las entradas y restando las salidas
    const nuevoSaldo = saldoAnterior + parseFloat(totaldesensolve) - parseFloat(req.body.salidas);
    const sql = "UPDATE desensolvech SET fecha = ?, entradas = ?, salidas = ?, pe = ?, saldo = ? WHERE id = ?";
    const values = [
        req.body.fecha,
        totaldesensolve,
        req.body.salidas,
        req.body.pe,
        nuevoSaldo

    ];
    const id = req.params.id;
    db.query(sql, [...values, id], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.get('/getrecorddesensolvech/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM desensolvech WHERE id = ?"
    db.query(sql, [id], (err, data) => {
        if (err) {
            return res.json({ Error: "Error" })
        }

        return res.json(data)
    })
})
app.delete('/deletedesensolvech/:id', (req, res) => {
    const sql = "DELETE FROM desensolvech WHERE id = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

////////////////////////DESENSOLVE/////////

app.get('/desensolve', (req, res) => {
    const sql = "SELECT * FROM desensolve ORDER BY id DESC";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.post('/createdesensolve', async (req, res) => {
    try {

        // Obtener el saldo anterior
        const saldoAnteriorData = await new Promise((resolve, reject) => {
            db.query("SELECT saldo FROM desensolve ORDER BY id DESC LIMIT 1", (err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });

        // Si hay registros en la tabla, obtén el saldo anterior, de lo contrario, establece el saldo anterior en 0
        const saldoAnterior = saldoAnteriorData.length > 0 ? saldoAnteriorData[0].saldo : 0;

        // Calcula el nuevo saldo sumando el saldo anterior a las entradas y restando las salidas
        const nuevoSaldo = saldoAnterior + parseFloat(req.body.entradas) - parseFloat(req.body.salidas);

        // Realizar la inserción en la tabla concmesas
        const sql = "INSERT INTO desensolve (fecha, entradas, salidas, saldo, pe) VALUES (?, ?, ?, ?, ?)";
        const values = [
            req.body.fecha,
            req.body.entradas,
            req.body.salidas,
            nuevoSaldo,
            req.body.pe
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

app.put('/updatedesensolve/:id', async (req, res) => {


    const saldoAnteriorData = await new Promise((resolve, reject) => {
        db.query("SELECT saldo FROM desensolve ORDER BY id DESC LIMIT 1, 1", (err, data) => {
            if (err) reject(err);
            else resolve(data);
        });
    });



    // Si hay registros en la tabla, obtén el saldo anterior, de lo contrario, establece el saldo anterior en 0
    const saldoAnterior = saldoAnteriorData.length > 0 ? saldoAnteriorData[0].saldo : 0;

    // Calcula el nuevo saldo sumando el saldo anterior a las entradas y restando las salidas
    const nuevoSaldo = saldoAnterior + parseFloat(req.body.entradas) - parseFloat(req.body.salidas);
    const sql = "UPDATE desensolve SET fecha = ?, entradas = ?, salidas = ?, pe = ?, saldo = ? WHERE id = ?";
    const values = [
        req.body.fecha,
        req.body.entradas,
        req.body.salidas,
        req.body.pe,
        nuevoSaldo

    ];
    const id = req.params.id;
    db.query(sql, [...values, id], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.get('/getrecorddesensolve/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM desensolve WHERE id = ?"
    db.query(sql, [id], (err, data) => {
        if (err) {
            return res.json({ Error: "Error" })
        }

        return res.json(data)
    })
})
app.delete('/deletedesensolve/:id', (req, res) => {
    const sql = "DELETE FROM desensolve WHERE id = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

////////////////////////Desecho Seleccion/////////

app.get('/desecho43', (req, res) => {
    const sql = "SELECT * FROM desecho43 ORDER BY id DESC";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});
app.get('/desecho39', (req, res) => {
    const sql = "SELECT * FROM desecho39 ORDER BY id DESC";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.post('/createdesecho39', async (req, res) => {
    try {

        // Obtener el saldo anterior
        const saldoAnteriorData = await new Promise((resolve, reject) => {
            db.query("SELECT saldo FROM desecho39 ORDER BY id DESC LIMIT 1", (err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });

        // Si hay registros en la tabla, obtén el saldo anterior, de lo contrario, establece el saldo anterior en 0
        const saldoAnterior = saldoAnteriorData.length > 0 ? saldoAnteriorData[0].saldo : 0;

        // Calcula el nuevo saldo sumando el saldo anterior a las entradas y restando las salidas
        const nuevoSaldo = saldoAnterior + parseFloat(req.body.entradas) - parseFloat(req.body.salidas);

        // Realizar la inserción en la tabla concmesas
        const sql = "INSERT INTO desecho39 (fecha, entradas, salidas, saldo, pe) VALUES (?, ?, ?, ?, ?)";
        const values = [
            req.body.fecha,
            req.body.entradas,
            req.body.salidas,
            nuevoSaldo,
            req.body.pe
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
app.post('/createdesecho43', async (req, res) => {
    try {

        // Obtener el saldo anterior
        const saldoAnteriorData = await new Promise((resolve, reject) => {
            db.query("SELECT saldo FROM desecho43 ORDER BY id DESC LIMIT 1", (err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });

        // Si hay registros en la tabla, obtén el saldo anterior, de lo contrario, establece el saldo anterior en 0
        const saldoAnterior = saldoAnteriorData.length > 0 ? saldoAnteriorData[0].saldo : 0;

        // Calcula el nuevo saldo sumando el saldo anterior a las entradas y restando las salidas
        const nuevoSaldo = saldoAnterior + parseFloat(req.body.entradas) - parseFloat(req.body.salidas);

        // Realizar la inserción en la tabla concmesas
        const sql = "INSERT INTO desecho43 (fecha, entradas, salidas, saldo, pe) VALUES (?, ?, ?, ?, ?)";
        const values = [
            req.body.fecha,
            req.body.entradas,
            req.body.salidas,
            nuevoSaldo,
            req.body.pe
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

app.put('/updatededesecho43/:id', async (req, res) => {


    const saldoAnteriorData = await new Promise((resolve, reject) => {
        db.query("SELECT saldo FROM desecho43 ORDER BY id DESC LIMIT 1, 1", (err, data) => {
            if (err) reject(err);
            else resolve(data);
        });
    });



    // Si hay registros en la tabla, obtén el saldo anterior, de lo contrario, establece el saldo anterior en 0
    const saldoAnterior = saldoAnteriorData.length > 0 ? saldoAnteriorData[0].saldo : 0;

    // Calcula el nuevo saldo sumando el saldo anterior a las entradas y restando las salidas
    const nuevoSaldo = saldoAnterior + parseFloat(req.body.entradas) - parseFloat(req.body.salidas);
    const sql = "UPDATE desecho43 SET fecha = ?, entradas = ?, salidas = ?, pe = ?, saldo = ? WHERE id = ?";
    const values = [
        req.body.fecha,
        req.body.entradas,
        req.body.salidas,
        req.body.pe,
        nuevoSaldo

    ];
    const id = req.params.id;
    db.query(sql, [...values, id], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});
app.put('/updatededesecho39/:id', async (req, res) => {


    const saldoAnteriorData = await new Promise((resolve, reject) => {
        db.query("SELECT saldo FROM desecho39 ORDER BY id DESC LIMIT 1, 1", (err, data) => {
            if (err) reject(err);
            else resolve(data);
        });
    });



    // Si hay registros en la tabla, obtén el saldo anterior, de lo contrario, establece el saldo anterior en 0
    const saldoAnterior = saldoAnteriorData.length > 0 ? saldoAnteriorData[0].saldo : 0;

    // Calcula el nuevo saldo sumando el saldo anterior a las entradas y restando las salidas
    const nuevoSaldo = saldoAnterior + parseFloat(req.body.entradas) - parseFloat(req.body.salidas);
    const sql = "UPDATE desecho39 SET fecha = ?, entradas = ?, salidas = ?, pe = ?, saldo = ? WHERE id = ?";
    const values = [
        req.body.fecha,
        req.body.entradas,
        req.body.salidas,
        req.body.pe,
        nuevoSaldo

    ];
    const id = req.params.id;
    db.query(sql, [...values, id], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});
app.get('/getrecorddesecho43/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM desecho43 WHERE id = ?"
    db.query(sql, [id], (err, data) => {
        if (err) {
            return res.json({ Error: "Error" })
        }

        return res.json(data)
    })
})
app.get('/getrecorddesecho39/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM desecho39 WHERE id = ?"
    db.query(sql, [id], (err, data) => {
        if (err) {
            return res.json({ Error: "Error" })
        }

        return res.json(data)
    })
})
app.delete('/deletedesecho43/:id', (req, res) => {
    const sql = "DELETE FROM desecho43 WHERE id = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});
app.delete('/deletedesecho39/:id', (req, res) => {
    const sql = "DELETE FROM desecho39 WHERE id = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});
////////////////////////BARITRON/////////

app.get('/baritron', (req, res) => {
    const sql = "SELECT * FROM baritron ORDER BY id DESC";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.post('/createbaritron', async (req, res) => {
    try {

        // Obtener el saldo anterior
        const saldoAnteriorData = await new Promise((resolve, reject) => {
            db.query("SELECT saldo FROM baritron ORDER BY id DESC LIMIT 1", (err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });

        // Si hay registros en la tabla, obtén el saldo anterior, de lo contrario, establece el saldo anterior en 0
        const saldoAnterior = saldoAnteriorData.length > 0 ? saldoAnteriorData[0].saldo : 0;

        // Calcula el nuevo saldo sumando el saldo anterior a las entradas y restando las salidas
        const nuevoSaldo = saldoAnterior + parseFloat(req.body.entradas) - parseFloat(req.body.salidas);

        // Realizar la inserción en la tabla concmesas
        const sql = "INSERT INTO baritron (fecha, entradas, salidas, saldo, pe) VALUES (?, ?, ?, ?, ?)";
        const values = [
            req.body.fecha,
            req.body.entradas,
            req.body.salidas,
            nuevoSaldo,
            req.body.pe
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

app.put('/updatebaritron/:id', async (req, res) => {


    const saldoAnteriorData = await new Promise((resolve, reject) => {
        db.query("SELECT saldo FROM baritron ORDER BY id DESC LIMIT 1, 1", (err, data) => {
            if (err) reject(err);
            else resolve(data);
        });
    });



    // Si hay registros en la tabla, obtén el saldo anterior, de lo contrario, establece el saldo anterior en 0
    const saldoAnterior = saldoAnteriorData.length > 0 ? saldoAnteriorData[0].saldo : 0;

    // Calcula el nuevo saldo sumando el saldo anterior a las entradas y restando las salidas
    const nuevoSaldo = saldoAnterior + parseFloat(req.body.entradas) - parseFloat(req.body.salidas);
    const sql = "UPDATE baritron SET fecha = ?, entradas = ?, salidas = ?, pe = ?, saldo = ? WHERE id = ?";
    const values = [
        req.body.fecha,
        req.body.entradas,
        req.body.salidas,
        req.body.pe,
        nuevoSaldo

    ];
    const id = req.params.id;
    db.query(sql, [...values, id], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.get('/getrecordbaritron/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM baritron WHERE id = ?"
    db.query(sql, [id], (err, data) => {
        if (err) {
            return res.json({ Error: "Error" })
        }

        return res.json(data)
    })
})
app.delete('/deletebaritron/:id', (req, res) => {
    const sql = "DELETE FROM baritron WHERE id = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

////////////TOLVAS MOLINOS///////
app.get('/tolvas', (req, res) => {
    const sql = "SELECT * FROM tolvasmolinos ORDER BY id DESC";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.post('/createtolvas', async (req, res) => {
    try {

        // Realizar la inserción en la tabla concmesas
        const sql = "INSERT INTO tolvasmolinos (fecha, tolvamolinos,petm,mezclasmoler,pememo) VALUES (?, ?, ?,?,?)";
        const values = [
            req.body.fecha,
            req.body.tolvamolinos,
            req.body.petm,
            req.body.mezclasmoler,
            req.body.pememo
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
app.put('/updatetolvas/:id', async (req, res) => {






    const sql = "UPDATE tolvasmolinos SET fecha = ?, tolvamolinos = ?, petm = ?, mezclasmoler = ?, pememo = ? WHERE id = ?";
    const values = [
        req.body.fecha,
        req.body.tolvamolinos,
        req.body.petm,
        req.body.mezclasmoler,
        req.body.pememo

    ];
    const id = req.params.id;
    db.query(sql, [...values, id], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});
app.get('/getrecordtolvas/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM tolvasmolinos WHERE id = ?"
    db.query(sql, [id], (err, data) => {
        if (err) {
            return res.json({ Error: "Error" })
        }

        return res.json(data)
    })
})
app.delete('/deletetolvas/:id', (req, res) => {
    const sql = "DELETE FROM tolvasmolinos WHERE id = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});
////////////MMLT/////////
app.get('/mmlt', (req, res) => {
    const sql = "SELECT * FROM mmlt ORDER BY id DESC";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.post('/createmmlt', async (req, res) => {
    try {

        // Obtener el saldo anterior
        const saldoAnteriorData = await new Promise((resolve, reject) => {
            db.query("SELECT saldo FROM mmlt ORDER BY id DESC LIMIT 1", (err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });

        // Si hay registros en la tabla, obtén el saldo anterior, de lo contrario, establece el saldo anterior en 0
        const saldoAnterior = saldoAnteriorData.length > 0 ? saldoAnteriorData[0].saldo : 0;

        // Calcula el nuevo saldo sumando el saldo anterior a las entradas y restando las salidas
        const nuevoSaldo = saldoAnterior + parseFloat(req.body.entradas) - parseFloat(req.body.salidas);

        // Realizar la inserción en la tabla concmesas
        const sql = "INSERT INTO mmlt (fecha, entradas, salidas, saldo, pe) VALUES (?, ?, ?, ?, ?)";
        const values = [
            req.body.fecha,
            req.body.entradas,
            req.body.salidas,
            nuevoSaldo,
            req.body.pe
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

app.put('/updatemmlt/:id', async (req, res) => {


    const saldoAnteriorData = await new Promise((resolve, reject) => {
        db.query("SELECT saldo FROM mmlt ORDER BY id DESC LIMIT 1, 1", (err, data) => {
            if (err) reject(err);
            else resolve(data);
        });
    });



    // Si hay registros en la tabla, obtén el saldo anterior, de lo contrario, establece el saldo anterior en 0
    const saldoAnterior = saldoAnteriorData.length > 0 ? saldoAnteriorData[0].saldo : 0;

    // Calcula el nuevo saldo sumando el saldo anterior a las entradas y restando las salidas
    const nuevoSaldo = saldoAnterior + parseFloat(req.body.entradas) - parseFloat(req.body.salidas);
    const sql = "UPDATE mmlt SET fecha = ?, entradas = ?, salidas = ?, pe = ?, saldo = ? WHERE id = ?";
    const values = [
        req.body.fecha,
        req.body.entradas,
        req.body.salidas,
        req.body.pe,
        nuevoSaldo

    ];
    const id = req.params.id;
    db.query(sql, [...values, id], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.get('/getrecordmmlt/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM mmlt WHERE id = ?"
    db.query(sql, [id], (err, data) => {
        if (err) {
            return res.json({ Error: "Error" })
        }

        return res.json(data)
    })
})
app.delete('/deletemmlt/:id', (req, res) => {
    const sql = "DELETE FROM mmlt WHERE id = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

////////////MMLE/////////
app.get('/mmle', (req, res) => {
    const sql = "SELECT * FROM mmle ORDER BY id DESC";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.post('/createmmle', async (req, res) => {
    try {

        // Obtener el saldo anterior
        const saldoAnteriorData = await new Promise((resolve, reject) => {
            db.query("SELECT saldo FROM mmle ORDER BY id DESC LIMIT 1", (err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });

        // Si hay registros en la tabla, obtén el saldo anterior, de lo contrario, establece el saldo anterior en 0
        const saldoAnterior = saldoAnteriorData.length > 0 ? saldoAnteriorData[0].saldo : 0;

        // Calcula el nuevo saldo sumando el saldo anterior a las entradas y restando las salidas
        const nuevoSaldo = saldoAnterior + parseFloat(req.body.entradas) - parseFloat(req.body.salidas);

        // Realizar la inserción en la tabla concmesas
        const sql = "INSERT INTO mmle (fecha, entradas, salidas, saldo, pe) VALUES (?, ?, ?, ?, ?)";
        const values = [
            req.body.fecha,
            req.body.entradas,
            req.body.salidas,
            nuevoSaldo,
            req.body.pe
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

app.put('/updatemmle/:id', async (req, res) => {


    const saldoAnteriorData = await new Promise((resolve, reject) => {
        db.query("SELECT saldo FROM mmle ORDER BY id DESC LIMIT 1, 1", (err, data) => {
            if (err) reject(err);
            else resolve(data);
        });
    });



    // Si hay registros en la tabla, obtén el saldo anterior, de lo contrario, establece el saldo anterior en 0
    const saldoAnterior = saldoAnteriorData.length > 0 ? saldoAnteriorData[0].saldo : 0;

    // Calcula el nuevo saldo sumando el saldo anterior a las entradas y restando las salidas
    const nuevoSaldo = saldoAnterior + parseFloat(req.body.entradas) - parseFloat(req.body.salidas);
    const sql = "UPDATE mmle SET fecha = ?, entradas = ?, salidas = ?, pe = ?, saldo = ? WHERE id = ?";
    const values = [
        req.body.fecha,
        req.body.entradas,
        req.body.salidas,
        req.body.pe,
        nuevoSaldo

    ];
    const id = req.params.id;
    db.query(sql, [...values, id], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.get('/getrecordmmle/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM mmle WHERE id = ?"
    db.query(sql, [id], (err, data) => {
        if (err) {
            return res.json({ Error: "Error" })
        }

        return res.json(data)
    })
})
app.delete('/deletemmle/:id', (req, res) => {
    const sql = "DELETE FROM mmle WHERE id = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

////////////MPMLE/////////
app.get('/mpmle', (req, res) => {
    const sql = "SELECT * FROM mpmle ORDER BY id DESC";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.post('/creatempmle', async (req, res) => {
    try {
        const totalsalidas = await new Promise((resolve, reject) => {
            const query = `
            SELECT 
            COALESCE(SUM(ps.patiols), 0)  + COALESCE(SUM(m.pmle), 0) AS total_salidas
        FROM 
            prodseleccion ps
        
        LEFT JOIN 
            molienda m ON ps.fecha = m.fecha
        WHERE 
            ps.fecha = ?;
        ;
            `; // Ajusta la condición de fecha según tus necesidades
            db.query(query, [req.body.fecha], (err, data) => {
                if (err) reject(err);
                else resolve(data[0].total_salidas); // Obtenemos el total de salidas combinadas
            });
        });
        // Obtener el saldo anterior
        const saldoAnteriorData = await new Promise((resolve, reject) => {
            db.query("SELECT saldo FROM mpmle ORDER BY id DESC LIMIT 1", (err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });

        // Si hay registros en la tabla, obtén el saldo anterior, de lo contrario, establece el saldo anterior en 0
        const saldoAnterior = saldoAnteriorData.length > 0 ? saldoAnteriorData[0].saldo : 0;

        // Calcula el nuevo saldo sumando el saldo anterior a las entradas y restando las salidas
        const nuevoSaldo = saldoAnterior + parseFloat(req.body.entradas) - parseFloat(totalsalidas);

        // Realizar la inserción en la tabla concmesas
        const sql = "INSERT INTO mpmle (fecha, entradas, salidas, saldo, pe) VALUES (?, ?, ?, ?, ?)";
        const values = [
            req.body.fecha,
            req.body.entradas,
            totalsalidas,
            nuevoSaldo,
            req.body.pe
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

app.put('/updatempmle/:id', async (req, res) => {


    const saldoAnteriorData = await new Promise((resolve, reject) => {
        db.query("SELECT saldo FROM mpmle ORDER BY id DESC LIMIT 1, 1", (err, data) => {
            if (err) reject(err);
            else resolve(data);
        });
    });



    // Si hay registros en la tabla, obtén el saldo anterior, de lo contrario, establece el saldo anterior en 0
    const saldoAnterior = saldoAnteriorData.length > 0 ? saldoAnteriorData[0].saldo : 0;

    // Calcula el nuevo saldo sumando el saldo anterior a las entradas y restando las salidas
    const nuevoSaldo = saldoAnterior + parseFloat(req.body.entradas) - parseFloat(req.body.salidas);
    const sql = "UPDATE mpmle SET fecha = ?, entradas = ?, salidas = ?, pe = ?, saldo = ? WHERE id = ?";
    const values = [
        req.body.fecha,
        req.body.entradas,
        req.body.salidas,
        req.body.pe,
        nuevoSaldo

    ];
    const id = req.params.id;
    db.query(sql, [...values, id], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.get('/getrecordmpmle/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM mpmle WHERE id = ?"
    db.query(sql, [id], (err, data) => {
        if (err) {
            return res.json({ Error: "Error" })
        }

        return res.json(data)
    })
})
app.delete('/deletempmle/:id', (req, res) => {
    const sql = "DELETE FROM mpmle WHERE id = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

////////////MPMLT/////////
app.get('/mpmlet', (req, res) => {
    const sql = "SELECT * FROM mpmlt ORDER BY id DESC";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.post('/creatempmlt', async (req, res) => {
    try {
        const totalsalidas = await new Promise((resolve, reject) => {
            const query = `
            SELECT 
            COALESCE(SUM(ps.tolvageneral), 0) + COALESCE(SUM(pj.alimj2), 0) + COALESCE(SUM(m.pmlt), 0) AS total_salidas
        FROM 
            prodseleccion ps
        LEFT JOIN 
            produccionjigs pj ON ps.fecha = pj.fecha
        LEFT JOIN 
            molienda m ON ps.fecha = m.fecha
        WHERE 
            ps.fecha = ?;
        ;
            `; // Ajusta la condición de fecha según tus necesidades
            db.query(query, [req.body.fecha], (err, data) => {
                if (err) reject(err);
                else resolve(data[0].total_salidas); // Obtenemos el total de salidas combinadas
            });
        });




        // Obtener el saldo anterior
        const saldoAnteriorData = await new Promise((resolve, reject) => {
            db.query("SELECT saldo FROM mpmlt ORDER BY id DESC LIMIT 1", (err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });

        // Si hay registros en la tabla, obtén el saldo anterior, de lo contrario, establece el saldo anterior en 0
        const saldoAnterior = saldoAnteriorData.length > 0 ? saldoAnteriorData[0].saldo : 0;

        // Calcula el nuevo saldo sumando el saldo anterior a las entradas y restando las salidas
        const nuevoSaldo = saldoAnterior + parseFloat(req.body.entradas) - parseFloat(totalsalidas);

        // Realizar la inserción en la tabla concmesas
        const sql = "INSERT INTO mpmlt (fecha, entradas, salidas, saldo, pe) VALUES (?, ?, ?, ?, ?)";
        const values = [
            req.body.fecha,
            req.body.entradas,
            totalsalidas,
            nuevoSaldo,
            req.body.pe
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

app.put('/updatempmlt/:id', async (req, res) => {


    const saldoAnteriorData = await new Promise((resolve, reject) => {
        db.query("SELECT saldo FROM mpmlt ORDER BY id DESC LIMIT 1, 1", (err, data) => {
            if (err) reject(err);
            else resolve(data);
        });
    });



    // Si hay registros en la tabla, obtén el saldo anterior, de lo contrario, establece el saldo anterior en 0
    const saldoAnterior = saldoAnteriorData.length > 0 ? saldoAnteriorData[0].saldo : 0;

    // Calcula el nuevo saldo sumando el saldo anterior a las entradas y restando las salidas
    const nuevoSaldo = saldoAnterior + parseFloat(req.body.entradas) - parseFloat(req.body.salidas);
    const sql = "UPDATE mpmlt SET fecha = ?, entradas = ?, salidas = ?, pe = ?, saldo = ? WHERE id = ?";
    const values = [
        req.body.fecha,
        req.body.entradas,
        req.body.salidas,
        req.body.pe,
        nuevoSaldo

    ];
    const id = req.params.id;
    db.query(sql, [...values, id], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.get('/getrecordmpmlt/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM mpmlt WHERE id = ?"
    db.query(sql, [id], (err, data) => {
        if (err) {
            return res.json({ Error: "Error" })
        }

        return res.json(data)
    })
})
app.delete('/deletempmlt/:id', (req, res) => {
    const sql = "DELETE FROM mpmlt WHERE id = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

////////////TMLT/////////
app.get('/tmlt', (req, res) => {
    const sql = "SELECT * FROM tmlt ORDER BY id DESC";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.post('/createtmlt', async (req, res) => {
    try {

        // Obtener el saldo anterior
        const saldoAnteriorData = await new Promise((resolve, reject) => {
            db.query("SELECT saldo FROM tmlt ORDER BY id DESC LIMIT 1", (err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });

        // Si hay registros en la tabla, obtén el saldo anterior, de lo contrario, establece el saldo anterior en 0
        const saldoAnterior = saldoAnteriorData.length > 0 ? saldoAnteriorData[0].saldo : 0;

        // Calcula el nuevo saldo sumando el saldo anterior a las entradas y restando las salidas
        const nuevoSaldo = saldoAnterior + parseFloat(req.body.entradas) - parseFloat(req.body.salidas);

        // Realizar la inserción en la tabla concmesas
        const sql = "INSERT INTO tmlt (fecha, entradas, salidas, saldo, pe) VALUES (?, ?, ?, ?, ?)";
        const values = [
            req.body.fecha,
            req.body.entradas,
            req.body.salidas,
            nuevoSaldo,
            req.body.pe
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

app.put('/updatetmlt/:id', async (req, res) => {


    const saldoAnteriorData = await new Promise((resolve, reject) => {
        db.query("SELECT saldo FROM tmlt ORDER BY id DESC LIMIT 1, 1", (err, data) => {
            if (err) reject(err);
            else resolve(data);
        });
    });



    // Si hay registros en la tabla, obtén el saldo anterior, de lo contrario, establece el saldo anterior en 0
    const saldoAnterior = saldoAnteriorData.length > 0 ? saldoAnteriorData[0].saldo : 0;

    // Calcula el nuevo saldo sumando el saldo anterior a las entradas y restando las salidas
    const nuevoSaldo = saldoAnterior + parseFloat(req.body.entradas) - parseFloat(req.body.salidas);
    const sql = "UPDATE tmlt SET fecha = ?, entradas = ?, salidas = ?, pe = ?, saldo = ? WHERE id = ?";
    const values = [
        req.body.fecha,
        req.body.entradas,
        req.body.salidas,
        req.body.pe,
        nuevoSaldo

    ];
    const id = req.params.id;
    db.query(sql, [...values, id], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.get('/getrecordtmlt/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM tmlt WHERE id = ?"
    db.query(sql, [id], (err, data) => {
        if (err) {
            return res.json({ Error: "Error" })
        }

        return res.json(data)
    })
})
app.delete('/deletetmlt/:id', (req, res) => {
    const sql = "DELETE FROM tmlt WHERE id = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});
////////////TMLE/////////
app.get('/tmle', (req, res) => {
    const sql = "SELECT * FROM tmle ORDER BY id DESC";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.post('/createtmle', async (req, res) => {
    try {

        // Obtener el saldo anterior
        const saldoAnteriorData = await new Promise((resolve, reject) => {
            db.query("SELECT saldo FROM tmle ORDER BY id DESC LIMIT 1", (err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });

        // Si hay registros en la tabla, obtén el saldo anterior, de lo contrario, establece el saldo anterior en 0
        const saldoAnterior = saldoAnteriorData.length > 0 ? saldoAnteriorData[0].saldo : 0;

        // Calcula el nuevo saldo sumando el saldo anterior a las entradas y restando las salidas
        const nuevoSaldo = saldoAnterior + parseFloat(req.body.entradas) - parseFloat(req.body.salidas);

        // Realizar la inserción en la tabla concmesas
        const sql = "INSERT INTO tmle (fecha, entradas, salidas, saldo, pe) VALUES (?, ?, ?, ?, ?)";
        const values = [
            req.body.fecha,
            req.body.entradas,
            req.body.salidas,
            nuevoSaldo,
            req.body.pe
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

app.put('/updatetmle/:id', async (req, res) => {


    const saldoAnteriorData = await new Promise((resolve, reject) => {
        db.query("SELECT saldo FROM tmle ORDER BY id DESC LIMIT 1, 1", (err, data) => {
            if (err) reject(err);
            else resolve(data);
        });
    });



    // Si hay registros en la tabla, obtén el saldo anterior, de lo contrario, establece el saldo anterior en 0
    const saldoAnterior = saldoAnteriorData.length > 0 ? saldoAnteriorData[0].saldo : 0;

    // Calcula el nuevo saldo sumando el saldo anterior a las entradas y restando las salidas
    const nuevoSaldo = saldoAnterior + parseFloat(req.body.entradas) - parseFloat(req.body.salidas);
    const sql = "UPDATE tmle SET fecha = ?, entradas = ?, salidas = ?, pe = ?, saldo = ? WHERE id = ?";
    const values = [
        req.body.fecha,
        req.body.entradas,
        req.body.salidas,
        req.body.pe,
        nuevoSaldo

    ];
    const id = req.params.id;
    db.query(sql, [...values, id], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.get('/getrecordtmle/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM tmle WHERE id = ?"
    db.query(sql, [id], (err, data) => {
        if (err) {
            return res.json({ Error: "Error" })
        }

        return res.json(data)
    })
})
app.delete('/deletetmle/:id', (req, res) => {
    const sql = "DELETE FROM tmle WHERE id = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

////////////TolvaG/////////
app.get('/tolvag', (req, res) => {
    const sql = "SELECT * FROM tolvag ORDER BY id DESC";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.post('/createtolvag', async (req, res) => {
    try {

        // Obtener el saldo anterior
        const saldoAnteriorData = await new Promise((resolve, reject) => {
            db.query("SELECT saldo FROM tolvag ORDER BY id DESC LIMIT 1", (err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });

        // Si hay registros en la tabla, obtén el saldo anterior, de lo contrario, establece el saldo anterior en 0
        const saldoAnterior = saldoAnteriorData.length > 0 ? saldoAnteriorData[0].saldo : 0;

        // Calcula el nuevo saldo sumando el saldo anterior a las entradas y restando las salidas
        const nuevoSaldo = saldoAnterior + parseFloat(req.body.entradas) - parseFloat(req.body.salidas);

        // Realizar la inserción en la tabla concmesas
        const sql = "INSERT INTO tolvag (fecha, entradas, salidas, saldo, pe) VALUES (?, ?, ?, ?, ?)";
        const values = [
            req.body.fecha,
            req.body.entradas,
            req.body.salidas,
            nuevoSaldo,
            req.body.pe
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

app.put('/updatetolvag/:id', async (req, res) => {


    const saldoAnteriorData = await new Promise((resolve, reject) => {
        db.query("SELECT saldo FROM tolvag ORDER BY id DESC LIMIT 1, 1", (err, data) => {
            if (err) reject(err);
            else resolve(data);
        });
    });



    // Si hay registros en la tabla, obtén el saldo anterior, de lo contrario, establece el saldo anterior en 0
    const saldoAnterior = saldoAnteriorData.length > 0 ? saldoAnteriorData[0].saldo : 0;

    // Calcula el nuevo saldo sumando el saldo anterior a las entradas y restando las salidas
    const nuevoSaldo = saldoAnterior + parseFloat(req.body.entradas) - parseFloat(req.body.salidas);
    const sql = "UPDATE tolvag SET fecha = ?, entradas = ?, salidas = ?, pe = ?, saldo = ? WHERE id = ?";
    const values = [
        req.body.fecha,
        req.body.entradas,
        req.body.salidas,
        req.body.pe,
        nuevoSaldo

    ];
    const id = req.params.id;
    db.query(sql, [...values, id], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.get('/getrecordtolvag/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM tolvag WHERE id = ?"
    db.query(sql, [id], (err, data) => {
        if (err) {
            return res.json({ Error: "Error" })
        }

        return res.json(data)
    })
})
app.delete('/deletetolvag/:id', (req, res) => {
    const sql = "DELETE FROM tolvag WHERE id = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

//////////PDF EXISTENCIAS///////////
app.get('/getsilos/:fecha', (req, res) => {
    const fecha = req.params.fecha;
    const sql = "SELECT * FROM silos WHERE fecha = ?"
    db.query(sql, [fecha], (err, data) => {
        if (err) {
            console.error("Error en la consulta SQL:", err);
            return res.status(500).json({ error: "Error en la consulta SQL. Por favor, inténtalo de nuevo más tarde." });
        }

        return res.json(data);
    });
})
app.get('/getconcmesas/:fecha', (req, res) => {
    const fecha = req.params.fecha;
    const sql = "SELECT * FROM concmesas WHERE fecha = ?"
    db.query(sql, [fecha], (err, data) => {
        if (err) {
            console.error("Error en la consulta SQL:", err);
            return res.status(500).json({ error: "Error en la consulta SQL. Por favor, inténtalo de nuevo más tarde." });
        }

        return res.json(data);
    });
})
app.get('/getconcjigssec/:fecha', (req, res) => {
    const fecha = req.params.fecha;
    const sql = "SELECT * FROM concjigssec WHERE fecha = ?"
    db.query(sql, [fecha], (err, data) => {
        if (err) {
            console.error("Error en la consulta SQL:", err);
            return res.status(500).json({ error: "Error en la consulta SQL. Por favor, inténtalo de nuevo más tarde." });
        }

        return res.json(data);
    });
})
app.get('/getmedios46/:fecha', (req, res) => {
    const fecha = req.params.fecha;
    const sql = "SELECT * FROM medios46 WHERE fecha = ?"
    db.query(sql, [fecha], (err, data) => {
        if (err) {
            console.error("Error en la consulta SQL:", err);
            return res.status(500).json({ error: "Error en la consulta SQL. Por favor, inténtalo de nuevo más tarde." });
        }

        return res.json(data);
    });
})
app.get('/getmedios4/:fecha', (req, res) => {
    const fecha = req.params.fecha;
    const sql = "SELECT * FROM medios4 WHERE fecha = ?"
    db.query(sql, [fecha], (err, data) => {
        if (err) {
            console.error("Error en la consulta SQL:", err);
            return res.status(500).json({ error: "Error en la consulta SQL. Por favor, inténtalo de nuevo más tarde." });
        }

        return res.json(data);
    });
})
app.get('/getmedios3/:fecha', (req, res) => {
    const fecha = req.params.fecha;
    const sql = "SELECT * FROM medios3 WHERE fecha = ?"
    db.query(sql, [fecha], (err, data) => {
        if (err) {
            console.error("Error en la consulta SQL:", err);
            return res.status(500).json({ error: "Error en la consulta SQL. Por favor, inténtalo de nuevo más tarde." });
        }

        return res.json(data);
    });
})
app.get('/getgranobandas/:fecha', (req, res) => {
    const fecha = req.params.fecha;
    const sql = "SELECT * FROM granobandas WHERE fecha = ?"
    db.query(sql, [fecha], (err, data) => {
        if (err) {
            console.error("Error en la consulta SQL:", err);
            return res.status(500).json({ error: "Error en la consulta SQL. Por favor, inténtalo de nuevo más tarde." });
        }

        return res.json(data);
    });
})
app.get('/getgranopmoler/:fecha', (req, res) => {
    const fecha = req.params.fecha;
    const sql = "SELECT * FROM granopmoler WHERE fecha = ?"
    db.query(sql, [fecha], (err, data) => {
        if (err) {
            console.error("Error en la consulta SQL:", err);
            return res.status(500).json({ error: "Error en la consulta SQL. Por favor, inténtalo de nuevo más tarde." });
        }

        return res.json(data);
    });
})
app.get('/getgranojigs/:fecha', (req, res) => {
    const fecha = req.params.fecha;
    const sql = "SELECT * FROM granojigs WHERE fecha = ?"
    db.query(sql, [fecha], (err, data) => {
        if (err) {
            console.error("Error en la consulta SQL:", err);
            return res.status(500).json({ error: "Error en la consulta SQL. Por favor, inténtalo de nuevo más tarde." });
        }

        return res.json(data);
    });
})
app.get('/getdesensolvech/:fecha', (req, res) => {
    const fecha = req.params.fecha;
    const sql = "SELECT * FROM desensolvech WHERE fecha = ?"
    db.query(sql, [fecha], (err, data) => {
        if (err) {
            console.error("Error en la consulta SQL:", err);
            return res.status(500).json({ error: "Error en la consulta SQL. Por favor, inténtalo de nuevo más tarde." });
        }

        return res.json(data);
    });
})
app.get('/getdesensolve/:fecha', (req, res) => {
    const fecha = req.params.fecha;
    const sql = "SELECT * FROM desensolve WHERE fecha = ?"
    db.query(sql, [fecha], (err, data) => {
        if (err) {
            console.error("Error en la consulta SQL:", err);
            return res.status(500).json({ error: "Error en la consulta SQL. Por favor, inténtalo de nuevo más tarde." });
        }

        return res.json(data);
    });
})
app.get('/getdesecho43/:fecha', (req, res) => {
    const fecha = req.params.fecha;
    const sql = "SELECT * FROM desecho43 WHERE fecha = ?"
    db.query(sql, [fecha], (err, data) => {
        if (err) {
            console.error("Error en la consulta SQL:", err);
            return res.status(500).json({ error: "Error en la consulta SQL. Por favor, inténtalo de nuevo más tarde." });
        }

        return res.json(data);
    });
})
app.get('/getdesecho39/:fecha', (req, res) => {
    const fecha = req.params.fecha;
    const sql = "SELECT * FROM desecho39 WHERE fecha = ?"
    db.query(sql, [fecha], (err, data) => {
        if (err) {
            console.error("Error en la consulta SQL:", err);
            return res.status(500).json({ error: "Error en la consulta SQL. Por favor, inténtalo de nuevo más tarde." });
        }

        return res.json(data);
    });
})
app.get('/getbaritron/:fecha', (req, res) => {
    const fecha = req.params.fecha;
    const sql = "SELECT * FROM baritron WHERE fecha = ?"
    db.query(sql, [fecha], (err, data) => {
        if (err) {
            console.error("Error en la consulta SQL:", err);
            return res.status(500).json({ error: "Error en la consulta SQL. Por favor, inténtalo de nuevo más tarde." });
        }

        return res.json(data);
    });
})
app.get('/gettolvasmolinos/:fecha', (req, res) => {
    const fecha = req.params.fecha;
    const sql = "SELECT * FROM tolvasmolinos WHERE fecha = ?"
    db.query(sql, [fecha], (err, data) => {
        if (err) {
            console.error("Error en la consulta SQL:", err);
            return res.status(500).json({ error: "Error en la consulta SQL. Por favor, inténtalo de nuevo más tarde." });
        }

        return res.json(data);
    });
})
app.get('/getmmlt/:fecha', (req, res) => {
    const fecha = req.params.fecha;
    const sql = "SELECT * FROM mmlt WHERE fecha = ?"
    db.query(sql, [fecha], (err, data) => {
        if (err) {
            console.error("Error en la consulta SQL:", err);
            return res.status(500).json({ error: "Error en la consulta SQL. Por favor, inténtalo de nuevo más tarde." });
        }

        return res.json(data);
    });
})
app.get('/getmmle/:fecha', (req, res) => {
    const fecha = req.params.fecha;
    const sql = "SELECT * FROM mmle WHERE fecha = ?"
    db.query(sql, [fecha], (err, data) => {
        if (err) {
            console.error("Error en la consulta SQL:", err);
            return res.status(500).json({ error: "Error en la consulta SQL. Por favor, inténtalo de nuevo más tarde." });
        }

        return res.json(data);
    });
})
app.get('/getmpmlt/:fecha', (req, res) => {
    const fecha = req.params.fecha;
    const sql = "SELECT * FROM mpmlt WHERE fecha = ?"
    db.query(sql, [fecha], (err, data) => {
        if (err) {
            console.error("Error en la consulta SQL:", err);
            return res.status(500).json({ error: "Error en la consulta SQL. Por favor, inténtalo de nuevo más tarde." });
        }

        return res.json(data);
    });
})
app.get('/getmpmle/:fecha', (req, res) => {
    const fecha = req.params.fecha;
    const sql = "SELECT * FROM mpmle WHERE fecha = ?"
    db.query(sql, [fecha], (err, data) => {
        if (err) {
            console.error("Error en la consulta SQL:", err);
            return res.status(500).json({ error: "Error en la consulta SQL. Por favor, inténtalo de nuevo más tarde." });
        }

        return res.json(data);
    });
})
app.get('/gettmlt/:fecha', (req, res) => {
    const fecha = req.params.fecha;
    const sql = "SELECT * FROM tmlt WHERE fecha = ?"
    db.query(sql, [fecha], (err, data) => {
        if (err) {
            console.error("Error en la consulta SQL:", err);
            return res.status(500).json({ error: "Error en la consulta SQL. Por favor, inténtalo de nuevo más tarde." });
        }

        return res.json(data);
    });
})

app.get('/gettmle/:fecha', (req, res) => {
    const fecha = req.params.fecha;
    const sql = "SELECT * FROM tmle WHERE fecha = ?"
    db.query(sql, [fecha], (err, data) => {
        if (err) {
            console.error("Error en la consulta SQL:", err);
            return res.status(500).json({ error: "Error en la consulta SQL. Por favor, inténtalo de nuevo más tarde." });
        }

        return res.json(data);
    });
})
app.get('/gettolvag/:fecha', (req, res) => {
    const fecha = req.params.fecha;
    const sql = "SELECT * FROM tolvag WHERE fecha = ?"
    db.query(sql, [fecha], (err, data) => {
        if (err) {
            console.error("Error en la consulta SQL:", err);
            return res.status(500).json({ error: "Error en la consulta SQL. Por favor, inténtalo de nuevo más tarde." });
        }

        return res.json(data);
    });
})
app.get('/getseleccion/:fecha', (req, res) => {
    const fecha = req.params.fecha;
    const sql = "SELECT * FROM seleccion WHERE fecha = ?"
    db.query(sql, [fecha], (err, data) => {
        if (err) {
            console.error("Error en la consulta SQL:", err);
            return res.status(500).json({ error: "Error en la consulta SQL. Por favor, inténtalo de nuevo más tarde." });
        }

        return res.json(data);
    });
})
app.get('/getgrabari/:fecha', (req, res) => {
    const fecha = req.params.fecha;
    const sql = "SELECT * FROM granobaribright WHERE fecha = ?"
    db.query(sql, [fecha], (err, data) => {
        if (err) {
            console.error("Error en la consulta SQL:", err);
            return res.status(500).json({ error: "Error en la consulta SQL. Por favor, inténtalo de nuevo más tarde." });
        }

        return res.json(data);
    });
})
app.get('/getconcbari/:fecha', (req, res) => {
    const fecha = req.params.fecha;
    const sql = "SELECT * FROM concentradobaribaright WHERE fecha = ?"
    db.query(sql, [fecha], (err, data) => {
        if (err) {
            console.error("Error en la consulta SQL:", err);
            return res.status(500).json({ error: "Error en la consulta SQL. Por favor, inténtalo de nuevo más tarde." });
        }

        return res.json(data);
    });
})

/////////NOTAS////////
app.get('/notas', (req, res) => {
    const sql = "SELECT * FROM notas ORDER BY id DESC";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});
app.post('/createnotas', async (req, res) => {
    try {

    

        // Realizar la inserción en la tabla concmesas
        const sql = "INSERT INTO notas (fecha, comentario) VALUES (?, ?)";
        const values = [
            req.body.fecha,
            req.body.comentario,
          
        ];

        db.query(sql, values, (err, result) => {
            if (err) throw err;
            console.log("Registro insertado en notas con éxito.");
            res.send("Registro insertado en notas con éxito.");
        });
    } catch (error) {
        console.error("Error al crear el registro en notas:", error);
        res.status(500).send("Error al crear el registro en notas.");
    }
});
app.put('/updatenotas/:id', async (req, res) => {


  
    const sql = "UPDATE notas SET fecha = ?, comentarios = ? WHERE id = ?";
    const values = [
        req.body.fecha,
        req.body.comentarios,
       

    ];
    const id = req.params.id;
    db.query(sql, [...values, id], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.get('/getrecordnotas/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM notas WHERE id = ?"
    db.query(sql, [id], (err, data) => {
        if (err) {
            return res.json({ Error: "Error" })
        }

        return res.json(data)
    })
})
app.delete('/deletenotas/:id', (req, res) => {
    const sql = "DELETE FROM notas WHERE id = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});