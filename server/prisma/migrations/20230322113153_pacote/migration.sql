-- CreateTable
CREATE TABLE "pacotefig" (
    "pacId" SERIAL NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'Pacotinho',
    "image" TEXT NOT NULL DEFAULT 'https://cdn.discordapp.com/attachments/440326168491720705/1086332398205153421/pacote.png',
    "price" INTEGER NOT NULL DEFAULT 50,
    "desc" TEXT NOT NULL DEFAULT 'Alguém soltou uma bomba no bairro e gatinhos mistériosos quais gatos devem ter se escondido aqui?',

    CONSTRAINT "pacotefig_pkey" PRIMARY KEY ("pacId")
);

-- CreateTable
CREATE TABLE "pac_product" (
    "pacprodId" SERIAL NOT NULL,
    "PacId" INTEGER DEFAULT 1,
    "invId" INTEGER,
    "gatId1" INTEGER NOT NULL DEFAULT floor(random() * 20 + 1),
    "gatId2" INTEGER NOT NULL DEFAULT floor(random() * 20 + 1),
    "gatId3" INTEGER NOT NULL DEFAULT floor(random() * 20 + 1),
    "gatId4" INTEGER NOT NULL DEFAULT floor(random() * 20 + 1),
    "gatId5" INTEGER NOT NULL DEFAULT floor(random() * 20 + 1),

    CONSTRAINT "pac_product_pkey" PRIMARY KEY ("pacprodId")
);

-- AddForeignKey
ALTER TABLE "pac_product" ADD CONSTRAINT "pac_product_PacId_fkey" FOREIGN KEY ("PacId") REFERENCES "pacotefig"("pacId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pac_product" ADD CONSTRAINT "pac_product_invId_fkey" FOREIGN KEY ("invId") REFERENCES "inventario"("invId") ON DELETE CASCADE ON UPDATE CASCADE;
