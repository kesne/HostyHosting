export function serialize(id: number) {
    return Buffer.from(String(id), 'utf8').toString('base64');
}

export function parse(cursor: string) {
    return Number(Buffer.from(cursor, 'base64').toString('utf8'));
}
