open Belt;

[@decco]
type catColor =
  | Black
  | White
  | Other;

[@decco]
type cat = {
  name: string,
  color: catColor,
  livesLeft: int,
};

let getColor = cat =>
  switch (cat.color) {
  | Black => "black"
  | White => "white"
  | Other => "other"
  };

let handleCatJson = json => {
  let formatError = (err: Decco.decodeError) =>
    "DecodeError! " ++ "input" ++ err.path ++ " - " ++ err.message;

  (
    switch (cat_decode(json)) {
    | Result.Error(err) => formatError(err)
    | Result.Ok(cat) => "cat decoded! color is " ++ getColor(cat)
    }
  )
  |> Js.log;
  ();
};

{|{"name": "Filemon", "color": ["Black"], "livesLeft": 7}|}
|> Js.Json.parseExn
|> handleCatJson;

{|{"name": "Filemon", "color": ["Black"]}|}
|> Js.Json.parseExn
|> handleCatJson;

{|""|} |> Js.Json.parseExn |> handleCatJson;