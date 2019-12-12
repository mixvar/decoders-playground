open Belt;

[@decco]
type catColor =
  | Black
  | White
  | Other;

[@decco]
type cat = {
  name: option(string),
  color: catColor,
  livesLeft: int,
  masters: list(string),
};

let colorToString = cat =>
  switch (cat.color) {
  | Black => "black"
  | White => "white"
  | Other => "other"
  };

let handleCatJson = json => {
  (
    switch (cat_decode(json)) {
    | Result.Error(err) =>
      "DecodeError! " ++ "input" ++ err.path ++ " - " ++ err.message

    | Result.Ok(cat) => "cat decoded! color is " ++ colorToString(cat)
    }
  )
  |> Js.log;
};

{|{"name": "Behemoth", "color": ["Black"], "livesLeft": 7, "masters": ["Woland"]}|}
|> Js.Json.parseExn
|> handleCatJson;