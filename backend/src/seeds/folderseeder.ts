import prisma from '../prisma/client';

async function main() {
    // Get all clients and users
    const clients = await prisma.client.findMany();
    const users = await prisma.user.findMany();

    if (clients.length === 0) {
        throw new Error('No clients found. Please seed clients first.');
    }
    if (users.length === 0) {
        throw new Error('No users found. Please seed users first.');
    }

    function getRandom<T>(arr: T[]): T {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    const folders = [];
    for (let i = 1; i <= 10; i++) {
        const client = getRandom(clients);
        const user = getRandom(users);
        folders.push({
            folderCode: `FOLD-${String(i).padStart(3, '0')}`,
            title: `Folder ${i} Title`,
            description: `Description for folder ${i}`,
            clientId: client.id,
            createdById: user.id,
            isDeleted: false,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    }

    for (const folder of folders) {
        await prisma.consultFolder.upsert({
            where: { folderCode: folder.folderCode },
            update: {},
            create: folder,
        });
    }

    console.log('ConsultFolder seed completed.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });