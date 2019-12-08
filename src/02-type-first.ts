import * as T from "@mojotech/json-type-validation";

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

const catDecoder: T.Decoder<Cat> = T.object({
  name: T.optional(T.string()),
  color: T.oneOf(T.constant("black"), T.constant("white"), T.constant("other")),
  livesLeft: T.number(),
  masters: T.array(T.string())
});

const cat = catDecoder.runWithException(json);

console.log(`cat decoded! color is ${cat.color}`);
