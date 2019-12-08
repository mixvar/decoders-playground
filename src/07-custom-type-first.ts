import * as T from "@mojotech/json-type-validation";

export type Cat = {
  name?: string;
  color: "black" | "white" | "other";
  livesLeft: number;
  masters: string[];
};

const json: unknown = {
  name: "Behemoth",
  color: "pink",
  meta: {
    _lives: 7
  },
  masters: ["Woland"]
};

const livesLeftDecoder = T.number().where(
  val => val >= 0 && val <= 7,
  "expected value in range [0, 7]"
);

const catDecoder: T.Decoder<Cat> = T.object({
  name: T.optional(T.string()),
  color: T.oneOf(T.constant("black"), T.constant("white"), T.succeed("other")),
  meta: T.object({ _lives: livesLeftDecoder }),
  masters: T.array(T.string())
}).map(({ meta, ...json }) => ({ ...json, livesLeft: meta._lives } as Cat));

const cat = catDecoder.runWithException(json);

console.log(`cat decoded! color is ${cat.color}`);

//
// encoder is preety simple if we need it
//

const catEncoder = (cat: Cat): string =>
  JSON.stringify({
    name: cat.name,
    color: cat.color,
    meta: {
      _lives: cat.livesLeft
    },
    masters: cat.masters
  });

console.log(catEncoder(cat));

//
// we can still infer type from decoder if we want (see decoder-first.ts)
//

type DecoderType<T extends T.Decoder<unknown>> = T extends T.Decoder<infer T>
  ? T
  : never;

type InferredCat = DecoderType<typeof catDecoder>;
