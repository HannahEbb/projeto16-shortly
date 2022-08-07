CREATE TABLE "users" (
	"id" serial NOT NULL,
	"name" varchar(200) NOT NULL,
	"email" varchar(30) NOT NULL,
	"password" TEXT NOT NULL,
	"createdAt" DATE NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);


CREATE TABLE "urls" (
	"id" serial NOT NULL,
	"userId" integer NOT NULL,
	"shortUrl" TEXT UNIQUE,
	"url" TEXT NOT NULL,
	"visitCount" integer NOT NULL,
	"createdAt" DATE NOT NULL,
	CONSTRAINT "urls_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);


CREATE TABLE "sessions" (
	"id" serial NOT NULL,
	"userId" integer NOT NULL,
	"token" TEXT NOT NULL UNIQUE,
	"createdAt" DATE NOT NULL,
	CONSTRAINT "sessions_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);


ALTER TABLE "urls" ADD CONSTRAINT "urls_fk0" FOREIGN KEY ("userId") REFERENCES "users"("id");

ALTER TABLE "sessions" ADD CONSTRAINT "sessions_fk0" FOREIGN KEY ("userId") REFERENCES "users"("id");



