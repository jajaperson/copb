interface Lmbd<A, B> {
  (x: A): B;
}

interface CompositionalStack<I, O> extends Function {
  fn: Lmbd<I, O>;
}

export function b<B, C>(f: Lmbd<B, C>) {
  return function <A>(g: Lmbd<A, B>) {
    return (x: A) => f(g(x));
  };
}

export function p<O1, I>(first: Lmbd<I, O1>) {
  function pPartial<O2>(next: Lmbd<O1, O2>) {
    const composed = b(next)(first);
    return p(composed);
  }
  pPartial.fn = first;
  return pPartial;
}

export function o<O2, O1>(outside: Lmbd<O1, O2>) {
  function oPartial<I>(inside: Lmbd<I, O1>) {
    const composed = b(outside)(inside);
    return o(composed);
  }
  oPartial.fn = outside;
  return oPartial;
}

export function c<I, O>(stack: CompositionalStack<I, O>) {
  return stack.fn;
}
