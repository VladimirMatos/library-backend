import { MigrationInterface, QueryRunner } from "typeorm";

export class BookRent1684563186435 implements MigrationInterface {
    name = 'BookRent1684563186435'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`book_rent\` ADD \`bookId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`book_rent\` ADD UNIQUE INDEX \`IDX_c24ac89be1cb4fa5fb1dd96937\` (\`bookId\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_c24ac89be1cb4fa5fb1dd96937\` ON \`book_rent\` (\`bookId\`)`);
        await queryRunner.query(`ALTER TABLE \`book_rent\` ADD CONSTRAINT \`FK_c24ac89be1cb4fa5fb1dd96937b\` FOREIGN KEY (\`bookId\`) REFERENCES \`book\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`book_rent\` DROP FOREIGN KEY \`FK_c24ac89be1cb4fa5fb1dd96937b\``);
        await queryRunner.query(`DROP INDEX \`REL_c24ac89be1cb4fa5fb1dd96937\` ON \`book_rent\``);
        await queryRunner.query(`ALTER TABLE \`book_rent\` DROP INDEX \`IDX_c24ac89be1cb4fa5fb1dd96937\``);
        await queryRunner.query(`ALTER TABLE \`book_rent\` DROP COLUMN \`bookId\``);
    }

}
