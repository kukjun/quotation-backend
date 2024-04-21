-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "profilePath" TEXT,
    "favoriteQuotation" TEXT,
    "favoriteAuthor" TEXT,
    "commentAlarm" BOOLEAN NOT NULL,
    "quotationAlarm" BOOLEAN NOT NULL,
    "createdTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastModifiedTime" TIMESTAMP(3) NOT NULL,
    "identityVerificationQuestion" TEXT NOT NULL,
    "identityVerificationAnswer" TEXT NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Quotation" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "likeCount" BIGINT NOT NULL,
    "shareCount" BIGINT NOT NULL,
    "commentCount" BIGINT NOT NULL,
    "backgroundImagePath" TEXT,
    "createdTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastModifiedTime" TIMESTAMP(3) NOT NULL,
    "authorId" TEXT NOT NULL,

    CONSTRAINT "Quotation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Author" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "contryCode" TEXT,
    "createdTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastModifiedTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Author_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_nickname_key" ON "Account"("nickname");

-- CreateIndex
CREATE UNIQUE INDEX "Quotation_authorId_key" ON "Quotation"("authorId");

-- AddForeignKey
ALTER TABLE "Quotation" ADD CONSTRAINT "Quotation_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Author"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
