import { MigrationInterface, QueryRunner } from "typeorm";

export class StatusDefault1684558618764 implements MigrationInterface {
    name = 'StatusDefault1684558618764'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`book\` CHANGE \`status\` \`status\` tinyint NOT NULL DEFAULT 1`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`book\` CHANGE \`status\` \`status\` tinyint NOT NULL`);
    }

}
