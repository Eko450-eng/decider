-- CreateTable
CREATE TABLE "Comment" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(20) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "role" INTEGER,
    "password" TEXT NOT NULL,
    "createdAt" DATE,
    "topics" TEXT[],

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pushdevices" (
    "id" SERIAL NOT NULL,
    "device" VARCHAR,
    "createdAt" DATE,
    "profileId" TEXT,

    CONSTRAINT "Pushdevices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "file" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(200) NOT NULL,
    "location" VARCHAR(200) DEFAULT 'Home',
    "date" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "comment" TEXT,
    "archived" BOOLEAN DEFAULT false,
    "image" TEXT,
    "owner" INTEGER,
    "folder_id" INTEGER,

    CONSTRAINT "file_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "folder" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(200) NOT NULL,
    "location" VARCHAR(200) DEFAULT 'Home',
    "comment" TEXT,
    "archived" BOOLEAN DEFAULT false,
    "owner" INTEGER,
    "household_id" INTEGER,

    CONSTRAINT "folder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "household" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(200) NOT NULL,
    "location" VARCHAR(200) DEFAULT 'Home',
    "owner" INTEGER,
    "profile_ids" INTEGER[],

    CONSTRAINT "household_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "person" (
    "id" SERIAL NOT NULL,
    "profile_id" TEXT NOT NULL,

    CONSTRAINT "person_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "file" ADD CONSTRAINT "file_folder_id_folder_id_fk" FOREIGN KEY ("folder_id") REFERENCES "folder"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "file" ADD CONSTRAINT "file_owner_person_id_fk" FOREIGN KEY ("owner") REFERENCES "person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "folder" ADD CONSTRAINT "folder_household_id_household_id_fk" FOREIGN KEY ("household_id") REFERENCES "household"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "folder" ADD CONSTRAINT "folder_owner_person_id_fk" FOREIGN KEY ("owner") REFERENCES "person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "household" ADD CONSTRAINT "household_owner_person_id_fk" FOREIGN KEY ("owner") REFERENCES "person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
