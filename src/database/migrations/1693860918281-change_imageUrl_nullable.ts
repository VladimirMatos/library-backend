import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeImageUrlNullable1693860918281 implements MigrationInterface {
    name = 'ChangeImageUrlNullable1693860918281'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`imageUrl\` \`imageUrl\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`book\` CHANGE \`imageUrl\` \`imageUrl\` text NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`book\` CHANGE \`imageUrl\` \`imageUrl\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`imageUrl\` \`imageUrl\` text NOT NULL`);
    }

}
