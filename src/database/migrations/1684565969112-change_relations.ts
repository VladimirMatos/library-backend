import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeRelations1684565969112 implements MigrationInterface {
  name = 'ChangeRelations1684565969112';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`book_rent\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`userId\` int NULL, \`bookId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`book_rent\` ADD CONSTRAINT \`FK_fdb9139a68bd4d4c06d0ec50943\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`book_rent\` ADD CONSTRAINT \`FK_c24ac89be1cb4fa5fb1dd96937b\` FOREIGN KEY (\`bookId\`) REFERENCES \`book\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`book_rent\` DROP FOREIGN KEY \`FK_c24ac89be1cb4fa5fb1dd96937b\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`book_rent\` DROP FOREIGN KEY \`FK_fdb9139a68bd4d4c06d0ec50943\``,
    );
    await queryRunner.query(`DROP TABLE \`book_rent\``);
  }
}
