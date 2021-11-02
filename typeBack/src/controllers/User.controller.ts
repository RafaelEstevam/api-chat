import {Request, Response} from 'express';
import {UserService} from '../services/User.service';

class UserController{

    async create(request: Request, response: Response): Promise<Response>{
        const {name, email, username, password, type} = request.body;
        const userService = new UserService();

        try{
            const user = await userService.create({name, email, username, password, type});
            return response.json(user);
        }catch(error){
            return response.status(400).json({message: error.message});
        }
    }

    async store(request: Request, response: Response): Promise<Response>{
        return response.json({message: 'consulta'});
    }

    async storeByEmail (request: Request, response: Response): Promise<Response>{
        const userService = new UserService();
        const {email} = request.params;
        try{
            const user = await userService.findByEmail(email);
            return response.json(user);
        }catch(error){
            return response.status(400).json({message: error.message})
        }
    }
}

export {UserController}