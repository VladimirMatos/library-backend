import { MigrationInterface, QueryRunner } from 'typeorm';

export class Books1684557684397 implements MigrationInterface {
  name = 'Books1684557684397';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`book\` (\`id\` varchar(36) NOT NULL, \`description\` text NOT NULL, \`totalPage\` int NOT NULL, \`status\` tinyint NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`book-pages\` (\`id\` varchar(36) NOT NULL, \`text\` text NOT NULL, \`page\` int NOT NULL, \`bookId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(`ALTER TABLE \`users\` DROP PRIMARY KEY`);
    await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`id\``);
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`id\` varchar(36) NOT NULL PRIMARY KEY`,
    );
    await queryRunner.query(
      `ALTER TABLE \`book-pages\` ADD CONSTRAINT \`FK_6b67846226901b0c52ac9410cf5\` FOREIGN KEY (\`bookId\`) REFERENCES \`book\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`book-pages\` DROP FOREIGN KEY \`FK_6b67846226901b0c52ac9410cf5\``,
    );
    await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`id\``);
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`id\` varchar(36) NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`users\` ADD PRIMARY KEY (\`id\`)`);
    await queryRunner.query(`DROP TABLE \`book-pages\``);
    await queryRunner.query(`DROP TABLE \`book\``);
  }
}
