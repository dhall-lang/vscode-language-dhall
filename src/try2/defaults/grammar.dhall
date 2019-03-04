λ(Grammar : Type) -> λ(Pattern: Type) → ../defs/mkGrammar.dhall Grammar Pattern {  
      patterns =  []: List Pattern
    , repository = None (List {
        mapKey: Text
      , mapValue: Grammar 
      })
    } 
  