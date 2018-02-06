export type Selector<T> = (obj: T) => string | number;
export type ComparerConfig<T> = Selector<T> | {
    selector: Selector<T>,
    invert: boolean,
};

export function comparer<T>(...comparerConfigs: Array<ComparerConfig<T>>) {
    return (a: T, b: T) => {
        for (const comparerConfig of comparerConfigs) {
            let selector: Selector<T>;
            let invert: boolean;
            if (typeof comparerConfig === "function") {
                selector = comparerConfig;
                invert = false;
            }
            else {
                selector = comparerConfig.selector;
                invert = comparerConfig.invert;
            }

            const va = selector(a);
            const vb = selector(b);
            if (va > vb) return invert ? -1 : +1;
            if (va < vb) return invert ? +1 : -1;
        }
        return 0;
    };
}
