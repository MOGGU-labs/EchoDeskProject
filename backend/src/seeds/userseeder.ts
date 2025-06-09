import prisma from '../prisma/client';

async function main() {
    await prisma.user.create({
        data: {
            email: 'admin@example.com',
            password: 'password123', // Use a hashed password in production!
            fullName: 'Admin User',
            role: 'admin',
        },
    });
    console.log('User seed completed.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });