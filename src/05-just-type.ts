import { assertType } from "typescript-is";

export type Cat = {
  name?: string;
  color: "black" | "white" | "other";
  livesLeft: number;
  masters: string[];
};

const json: unknown = {
  name: "Behemoth",
  color: "black",
  livesLeft: 7,
  masters: ["Woland"]
};

const cat = assertType<Cat>(json); // magic ✨

console.log(`cat decoded! color is ${cat.color}`);
