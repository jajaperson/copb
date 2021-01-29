import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import greet from "./greet.ts";

Deno.test("greet", () => {
  assertEquals(greet(), "Hello, World!");
  assertEquals(greet("John"), "Hello, John!");
});
