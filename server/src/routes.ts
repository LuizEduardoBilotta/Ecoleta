import express from 'express';

import PointsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';
import multerConfig from './config/multer';
import multer from 'multer';
import { celebrate, Joi } from 'celebrate';

const routes = express.Router();
const upload = multer(multerConfig);

const pointsController = new PointsController();
const itemsController = new ItemsController();

routes.get('/items', itemsController.index);

routes.get('/points', pointsController.index);
routes.get('/points/:id', pointsController.show);

routes.post(
    '/points', 
    upload.single('image'),
    celebrate({
        body: Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().required().email(),
            whatsapp: Joi.number().required(),
            latitude: Joi.number().required(),
            longitude: Joi.number().required(),
            city: Joi.string().required(),
            uf: Joi.string().required().max(2),
            items: Joi.string().required(),
        })
    }, {
        abortEarly: false
    }), 
    pointsController.create
);

export default routes;

/*Padrão para utilização do nome de métodos das classes

INDEX => Para listagem 
SHOW => Para exibir apenas um registro
CREATE => Para criar novo registro
UPDATE => para atulizar registro
DELETE => para deletar registro
*/

