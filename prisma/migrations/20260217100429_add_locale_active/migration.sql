-- AlterTable
ALTER TABLE "Locale" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "MenuItem" ADD COLUMN     "isActiveGlobal" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "MenuItemTranslation" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;
