import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "prisma/prisma";

async function checkPostgresConnection() {
    try {
        const users = await prisma.user.findMany().then((e) => e);

        return users && users[0].name;
    }
    catch (error) {
        console.error("Ошибка подключения", error);
        return undefined;
    }
}

// GET /api/database
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "GET") {
        const msg = await checkPostgresConnection().then((connected) => connected || "bad query (");

        res.status(200).json(msg);
    }
    else {
        res.status(405).send({ message: "Method not allowed" });
    }
};

export default handler;

// // http://localhost:3006/api/database

// // http://192.168.1.84/api/database

// // http://192.168.1.84
