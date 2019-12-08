import { pipe } from "fp-ts/lib/pipeable";
import * as Either from "fp-ts/lib/Either";
import { PathReporter } from "io-ts/lib/PathReporter";
import * as T from "io-ts";

export const Cat = T.type(
  {
    name: T.string,
    color: T.union([
      T.literal("black"),
      T.literal("white"),
      T.literal("other")
    ]),
    livesLeft: T.number
  },
  "Cat"
);

export type Cat = T.TypeOf<typeof Cat>;

pipe(
  {
    name: "Filemon",
    color: "black",
    livesLeft: 7
  },
  Cat.decode,
  Either.fold(
    err => pipe(err, Either.left, PathReporter.report, console.log),
    cat => console.log(`cat decoded! color is ${cat.color}`)
  )
);

pipe(
  {
    name: "Filemon",
    color: "black"
  },
  Cat.decode,
  Either.fold(
    err => pipe(err, Either.left, PathReporter.report, console.log),
    cat => console.log(`cat decoded! color is ${cat.color}`)
  )
); // 'Invalid value undefined supplied to : Cat/livesLeft: number'
