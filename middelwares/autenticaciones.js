const jwt = require('jsonwebtoken');


let autenticaToken = (req, res, next) => {

    // se trae los headers
    let token = req.get('token');

    jwt.verify(token, process.env.SEED, (err, decoded) => {

        if (err) {
            res.status(401).json({
                ok: false,
                err: {
                    msg: 'El token no es valido',
                    err
                }
            })
        };

        req.usuario = decoded.usuario;

        console.log(req.usuario);

        next();
    })

};


let autenticaRole = (req, res, next) => {

    let usuarioDB = req.usuario;

    if (usuarioDB.role === 'rol_admin') {
        next();
    } else {
        res.json({
            ok: false,
            err: {
                msg: 'El usuario no es admin'
            }

        })
    }



}

module.exports = {
    autenticaRole,
    autenticaToken
}