import { MigrationInterface, QueryRunner } from "typeorm";

export class Books1684557902996 implements MigrationInterface {
    name = 'Books1684557902996'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`book-pages\` DROP FOREIGN KEY \`FK_6b67846226901b0c52ac9410cf5\``);
        await queryRunner.query(`ALTER TABLE \`book-pages\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`book-pages\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`book-pages\` ADD \`id\` int NOT NULL PRIMARY KEY AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`book-pages\` DROP COLUMN \`bookId\``);
        await queryRunner.query(`ALTER TABLE \`book-pages\` ADD \`bookId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`id\` int NOT NULL PRIMARY KEY AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`book\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`book\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`book\` ADD \`id\` int NOT NULL PRIMARY KEY AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`book-pages\` ADD CONSTRAINT \`FK_6b67846226901b0c52ac9410cf5\` FOREIGN KEY (\`bookId\`) REFERENCES \`book\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`book-pages\` DROP FOREIGN KEY \`FK_6b67846226901b0c52ac9410cf5\``);
        await queryRunner.query(`ALTER TABLE \`book\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`book\` ADD \`id\` varchar(36) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`book\` ADD PRIMARY KEY (\`id\`)`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`id\` varchar(36) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD PRIMARY KEY (\`id\`)`);
        await queryRunner.query(`ALTER TABLE \`book-pages\` DROP COLUMN \`bookId\``);
        await queryRunner.query(`ALTER TABLE \`book-pages\` ADD \`bookId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`book-pages\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`book-pages\` ADD \`id\` varchar(36) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`book-pages\` ADD PRIMARY KEY (\`id\`)`);
        await queryRunner.query(`ALTER TABLE \`book-pages\` ADD CONSTRAINT \`FK_6b67846226901b0c52ac9410cf5\` FOREIGN KEY (\`bookId\`) REFERENCES \`book\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
