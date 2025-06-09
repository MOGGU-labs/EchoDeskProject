export function getPagination(page: number, limit: number) {
    const skip = (page - 1) * limit;
    return { skip, take: limit };
}