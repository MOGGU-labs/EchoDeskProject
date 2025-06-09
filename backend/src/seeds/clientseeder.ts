import prisma from '../prisma/client';

async function main() {
    // Get the first user to use as createdById
    const user = await prisma.user.findFirst();
    if (!user) {
        throw new Error('No users found. Please seed users first.');
    }

    const clients = [
        {
            clientCode: 'CLNT-001',
            name: 'Acme Corporation',
            business: 'Manufacturing',
            phone: '123-456-7890',
            address: '123 Main St, Cityville',
            npwp: '123456789',
            nkp: '987654321',
            notes: 'Important client',
            createdById: user.id,
        },
        {
            clientCode: 'CLNT-002',
            name: 'Beta LLC',
            business: 'Consulting',
            phone: '555-123-4567',
            address: '456 Side St, Townsville',
            npwp: '2233445566',
            nkp: '6655443322',
            notes: 'New client',
            createdById: user.id,
        },
    ];

    for (const client of clients) {
        await prisma.client.upsert({
            where: { clientCode: client.clientCode },
            update: {},
            create: client,
        });
    }

    console.log('Client seed completed.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });