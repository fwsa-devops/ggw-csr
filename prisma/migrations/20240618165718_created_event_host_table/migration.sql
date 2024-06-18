-- CreateTable
CREATE TABLE "EventHost" (
    "eventId" TEXT NOT NULL,
    "userId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "EventHost_eventId_userId_key" ON "EventHost"("eventId", "userId");

-- AddForeignKey
ALTER TABLE "EventHost" ADD CONSTRAINT "EventHost_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventHost" ADD CONSTRAINT "EventHost_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
