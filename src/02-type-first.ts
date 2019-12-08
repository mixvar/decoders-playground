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
  livesLeft: number()
});

const json: unknown = {
  name: "Filemon",
  color: "black",
  livesLeft: 7
};
const cat = catDecoder.runWithException(json);
console.log(`cat decoded! color is ${cat.color}`);

catDecoder.runWithException({
  name: "Behemoth",
  color: "black"
}); // DecoderError - the key 'livesLeft' is required but was not present, input: { name: 'Behemoth', color: 'black' }

catDecoder.runWithException(""); // DecoderError - expected an object, got a string, input: ''
