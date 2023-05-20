import { MigrationInterface, QueryRunner } from "typeorm";

export class BookRent1684563093454 implements MigrationInterface {
    name = 'BookRent1684563093454'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_66a4f0f47943a0d99c16ecf90b\` ON \`book\``);
        await queryRunner.query(`DROP INDEX \`IDX_efaa1a4d8550ba5f4378803edb\` ON \`book\``);
        await queryRunner.query(`CREATE TABLE \`book_rent\` (\`id\` int NOT NULL AUTO_INCREMENT, \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`book_rent\` ADD CONSTRAINT \`FK_fdb9139a68bd4d4c06d0ec50943\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`book_rent\` DROP FOREIGN KEY \`FK_fdb9139a68bd4d4c06d0ec50943\``);
        await queryRunner.query(`DROP TABLE \`book_rent\``);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_efaa1a4d8550ba5f4378803edb\` ON \`book\` (\`categoryId\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_66a4f0f47943a0d99c16ecf90b\` ON \`book\` (\`authorId\`)`);
    }

}
