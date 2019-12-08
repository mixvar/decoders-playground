export type Cat = {
  name: string;
  color: "black" | "white" | "other";
  livesLeft: number;
};

const isValidCat = (data: unknown): data is Cat => {
  if (typeof data !== "object") return false;
  if (typeof (data as Cat).name !== "string") return false;
  if (!["black", "white", "other"].includes((data as Cat).color)) return false;
  if (typeof (data as Cat).livesLeft !== "number") return false;
  return true;
};

function assertCat(data: any): asserts data is Cat {
  if (!isValidCat(data)) {
    throw new Error(`${JSON.stringify(data)} is not a valid Cat!`);
  }
}

const json: unknown = {
  name: "Filemon",
  color: "black",
  livesLeft: 7
};
assertCat(json);
console.log(`cat decoded! color is ${json.color}`);

assertCat({
  name: "Behemoth",
  color: "black"
}); // is not a valid Cat!

assertCat(""); // is not a valid Cat!
