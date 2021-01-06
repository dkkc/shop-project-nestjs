import {MigrationInterface, QueryRunner} from "typeorm";

export class NewVersionOfShopItemEntity1609878092791 implements MigrationInterface {
    name = 'NewVersionOfShopItemEntity1609878092791'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `shop_item` CHANGE `createdAt` `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP");
        await queryRunner.query("ALTER TABLE `shop_item` DROP COLUMN `name`");
        await queryRunner.query("ALTER TABLE `shop_item` ADD `name` varchar(25) NOT NULL");
        await queryRunner.query("ALTER TABLE `shop_item` CHANGE `description` `description` text NOT NULL DEFAULT '(brak)'");
        await queryRunner.query("ALTER TABLE `shop_item` CHANGE `createdAt` `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `shop_item` CHANGE `createdAt` `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP()");
        await queryRunner.query("ALTER TABLE `shop_item` CHANGE `description` `description` text NOT NULL");
        await queryRunner.query("ALTER TABLE `shop_item` DROP COLUMN `name`");
        await queryRunner.query("ALTER TABLE `shop_item` ADD `name` varchar(60) NOT NULL");
        await queryRunner.query("ALTER TABLE `shop_item` CHANGE `createdAt` `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP()");
    }

}
