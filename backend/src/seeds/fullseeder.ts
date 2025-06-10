import '../seeds/userseeder';
import '../seeds/clientseeder';
// import other seeders as needed

async function main() {
    // If your individual seeders export a main() function, call them here in order:
    // await userSeeder();
    // await clientSeeder();
    // ...etc
    console.log('Full database seed completed.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    });