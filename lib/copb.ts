/**
 * Generic uniary lambda.
 * ```haskell
 * Lmbd :: A -> B
 * ```
 * @typeParam A - The argument.
 * @typeParam B - The result.
 */
interface Lmbd<A, B> {
  (x: A): B;
}

/**
 * A functional composition stack. The result of either `p` or `o`. The folded
 * function will have the signature.
 * ```haskell
 * f :: I -> O
 * ```
 * @see p
 * @see o
 * @typeParam I - Refer to signature.
 * @typeParam O - Refer to signature.
 */
interface CompositionalStack<I, O> extends Function {
  fn: Lmbd<I, O>;
}

/**
 * Composes two uniary lambdas together.
 * ```haskell
 * b :: (B -> C) -> (A -> B) -> (A -> C)
 * ```
 * @typeParam B - Refer to signature.
 * @typeParam C - Refer to signature.
 * @typeParam A - Refer to signature.
 */
export function b<B, C>(f: Lmbd<B, C>) {
  return function <A>(g: Lmbd<A, B>) {
    return (x: A) => f(g(x));
  };
}

/**
 * Composes a `CompositionalStack` from arguments of succeeding calls. The
 * inside-most lambdas are on the left.
 * ```haskell
 * p :: (I -> O1) -> (O1 -> O2) -> (O2 -> O3) -> -- ...
 * ```
 * @typeParam I - Refer to signature.
 * @typeParam O1 - Refer to signature.
 * @typeParam O2 - Refer to signature.
 */
export function p<O1, I>(first: Lmbd<I, O1>) {
  function pPartial<O2>(next: Lmbd<O1, O2>) {
    const composed = b(next)(first);
    return p(composed);
  }
  pPartial.fn = first;
  return pPartial;
}

/**
 * Composes a `CompositionalStack` from arguments of succeeding calls. The
 * inside-most lambdas are on the left.
 * ```haskell
 * o :: (I1 -> O) -> (I2 -> I1) -> (I3 -> I2) -> -- ...
 * ```
 * @typeParam O - Refer to signature.
 * @typeParam I1 - Refer to signature.
 * @typeParam I2 - Refer to signature.
 */
export function o<I1, O>(outside: Lmbd<O, I1>) {
  function oPartial<i2>(inside: Lmbd<i2, O>) {
    const composed = b(outside)(inside);
    return o(composed);
  }
  oPartial.fn = outside;
  return oPartial;
}

/**
 * Folds a `CompositionalStack` into a callable function.
 * ```haskell
 * c :: CompositionalStack I O -> I -> O
 * ```
 * @typeParam I - Refer to signature.
 * @typeParam O - Refer to signature.
 */
export function c<I, O>(stack: CompositionalStack<I, O>) {
  return stack.fn;
}
