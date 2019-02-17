  ∀(Grammar : Type)
→ ∀ ( MakeGrammar
    :   { patterns :
            List ./types/Pattern.dhall
        , repository :
            Optional { mapKey : Text, mapValue : Grammar }
        }
      → Grammar
    )
→ Grammar
