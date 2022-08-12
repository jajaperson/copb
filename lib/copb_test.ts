import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import * as iter from "https://deno.land/x/iter@v2.5.0/fp.ts";
import { b, c, o, p } from "./copb.ts";

Deno.test("b", () => {
  const f = (x: number) => x * 4;
  const g = (x: number) => x + 6;
  const fog = b(f)(g);
  const nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const expc = [24, 28, 32, 36, 40, 44, 48, 52, 56, 60];
  assertEquals(nums.map(fog), expc);
});

Deno.test("c", () => {
  function dummyFoldable() {}
  dummyFoldable.fn = (x: unknown) => x;
  assertEquals(
    c(dummyFoldable)("In search of identity..."),
    "In search of identity...",
  );
});

Deno.test("o and p", () => {
  const add5 = (x: number) => x + 5;
  const triple = (x: number) => x * 3;
  const firstCharCode = (s: string) => s.charCodeAt(0);
  const str = (x: number) => String(x);
  const fromCharCode = String.fromCharCode;

  const composed = c(
    o(firstCharCode)(fromCharCode)(triple)(firstCharCode)(str)(add5)(triple),
  );
  const piped = c(
    p(triple)(add5)(str)(firstCharCode)(triple)(fromCharCode)(firstCharCode),
  );

  assertEquals(composed(12), 156);
  assertEquals(piped(12), 156);

  const iterPipe = c(p(iter.map<number>((x) => x * 100))(iter.take(100)));

  for (const rand of iterPipe(iter.create.randomNumbers())) {
    assertEquals(composed(rand), piped(rand));
  }
});
