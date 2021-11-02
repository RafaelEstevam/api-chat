import {MigrationInterface, QueryRunner, Table} from 'typeorm';

export class CreateUser1620427524926 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.createTable(
            new Table({
                name: 'users',
                columns: [
                    {
                        name:'id',
                        type:'uuid',
                        isPrimary: true 
                    },
                    {
                        name: 'username',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'type',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'email',
                        type: 'varchar'
                    },
                    {
                        name: 'name',
                        type: 'varchar'
                    },
                    {
                        name: 'password',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()'
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()'
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users');
    }

}
