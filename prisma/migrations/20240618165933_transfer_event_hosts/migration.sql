-- Copy createdBy data from Event to EventHost
INSERT INTO "EventHost" ("eventId", "userId")
SELECT "id", "createdById" FROM "Event"
ON CONFLICT ("eventId", "userId") DO NOTHING;