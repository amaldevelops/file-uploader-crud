-- DropIndex
DROP INDEX "FileDetails_id_key";

-- DropIndex
DROP INDEX "Users_id_key";

-- AlterTable
CREATE SEQUENCE filedetails_id_seq;
ALTER TABLE "FileDetails" ALTER COLUMN "id" SET DEFAULT nextval('filedetails_id_seq');
ALTER SEQUENCE filedetails_id_seq OWNED BY "FileDetails"."id";

-- AlterTable
CREATE SEQUENCE users_id_seq;
ALTER TABLE "Users" ALTER COLUMN "id" SET DEFAULT nextval('users_id_seq');
ALTER SEQUENCE users_id_seq OWNED BY "Users"."id";
