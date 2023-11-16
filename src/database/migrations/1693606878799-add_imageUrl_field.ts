import { MigrationInterface, QueryRunner } from "typeorm";

export class AddImageUrlField1693606878799 implements MigrationInterface {
    name = 'AddImageUrlField1693606878799'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`imageUrl\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`book\` ADD \`imageUrl\` text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`book\` DROP COLUMN \`imageUrl\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`imageUrl\``);
    }

}
