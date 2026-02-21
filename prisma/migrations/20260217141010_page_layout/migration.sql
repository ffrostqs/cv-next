-- Add optional layout JSON to page translations
ALTER TABLE "PageTranslation" ADD COLUMN "layout" JSONB;
