{
    -- "^[0-9]+$"
      mapKey : Text
    , mapValue: {  
          name: Text -- validation - def name
        , patterns: List ./Pattern.dhall -- default empty
      }
}   