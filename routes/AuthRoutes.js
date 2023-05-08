import express from 'express';
import { register} from '../controllers/RegistrationController.js';
import { login } from '../controllers/LoginController.js';
const AuthRouter = express.Router();
AuthRouter.post('/register',register);
AuthRouter.post('/login', login);
export default AuthRouter;

