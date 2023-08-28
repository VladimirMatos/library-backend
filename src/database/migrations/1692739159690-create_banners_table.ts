import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateBannersTable1692739159690 implements MigrationInterface {
    name = 'CreateBannersTable1692739159690'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`banners\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`subtitle\` varchar(255) NOT NULL, \`imageUrl\` text NOT NULL, \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`banners\``);
    }

}
