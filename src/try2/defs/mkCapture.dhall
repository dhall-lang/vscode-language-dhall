-- TODO: pattern properties: "^[0-9]+$"
λ(Pattern: Type) -> λ(params: {
  mapKey : Text,
  mapValue : {
      name: Text -- ! TODO: #/definitions/name
      , patterns :  List Pattern -- List ./Pattern.dhall -- default []
  }
}) -> params
