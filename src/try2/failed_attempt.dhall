-- dhall-to-json --omitNull --pretty --explain < example.dhall  > test-output.tmLanguage.json

-- ! FIXME: make me typesafe, examples below:
-- * check https://github.com/dhall-lang/dhall-lang/issues/3
-- * and https://github.com/dhall-lang/dhall-haskell/issues/62
-- TODO: for now just validate with $schema
./defaults/tmLanguage.dhall //
{ 
  scopeName = "source.dhall"
, name = "Dhall"
, `$schema` = "https://raw.githubusercontent.com/martinring/tmlanguage/master/tmlanguage.json"
, fileTypes = [".dhall"]
, patterns = [
    { 
      include = "expression"
    }
  ]
, repository = [ 
    {
      mapKey = "keywords"
    , mapValue = {
        patterns = [ 
          {
            name  = "keyword.control.dhall"
          , match = "\\b(let|in|as|using|merge|constructors)\\b"
          }
          ,{ 
              name="keyword.other.dhall"
          ,   match="\\b(Type|Kind|Sort)\\b"
          }
          ,{
              name="constant.language.dhall"
          ,   match="\\b(True|False|NaN|Infinity|Some)\\b"
          }
          ,{
              name="constant.numeric.dhall"
          ,   match="\\b(NaN|Infinity)\\b"
          }
          ,{
              name="entity.name.function"
          ,   match="\\b(Natural/fold|Natural/build|Natural/isZero|Natural/even|Natural/odd|Natural/toInteger|Natural/show|Integer/toDouble|Integer/show|Double/show|List/build|List/fold|List/length|List/head|List/last|List/indexed|List/reverse|Optional/fold|Optional/build)\\b"
          }
          ,{
              name="support.class.dhall"
          ,   match="\\b(Bool|Optional|None|Natural|Integer|Doule|Text|List)\\b"
          }
          ,{
              name="keyword.control.conditional.dhall"
          ,   match="\\b(if|then|else)\\b"
          }
        ]
      }
    }
      ,{ mapKey = "expression"
  , mapValue = {
            patterns = [
                {
                    include = "#keywords"
                },
                {
                    include = "#forall"
                },
                {
                    include = "#strings"
                },
                {
                    include = "#single_strings"
                },
                {
                    include = "#line_comment"
                },
                {
                    include = "#block_comment"
                },
                {
                    include = "#numbers"
                },
                {
                    include = "#url"
                },
                {
                    include = "#file"
                },
                {
                    include = "#env"
                },
                {
                    include = "#label"
                },
                {
                    include = "#record"
                },
                {
                    include = "#union"
                },
                {
                    include = "#list"
                },
                {
                    include = "#parens"
                },
                {
                    include = "#operators"
                },
                {
                    include = "#url"
                },
                {
                    include = "#lambda"
                },
                {
                    include = "#let"
                }
            ]
        }
    },

  { mapKey = "strings"
  , mapValue = 
         {

            patterns = [
                {
                    name = "string.quoted.double.dhall",
                    begin = "\"",
                    end = "\"",
                    patterns = [
                        {
                            name = "constant.other.placeholder.dhall",
                            begin = "\\$\\{",
                            beginCaptures = { `0` = { name = "punctuation.section.curly.begin.dhall" } },
                            end = "\\}",
                            endCaptures = { `0` = { name = "punctuation.section.curly.end.dhall" } },
                            patterns = [
                                {
                                    include = "#expression"
                                }
                            ]
                        },
                        {
                            name = "constant.character.escape.sequence.dhall",
                            match = "\\\\(?:[\"$\\\\/bfnrt]|[u][a-fA-F0-9]{4})"

                        }
                    ]
                }
            ]
        }
  },
  { mapKey = "numbers"
  , mapValue
         = {
            patterns = [
                
                {
                    name = "constant.numeric.float.dhall",
                    match = "[+-]?\\d+(?:(\\.)\\d+(?:e[+-]?\\d+)?|(?:e[+-]?\\d+))"
                },
                {
                    name = "constant.numeric.integer.dhall",
                    match = "(\\+|\\-)[\\d]+"
                },
                {
                    name = "constant.numeric.natural.dhall",
                    match = "[\\d]+"
                }

            ]
        }
},
  { mapKey = "url"
  , mapValue
         = {

            patterns = [
                {
                    match = "(${url})(?:\\s*(sha256)(:)(${hex_digit}{64}))?(?:\\s*(as)\\s*(Text))?",
                    captures = {
                        `1` = { 
                            name = `markup.underline.url.dhall`
                            },
                        `2` = { name = `storage.modifier.hash.dhall` },
                        `3` = { name = `punctuation.separator.colon.dhall` },
                        `4` = { name = `constant.numeric.integer.hash.dhall` },
                        `5` = { name = `storage.modifier.as.dhall` },
                        `6` = { name = `storage.type.dhall` }
                    },
                    patterns = []
                }]
        }

    },
  { mapKey = "file"
  , mapValue 
         = {

            patterns = [
                {
                    match = "____IMPOSSIBLE_IN_JSON_____",
                    name = "",
                    patterns = []
                }]
        }

    },
  { mapKey = "env"
  , mapValue
         = {

            patterns = [
                {
                    match = "____IMPOSSIBLE_IN_JSON_____",
                    name = "",
                    patterns = []
                }]
        }

    },
  { mapKey = "operators"
  , mapValue
         = {
            patterns = [
                {
                    name = "keyword.operator.arrow.dhall",
                    match = "(?:->|→)"
                },
                {
                    match = ":",
                    name = "keyword.other.colon.dhall"
                },
                {
                    match = "(?:\\|{2}|&{2})",
                    name = "keyword.operator.logical.dhall"
                },
                {
                    match = "[!=]=",
                    name = "keyword.operator.equality.dhall"
                },
                {
                    match = "=",
                    name = "keyword.operator.assignment.dhall"
                },
                {
                    match = "(?:#|\\+{2})",
                    name = "keyword.operator.sequence.dhall"
                },
                {
                    match = "[\\+\\*]",
                    name = "keyword.operator.arithmetic.dhall"
                },
                {
                    match = "(?:∧|/\\\\|⩓|//\\\\\\\\|⫽|//)",
                    name = "keyword.operator.combine.dhall"
                }

            ]
        }

    },
  { mapKey = "forall"
  , mapValue
         = {

            patterns = [
                {
                    match = "\\bforall\\b|∀",
                    name = "storage.modifier.universal-quantifier.dhall",
                    patterns = []
                }]
        }

    },
  { mapKey = "lambda"
  , mapValue
         = {

            patterns = [
                {
                    match = "λ|\\\\",
                    name = "keyword.control.dhall",
                    patterns = []
                }]
        }

    },
  { mapKey = "let"
  , mapValue
         = {

            patterns = [
                {
                    comment = "TODO = is it possible (and necessary?) to define big meta scope for let?",
                    patterns = [
                        {
                            match = "\\blet\\b",
                            name = "keyword.other.let.dhall"
                        },
                        {
                            match = "\\bin\\b",
                            name = "keyword.other.in.dhall"
                        }
                    ]
                }]
        }

    },
  { mapKey = "assignment"
  , mapValue
         = {
            patterns = [
                {
                    name = "keyword.operator.assignment.dhall",
                    match = "="
                }
            ]
        }

    },
  { mapKey = "line_comment"
  , mapValue
         = {
            patterns = [
                {
                    name = "comment.line.double-dash.dhall",
                    begin = "--",
                    end = "$",
                    patterns = []
                }]
        }
     },
  { mapKey = "block_comment"
  , mapValue 
         = {
            patterns = [
                {
                    name = "comment.block.dhall",
                    begin = "\\{-",
                    end = "-\\}",
                    patterns = [{ include = "#block_comment" }]
                }]
        }
  },
    { mapKey = "comments"
  , mapValue
         = {
            patterns = [{ include = "#line_comment" }, { include = "#block_comment" }]
        },
        single_strings = {

            patterns = [
                {
                    name = "string.quoted.single.dhall",
                    begin = "''$",
                    end = "''(?!')(?!\\$\\{)",
                    patterns = [
                        {
                            name = "constant.character.escape.quotes.dhall",
                            match = "'''"
                        },
                        {
                            name = "constant.character.escape.interpolation.dhall",
                            match = "''\\$\\{"
                        },
                        {
                            name = "constant.other.placeholder.dhall",
                            begin = "\\$\\{",
                            beginCaptures = { `0` = { name = "punctuation.section.curly.begin.dhall" } },
                            end = "\\}",
                            endCaptures = { `0` = { name = "punctuation.section.curly.end.dhall" } },
                            patterns = [
                                {
                                    include = "#expression"
                                }
                            ]
                        }
                    ]
                }]
        }

    },
    { mapKey = "label"
  , mapValue
         = {

            patterns = [
                {
                    name = "meta.label.dhall",
                    patterns = [{
                        name = "meta.label.dhall",
                        match = "(?:[a-zA-Z]|_)(?:\\w|[-/_])*"
                    }, {
                        name = "metal.label.quoted.dhall",
                        begin = "`",
                        end = "`",
                        patterns = [{
                            name = "meta.label.dhall",
                            match = "[\\w\\-/_:\\.]+"
                        }],
                        beginCaptures = { `0` = { name = "punctuation.section.backtick.begin.dhall" } },
                        endCaptures = { `0` = { name = "punctuation.section.backtick.end.dhall" } }
                    }]
                }]
        }

    },
    { mapKey = "record"
  , mapValue
         = {

            patterns = [
                {
                    name = "meta.declaration.data.record.block.dhall",
                    begin = "\\{",
                    beginCaptures = {
                        `0` = {
                            name = "keyword.operator.record.begin.dhall"
                        }
                    },
                    end = "\\}",
                    endCaptures = {
                        `0` = {
                            name = "keyword.operator.record.end.dhall"
                        }
                    },
                    patterns = [
                        {
                            include = "#expression"
                        },
                        {
                            comment = " FIXME = punctuation? is not defined in textmate grammar reference",
                            begin = ":",
                            beginCaptures = {
                                `0` = {

                                    name = "punctuation.separator.dictionary.key-value.dhall"
                                }
                            },
                            end = "(,)|(?=\\})",
                            endCaptures = {
                                `1` = {
                                    name = "punctuation.separator.dictionary.pair.dhall"
                                }
                            },
                            name = "meta.declaration.data.record.type.dhall",
                            patterns = [
                                {
                                    include = "#expression"
                                }
                            ]
                        },
                        {
                            comment = " FIXME = punctuation? is not defined in textmate grammar reference",
                            begin = "=",
                            beginCaptures = {
                                `0` = {

                                    name = "punctuation.separator.dictionary.key-value.dhall"
                                }
                            },
                            end = "(,)|(?=\\})",
                            endCaptures = {
                                `1` = {
                                    name = "punctuation.separator.dictionary.pair.dhall"
                                }
                            },
                            name = "meta.declaration.data.record.literal.dhall",
                            patterns = [
                                {
                                    include = "#expression"
                                }
                            ]
                        },
                        {
                            include = "#assignment"
                        },
                        {
                            comment = "FIXME = entity.name.tag? label",
                            include = "#label"
                        }
                    ]
                }]
        }

    },
    { mapKey = "union"
  , mapValue
         = {

            patterns = [
                {
                    name = "meta.declaration.data.union.block.dhall",
                    begin = "<",
                    beginCaptures = {
                        `0` = {
                            name = "keyword.operator.union.begin.dhall"
                        }
                    },
                    end = ">",
                    endCaptures = {
                        `0` = {
                            name = "keyword.operator.union.end.dhall"
                        }
                    },
                    patterns = [
                        {
                            include = "#comments"
                        },
                        {
                            comment = " FIXME = punctuation? is not defined in textmate grammar reference",
                            begin = ":",
                            beginCaptures = {
                                `0` = {

                                    name = "punctuation.separator.dictionary.key-value.dhall"
                                }
                            },
                            end = "(\\|)|(?=\\>)",
                            endCaptures = {
                                `1` = {
                                    name = "punctuation.separator.dictionary.pair.dhall"
                                }
                            },
                            name = "meta.declaration.data.union.type.dhall",
                            patterns = [
                                {
                                    include = "#expression"
                                }
                            ]
                        },
                        {
                            comment = " FIXME = punctuation? is not defined in textmate grammar reference",
                            begin = "=",
                            beginCaptures = {
                                `0` = {

                                    name = "punctuation.separator.dictionary.key-value.dhall"
                                }
                            },
                            end = "(\\|)|(?=\\>)",
                            endCaptures = {
                                `1` = {
                                    name = "punctuation.separator.dictionary.pair.dhall"
                                }
                            },
                            name = "meta.declaration.data.union.literal.dhall",
                            patterns = [
                                {
                                    include = "#expression"
                                }
                            ]
                        },
                        {
                            include = "#assignment"
                        },
                        {
                            comment = "FIXME = entity.name.tag? label",
                            include = "#label"
                        }
                    ]
                }]
        }

    },
    { mapKey = "list"
  , mapValue
         = {

            patterns = [
                {
                    name = "meta.brackets.list.dhall",
                    begin = "\\[",
                    beginCaptures = {
                        `0` = {
                            name = "punctuation.section.brackets.begin.list.dhall"
                        }
                    },
                    end = "\\]",
                    endCaptures = {
                        `0` = {
                            name = "punctuation.section.brackets.end.list.dhall"
                        }
                    },
                    patterns = [
                        {
                            name = "punctuation.separator.sequence.list.dhall",
                            match = ","
                        },
                        {
                            include = "#expression"
                        }
                    ]
                }]
        }

    },
    { mapKey = "parens"
  , mapValue
         = {

            patterns = [
                {
                    name = "meta.parens.dhall",
                    begin = "\\(",
                    beginCaptures = {
                        `0` = {
                            name = "punctuation.section.parens.begin.dhall"
                        }
                    },
                    end = "\\)",
                    endCaptures = {
                        `0` = {
                            name = "punctuation.section.parens.end.dhall"
                        }
                    },
                    patterns = [
                        {
                            include = "#expression"
                        }
                    ]
                }]

         }
    }
    -- end repository
  ] 
}     


           



