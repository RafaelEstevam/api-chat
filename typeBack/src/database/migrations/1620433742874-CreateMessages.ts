import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateMessages1620433742874 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.createTable(
            new Table({
                name: 'messages',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'email',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'message',
                        type: 'varchar'
                    },
                    {
                        name: 'user_id',
                        type: 'uuid',
                        isNullable: true
                    },
                    {
                        name: 'hash_connection',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'to',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'from',
                        type: 'varchar'
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
                ],
                foreignKeys: [
                    {
                        name: 'FK_messages_user',
                        referencedTableName: 'users',
                        referencedColumnNames: ['id'],
                        columnNames: ['user_id'],
                        onDelete: 'SET NULL',
                        onUpdate: 'SET NULL'
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.dropTable('messages');
    }

}
