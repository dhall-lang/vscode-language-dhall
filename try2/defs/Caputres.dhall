-- TODO: pattern properties: "^[0-9]+$"
{
  mapKey : Text,
  mapValue : {
      name: Text -- ! FIXME: #/definitions/name
      , patterns :  Text -- List ./Pattern.dhall -- default []
  }
}
