import * as test from "blue-tape";
import { comparer } from "./comparer";

const list = [
    { id: 1, group: "a", cluster: "d" },
    { id: 2, group: "a", cluster: "d" },
    { id: 3, group: "b", cluster: "d" },
    { id: 4, group: "b", cluster: "d" },
    { id: 5, group: "c", cluster: "d" },
    { id: 6, group: "b", cluster: "e" },
];

test("comparer", async t => {
    const expected = ["a", "b", "c", "d"];
    const actual = ["b", "c", "a", "d"].sort(comparer((v: string) => v));

    t.deepEqual(actual, expected);
});

test("comparer invert", async t => {
    const expected = ["a", "b", "c", "d"].reverse();
    const actual = ["b", "c", "a", "d"].sort(comparer({
        selector: (v: string) => v,
        invert: true,
    }));

    t.deepEqual(actual, expected);
});
