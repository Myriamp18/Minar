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
    db.query(sql,[ req.body.nombreusuario, req.body.contra], (err, data)=>{
        if(err) return res.json("Error")
        if(data.length > 0) {
            return res.json("Loadin Successfuly")
        }else{
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
        const segundoSaldoAnterior = segundoSaldoAnterior.length > 0 ?segundoSaldoAnterior[0].saldo : 0;

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
    const sql = "SELECT * FROM reportediario";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});
app.post('/createreportediario', (req, res) => {
    const sql = "INSERT INTO reportediario (fecha,crivadasilvialavar, consmoler, trictolva, grano_moler,patiotolvageneral,patiotolva2,granomoler2,medios5y6,medioslavar,granojics1,tepetatejics1,conm5,consm6,consjics1,consjics2,granoproducido,consm3y4,consm1y2,polvocts) VALUES (?, ?, ?, ?, ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
    const values = [
        req.body.fecha,
        req.body.crivadasilvialavar,
        req.body.consmoler,
        req.body.trictolva,
        req.body.grano_moler,
        req.body.patiotolvageneral,
        req.body.patiotolva2,
        req.body.granomoler2,
        req.body.medios5y6,
        req.body.medioslavar,
        req.body.granojics1,
        req.body.tepetatejics1,
        req.body.conm5,
        req.body.consm6,
        req.body.consjics1,
        req.body.consjics2,
        req.body.granoproducido,
        req.body.consm3y4,
        req.body.consm1y2,
        req.body.polvocts,


    ];
    db.query(sql, values, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});