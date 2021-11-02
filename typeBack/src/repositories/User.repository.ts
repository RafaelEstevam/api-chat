import {Repository, EntityRepository} from 'typeorm';

import {User} from '../entities/User.entity';

@EntityRepository(User)//Relaciona a entidade à este repositório
class UserRepository extends Repository<User>{}

export {UserRepository};

