export default async function* promiseWrappedIterator(
    asyncIterator: AsyncIterator<unknown>,
    promise: Promise<any>
) {
    await promise;
    // @ts-ignore: This actually works probably:
    yield* asyncIterator;
}
