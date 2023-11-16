import { MigrationInterface, QueryRunner } from "typeorm";

export class OndeleteBook21695093774993 implements MigrationInterface {
    name = 'OndeleteBook21695093774993'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`book-pages\` DROP FOREIGN KEY \`FK_6b67846226901b0c52ac9410cf5\``);
        await queryRunner.query(`ALTER TABLE \`book_rent\` DROP FOREIGN KEY \`FK_c24ac89be1cb4fa5fb1dd96937b\``);
        await queryRunner.query(`ALTER TABLE \`book_rent\` DROP FOREIGN KEY \`FK_fdb9139a68bd4d4c06d0ec50943\``);
        await queryRunner.query(`ALTER TABLE \`book-pages\` ADD CONSTRAINT \`FK_6b67846226901b0c52ac9410cf5\` FOREIGN KEY (\`bookId\`) REFERENCES \`book\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`book_rent\` ADD CONSTRAINT \`FK_fdb9139a68bd4d4c06d0ec50943\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`book_rent\` ADD CONSTRAINT \`FK_c24ac89be1cb4fa5fb1dd96937b\` FOREIGN KEY (\`bookId\`) REFERENCES \`book\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`book_rent\` DROP FOREIGN KEY \`FK_c24ac89be1cb4fa5fb1dd96937b\``);
        await queryRunner.query(`ALTER TABLE \`book_rent\` DROP FOREIGN KEY \`FK_fdb9139a68bd4d4c06d0ec50943\``);
        await queryRunner.query(`ALTER TABLE \`book-pages\` DROP FOREIGN KEY \`FK_6b67846226901b0c52ac9410cf5\``);
        await queryRunner.query(`ALTER TABLE \`book_rent\` ADD CONSTRAINT \`FK_fdb9139a68bd4d4c06d0ec50943\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`book_rent\` ADD CONSTRAINT \`FK_c24ac89be1cb4fa5fb1dd96937b\` FOREIGN KEY (\`bookId\`) REFERENCES \`book\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`book-pages\` ADD CONSTRAINT \`FK_6b67846226901b0c52ac9410cf5\` FOREIGN KEY (\`bookId\`) REFERENCES \`book\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
