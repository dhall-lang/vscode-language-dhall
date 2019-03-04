∀(Grammar : Type)
      → ∀(MakeGrammar : { 
            patterns : List ./Pattern.dhall 
          , repository: Optional { 
              mapKey : String 
            , mapValue : Grammar
            }
          } → Person)
      → Person



{-
{ 
-- default []
, patterns : List String 

{- a dictionary (i.e. key/value pairs) of rules which can be included from other places in the grammar. The key is the name of the rule and the value is the actual rule. Further explanation (and example) follow with the description of the include rule key. -}
, repository: Optional { 
      mapKey : String 
    , mapValue : String -- OK, recursive def ..
    }
}

-}

