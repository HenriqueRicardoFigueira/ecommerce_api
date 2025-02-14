/*
  Warnings:

  - The values [CART] on the enum `Order_status` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `client_id` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `item` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Order` ADD COLUMN `client_id` INTEGER NOT NULL,
    ADD COLUMN `item` VARCHAR(191) NOT NULL,
    MODIFY `status` ENUM('PENDING', 'PAID', 'SENT', 'CANCELLED') NOT NULL;
