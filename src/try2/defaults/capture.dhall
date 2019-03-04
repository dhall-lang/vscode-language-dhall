λ(Pattern: Type) -> λ(params: {key: Text, name: Text}) -> ../defs/mkCapture.dhall (Pattern) {
  mapKey = params.key,
  mapValue = {
    name = params.name
  , patterns =  []: List Pattern -- List ./Pattern.dhall -- default []
  }
} 