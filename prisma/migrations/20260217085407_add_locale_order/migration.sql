/*
  Warnings:

  - The `achievements` column on the `ExperienceItemTranslation` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `stack` column on the `ExperienceItemTranslation` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `localeId` to the `Skill` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ExperienceItemTranslation" DROP COLUMN "achievements",
ADD COLUMN     "achievements" JSONB,
DROP COLUMN "stack",
ADD COLUMN     "stack" JSONB;

-- AlterTable
ALTER TABLE "Locale" ADD COLUMN     "flag" TEXT,
ADD COLUMN     "order" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "ProjectTranslation" ADD COLUMN     "impact" JSONB,
ADD COLUMN     "stack" JSONB,
ADD COLUMN     "tags" JSONB;

-- AlterTable
ALTER TABLE "SiteSectionTranslation" ADD COLUMN     "data" JSONB;

-- AlterTable
ALTER TABLE "Skill" ADD COLUMN     "localeId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Skill_skillCategoryId_localeId_idx" ON "Skill"("skillCategoryId", "localeId");

-- AddForeignKey
ALTER TABLE "Skill" ADD CONSTRAINT "Skill_localeId_fkey" FOREIGN KEY ("localeId") REFERENCES "Locale"("id") ON DELETE CASCADE ON UPDATE CASCADE;
