import { pipe } from "fp-ts/lib/pipeable";
import * as Either from "fp-ts/lib/Either";
import { PathReporter } from "io-ts/lib/PathReporter";
import * as T from "io-ts";

export const Cat = T.intersection(
  [
    T.type({
      color: T.union([
        T.literal("black"),
        T.literal("white"),
        T.literal("other")
      ]),
      livesLeft: T.number,
      masters: T.array(T.string)
    }),
    T.partial({
      name: T.string
    })
  ],
  "Cat"
);

export type Cat = T.TypeOf<typeof Cat>;

const json: unknown = {
  name: "Behemoth",
  color: "black",
  livesLeft: 7,
  masters: ["Woland"]
};

pipe(
  json,
  Cat.decode,
  Either.fold(
    err => pipe(err, Either.left, PathReporter.report, console.log),
    cat => console.log(`cat decoded! color is ${cat.color}`)
  )
);
