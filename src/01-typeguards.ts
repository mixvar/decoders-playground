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

const isStringArray = (val: unknown): val is string[] =>
  Array.isArray(val) && val.every(el => typeof el === "string");

const isValidCat = (data: unknown): data is Cat => {
  if (typeof data !== "object" || data == null) return false;

  if ((data as Cat).name != null && typeof (data as Cat).name !== "string")
    return false;

  if (!["black", "white", "other"].includes((data as Cat).color)) return false;

  if (typeof (data as Cat).livesLeft !== "number") return false;

  if (!isStringArray((data as Cat).masters)) return false;

  return true;
};

function assertCat(data: unknown): asserts data is Cat {
  if (!isValidCat(data)) {
    throw new Error(`${JSON.stringify(data)} is not a valid Cat!`);
  }
}

assertCat(json);

console.log(`cat decoded! color is ${json.color}`);
