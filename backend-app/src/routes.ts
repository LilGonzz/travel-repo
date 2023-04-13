import {Router} from 'express'
import { UserController } from './controllers/userController'
import { TravelController } from './controllers/travelController';
import { SessionController } from './controllers/SessionController';
import { AthenticationMidd } from './middlewares/Authentication';
const router = Router();

// ---- ROTAS DE USUÁRIO ---- 
router.post('/users', new UserController().createUser)
router.get('/users/:id', new UserController().getUserById)
router.put('/users/:id', new UserController().updateUserById)
router.delete('/users/:id', new UserController().deleteUserById)

// ---- ROTAS DE LOGIN ----
router.post('/session', new SessionController().handle)
router.get('/session', AthenticationMidd, new SessionController().getUserDetails)

// ---- ROTAS DE VIAGEM ----
router.get('/travel/:id', AthenticationMidd, new TravelController().getTravelById)
router.post('/travel', AthenticationMidd, new TravelController().createTravel)
router.delete('/travel/:id', AthenticationMidd, new TravelController().deleteTravelById)
router.get('/actives-travels', AthenticationMidd, new TravelController().getAllActivesTravelByUserId)
router.get('/travel', AthenticationMidd, new TravelController().getAllTravelByUserId)
router.put('/travel/:id', AthenticationMidd, new TravelController().updateTravelById)


export {router};