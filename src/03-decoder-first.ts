import * as T from "runtypes";

export const Cat = T.Record({
  color: T.Union(T.Literal("black"), T.Literal("white"), T.Literal("other")),
  livesLeft: T.Number.withConstraint(it => it >= 0 && it <= 7),
  masters: T.Array(T.String)
}).And(
  T.Partial({
    name: T.String
  })
);

export type Cat = T.Static<typeof Cat>;

const json: unknown = {
  name: "Behemoth",
  color: "black",
  livesLeft: 7,
  masters: ["Woland"]
};

const cat = Cat.check(json);

console.log(`cat decoded! color is ${cat.color}`);
