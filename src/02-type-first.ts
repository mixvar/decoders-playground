import {
  Decoder,
  object,
  string,
  oneOf,
  constant,
  number
} from "@mojotech/json-type-validation";

export type Cat = {
  name: string;
  color: "black" | "white" | "other";
  livesLeft: number;
};

const catDecoder: Decoder<Cat> = object({
  name: string(),
  color: oneOf(constant("black"), constant("white"), constant("other")),
  meta: object({ _lives: number() })
}).map(json => ({
  name: json.name,
  color: json.color as Cat["color"],
  livesLeft: json.meta._lives
}));

const json: unknown = {
  name: "Filemon",
  color: "black",
  meta: {
    _lives: 7
  }
};
const cat = catDecoder.runWithException(json);
console.log(`cat decoded! color is ${cat.color}`);

catDecoder.runWithException({
  name: "Behemoth",
  color: "black"
}); // DecoderError - the key 'livesLeft' is required but was not present, input: { name: 'Behemoth', color: 'black' }

catDecoder.runWithException(""); // DecoderError - expected an object, got a string, input: ''

// encoder is preety simple if we need it
const catEncoder = (cat: Cat): string =>
  JSON.stringify({
    name: cat.name,
    color: cat.color,
    meta: {
      _lives: cat.livesLeft
    }
  });
