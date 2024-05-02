const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const jwt = require("jsonwebtoken")

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


app.listen(8081, () => {
    console.log("listening");
});

////////////USUARIOs////////////////////////


app.get('/usuarios', (req, res) => {
    const sql = "SELECT * FROM usuarios ORDER BY id_usuarios DESC";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});
app.post('/createusuarios', (req, res) => {
    const sql = "INSERT INTO usuarios (nombrecompleto, telefono, cargo, nombreusuario, contra,codif) VALUES (?, ?, ?, ?, ?,?)";
    const values = [
        req.body.nombrecompleto,
        req.body.telefono,
        req.body.cargo,
        req.body.nombreusuario,
        req.body.contra,
        req.body.codif

    ];
    db.query(sql, values, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});
app.put('/updateusuarios/:id', (req, res) => {
    const sql = "UPDATE usuarios SET nombrecompleto=?, telefono=?, cargo=?, nombreusuario=?, contra=?,codif=? WHERE id_usuarios = ?";
    const values = [
        req.body.nombrecompleto,
        req.body.telefono,
        req.body.cargo,
        req.body.nombreusuario,
        req.body.contra,
        req.body.codif
    ];
    const id = req.params.id;
    db.query(sql, [...values, id], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});
app.delete('/deleteusuarios/:id', (req, res) => {
    const sql = "DELETE FROM usuarios WHERE id_usuarios = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});
app.post('/login', (req, res) => {
    const { nombreusuario, contra } = req.body;

    // Consultar la base de datos para verificar las credenciales
    const sql = 'SELECT * FROM usuarios WHERE nombreusuario = ? AND contra = ?';
    db.query(sql, [nombreusuario, contra], (err, results) => {
        if (results.length > 0) {
            // El usuario está autenticado correctamente
            const usuario = results[0];
            const token = jwt.sign({ id: usuario.id, nombreusuario: usuario.nombreusuario }, 'TuClaveSecreta', { expiresIn: '1h' });
            res.json({ success: true, message: 'Inicio de sesión exitoso' });
        } else {
            // Credenciales incorrectas
            res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
        }
    });
});

app.get('/getusuarios/:nombreusuario', (req, res) => {
    const nombreusuario = req.params.nombreusuario;
    const sql = "SELECT nombrecompleto, cargo, telefono FROM usuarios WHERE nombreusuario = ?";
    db.query(sql, [nombreusuario], (err, data) => {
        if (err) {
            console.error("Error en la consulta SQL:", err);
            return res.status(500).json({ error: "Error en la consulta SQL. Por favor, inténtalo de nuevo más tarde." });
        }

        return res.json(data);
    });
});

app.get('/getrecordusuarios/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM usuarios WHERE id_usuarios = ?"
    db.query(sql, [id], (err, data) => {
        if (err) {
            return res.json({ Error: "Error" })
        }

        return res.json(data)
    })
})
app.get('/getrecordusuarioscontra/:codif', (req, res) => {
    const codif = req.params.codif;
    const sql = "SELECT contra FROM usuarios WHERE codif = ?";
    db.query(sql, [codif], (err, data) => {
        if (err) {
            console.log('Error en la consulta SQL:', err);
            return res.status(500).json({ error: 'Error en la consulta SQL' });
        }

        if (data.length === 0) {
            return res.status(404).json({ error: 'No se encontraron registros para el código proporcionado' });
        }

        return res.json(data);
    });
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
                if (err) {
                    reject(err);
                } else {
                    // Verificamos si hay resultados
                    if (data && data.length > 0 && data[0].saldo !== null) {
                        // Si hay resultados y el saldo no es nulo, devolvemos el saldo
                        resolve(data[0].saldo);
                    } else {
                        // Si no hay resultados o el saldo es nulo, devolvemos 0
                        resolve(0);
                    }
                }
            });
        });

        const totalEntradasSelecc = await new Promise((resolve, reject) => {
            const query = "SELECT (SUM(tonpiedra)) AS total_entradas FROM prodseleccion WHERE fecha = ?;";
            db.query(query, [req.body.fecha], (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    // Verificamos si hay resultados
                    if (data && data.length > 0 && data[0].total_entradas !== null) {
                        // Si hay resultados y la suma no es nula, devolvemos el total
                        resolve(data[0].total_entradas);
                    } else {
                        // Si no hay resultados o la suma es nula, devolvemos 0
                        resolve(0);
                    }
                }
            });
        });

        const pe = await new Promise((resolve, reject) => {
            const query = "SELECT (SUM(petp)) AS total_PE FROM prodseleccion WHERE fecha = ?";
            db.query(query, [req.body.fecha], (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    // Verificamos si hay resultados
                    if (data && data.length > 0 && data[0].total_PE !== null) {
                        // Si hay resultados y el total de PE no es nulo, devolvemos el total
                        resolve(data[0].total_PE);
                    } else {
                        // Si no hay resultados o el total de PE es nulo, devolvemos 0
                        resolve(0);
                    }
                }
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
            pe,
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


        // Calcular el nuevo saldo
        let nuevoSaldo = saldoAnteriorData + parseFloat(req.body.entrada) - parseFloat(req.body.salida);

        // Realizar la actualización con el nuevo saldo
        const sql = "UPDATE seleccion SET fecha = ?, entrada = ?, salida = ?, pesp = ?, saldo = ? WHERE id = ?";
        const values = [
            req.body.fecha,
            req.body.entrada,
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
    const sql = "SELECT * FROM jigschinos ORDER BY id DESC;";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});
app.get('/reportediariomesas', (req, res) => {
    const sql = "SELECT * FROM mesas ORDER BY id DESC";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});
app.get('/reportediariograno', (req, res) => {
    const sql = "SELECT * FROM prodseleccion ORDER BY id DESC";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.post('/createrreportejigs', (req, res) => {
    // Restar el 1.80% de los valores antes de la inserción
    req.body.granoj1 = req.body.granoj1 - (req.body.granoj1 * 0.018);
    req.body.granoj2 = req.body.granoj2 - (req.body.granoj2 * 0.018);

    req.body.colasj1 = req.body.colasj1 - (req.body.colasj1 * 0.108);
    req.body.colasj2 = req.body.colasj2 - (req.body.colasj2 * 0.108);

    req.body.desenj1 = req.body.desenj1 - (req.body.desenj1 * 0.109);
    req.body.desenj2 = req.body.desenj2 - (req.body.desenj2 * 0.109);
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
    const sql = "INSERT INTO jigschinos (fecha, turno,horasjch, alimjch, peajch, granojch, pegjch, colasjch, pecjch, desenjch, pedjch, horasec, alimjsec, peajsec, concjsec, pecojsec, colasjsec, pecjsec) VALUES (?,?, ?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?)";
    const values = [
        req.body.fecha,
        req.body.turno,
        req.body.horasjch,
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

    req.body.mediom12 = req.body.mediom12 - (req.body.mediom12 * 0.089);
    req.body.mediosm34 = req.body.mediosm34 - (req.body.mediosm34 * 0.089);
    req.body.mediosm5 = req.body.mediosm5 - (req.body.mediosm5 * 0.089);
    req.body.mediosm6 = req.body.mediosm6 - (req.body.mediosm6 * 0.089);

    req.body.colasm12 = req.body.colasm12 - (req.body.colasm12 * 0.109);
    req.body.colasm34 = req.body.colasm34 - (req.body.colasm34 * 0.109);
    req.body.colasm5 = req.body.colasm5 - (req.body.colasm5 * 0.109);
    req.body.colasm6 = req.body.colasm6 - (req.body.colasm6 * 0.109);


    const sql = "INSERT INTO mesas (fecha, turno, seleccion,alimm12, peam12, conm12, pecnm12, mediom12, pemm12, colasm12, pecm12, alimm34, peam34, conm34, pecnm34, mediosm34, pemm34, colasm34, pecm34, alimm5, peam5, conm5, pecnm5, mediosm5, pemm5, colasm5, pecm5, alimm6, peam6, conm6, pecnm6, mediom6, pemm6, colasm6, pecm6) VALUES (?, ?, ?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?)";
    const values = [
        req.body.fecha,
        req.body.turno,
        req.body.seleccion,
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

    const sql = "UPDATE produccionjigs  SET fecha = ?, turno = ?, alimj1 = ?, peaj1= ?, granoj1 = ?, pegj1 = ?, colasj1 = ?, pecj1 = ?, desenj1 = ?, pedj1 = ?, alimj2 = ?, peaj2 = ?, granoj2 = ?, pegj2 = ?,  desenj2 = ?, pedj2 = ?, colasj2 = ?, pecj2 = ? WHERE id = ?";
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
        req.body.desenj2,
        req.body.pedj2,
        req.body.colasj2,
        req.body.pecj2,


    ];
    const id = req.params.id;
    db.query(sql, [...values, id], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});
app.put('/updatejigsch/:id', (req, res) => {
    const sql = "UPDATE jigschinos  SET fecha = ?, turno = ?, horasjch=?,alimjch = ?, peajch =?, granojch =?, pegjch=?, colasjch=?, pecjch=?, desenjch=?, pedjch=?, horasec = ?,alimjsec=?, peajsec=?, concjsec=?, pecojsec=?, colasjsec=?, pecjsec=? WHERE id = ?";
    const values = [
        req.body.fecha,
        req.body.turno,
        req.body.horasjch,
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
    const sql = "UPDATE mesas SET fecha=?, turno=?,seleccion=?, alimm12=?, peam12=?, conm12=?, pecnm12=?, mediom12=?, pemm12=?, colasm12=?, pecm12=?, alimm34=?, peam34=?, conm34=?, pecnm34=?, mediosm34=?, pemm34=?, colasm34=?, pecm34=?, alimm5=?, peam5=?, conm5=?, pecnm5=?, mediosm5=?, pemm5=?, colasm5=?, pecm5=?, alimm6=?, peam6=?, conm6=?, pecnm6=?, mediom6=?, pemm6=?, colasm6=?, pecm6=? WHERE id = ?";
    const values = [
        req.body.fecha,
        req.body.turno,
        req.body.seleccion,
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

        const totalConcentradoBari = await new Promise((resolve, reject) => {
            const query = "SELECT SUM(COALESCE(conm12, 0)) + SUM(COALESCE(conm34, 0)) + SUM(COALESCE(conm5, 0)) + SUM(COALESCE(conm6, 0)) AS total_concentrado FROM mesas WHERE fecha = ? AND seleccion = '1';";
            db.query(query, [req.body.fecha], (err, data) => {
                if (err) reject(err);
                else resolve(data[0].total_concentrado || 0); // Si no se encuentra ningún valor, devuelve 0
            });
        });

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
        const nuevoSaldo = saldoAnterior + parseFloat(totalConcentradoBari) - parseFloat(req.body.salidas);

        // Realiza la inserción con el nuevo saldo
        const sql = "INSERT INTO concentradobaribaright (fecha, entradas, salidas, pe, saldo) VALUES (?, ?, ?, ?, ?)";
        const values = [
            req.body.fecha,
            totalConcentradoBari,
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
        const totalConcentradoMesas = await new Promise((resolve, reject) => {
            const query = "SELECT SUM(COALESCE(conm12, 0)) + SUM(COALESCE(conm34, 0)) + SUM(COALESCE(conm5, 0)) + SUM(COALESCE(conm6, 0)) AS total_concentrado FROM mesas WHERE fecha = ? AND seleccion = '2';";
            db.query(query, [req.body.fecha], (err, data) => {
                if (err) reject(err);
                else resolve(data[0].total_concentrado || 0); // Si no se encuentra ningún valor, devuelve 0
            });
        });
        const totalSalidasMesas = await new Promise((resolve, reject) => {
            const query = "SELECT (SUM(concmesas)) AS total_salidas FROM molienda WHERE fecha = ?;";
            db.query(query, [req.body.fecha], (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    // Verificamos si hay resultados
                    if (data && data.length > 0 && data[0].total_salidas !== null) {
                        // Si hay resultados y el total de salidas no es nulo, devolvemos el total
                        resolve(data[0].total_salidas);
                    } else {
                        // Si no hay resultados o el total de salidas es nulo, devolvemos 0
                        resolve(0);
                    }
                }
            });
        });








        // Obtener el saldo anterior
        const saldoAnteriorData = await new Promise((resolve, reject) => {
            db.query("SELECT saldo FROM concmesas ORDER BY id DESC LIMIT 1", (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    if (data && data.length > 0 && data[0].saldo !== null) {
                        resolve(data[0].saldo);
                    } else {
                        resolve(0);
                    }
                }
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


app.put('/updateconcmesas/:id', async (req, res) => {
    try {



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
        const nuevoSaldo = saldoAnterior + parseFloat(req.body.entradas) - parseFloat(req.body.salidas);
        const sql = "UPDATE concmesas SET fecha=?, entradas=?, salidas=?, saldo=?, pe=? WHERE id = ?";
        const values = [
            req.body.fecha,
            req.body.entradas,
            req.body.salidas,
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
            const query = "SELECT (SUM(concjsec)) AS total_concjigs FROM jigschinos WHERE fecha = ?;";
            db.query(query, [req.body.fecha], (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    // Verificamos si hay resultados
                    if (data && data.length > 0 && data[0].total_concjigs !== null) {
                        // Si hay resultados y el total de concentrado de jigs no es nulo, devolvemos el total
                        resolve(data[0].total_concjigs);
                    } else {
                        // Si no hay resultados o el total de concentrado de jigs es nulo, devolvemos 0
                        resolve(0);
                    }
                }
            });
        });

        const totalSalidasConcjigs = await new Promise((resolve, reject) => {
            const query = "SELECT (SUM(concjigs)) AS total_concjig FROM molienda WHERE fecha = ?;";
            db.query(query, [req.body.fecha], (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    // Verificamos si hay resultados
                    if (data && data.length > 0 && data[0].total_concjig !== null) {
                        // Si hay resultados y el total de salidas de concentrado de jigs no es nulo, devolvemos el total
                        resolve(data[0].total_concjig);
                    } else {
                        // Si no hay resultados o el total de salidas de concentrado de jigs es nulo, devolvemos 0
                        resolve(0);
                    }
                }
            });
        });

        const totalpe = await new Promise((resolve, reject) => {
            const query = "SELECT pecojsec FROM jigschinos WHERE fecha = ?;";
            db.query(query, [req.body.fecha], (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    const nonZeroValues = data.filter(value => value.pecojsec !== 0);
                    const totalCount = nonZeroValues.length;

                    let totalConcjig = 0;
                    nonZeroValues.forEach(value => totalConcjig += value.pecojsec);

                    let average = 0;
                    if (totalCount > 0) {
                        average = totalConcjig / totalCount;
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
        const nuevoSaldo = saldoAnterior + parseFloat(req.body.entradas) - parseFloat(req.body.salidas,);

        const sql = "UPDATE concjigssec SET fecha=?, entradas=?, salidas=?, saldo=?, pe=? WHERE id = ?";
        const values = [
            req.body.fecha,
            req.body.entradas,
            req.body.salidas,
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
        const totalentradas = await new Promise((resolve, reject) => {
            const query = `
                SELECT 
                    COALESCE(SUM(CASE WHEN pemm12 BETWEEN 4.06 AND 4.10 THEN mediom12 ELSE 0 END) +
                             SUM(CASE WHEN pemm34 BETWEEN 4.06 AND 4.10 THEN mediosm34 ELSE 0 END) +
                             SUM(CASE WHEN pemm5 BETWEEN 4.06 AND 4.10 THEN mediosm5 ELSE 0 END) +
                             SUM(CASE WHEN pemm6 BETWEEN 4.06 AND 4.10 THEN mediom6 ELSE 0 END), 0) AS total_entradas
                FROM mesas
                WHERE fecha = ?;
            `;

            db.query(query, [req.body.fecha], (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    const total = data[0].total_entradas;
                    resolve(total);
                }
            });
        });



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
        const nuevoSaldo = saldoAnterior + parseFloat(totalentradas) - parseFloat(req.body.salidasm46);


        // Realizar la inserción en la tabla concmesas
        const sql = "INSERT INTO medios46 (fecha, entradasm46, salidasm46, saldo46, pe46) VALUES (?, ?, ?, ?, ?)";
        const values = [
            req.body.fecha,
            totalentradas,
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

        const totalentradas = await new Promise((resolve, reject) => {
            const query = `
                SELECT 
                    COALESCE(
                        (SELECT SUM(CASE WHEN pemm12 BETWEEN 4.00 AND 4.06 THEN mediom12 ELSE 0 END) +
                                 SUM(CASE WHEN pemm34 BETWEEN 4.00 AND 4.06 THEN mediosm34 ELSE 0 END) +
                                 SUM(CASE WHEN pemm5 BETWEEN 4.00 AND 4.06 THEN mediosm5 ELSE 0 END) +
                                 SUM(CASE WHEN pemm6 BETWEEN 4.00 AND 4.06 THEN mediom6 ELSE 0 END)
                         FROM mesas
                         WHERE fecha = ?),
                        0
                    ) AS total_entradas;
            `;

            db.query(query, [req.body.fecha], (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    const total = data[0].total_entradas;
                    resolve(total);
                }
            });
        });


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
        const nuevoSaldo = saldoAnterior + parseFloat(totalentradas) - parseFloat(req.body.salidas);

        // Realizar la inserción en la tabla concmesas
        const sql = "INSERT INTO medios4 (fecha, entradas, salidas, saldo, pe) VALUES (?, ?, ?, ?, ?)";
        const values = [
            req.body.fecha,
            totalentradas,
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
        const totalentradas = await new Promise((resolve, reject) => {
            const query = `
                SELECT 
                    COALESCE(SUM(CASE WHEN pemm12 BETWEEN 3.50 AND 3.98 THEN mediom12 ELSE 0 END) +
                             SUM(CASE WHEN pemm34 BETWEEN 3.50 AND 3.98 THEN mediosm34 ELSE 0 END) +
                             SUM(CASE WHEN pemm5 BETWEEN 3.50 AND 3.98 THEN mediosm5 ELSE 0 END) +
                             SUM(CASE WHEN pemm6 BETWEEN 3.50 AND 3.98 THEN mediom6 ELSE 0 END), 0) AS total_entradas
                FROM mesas
                WHERE fecha = ?;
            `;

            db.query(query, [req.body.fecha], (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    const total = data[0].total_entradas;
                    resolve(total);
                }
            });
        });



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
        const nuevoSaldo = saldoAnterior + parseFloat(totalentradas) - parseFloat(req.body.salidas);

        // Realizar la inserción en la tabla concmesas
        const sql = "INSERT INTO medios3 (fecha, entradas, salidas, saldo, pe) VALUES (?, ?, ?, ?, ?)";
        const values = [
            req.body.fecha,
            totalentradas,
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
            const query = "SELECT (SUM(granoj1) + SUM(granoj2)) AS total_grano FROM produccionjigs WHERE fecha = ?;";
            db.query(query, [req.body.fecha], (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    // Verificamos si hay resultados
                    if (data && data.length > 0 && data[0].total_grano !== null) {
                        // Si hay resultados y el total de grano no es nulo, devolvemos el total
                        resolve(data[0].total_grano);
                    } else {
                        // Si no hay resultados o el total de grano es nulo, devolvemos 0
                        resolve(0);
                    }
                }
            });
        });

        const totalsalidasgrano = await new Promise((resolve, reject) => {
            const query = "SELECT (SUM(medios)) AS total_salidasgrano FROM molienda WHERE fecha = ?;";
            db.query(query, [req.body.fecha], (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    // Verificamos si hay resultados
                    if (data && data.length > 0 && data[0].total_salidasgrano !== null) {
                        // Si hay resultados y el total de salidas de grano no es nulo, devolvemos el total
                        resolve(data[0].total_salidasgrano);
                    } else {
                        // Si no hay resultados o el total de salidas de grano es nulo, devolvemos 0
                        resolve(0);
                    }
                }
            });
        });

        const totalpesp = await new Promise((resolve, reject) => {
            const query = "SELECT AVG((IF(pegj1 IS NOT NULL AND pegj1 != 0, pegj1, 0) + IF(pegj2 IS NOT NULL AND pegj2 != 0, pegj2, 0)) / (IF(peaj1 IS NOT NULL AND peaj1 != 0, 1, 0) + IF(peaj2 IS NOT NULL AND peaj2 != 0, 1, 0))) AS promedio_peso FROM produccionjigs WHERE fecha =?";
            db.query(query, [req.body.fecha], (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    // Verificamos si hay resultados
                    if (data && data.length > 0 && data[0].promedio_peso !== null) {
                        // Si hay resultados y el promedio de peso no es nulo, devolvemos el promedio
                        resolve(data[0].promedio_peso);
                    } else {
                        // Si no hay resultados o el promedio de peso es nulo, devolvemos 0
                        resolve(0);
                    }
                }
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
            const query = "SELECT (SUM(granojch)) AS total_granojigs FROM jigschinos WHERE fecha = ?;";
            db.query(query, [req.body.fecha], (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    // Verificamos si hay resultados
                    if (data && data.length > 0 && data[0].total_granojigs !== null) {
                        // Si hay resultados y el total de grano de jigs no es nulo, devolvemos el total
                        resolve(data[0].total_granojigs);
                    } else {
                        // Si no hay resultados o el total de grano de jigs es nulo, devolvemos 0
                        resolve(0);
                    }
                }
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
            const query = "SELECT (SUM(desenjch)) AS total_desensolvejigs FROM jigschinos WHERE fecha = ?;";
            db.query(query, [req.body.fecha], (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    // Verificamos si hay resultados
                    if (data && data.length > 0 && data[0].total_desensolvejigs !== null) {
                        // Si hay resultados y el total de desensolve de jigs no es nulo, devolvemos el total
                        resolve(data[0].total_desensolvejigs);
                    } else {
                        // Si no hay resultados o el total de desensolve de jigs es nulo, devolvemos 0
                        resolve(0);
                    }
                }
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
                    COALESCE(ps_sum.tolvageneral, 0) + 
                    COALESCE(pj_sum.alimj2, 0) + 
                    COALESCE(m_sum.pmlt, 0) AS total_salidas
                FROM 
                    (
                        SELECT COALESCE(SUM(tolvageneral), 0) AS tolvageneral
                        FROM prodseleccion
                        WHERE fecha = ?
                    ) ps_sum,
                    (
                        SELECT COALESCE(SUM(alimj2), 0) AS alimj2
                        FROM produccionjigs
                        WHERE fecha = ?
                    ) pj_sum,
                    (
                        SELECT COALESCE(SUM(pmlt), 0) AS pmlt
                        FROM molienda
                        WHERE fecha = ?
                    ) m_sum;
            `; // Ajusta la condición de fecha según tus necesidades
            db.query(query, [req.body.fecha, req.body.fecha, req.body.fecha], (err, data) => {
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
    const sql = "SELECT * FROM concmesas WHERE fecha <= ? ORDER BY fecha DESC LIMIT 1"
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
    const sql = "SELECT * FROM concjigssec WHERE fecha <= ? ORDER BY fecha DESC LIMIT 1"
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
    const sql = "SELECT * FROM medios46 WHERE fecha <= ? ORDER BY fecha DESC LIMIT 1"
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
    const sql = "SELECT * FROM medios4 WHERE fecha <= ? ORDER BY fecha DESC LIMIT 1"
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
    const sql = "SELECT * FROM medios3 WHERE fecha <= ? ORDER BY fecha DESC LIMIT 1"
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
    const sql = "SELECT * FROM granobandas WHERE fecha <= ? ORDER BY fecha DESC LIMIT 1"
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
    const sql = "SELECT * FROM granopmoler WHERE fecha <= ? ORDER BY fecha DESC LIMIT 1"
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
    const sql = "SELECT * FROM granojigs WHERE fecha <= ? ORDER BY fecha DESC LIMIT 1"
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
    const sql = "SELECT * FROM desensolvech WHERE fecha <= ? ORDER BY fecha DESC LIMIT 1"
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
    const sql = "SELECT * FROM desensolve WHERE fecha <= ? ORDER BY fecha DESC LIMIT 1"
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
    const sql = "SELECT * FROM desecho43 WHERE fecha <= ? ORDER BY fecha DESC LIMIT 1"
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
    const sql = "SELECT * FROM desecho39 WHERE fecha <= ? ORDER BY fecha DESC LIMIT 1"
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
    const sql = "SELECT * FROM baritron WHERE fecha <= ? ORDER BY fecha DESC LIMIT 1";
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
    const sql = "SELECT * FROM tolvasmolinos WHERE fecha <= ? ORDER BY fecha DESC LIMIT 1"
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
    const sql = "SELECT * FROM mmlt WHERE fecha <= ? ORDER BY fecha DESC LIMIT 1"
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
    const sql = "SELECT * FROM mmle WHERE fecha <= ? ORDER BY fecha DESC LIMIT 1"
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
    const sql = "SELECT * FROM mpmlt WHERE fecha <= ? ORDER BY fecha DESC LIMIT 1"
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
    const sql = "SELECT * FROM mpmle WHERE fecha <= ? ORDER BY fecha DESC LIMIT 1"
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
    const sql = "SELECT * FROM tmlt WHERE fecha <= ? ORDER BY fecha DESC LIMIT 1"
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
    const sql = "SELECT * FROM tmle WHERE fecha <= ? ORDER BY fecha DESC LIMIT 1"
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
    const sql = "SELECT * FROM tolvag WHERE fecha <= ? ORDER BY fecha DESC LIMIT 1"
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
    const sql = "SELECT * FROM seleccion WHERE fecha <= ? ORDER BY fecha DESC LIMIT 1"
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
    const sql = "SELECT * FROM granobaribright WHERE fecha <= ? ORDER BY fecha DESC LIMIT 1"
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
    const sql = "SELECT * FROM concentradobaribaright WHERE fecha <= ? ORDER BY fecha DESC LIMIT 1"
    db.query(sql, [fecha], (err, data) => {
        if (err) {
            console.error("Error en la consulta SQL:", err);
            return res.status(500).json({ error: "Error en la consulta SQL. Por favor, inténtalo de nuevo más tarde." });
        }

        return res.json(data);
    });
})
app.get('/getnotas/:fecha', (req, res) => {
    const fecha = req.params.fecha;
    const sql = "SELECT * FROM notas WHERE fecha = ?"
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

        //Obtener el total concentrado de las mesas para la fecha especificada
        const totalmedios = await new Promise((resolve, reject) => {
            const query = "SELECT (SUM(medio3y4)) AS total_medios FROM prodseleccion WHERE fecha = ?;";
            db.query(query, [req.body.fecha], (err, data) => {
                if (err) reject(err);
                else resolve(data[0].total_medios); // Obtenemos el total concentrado de la primera fila
            });
        });
        const totaldesensolve = await new Promise((resolve, reject) => {
            const query = "SELECT (SUM(desensolve)) AS total_desensolve FROM prodseleccion WHERE fecha = ?;";
            db.query(query, [req.body.fecha], (err, data) => {
                if (err) reject(err);
                else resolve(data[0].total_desensolve); // Obtenemos el total concentrado de la primera fila
            });
        });
        const totalcolas = await new Promise((resolve, reject) => {
            const query = "SELECT (SUM(colas)) AS total_colas FROM prodseleccion WHERE fecha = ?;";
            db.query(query, [req.body.fecha], (err, data) => {
                if (err) reject(err);
                else resolve(data[0].total_colas); // Obtenemos el total concentrado de la primera fila
            });
        });
        const totaljigssec = await new Promise((resolve, reject) => {
            const query = "SELECT (SUM(alimjsec)) AS total_jigssec FROM jigschinos WHERE fecha = ?;";
            db.query(query, [req.body.fecha], (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    if (data.length === 0 || data[0].total_jigssec === null) {
                        resolve(0); // Devolver cero si no hay datos que sumar
                    } else {
                        resolve(data[0].total_jigssec); // Obtenemos el total concentrado de la primera fila
                    }
                }
            });
        });


        // Realizar la inserción en la tabla concmesas
        const sql = "INSERT INTO notas (fecha, totmedios, totdesensolve, totcolas,comentario, totjigssec) VALUES (?, ?,?,?,?,?)";
        const values = [
            req.body.fecha,
            totalmedios,
            totaldesensolve,
            totalcolas,
            req.body.comentario,
            totaljigssec,

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



    const sql = "UPDATE notas SET fecha = ?, totmedios =?, totdesensolve = ?, totcolas = ?, totjigssec = ?, comentario = ? WHERE id = ?";
    const values = [
        req.body.fecha,
        req.body.totmedios,
        req.body.totdesensolve,
        req.body.totcolas,
        req.body.totjigssec,
        req.body.comentario,


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

////////////HOROMETROS///////////////////77
app.get('/hjigs', (req, res) => {
    const sql = "SELECT * FROM horojigss ORDER BY id DESC";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});
app.post('/createhjigs', async (req, res) => {
    try {

        // Obtener el saldo anterior
        const finalAnteriorData = await new Promise((resolve, reject) => {
            db.query("SELECT final FROM horojigss ORDER BY id DESC LIMIT 1", (err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });
        const finalAnteriorj2Data = await new Promise((resolve, reject) => {
            db.query("SELECT finalj2 FROM horojigss ORDER BY id DESC LIMIT 1", (err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });

        // Si hay registros en la tabla, obtén el saldo anterior, de lo contrario, establece el saldo anterior en 0
        const finalAnterior = finalAnteriorData.length > 0 ? finalAnteriorData[0].final : 0;
        const finalAnteriorj2 = finalAnteriorj2Data.length > 0 ? finalAnteriorj2Data[0].finalj2 : 0;
        // Calcula el nuevo saldo sumando el saldo anterior a las entradas y restando las salidas
        const horas = parseFloat(req.body.final) - finalAnterior;
        const horasj2 = parseFloat(req.body.finalj2) - finalAnteriorj2;
        // Suponiendo que "horas" contiene el número total de horas

        // Suponiendo que "horas" contiene el número total de horas

        // Suponiendo que "horas" contiene el número total de horas

        // Separar las centenas
        const centenas = Math.floor(horas / 100) * 100; // Obtener las centenas

        // Obtener las decenas y unidades juntas
        const decenasYUnidades = horas % 100; // Obtener las decenas y unidades juntas

        // Multiplicar las decenas y unidades juntas por 0.6
        const resultado = (decenasYUnidades > 0) ? decenasYUnidades * 0.6 : 0; // Multiplicar solo si las decenas y unidades juntas son mayores que cero

        // Calcular el resultado total
        const totalhoras = centenas + resultado;

        // Formar el total en un string con ':' entre las centenas y las decenas
        const totalhrs = `${Math.floor(totalhoras / 100)}:${Math.floor(resultado) < 10 ? '0' + Math.floor(resultado) : Math.floor(resultado)}`;

        console.log(totalhrs); // Esto imprimirá el resultado final con la separación


        const centenasj2 = Math.floor(horasj2 / 100) * 100; // Obtener las centenas

        // Obtener las decenas y unidades juntas
        const decenasYUnidadesj2 = horasj2 % 100; // Obtener las decenas y unidades juntas

        // Multiplicar las decenas y unidades juntas por 0.6
        const resultadoj2 = (decenasYUnidadesj2 > 0) ? decenasYUnidadesj2 * 0.6 : 0; // Multiplicar solo si las decenas y unidades juntas son mayores que cero

        // Calcular el resultado total
        const totalhorasj2 = centenasj2 + resultadoj2;

        // Formar el total en un string con ':' entre las centenas y las decenas
        const totalhrsj2 = `${Math.floor(totalhorasj2 / 100)}:${Math.floor(resultadoj2) < 10 ? '0' + Math.floor(resultadoj2) : Math.floor(resultadoj2)}`;

        console.log(totalhrsj2); // Esto imprimirá el resultado final con la separación





        // Realizar la inserción en la tabla concmesas
        const sql = "INSERT INTO horojigss (fecha, turno, inicio, final, hrs,totalhrs,inicioj2, finalj2, hrsj2,totalhrsj2) VALUES (?, ?,?, ?, ?, ?,?,?,?,?)";
        const values = [
            req.body.fecha,
            req.body.turno,
            finalAnterior,
            req.body.final,
            horas,
            totalhrs,
            finalAnteriorj2,
            req.body.finalj2,
            horasj2,
            totalhrsj2,
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

app.put('/updatehjigs/:id', async (req, res) => {
    try {

        const horas = parseFloat(req.body.final) - parseFloat(req.body.inicio)
        const horasj2 = parseFloat(req.body.finalj2) - parseFloat(req.body.inicioj2)
        // Separar las centenas
        const centenas = Math.floor(horas / 100) * 100; // Obtener las centenas

        // Obtener las decenas y unidades juntas
        const decenasYUnidades = horas % 100; // Obtener las decenas y unidades juntas

        // Multiplicar las decenas y unidades juntas por 0.6
        const resultado = (decenasYUnidades > 0) ? decenasYUnidades * 0.6 : 0; // Multiplicar solo si las decenas y unidades juntas son mayores que cero

        // Calcular el resultado total
        const totalhoras = centenas + resultado;

        // Formar el total en un string con ':' entre las centenas y las decenas
        const totalhrs = `${Math.floor(totalhoras / 100)}:${Math.floor(resultado) < 10 ? '0' + Math.floor(resultado) : Math.floor(resultado)}`;

        console.log(totalhrs); // Esto imprimirá el resultado final con la separación


        const centenasj2 = Math.floor(horasj2 / 100) * 100; // Obtener las centenas

        // Obtener las decenas y unidades juntas
        const decenasYUnidadesj2 = horasj2 % 100; // Obtener las decenas y unidades juntas

        // Multiplicar las decenas y unidades juntas por 0.6
        const resultadoj2 = (decenasYUnidadesj2 > 0) ? decenasYUnidadesj2 * 0.6 : 0; // Multiplicar solo si las decenas y unidades juntas son mayores que cero

        // Calcular el resultado total
        const totalhorasj2 = centenasj2 + resultadoj2;

        // Formar el total en un string con ':' entre las centenas y las decenas
        const totalhrsj2 = `${Math.floor(totalhorasj2 / 100)}:${Math.floor(resultadoj2) < 10 ? '0' + Math.floor(resultadoj2) : Math.floor(resultadoj2)}`;

        console.log(totalhrsj2); // Esto imprimirá el resultado final con la separación


        const sql = "UPDATE horojigss SET fecha = ?, turno =?, inicio = ?, final = ?, hrs = ?, totalhrs = ?, inicioj2 =?, finalj2=?, hrsj2=?, totalhrsj2=?  WHERE id = ?";
        const values = [
            req.body.fecha,
            req.body.turno,
            req.body.inicio,
            req.body.final,
            horas,
            totalhrs,
            req.body.inicioj2,
            req.body.finalj2,
            horasj2,
            totalhrsj2,

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

app.get('/getrecordhjigs/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM horojigss WHERE id = ?"
    db.query(sql, [id], (err, data) => {
        if (err) {
            return res.json({ Error: "Error" })
        }

        return res.json(data)
    })
})
app.delete('/deletehjigs/:id', (req, res) => {
    const sql = "DELETE FROM horojigss WHERE id = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

////////////HOROMETRO MESA 1 Y 2//////////7
app.get('/hmesa12', (req, res) => {
    const sql = "SELECT * FROM hmesa12 ORDER BY id DESC";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});
app.delete('/deletehmesa12/:id', (req, res) => {
    const sql = "DELETE FROM hmesa12 WHERE id = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});
app.post('/createhmesa12', async (req, res) => {
    try {

        // Obtener el saldo anterior
        const finalAnteriorData = await new Promise((resolve, reject) => {
            db.query("SELECT final FROM hmesa12 ORDER BY id DESC LIMIT 1", (err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });

        // Si hay registros en la tabla, obtén el saldo anterior, de lo contrario, establece el saldo anterior en 0
        const finalAnterior = finalAnteriorData.length > 0 ? finalAnteriorData[0].final : 0;

        // Calcula el nuevo saldo sumando el saldo anterior a las entradas y restando las salidas
        const horas = parseFloat(req.body.final) - finalAnterior;


        // Separar las centenas
        const centenas = Math.floor(horas / 100) * 100; // Obtener las centenas

        // Obtener las decenas y unidades juntas
        const decenasYUnidades = horas % 100; // Obtener las decenas y unidades juntas

        // Multiplicar las decenas y unidades juntas por 0.6
        const resultado = (decenasYUnidades > 0) ? decenasYUnidades * 0.6 : 0; // Multiplicar solo si las decenas y unidades juntas son mayores que cero

        // Calcular el resultado total
        const totalhoras = centenas + resultado;

        // Formar el total en un string con ':' entre las centenas y las decenas
        const totalhrs = `${Math.floor(totalhoras / 100)}:${Math.floor(resultado) < 10 ? '0' + Math.floor(resultado) : Math.floor(resultado)}`;

        console.log(totalhrs); // Esto imprimirá el resultado final con la separación



        // Realizar la inserción en la tabla concmesas
        const sql = "INSERT INTO hmesa12 (fecha, turno, inicio, final, hrs,totalhrs) VALUES (?, ?,?, ?, ?, ?)";
        const values = [
            req.body.fecha,
            req.body.turno,
            finalAnterior,
            req.body.final,
            horas,
            totalhrs,

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
app.put('/updatehmesa12/:id', async (req, res) => {
    try {

        const horas = parseFloat(req.body.final) - parseFloat(req.body.inicio)

        // Separar las centenas
        const centenas = Math.floor(horas / 100) * 100; // Obtener las centenas

        // Obtener las decenas y unidades juntas
        const decenasYUnidades = horas % 100; // Obtener las decenas y unidades juntas

        // Multiplicar las decenas y unidades juntas por 0.6
        const resultado = (decenasYUnidades > 0) ? decenasYUnidades * 0.6 : 0; // Multiplicar solo si las decenas y unidades juntas son mayores que cero

        // Calcular el resultado total
        const totalhoras = centenas + resultado;

        // Formar el total en un string con ':' entre las centenas y las decenas
        const totalhrs = `${Math.floor(totalhoras / 100)}:${Math.floor(resultado) < 10 ? '0' + Math.floor(resultado) : Math.floor(resultado)}`;

        console.log(totalhrs); // Esto imprimirá el resultado final con la separación


        const sql = "UPDATE hmesa12 SET fecha = ?, turno =?, inicio = ?, final = ?, hrs = ?, totalhrs = ? WHERE id = ?";
        const values = [
            req.body.fecha,
            req.body.turno,
            req.body.inicio,
            req.body.final,
            horas,
            totalhrs,

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
app.get('/getrecordhmesa12/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM hmesa12 WHERE id = ?"
    db.query(sql, [id], (err, data) => {
        if (err) {
            return res.json({ Error: "Error" })
        }

        return res.json(data)
    })
})


//////////HOROMETRO MESA 34/////////////7
app.get('/hmesa34', (req, res) => {
    const sql = "SELECT * FROM hmesa34 ORDER BY id DESC";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});
app.delete('/deletehmesa34/:id', (req, res) => {
    const sql = "DELETE FROM hmesa34 WHERE id = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});
app.post('/createhmesa34', async (req, res) => {
    try {

        // Obtener el saldo anterior
        const finalAnteriorData = await new Promise((resolve, reject) => {
            db.query("SELECT final FROM hmesa34 ORDER BY id DESC LIMIT 1", (err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });

        // Si hay registros en la tabla, obtén el saldo anterior, de lo contrario, establece el saldo anterior en 0
        const finalAnterior = finalAnteriorData.length > 0 ? finalAnteriorData[0].final : 0;

        // Calcula el nuevo saldo sumando el saldo anterior a las entradas y restando las salidas
        const horas = parseFloat(req.body.final) - finalAnterior;


        // Separar las centenas
        const centenas = Math.floor(horas / 100) * 100; // Obtener las centenas

        // Obtener las decenas y unidades juntas
        const decenasYUnidades = horas % 100; // Obtener las decenas y unidades juntas

        // Multiplicar las decenas y unidades juntas por 0.6
        const resultado = (decenasYUnidades > 0) ? decenasYUnidades * 0.6 : 0; // Multiplicar solo si las decenas y unidades juntas son mayores que cero

        // Calcular el resultado total
        const totalhoras = centenas + resultado;

        // Formar el total en un string con ':' entre las centenas y las decenas
        const totalhrs = `${Math.floor(totalhoras / 100)}:${Math.floor(resultado) < 10 ? '0' + Math.floor(resultado) : Math.floor(resultado)}`;

        console.log(totalhrs); // Esto imprimirá el resultado final con la separación



        // Realizar la inserción en la tabla concmesas
        const sql = "INSERT INTO hmesa34 (fecha, turno, inicio, final, hrs,totalhrs) VALUES (?, ?,?, ?, ?, ?)";
        const values = [
            req.body.fecha,
            req.body.turno,
            finalAnterior,
            req.body.final,
            horas,
            totalhrs,

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
app.put('/updatehmesa34/:id', async (req, res) => {
    try {

        const horas = parseFloat(req.body.final) - parseFloat(req.body.inicio)

        // Separar las centenas
        const centenas = Math.floor(horas / 100) * 100; // Obtener las centenas

        // Obtener las decenas y unidades juntas
        const decenasYUnidades = horas % 100; // Obtener las decenas y unidades juntas

        // Multiplicar las decenas y unidades juntas por 0.6
        const resultado = (decenasYUnidades > 0) ? decenasYUnidades * 0.6 : 0; // Multiplicar solo si las decenas y unidades juntas son mayores que cero

        // Calcular el resultado total
        const totalhoras = centenas + resultado;

        // Formar el total en un string con ':' entre las centenas y las decenas
        const totalhrs = `${Math.floor(totalhoras / 100)}:${Math.floor(resultado) < 10 ? '0' + Math.floor(resultado) : Math.floor(resultado)}`;

        console.log(totalhrs); // Esto imprimirá el resultado final con la separación


        const sql = "UPDATE hmesa34 SET fecha = ?, turno =?, inicio = ?, final = ?, hrs = ?, totalhrs = ? WHERE id = ?";
        const values = [
            req.body.fecha,
            req.body.turno,
            req.body.inicio,
            req.body.final,
            horas,
            totalhrs,

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
app.get('/getrecordhmesa34/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM hmesa34 WHERE id = ?"
    db.query(sql, [id], (err, data) => {
        if (err) {
            return res.json({ Error: "Error" })
        }

        return res.json(data)
    })
})
////////////HOROMETRO MESA 5/////////////
app.get('/hmesa5', (req, res) => {
    const sql = "SELECT * FROM hmesa5 ORDER BY id DESC";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});
app.delete('/deletehmesa5/:id', (req, res) => {
    const sql = "DELETE FROM hmesa5 WHERE id = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});
app.post('/createhmesa5', async (req, res) => {
    try {

        // Obtener el saldo anterior
        const finalAnteriorData = await new Promise((resolve, reject) => {
            db.query("SELECT final FROM hmesa5 ORDER BY id DESC LIMIT 1", (err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });

        // Si hay registros en la tabla, obtén el saldo anterior, de lo contrario, establece el saldo anterior en 0
        const finalAnterior = finalAnteriorData.length > 0 ? finalAnteriorData[0].final : 0;

        // Calcula el nuevo saldo sumando el saldo anterior a las entradas y restando las salidas
        const horas = parseFloat(req.body.final) - finalAnterior;


        // Separar las centenas
        const centenas = Math.floor(horas / 100) * 100; // Obtener las centenas

        // Obtener las decenas y unidades juntas
        const decenasYUnidades = horas % 100; // Obtener las decenas y unidades juntas

        // Multiplicar las decenas y unidades juntas por 0.6
        const resultado = (decenasYUnidades > 0) ? decenasYUnidades * 0.6 : 0; // Multiplicar solo si las decenas y unidades juntas son mayores que cero

        // Calcular el resultado total
        const totalhoras = centenas + resultado;

        // Formar el total en un string con ':' entre las centenas y las decenas
        const totalhrs = `${Math.floor(totalhoras / 100)}:${Math.floor(resultado) < 10 ? '0' + Math.floor(resultado) : Math.floor(resultado)}`;

        console.log(totalhrs); // Esto imprimirá el resultado final con la separación



        // Realizar la inserción en la tabla concmesas
        const sql = "INSERT INTO hmesa5 (fecha, turno, inicio, final, hrs,totalhrs) VALUES (?, ?,?, ?, ?, ?)";
        const values = [
            req.body.fecha,
            req.body.turno,
            finalAnterior,
            req.body.final,
            horas,
            totalhrs,

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
app.put('/updatehmesa5/:id', async (req, res) => {
    try {

        const horas = parseFloat(req.body.final) - parseFloat(req.body.inicio)

        // Separar las centenas
        const centenas = Math.floor(horas / 100) * 100; // Obtener las centenas

        // Obtener las decenas y unidades juntas
        const decenasYUnidades = horas % 100; // Obtener las decenas y unidades juntas

        // Multiplicar las decenas y unidades juntas por 0.6
        const resultado = (decenasYUnidades > 0) ? decenasYUnidades * 0.6 : 0; // Multiplicar solo si las decenas y unidades juntas son mayores que cero

        // Calcular el resultado total
        const totalhoras = centenas + resultado;

        // Formar el total en un string con ':' entre las centenas y las decenas
        const totalhrs = `${Math.floor(totalhoras / 100)}:${Math.floor(resultado) < 10 ? '0' + Math.floor(resultado) : Math.floor(resultado)}`;

        console.log(totalhrs); // Esto imprimirá el resultado final con la separación


        const sql = "UPDATE hmesa5 SET fecha = ?, turno =?, inicio = ?, final = ?, hrs = ?, totalhrs = ? WHERE id = ?";
        const values = [
            req.body.fecha,
            req.body.turno,
            req.body.inicio,
            req.body.final,
            horas,
            totalhrs,

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
app.get('/getrecordhmesa5/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM hmesa5 WHERE id = ?"
    db.query(sql, [id], (err, data) => {
        if (err) {
            return res.json({ Error: "Error" })
        }

        return res.json(data)
    })
})

////////HOROMETRO MESA 6//////////////
app.get('/hmesa6', (req, res) => {
    const sql = "SELECT * FROM hmesa6 ORDER BY id DESC";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});
app.delete('/deletehmesa6/:id', (req, res) => {
    const sql = "DELETE FROM hmesa6 WHERE id = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});
app.post('/createhmesa6', async (req, res) => {
    try {

        // Obtener el saldo anterior
        const finalAnteriorData = await new Promise((resolve, reject) => {
            db.query("SELECT final FROM hmesa6 ORDER BY id DESC LIMIT 1", (err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });

        // Si hay registros en la tabla, obtén el saldo anterior, de lo contrario, establece el saldo anterior en 0
        const finalAnterior = finalAnteriorData.length > 0 ? finalAnteriorData[0].final : 0;

        // Calcula el nuevo saldo sumando el saldo anterior a las entradas y restando las salidas
        const horas = parseFloat(req.body.final) - finalAnterior;


        // Separar las centenas
        const centenas = Math.floor(horas / 100) * 100; // Obtener las centenas

        // Obtener las decenas y unidades juntas
        const decenasYUnidades = horas % 100; // Obtener las decenas y unidades juntas

        // Multiplicar las decenas y unidades juntas por 0.6
        const resultado = (decenasYUnidades > 0) ? decenasYUnidades * 0.6 : 0; // Multiplicar solo si las decenas y unidades juntas son mayores que cero

        // Calcular el resultado total
        const totalhoras = centenas + resultado;

        // Formar el total en un string con ':' entre las centenas y las decenas
        const totalhrs = `${Math.floor(totalhoras / 100)}:${Math.floor(resultado) < 10 ? '0' + Math.floor(resultado) : Math.floor(resultado)}`;

        console.log(totalhrs); // Esto imprimirá el resultado final con la separación



        // Realizar la inserción en la tabla concmesas
        const sql = "INSERT INTO hmesa6 (fecha, turno, inicio, final, hrs,totalhrs) VALUES (?, ?,?, ?, ?, ?)";
        const values = [
            req.body.fecha,
            req.body.turno,
            finalAnterior,
            req.body.final,
            horas,
            totalhrs,

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
app.put('/updatehmesa6/:id', async (req, res) => {
    try {

        const horas = parseFloat(req.body.final) - parseFloat(req.body.inicio)

        // Separar las centenas
        const centenas = Math.floor(horas / 100) * 100; // Obtener las centenas

        // Obtener las decenas y unidades juntas
        const decenasYUnidades = horas % 100; // Obtener las decenas y unidades juntas

        // Multiplicar las decenas y unidades juntas por 0.6
        const resultado = (decenasYUnidades > 0) ? decenasYUnidades * 0.6 : 0; // Multiplicar solo si las decenas y unidades juntas son mayores que cero

        // Calcular el resultado total
        const totalhoras = centenas + resultado;

        // Formar el total en un string con ':' entre las centenas y las decenas
        const totalhrs = `${Math.floor(totalhoras / 100)}:${Math.floor(resultado) < 10 ? '0' + Math.floor(resultado) : Math.floor(resultado)}`;

        console.log(totalhrs); // Esto imprimirá el resultado final con la separación


        const sql = "UPDATE hmesa6 SET fecha = ?, turno =?, inicio = ?, final = ?, hrs = ?, totalhrs = ? WHERE id = ?";
        const values = [
            req.body.fecha,
            req.body.turno,
            req.body.inicio,
            req.body.final,
            horas,
            totalhrs,

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
app.get('/getrecordhmesa6/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM hmesa6 WHERE id = ?"
    db.query(sql, [id], (err, data) => {
        if (err) {
            return res.json({ Error: "Error" })
        }

        return res.json(data)
    })
})
////////////HOROMETROS MOLINOS///////////////
app.get('/hmolinos', (req, res) => {
    const sql = "SELECT * FROM hmolinos ORDER BY id DESC";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});
app.delete('/deletehmolinos/:id', (req, res) => {
    const sql = "DELETE FROM hmolinos WHERE id = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});
app.post('/createhmolinos', async (req, res) => {
    try {

        // Obtener el saldo anterior
        const finalAnteriorData = await new Promise((resolve, reject) => {
            db.query("SELECT final FROM hmolinos ORDER BY id DESC LIMIT 1", (err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });
        const finalAnteriorm2Data = await new Promise((resolve, reject) => {
            db.query("SELECT finalm2 FROM hmolinos ORDER BY id DESC LIMIT 1", (err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });

        // Si hay registros en la tabla, obtén el saldo anterior, de lo contrario, establece el saldo anterior en 0
        const finalAnterior = finalAnteriorData.length > 0 ? finalAnteriorData[0].final : 0;
        const finalAnteriorm2 = finalAnteriorm2Data.length > 0 ? finalAnteriorm2Data[0].finalm2 : 0;
        // Calcula el nuevo saldo sumando el saldo anterior a las entradas y restando las salidas
        const horas = parseFloat(req.body.final) - finalAnterior;
        const horasm2 = parseFloat(req.body.finalm2) - finalAnteriorm2;
        // Suponiendo que "horas" contiene el número total de horas

        // Suponiendo que "horas" contiene el número total de horas

        // Suponiendo que "horas" contiene el número total de horas

        // Separar las centenas
        const centenas = Math.floor(horas / 100) * 100; // Obtener las centenas

        // Obtener las decenas y unidades juntas
        const decenasYUnidades = horas % 100; // Obtener las decenas y unidades juntas

        // Multiplicar las decenas y unidades juntas por 0.6
        const resultado = (decenasYUnidades > 0) ? decenasYUnidades * 0.6 : 0; // Multiplicar solo si las decenas y unidades juntas son mayores que cero

        // Calcular el resultado total
        const totalhoras = centenas + resultado;

        // Formar el total en un string con ':' entre las centenas y las decenas
        const totalhrs = `${Math.floor(totalhoras / 100)}:${Math.floor(resultado) < 10 ? '0' + Math.floor(resultado) : Math.floor(resultado)}`;

        console.log(totalhrs); // Esto imprimirá el resultado final con la separación


        const centenasm2 = Math.floor(horasm2 / 100) * 100; // Obtener las centenas

        // Obtener las decenas y unidades juntas
        const decenasYUnidadesm2 = horasm2 % 100; // Obtener las decenas y unidades juntas

        // Multiplicar las decenas y unidades juntas por 0.6
        const resultadom2 = (decenasYUnidadesm2 > 0) ? decenasYUnidadesm2 * 0.6 : 0; // Multiplicar solo si las decenas y unidades juntas son mayores que cero

        // Calcular el resultado total
        const totalhorasm2 = centenasm2 + resultadom2;

        // Formar el total en un string con ':' entre las centenas y las decenas
        const totalhrsm2 = `${Math.floor(totalhorasm2 / 100)}:${Math.floor(resultadom2) < 10 ? '0' + Math.floor(resultadom2) : Math.floor(resultadom2)}`;

        console.log(totalhrsm2); // Esto imprimirá el resultado final con la separación





        // Realizar la inserción en la tabla concmesas
        const sql = "INSERT INTO hmolinos (fecha, turno, inicio, final, hrs,totalhrs,iniciom2, finalm2, hrsm2,totalhrsm2) VALUES (?, ?,?, ?, ?, ?,?,?,?,?)";
        const values = [
            req.body.fecha,
            req.body.turno,
            finalAnterior,
            req.body.final,
            horas,
            totalhrs,
            finalAnteriorm2,
            req.body.finalm2,
            horasm2,
            totalhrsm2,
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
app.put('/updatehmolinos/:id', async (req, res) => {
    try {

        const horas = parseFloat(req.body.final) - parseFloat(req.body.inicio)
        const horasm2 = parseFloat(req.body.finalm2) - parseFloat(req.body.iniciom2)
        // Separar las centenas
        const centenas = Math.floor(horas / 100) * 100; // Obtener las centenas

        // Obtener las decenas y unidades juntas
        const decenasYUnidades = horas % 100; // Obtener las decenas y unidades juntas

        // Multiplicar las decenas y unidades juntas por 0.6
        const resultado = (decenasYUnidades > 0) ? decenasYUnidades * 0.6 : 0; // Multiplicar solo si las decenas y unidades juntas son mayores que cero

        // Calcular el resultado total
        const totalhoras = centenas + resultado;

        // Formar el total en un string con ':' entre las centenas y las decenas
        const totalhrs = `${Math.floor(totalhoras / 100)}:${Math.floor(resultado) < 10 ? '0' + Math.floor(resultado) : Math.floor(resultado)}`;

        console.log(totalhrs); // Esto imprimirá el resultado final con la separación


        const centenasm2 = Math.floor(horasm2 / 100) * 100; // Obtener las centenas

        // Obtener las decenas y unidades juntas
        const decenasYUnidadesm2 = horasm2 % 100; // Obtener las decenas y unidades juntas

        // Multiplicar las decenas y unidades juntas por 0.6
        const resultadom2 = (decenasYUnidadesm2 > 0) ? decenasYUnidadesm2 * 0.6 : 0; // Multiplicar solo si las decenas y unidades juntas son mayores que cero

        // Calcular el resultado total
        const totalhorasm2 = centenasm2 + resultadom2;

        // Formar el total en un string con ':' entre las centenas y las decenas
        const totalhrsm2 = `${Math.floor(totalhorasm2 / 100)}:${Math.floor(resultadom2) < 10 ? '0' + Math.floor(resultadom2) : Math.floor(resultadom2)}`;

        console.log(totalhrsm2); // Esto imprimirá el resultado final con la separación


        const sql = "UPDATE hmolinos SET fecha = ?, turno =?, inicio = ?, final = ?, hrs = ?, totalhrs = ?, iniciom2 =?, finalm2=?, hrsm2=?, totalhrsm2=?  WHERE id = ?";
        const values = [
            req.body.fecha,
            req.body.turno,
            req.body.inicio,
            req.body.final,
            horas,
            totalhrs,
            req.body.iniciom2,
            req.body.finalm2,
            horasm2,
            totalhrsm2,

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
app.get('/getrecordhmolinos/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM hmolinos WHERE id = ?"
    db.query(sql, [id], (err, data) => {
        if (err) {
            return res.json({ Error: "Error" })
        }

        return res.json(data)
    })
})

/////////////INICIO/77777777777
app.get('/getsilosinicio/:fecha', (req, res) => {
    const fecha = req.params.fecha;
    const sql = `
    SELECT silo1, silo2, silo3, silo4, silo5 
FROM silos 
WHERE fecha = ? 
UNION ALL
SELECT silo1, silo2, silo3, silo4, silo5 
FROM (SELECT * FROM silos ORDER BY fecha DESC LIMIT 1) AS latest_data;
;
`;
    db.query(sql, [fecha], (err, data) => {
        if (err) {
            console.error("Error en la consulta SQL:", err);
            return res.status(500).json({ error: "Error en la consulta SQL. Por favor, inténtalo de nuevo más tarde." });
        }

        return res.json(data);
    });
})
app.get('/getmpleinicio/:fecha', (req, res) => {
    const fecha = req.params.fecha;
    const sql = "SELECT saldo FROM mpmle WHERE fecha = ?"
    db.query(sql, [fecha], (err, data) => {
        if (err) {
            console.error("Error en la consulta SQL:", err);
            return res.status(500).json({ error: "Error en la consulta SQL. Por favor, inténtalo de nuevo más tarde." });
        }

        return res.json(data);
    });
})
app.get('/getmpltinicio/:fecha', (req, res) => {
    const fecha = req.params.fecha;
    const sql = "SELECT saldo FROM mpmlt WHERE fecha = ?"
    db.query(sql, [fecha], (err, data) => {
        if (err) {
            console.error("Error en la consulta SQL:", err);
            return res.status(500).json({ error: "Error en la consulta SQL. Por favor, inténtalo de nuevo más tarde." });
        }

        return res.json(data);
    });
})
app.get('/getsuma/:fecha', (req, res) => {
    const fecha = req.params.fecha;
    const sql = "SELECT saldo FROM mpmlt WHERE fecha = ?"
    db.query(sql, [fecha], (err, data) => {
        if (err) {
            console.error("Error en la consulta SQL:", err);
            return res.status(500).json({ error: "Error en la consulta SQL. Por favor, inténtalo de nuevo más tarde." });
        }

        return res.json(data);
    });
})

//////PROD.MOLINOS///////
app.get('/hrsmolinos', (req, res) => {
    const sql = "SELECT * FROM hrsmolinos ORDER BY id DESC";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});
app.delete('/deletehrsmolinos/:id', (req, res) => {
    const sql = "DELETE FROM hrsmolinos WHERE id = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});
app.post('/createhrsmolinos', (req, res) => {
    // Función para convertir el formato de "2:30" a "2.30"
    const convertirFormatoDecimal = (hora) => {
        // Reemplazar el ":" con "."
        return hora.replace(':', '.');
    };

    // Convertir hrsm1 y hrsm2 al formato decimal
    const hrsm1Decimal = convertirFormatoDecimal(req.body.hrsm1);
    const hrsm2Decimal = convertirFormatoDecimal(req.body.hrsm2);

    // Verificar si la conversión fue exitosa
    if (isNaN(hrsm1Decimal) || isNaN(hrsm2Decimal)) {
        console.error('Error al convertir la hora a formato decimal');
        return res.status(400).json({ error: 'Error en el formato de hora' });
    }

    // Calcular prodm1 y prodm2
    const prodm1 = hrsm1Decimal * 8.5;
    const prodm2 = hrsm2Decimal * 5.0;

    const sql = "INSERT INTO hrsmolinos (fecha, turno, hrsm1, prodm1, hrsm2, prodm2) VALUES (?, ?, ?, ?, ?, ?)";
    const values = [
        req.body.fecha,
        req.body.turno,
        req.body.hrsm1, // Mantener el formato original en la base de datos
        prodm1,
        req.body.hrsm2, // Mantener el formato original en la base de datos
        prodm2,
    ];

    db.query(sql, values, (err, data) => {
        if (err) {
            console.error('Error al insertar datos en la base de datos:', err);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
        return res.json(data);
    });
});
app.put('/updatehrsmolinos/:id', (req, res) => {
    // Función para convertir el formato de "2:30" a "2.30"
    const convertirFormatoDecimal = (hora) => {
        // Reemplazar el ":" con "."
        return hora.replace(':', '.');
    };

    // Convertir hrsm1 y hrsm2 al formato decimal
    const hrsm1Decimal = convertirFormatoDecimal(req.body.hrsm1);
    const hrsm2Decimal = convertirFormatoDecimal(req.body.hrsm2);

    // Verificar si la conversión fue exitosa
    if (isNaN(hrsm1Decimal) || isNaN(hrsm2Decimal)) {
        console.error('Error al convertir la hora a formato decimal');
        return res.status(400).json({ error: 'Error en el formato de hora' });
    }

    // Calcular prodm1 y prodm2
    const prodm1 = hrsm1Decimal * 8.5;
    const prodm2 = hrsm2Decimal * 5.0;

    const sql = "UPDATE hrsmolinos SET fecha=?, turno=?, hrsm1=?, prodm1=?, hrsm2=?, prodm2=? WHERE id=?";
    const values = [
        req.body.fecha,
        req.body.turno,
        req.body.hrsm1, // Mantener el formato original en la base de datos
        prodm1,
        req.body.hrsm2, // Mantener el formato original en la base de datos
        prodm2,
        req.params.id // Agregar id del registro a actualizar
    ];

    db.query(sql, values, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});
app.get('/getrecordhrsmolinos/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM hrsmolinos WHERE id = ?"
    db.query(sql, [id], (err, data) => {
        if (err) {
            return res.json({ Error: "Error" })
        }

        return res.json(data)
    })
})


///////////CRIVA VIBRATORIA////
app.get('/criva', (req, res) => {
    const sql = "SELECT * FROM criba ORDER BY id DESC";
    db.query(sql, (err, data) => {
        if (err) {
            console.error('Error al obtener datos de la base de datos:', err);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
        return res.json(data);
    });
});
app.delete('/deletecriva/:id', (req, res) => {
    const sql = "DELETE FROM criba WHERE id = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});
app.post('/createcrivas', (req, res) => {


    const sql = "INSERT INTO criba (fecha, turno, tolvageneral, cribav, mesaswi, bombafinsa,bombasmca,notas) VALUES (?, ?, ?, ?, ?, ?,?,?)";
    const values = [
        req.body.fecha,
        req.body.turno,
        req.body.tolvageneral,
        req.body.cribav,
        req.body.mesaswi,
        req.body.bombafinsa,
        req.body.bombasmca,
        req.body.notas,
    ];

    db.query(sql, values, (err, data) => {
        if (err) {
            console.error('Error al insertar datos en la base de datos:', err);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
        return res.json(data);
    });
});
app.put('/updatecrivas/:id', (req, res) => {
    const sql = "UPDATE criba SET fecha=?, turno=?, tolvageneral=?, cribav=?, mesaswi=?, bombafinsa=?, bombasmca=?, notas=? WHERE id=?";
    const values = [
        req.body.fecha,
        req.body.turno,
        req.body.tolvageneral,
        req.body.cribav,
        req.body.mesaswi,
        req.body.bombafinsa,
        req.body.bombasmca,
        req.body.notas,
        req.params.id // Agregar el id del registro a actualizar
    ];

    db.query(sql, values, (err, data) => {
        if (err) {
            console.error('Error al actualizar datos en la base de datos:', err);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
        return res.json(data);
    });
});

app.get('/getrecordcriva/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM criba WHERE id = ?"
    db.query(sql, [id], (err, data) => {
        if (err) {
            return res.json({ Error: "Error" })
        }

        return res.json(data)
    })
})

///////////////HORNO ROTATORIO////////////7
app.get('/horno', (req, res) => {
    const sql = "SELECT * FROM horno ORDER BY id DESC";
    db.query(sql, (err, data) => {
        if (err) {
            console.error('Error al obtener datos de la base de datos:', err);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
        return res.json(data);
    });
});
app.delete('/deletehorno/:id', (req, res) => {
    const sql = "DELETE FROM horno WHERE id = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});
app.post('/createhorno', (req, res) => {


    const sql = "INSERT INTO horno (fecha, turno, quebradora, hrotatorio, elvmolinos, colectoresp,ensacadora,ensacadora1,elvsilos,gusanof1,gusanof5,quebradorapr,notas) VALUES (?, ?, ?, ?, ?, ?,?,?,?,?,?,?,?)";
    const values = [
        req.body.fecha,
        req.body.turno,
        req.body.quebradora,
        req.body.hrotatorio,
        req.body.elvmolinos,
        req.body.colectoresp,
        req.body.ensacadora,
        req.body.ensacadora1,
        req.body.elvsilos,
        req.body.gusanof1,
        req.body.gusanof5,
        req.body.quebradorapr,
        req.body.notas,
    ];

    db.query(sql, values, (err, data) => {
        if (err) {
            console.error('Error al insertar datos en la base de datos:', err);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
        return res.json(data);
    });
});
app.put('/updatehorno/:id', (req, res) => {
    const sql = "UPDATE horno SET fecha=?, turno=?, quebradora=?, hrotatorio=?, elvmolinos=?, colectoresp=?,ensacadora=?,ensacadora1=?,elvsilos=?,gusanof1=?,gusanof5=?,quebradorapr=?,notas=? WHERE id=?";
    const values = [
        req.body.fecha,
        req.body.turno,
        req.body.quebradora,
        req.body.hrotatorio,
        req.body.elvmolinos,
        req.body.colectoresp,
        req.body.ensacadora,
        req.body.ensacadora1,
        req.body.elvsilos,
        req.body.gusanof1,
        req.body.gusanof5,
        req.body.quebradorapr,
        req.body.notas,
        req.params.id // Agregar el id del registro a actualizar
    ];

    db.query(sql, values, (err, data) => {
        if (err) {
            console.error('Error al actualizar datos en la base de datos:', err);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
        return res.json(data);
    });
});

app.get('/getrecordhorno/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM horno WHERE id = ?"
    db.query(sql, [id], (err, data) => {
        if (err) {
            return res.json({ Error: "Error" })
        }

        return res.json(data)
    })
})

////////HOROMETROS PDF////////////
app.get('/getcriba/:fecha', (req, res) => {
    const fecha = req.params.fecha;
    const sql = "SELECT * FROM criba WHERE fecha = ?"
    db.query(sql, [fecha], (err, data) => {
        if (err) {
            console.error("Error en la consulta SQL:", err);
            return res.status(500).json({ error: "Error en la consulta SQL. Por favor, inténtalo de nuevo más tarde." });
        }

        return res.json(data);
    });
})
app.get('/gethjigs/:fecha', (req, res) => {
    const fecha = req.params.fecha;
    const sql = "SELECT * FROM horojigss WHERE fecha = ?"
    db.query(sql, [fecha], (err, data) => {
        if (err) {
            console.error("Error en la consulta SQL:", err);
            return res.status(500).json({ error: "Error en la consulta SQL. Por favor, inténtalo de nuevo más tarde." });
        }

        return res.json(data);
    });
})
app.get('/gethmesa12/:fecha', (req, res) => {
    const fecha = req.params.fecha;
    const sql = "SELECT * FROM hmesa12 WHERE fecha = ?"
    db.query(sql, [fecha], (err, data) => {
        if (err) {
            console.error("Error en la consulta SQL:", err);
            return res.status(500).json({ error: "Error en la consulta SQL. Por favor, inténtalo de nuevo más tarde." });
        }

        return res.json(data);
    });
})
app.get('/gethmesa34/:fecha', (req, res) => {
    const fecha = req.params.fecha;
    const sql = "SELECT * FROM hmesa34 WHERE fecha = ?"
    db.query(sql, [fecha], (err, data) => {
        if (err) {
            console.error("Error en la consulta SQL:", err);
            return res.status(500).json({ error: "Error en la consulta SQL. Por favor, inténtalo de nuevo más tarde." });
        }

        return res.json(data);
    });
})
app.get('/gethmesa5/:fecha', (req, res) => {
    const fecha = req.params.fecha;
    const sql = "SELECT * FROM hmesa5 WHERE fecha = ?"
    db.query(sql, [fecha], (err, data) => {
        if (err) {
            console.error("Error en la consulta SQL:", err);
            return res.status(500).json({ error: "Error en la consulta SQL. Por favor, inténtalo de nuevo más tarde." });
        }

        return res.json(data);
    });
})
app.get('/gethmesa6/:fecha', (req, res) => {
    const fecha = req.params.fecha;
    const sql = "SELECT * FROM hmesa6 WHERE fecha = ?"
    db.query(sql, [fecha], (err, data) => {
        if (err) {
            console.error("Error en la consulta SQL:", err);
            return res.status(500).json({ error: "Error en la consulta SQL. Por favor, inténtalo de nuevo más tarde." });
        }

        return res.json(data);
    });
})
app.get('/gethorno/:fecha', (req, res) => {
    const fecha = req.params.fecha;
    const sql = "SELECT * FROM horno WHERE fecha = ?"
    db.query(sql, [fecha], (err, data) => {
        if (err) {
            console.error("Error en la consulta SQL:", err);
            return res.status(500).json({ error: "Error en la consulta SQL. Por favor, inténtalo de nuevo más tarde." });
        }

        return res.json(data);
    });
})
app.get('/gethrsmolinos/:fecha', (req, res) => {
    const fecha = req.params.fecha;
    const sql = "SELECT * FROM hrsmolinos WHERE fecha = ?"
    db.query(sql, [fecha], (err, data) => {
        if (err) {
            console.error("Error en la consulta SQL:", err);
            return res.status(500).json({ error: "Error en la consulta SQL. Por favor, inténtalo de nuevo más tarde." });
        }

        return res.json(data);
    });
})