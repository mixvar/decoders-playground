import { Record, Literal, Union, Number, String, Static } from "runtypes";

export const Cat = Record({
  name: String,
  color: Union(Literal("black"), Literal("white"), Literal("other")),
  livesLeft: Number
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
  color: "black"
}); // ValidationError: Expected number, but was undefined

Cat.check(""); // Expected string, but was undefined
