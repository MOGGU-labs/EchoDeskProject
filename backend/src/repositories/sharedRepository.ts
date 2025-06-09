import prisma from '../prisma/client';

export function getModel(modelName: keyof typeof prisma) {
    return prisma[modelName] as any;
}

// Add this function to create a new record
export async function createEntity(modelName: keyof typeof prisma, data: any) {
    const model = getModel(modelName);
    return model.create({ data });
}

