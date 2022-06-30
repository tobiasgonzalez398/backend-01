const httpStatus = require('../helpers/httpStatus')

const ERROR_HANDLERS = {
    Error: (res, err) => {
        res
        .status(httpStatus.BAD_REQUEST)
        .send({error: err.name, cause: err.message, message: 'ingresa los datos para registrarte' })
    },
    CastError: (res, err) => {
        res
        .status(httpStatus.BAD_REQUEST)
        .send({error: err.name, cause: err.message, message: 'La id que colocaste es erronea, porfavor ingresar una nueva' })
    },
    MongoServerError: (res, err) => {
        res
        .status(httpStatus.BAD_REQUEST)
        .send({error: err.name, cause: err.message, message: 'Ya existe informacion sobre esto,porfavor intenta con un nuevo dato' })
    },
    SyntaxError:  (res, err) => {
        res
        .status(httpStatus.BAD_REQUEST)
        .send({error: err.name, cause: err.message, message: 'Error de tipado, porfavor revisar los datos' })
    },
    ValidationError: (res, err) => {
        res
        .status(httpStatus.BAD_REQUEST)
        .send({error: err.name, cause: err.message, message: 'Los datos que ingresastes son inexistentes, superan el maximo de caracteres o faltantes, porfavor revisar tipeo' })
    },
    defaultError: (res, err) => {
        res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .send({error: err.name, cause: err.message})
    }
}

const errorHandler = (err, req, res, next) => {
    const handler = ERROR_HANDLERS[err.name] || ERROR_HANDLERS.defaultError
    handler(res, err)
}

module.exports = errorHandler