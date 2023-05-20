import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTitleBook1684565096577 implements MigrationInterface {
    name = 'AddTitleBook1684565096577'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`book\` ADD \`title\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`book\` DROP COLUMN \`title\``);
    }

}
