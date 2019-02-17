  ∀(Grammar : Type)
→ ∀ ( MakeGrammar
    :   { patterns :
            List ./Pattern.dhall
        , repository :
            Optional { mapKey : Text, mapValue : Grammar }
        }
      → Grammar
    )
→ Grammar
