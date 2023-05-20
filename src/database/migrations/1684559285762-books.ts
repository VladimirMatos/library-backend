import { MigrationInterface, QueryRunner } from "typeorm";

export class Books1684559285762 implements MigrationInterface {
    name = 'Books1684559285762'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`book\` ADD \`categoryId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`book\` ADD UNIQUE INDEX \`IDX_efaa1a4d8550ba5f4378803edb\` (\`categoryId\`)`);
        await queryRunner.query(`ALTER TABLE \`book\` ADD \`authorId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`book\` ADD UNIQUE INDEX \`IDX_66a4f0f47943a0d99c16ecf90b\` (\`authorId\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_efaa1a4d8550ba5f4378803edb\` ON \`book\` (\`categoryId\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_66a4f0f47943a0d99c16ecf90b\` ON \`book\` (\`authorId\`)`);
        await queryRunner.query(`ALTER TABLE \`book\` ADD CONSTRAINT \`FK_efaa1a4d8550ba5f4378803edb2\` FOREIGN KEY (\`categoryId\`) REFERENCES \`categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`book\` ADD CONSTRAINT \`FK_66a4f0f47943a0d99c16ecf90b2\` FOREIGN KEY (\`authorId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`book\` DROP FOREIGN KEY \`FK_66a4f0f47943a0d99c16ecf90b2\``);
        await queryRunner.query(`ALTER TABLE \`book\` DROP FOREIGN KEY \`FK_efaa1a4d8550ba5f4378803edb2\``);
        await queryRunner.query(`DROP INDEX \`REL_66a4f0f47943a0d99c16ecf90b\` ON \`book\``);
        await queryRunner.query(`DROP INDEX \`REL_efaa1a4d8550ba5f4378803edb\` ON \`book\``);
        await queryRunner.query(`ALTER TABLE \`book\` DROP INDEX \`IDX_66a4f0f47943a0d99c16ecf90b\``);
        await queryRunner.query(`ALTER TABLE \`book\` DROP COLUMN \`authorId\``);
        await queryRunner.query(`ALTER TABLE \`book\` DROP INDEX \`IDX_efaa1a4d8550ba5f4378803edb\``);
        await queryRunner.query(`ALTER TABLE \`book\` DROP COLUMN \`categoryId\``);
    }

}
