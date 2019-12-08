import { assertType } from "typescript-is";

export type Cat = {
  name: string;
  color: "black" | "white" | "other";
  livesLeft: number;
};

const json: unknown = {
  name: "Filemon",
  color: "black",
  livesLeft: 7
};
const cat = assertType<Cat>(json);
console.log(`cat decoded! color is ${cat.color}`);

assertType<Cat>({
  name: "Behemoth",
  color: "black"
}); // validation failed at $: expected 'livesLeft' in object

assertType<Cat>(""); // validation failed at $: expected an object
