-- dhall-to-json --omitNull --pretty --explain < example.dhall  > test-output.tmLanguage.json
-- * check https://github.com/dhall-lang/dhall-lang/issues/3
-- * and https://github.com/dhall-lang/dhall-haskell/issues/62
--
./defaults/tmLanguage.dhall {} {} { scopeName = "source.dhall"} //
{ 
  name = Some "Dhall"
, patterns = [
    ./defaults/pattern.dhall {} {} // { 
      include = Some "expression"
    }
  ]
, repository = Some [ {
      mapKey = "keywords"
    , mapValue = ./defaults/grammar.dhall {} {} // {
        patterns = [ ./defaults/pattern.dhall {} {} // {
            name  = Some "keyword.control.dhall"
          , match = Some "\\b(let|in|as|using|merge|constructors)\\b"
        }]
      }
    }
  ]
}     

-- [{
--                 name: "",
--                 match: "\\b(let|in|as|using|merge|constructors)\\b"
--             },
--             { 
--                 name: "keyword.other.dhall",
--                 match: "\\b(Type|Kind|Sort)\\b"
--             },
--             {
--                 name: "constant.language.dhall",
--                 match: "\\b(True|False|NaN|Infinity|Some)\\b"
--             },
--             {
--                 name: "constant.numeric.dhall",
--                 match: "\\b(NaN|Infinity)\\b"
--             },
--             {
--                 name: "entity.name.function",
--                 match: "\\b(Natural/fold|Natural/build|Natural/isZero|Natural/even|Natural/odd|Natural/toInteger|Natural/show|Integer/toDouble|Integer/show|Double/show|List/build|List/fold|List/length|List/head|List/last|List/indexed|List/reverse|Optional/fold|Optional/build)\\b"
--             },
--             {
--                 name: "support.class.dhall",
--                 match: "\\b(Bool|Optional|None|Natural|Integer|Doule|Text|List)\\b"
--             },
--             {
--                 name: "keyword.control.conditional.dhall",
--                 match: "\\b(if|then|else)\\b"
--             }]

