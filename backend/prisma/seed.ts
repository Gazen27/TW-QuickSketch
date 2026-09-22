import { PrismaClient } from '../generated/prisma/client.js';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import 'dotenv/config';

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaBetterSqlite3({
    url: connectionString
});

const prisma = new PrismaClient({
    adapter
});

const words = [
    // VIDEOGAMES
    {
        text: 'The Legend of Zelda',
        category: 'videogames',
        aliases: ['Zelda']
    },
    {
        text: 'Minecraft',
        category: 'videogames',
        aliases: []
    },
    {
        text: 'Tetris',
        category: 'videogames',
        aliases: []
    },
    {
        text: 'Super Mario',
        category: 'videogames',
        aliases: ['Mario', 'Super Mario Bros']
    },
    {
        text: 'The Binding of Isaac',
        category: 'videogames',
        aliases: ['Isaac']
    },
    {
        text: 'Pokémon',
        category: 'videogames',
        aliases: ['Pokemon']
    },
    {
        text: 'Final Fantasy VII',
        category: 'videogames',
        aliases: ['FFVII', 'FF7', 'Final Fantasy 7']
    },
    {
        text: 'Clair Obscur: Expedition 33',
        category: 'videogames',
        aliases: ['Clair Obscur', 'Expedition 33', 'E33']
    },
    {
        text: 'Donkey Kong',
        category: 'videogames',
        aliases: ['DK']
    },
    {
        text: 'Kid Icarus',
        category: 'videogames',
        aliases: []
    },

    // ANIMALS
    {
        text: 'Cane',
        category: 'animals',
        aliases: []
    },
    {
        text: 'Gatto',
        category: 'animals',
        aliases: ['micio']
    },
    {
        text: 'Leone',
        category: 'animals',
        aliases: []
    },
    {
        text: 'Tigre',
        category: 'animals',
        aliases: []
    },
    {
        text: 'Elefante',
        category: 'animals',
        aliases: []
    },
    {
        text: 'Giraffa',
        category: 'animals',
        aliases: []
    },
    {
        text: 'Scimmia',
        category: 'animals',
        aliases: []
    },
    {
        text: 'Pinguino',
        category: 'animals',
        aliases: []
    },
    {
        text: 'Delfino',
        category: 'animals',
        aliases: []
    },
    {
        text: 'Coccodrillo',
        category: 'animals',
        aliases: []
    },

    // OBJECTS
    {
        text: 'Sedia',
        category: 'objects',
        aliases: []
    },
    {
        text: 'Tavolo',
        category: 'objects',
        aliases: ['banco', 'tavolino', 'tavola']
    },
    {
        text: 'Cellulare',
        category: 'objects',
        aliases: ['telefono', 'telefonino', 'smartphone']
    },
    {
        text: 'Computer',
        category: 'objects',
        aliases: ['pc', 'laptop']
    },
    {
        text: 'Automobile',
        category: 'objects',
        aliases: ['auto', 'macchina']
    },
    {
        text: 'Orologio',
        category: 'objects',
        aliases: []
    },
    {
        text: 'Ombrello',
        category: 'objects',
        aliases: []
    },
    {
        text: 'Bicicletta',
        category: 'objects',
        aliases: ['bici']
    },
    {
        text: 'Chiave',
        category: 'objects',
        aliases: []
    },
    {
        text: 'Albero',
        category: 'objects',
        aliases: []
    },

    // FOOD
    {
        text: 'Pizza',
        category: 'food',
        aliases: []
    },
    {
        text: 'Bistecca',
        category: 'food',
        aliases: ['carne']
    },
    {
        text: 'Hamburger',
        category: 'food',
        aliases: ['panino']
    },
    {
        text: 'Sushi',
        category: 'food',
        aliases: []
    },
    {
        text: 'Gelato',
        category: 'food',
        aliases: ['cono']
    },
    {
        text: 'Torta',
        category: 'food',
        aliases: []
    },
    {
        text: 'Broccoli',
        category: 'food',
        aliases: []
    },
    {
        text: 'Lasagna',
        category: 'food',
        aliases: ['lasagne']
    },
    {
        text: 'Mela',
        category: 'food',
        aliases: []
    },
    {
        text: 'Banana',
        category: 'food',
        aliases: []
    }
];

async function main() {
    for (const word of words) {
        await prisma.word.create({
            data: {
                text: word.text,
                category: word.category as any,
                aliases: {
                    create: word.aliases.map(alias => ({
                        text: alias
                    }))
                }
            }
        });
    }

    console.log('Database seeded successfully');
}

main()
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });