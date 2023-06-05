import { describe, expect, it } from "vitest";
import useSum from "../composables/sum.js";

const  { sum, }  = useSum();

describe('sum', () => {
    it('returns a correct result', () => {
        const result = sum(1, 2);
        expect(result).toEqual(3);
    });
});