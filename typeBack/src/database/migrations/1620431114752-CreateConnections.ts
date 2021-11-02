import {MigrationInterface, QueryRunner, Table} from 'typeorm';

export class CreateConnections1620431114752 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.createTable(
            new Table(
                {
                    name: 'connections',
                    columns: [
                        {
                            name: 'id',
                            type: 'uuid',
                            isPrimary: true,
                        },
                        {
                            name: 'admin_id',
                            type: 'varchar',
                            isNullable: true
                        },
                        {
                            name: 'user_id',
                            type: 'varchar'
                        },
                        {
                            name: 'hash_connection',
                            type: 'varchar',
                            isNullable: true
                        },
                        {
                            name: 'created_at',
                            type: 'timestamp'
                        },
                        {
                            name: 'updated_at',
                            type: 'timestamp',
                            default: 'now()',
                        }
                    ],
                    foreignKeys: [
                        {
                            name: 'FK_connections_user',
                            referencedTableName: 'users',
                            referencedColumnNames: ['id'],
                            columnNames: ['user_id'],
                            onDelete: 'SET NULL',
                            onUpdate: 'SET NULL'
                        }
                    ]
                }
            )
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('connections');
    }

}
