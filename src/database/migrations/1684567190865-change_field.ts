import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeField1684567190865 implements MigrationInterface {
    name = 'ChangeField1684567190865'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`book\` DROP COLUMN \`status\``);
        await queryRunner.query(`ALTER TABLE \`book_rent\` ADD \`status\` tinyint NOT NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`book_rent\` DROP COLUMN \`status\``);
        await queryRunner.query(`ALTER TABLE \`book\` ADD \`status\` tinyint NOT NULL DEFAULT '1'`);
    }

}
