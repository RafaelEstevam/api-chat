import {getCustomRepository, Repository} from 'typeorm';
import {UserRepository} from '../repositories/User.repository';
import {User} from '../entities/User.entity';

interface UserInterface {
    name: string,
    email: string,
    password?: string,
    type?: string,
    username?: string
}

class UserService{
    
    private userRepository: Repository<User>;

    constructor(){
        this.userRepository = getCustomRepository(UserRepository);
    }

    async create({name, email, password, type, username}:UserInterface) {
        const user = await this.userRepository.findOne({
            email
        });

        if(user){
            return user;
        }

        const newUser = await this.userRepository.create({
            name,
            email,
            password,
            type,
            username
        });

        await this.userRepository.save(newUser);

        return newUser;
    }

    async findByEmail(email:string){

        const {id, username, name, type, created_at, updated_at} = await this.userRepository.findOne({email});
        
        const userFinded = {
            id,
            username,
            email,
            name,
            type, 
            created_at,
            updated_at
        }

        if(!userFinded){
            throw new Error ("User not founded");
        };
        
        return userFinded;
    }

    async findById(id:number){
        const userFinded = await this.userRepository.findOne(id);

        if(!userFinded){
            throw new Error ("User not found")
        };

        return userFinded;
    }

}

export {UserService}