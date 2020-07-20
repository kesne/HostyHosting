export type Connection<T> = {
    readonly edges: ReadonlyArray<{
        readonly node: T;
    }>;
};
