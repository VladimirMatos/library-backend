import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCreateAtColumn1684563507925 implements MigrationInterface {
    name = 'AddCreateAtColumn1684563507925'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_c24ac89be1cb4fa5fb1dd96937\` ON \`book_rent\``);
        await queryRunner.query(`ALTER TABLE \`book\` ADD \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`book_rent\` ADD \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`book_rent\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`book\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_c24ac89be1cb4fa5fb1dd96937\` ON \`book_rent\` (\`bookId\`)`);
    }

}
