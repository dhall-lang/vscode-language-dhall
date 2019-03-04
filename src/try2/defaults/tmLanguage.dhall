λ (Grammar: Type) -> λ (Pattern: Type) -> λ(_params : {scopeName: Text}) ->
{ `$schema` = Some "https://raw.githubusercontent.com/martinring/tmlanguage/master/tmlanguage.json"
, name = None Text
, scopeName = _params.scopeName
, fileTypes = []: List Text
, foldingStartMarker = None Text
, foldingStopMarker = None Text
, uuid = None  Text
, firstLineMatch = None Text
, patterns = []: List Pattern
, repository = [] : List { mapKey : Text, mapValue: Grammar }
} : ../defs/mkTmLanguage.dhall (Grammar)  (Pattern)  