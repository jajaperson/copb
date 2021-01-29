/**
 * Produces a greeting.
 * @param name - Who to greet.
 * @returns A greeting.
 */
export default function greet(name = "World"): string {
  return `Hello, ${name}!`;
}
