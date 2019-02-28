\(_params : {scopeName: Text}) ->
{ `$schema` = Some "https://raw.githubusercontent.com/martinring/tmlanguage/master/tmlanguage.json"
, name = None Text
, scopeName = _params.scopeName
, fileTypes = []: List Text
, foldingStartMarker = None Text
, foldingStopMarker = None Text
, uuid = None  Text
, firstLineMatch = None Text
} : ../types/TmLanguage.dhall