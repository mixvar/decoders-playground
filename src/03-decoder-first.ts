import { Record, Literal, Union, Number, String, Static } from "runtypes";

export const Cat = Record({
  name: String,
  color: Union(Literal("black"), Literal("white"), Literal("other")),
  livesLeft: Number.withConstraint(it => it >= 0 && it <= 7)
});
export type Cat = Static<typeof Cat>;

const json: unknown = {
  name: "Filemon",
  color: "black",
  livesLeft: 7
};
const cat = Cat.check(json);
console.log(`cat decoded! color is ${cat.color}`);

Cat.check({
  name: "Behemoth",
  color: "black",
  livesLeft: 666
}); //ValidationError: Failed constraint check

Cat.check(""); // Expected string, but was undefined
