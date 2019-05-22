-- SYNTAX TEST "source.dhall" "SublimeText pack"

-- adapted @from https://raw.githubusercontent.com/SQbQxeKd3JHD8/SublimeDhall/master/syntax_test_dhall.dhall 

{- COMMENTS -}

    -- foo
-- ^        - comment.line.double-dash.dhall
--  ^^^^^^  comment.line.double-dash.dhall

    {- bar -}
-- ^           - comment.line.double-dash.dhall
--  ^^^^^^^^^  comment.block.dhall

    {- lorem {- ipsum -} dolor -}
-- ^                               - comment.block.dhall
--  ^^^^^^^^^                      comment.block.dhall 
--           ^^^^^^^^^^^           comment.block.dhall comment.block.dhall
--                      ^^^^^^^^^  comment.block.dhall
    -- consectetur {- adipisicing
-- ^                               - comment.line.double-dash.dhall
--                 ^^              - punctuation.definition.comment.begin.dhall
--                 ^^^^^^^^^^^^^^  - comment.block.brace-dash.dhall
--  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^  comment.line.double-dash.dhall

    {- sit -- amet -}
-- ^                   - comment.block.dhall
--  ^^^^^^^^^^^^^^^^^  comment.block.dhall


{- DEFINITIONS -}

    let replicateUnicode : Natural → ∀(a : Type) → a → List a
--  ^^^                                                      keyword.other.let.dhall
--      ^^^^^^^^^^^^^^^^                                     variable.other.constant.dhall
--                         ^^^^^^^                           support.class.dhall
--                                 ^                         keyword.operator.arrow.dhall
--                                   ^                       storage.modifier.universal-quantifier.dhall
--                                    ^                      punctuation.section.parens.begin.dhall
--                                     ^                     meta.label.dhall
--                                       ^                   keyword.other.colon.dhall
--                                         ^^^^              keyword.other.dhall
--                                             ^             punctuation.section.parens.end.dhall
--                                    ^^^^^^^^^^             meta.parens.dhall
--                                               ^           keyword.operator.arrow.dhall
--                                                   ^       keyword.operator.arrow.dhall
--                                                     ^^^^  support.class.dhall
        =   λ(n : Natural) → λ(a : Type) → λ(x : a)
--      ^                                            keyword.operator.assignment.dhall
--          ^                                        keyword.control.dhall
--           ^                                       punctuation.section.parens.begin.dhall
--            ^                                      meta.label.dhall
--              ^                                    keyword.other.colon.dhall
--                ^^^^^^^                            support.class.dhall
--                       ^                           punctuation.section.parens.end.dhall
--           ^^^^^^^^^^^^^                           meta.parens.dhall
--                         ^                         keyword.operator.arrow.dhall
--                           ^                       keyword.control.dhall
--                            ^                      punctuation.section.parens.begin.dhall
--                             ^                     meta.label.dhall
--                               ^                   keyword.other.colon.dhall
--                                 ^^^^              keyword.other.dhall
--                                     ^             punctuation.section.parens.end.dhall
--                            ^^^^^^^^^^             meta.parens.dhall
--                                       ^           keyword.operator.arrow.dhall
--                                         ^         keyword.control.dhall
--                                          ^        punctuation.section.parens.begin.dhall
--                                           ^       meta.label.dhall
--                                             ^     keyword.other.colon.dhall
--                                               ^   meta.label.dhall
--                                                ^  punctuation.section.parens.end.dhall
--                                          ^^^^^^^  meta.parens.dhall
        →   List/build a
--      ^               keyword.operator.arrow.dhall
--          ^^^^^^^^^^  entity.name.function
            (   λ(list : Type)
--          ^                   punctuation.section.parens.begin.dhall
--              ^               keyword.control.dhall
--               ^              punctuation.section.parens.begin.dhall
--                ^^^^          meta.label.dhall
--                     ^        keyword.other.colon.dhall
--                       ^^^^   keyword.other.dhall
--                           ^  punctuation.section.parens.end.dhall
--               ^^^^^^^^^^^^^  meta.parens.dhall meta.parens.dhall
--          ^^^^^^^^^^^^^^^^^^  meta.parens.dhall
            →   λ(cons : a → list → list)
--          ^                              keyword.operator.arrow.dhall
--              ^                          keyword.control.dhall
--               ^                         punctuation.section.parens.begin.dhall
--                ^^^^                     meta.label.dhall
--                     ^                   keyword.other.colon.dhall
--                         ^               keyword.operator.arrow.dhall
--                                ^        keyword.operator.arrow.dhall
--                                      ^  punctuation.section.parens.end.dhall
--               ^^^^^^^^^^^^^^^^^^^^^^^^  meta.parens.dhall meta.parens.dhall
--          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^  meta.parens.dhall
            →   Natural/fold n list (cons x)
--          ^                                 keyword.operator.arrow.dhall
--              ^^^^^^^^^^^^                  entity.name.function
--                                  ^         punctuation.section.parens.begin.dhall
--                                         ^  punctuation.section.parens.end.dhall
--                                  ^^^^^^^^  meta.parens.dhall meta.parens.dhall
  --!!          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^  meta.parens.dhall
            )
--          ^  punctuation.section.parens.end.dhall
-- ^^^^^^^^^^  meta.parens.dhall


in  let replicateAscii : Natural -> forall(a : Type) -> a -> List a
--  ^^^                                                       keyword.other.let.dhall
--      ^^^^^^^^^^^^^^                                             variable.other.constant.dhall
--                     ^                                           meta.declaration.expression.let.dhall
--                       ^^^^^^^                                   support.class.dhall
--                               ^^                                keyword.operator.arrow.dhall
--                                  ^^^^^^                         storage.modifier.universal-quantifier.dhall
--                                        ^                        punctuation.section.parens.begin.dhall
--                                         ^                       meta.label.dhall
--                                           ^                     keyword.other.colon.dhall
--                                             ^^^^                keyword.other.dhall
--                                                 ^               punctuation.section.parens.end.dhall
--                                        ^^^^^^^^^^               meta.parens.dhall
--                                                   ^^            keyword.operator.arrow.dhall
--                                                        ^^       keyword.operator.arrow.dhall
--                                                           ^^^^  support.class.dhall
        =   \(n : Natural) -> \(a : Type) -> \(x : a)
--      ^                                            keyword.operator.assignment.dhall
--          ^                                        keyword.control.dhall
--           ^                                       punctuation.section.parens.begin.dhall
--            ^                                      meta.label.dhall
--              ^                                    keyword.other.colon.dhall
--                ^^^^^^^                            support.class.dhall
--                       ^                           punctuation.section.parens.end.dhall
--           ^^^^^^^^^^^^^                           meta.parens.dhall
--                         ^^                         keyword.operator.arrow.dhall
--                            ^                       keyword.control.dhall
--                             ^                      punctuation.section.parens.begin.dhall
--                              ^                     meta.label.dhall
--                                ^                   keyword.other.colon.dhall
--                                  ^^^^              keyword.other.dhall
--                                      ^             punctuation.section.parens.end.dhall
--                             ^^^^^^^^^^             meta.parens.dhall
--                                        ^^           keyword.operator.arrow.dhall
--                                           ^         keyword.control.dhall
--                                            ^        punctuation.section.parens.begin.dhall
--                                             ^       meta.label.dhall
--                                               ^     keyword.other.colon.dhall
--                                                 ^   meta.label.dhall
--                                                  ^  punctuation.section.parens.end.dhall
--                                            ^^^^^^^  meta.parens.dhall
        ->  List/build a
--      ^^               keyword.operator.arrow.dhall
--          ^^^^^^^^^^  entity.name.function
            (   \(list : Type)
--          ^                   punctuation.section.parens.begin.dhall
--              ^               keyword.control.dhall
--               ^              punctuation.section.parens.begin.dhall
--                ^^^^          meta.label.dhall
--                     ^        keyword.other.colon.dhall
--                       ^^^^   keyword.other.dhall
--                           ^  punctuation.section.parens.end.dhall
--               ^^^^^^^^^^^^^  meta.parens.dhall meta.parens.dhall
--          ^^^^^^^^^^^^^^^^^^  meta.parens.dhall
            ->  \(cons : a -> list -> list)
--          ^^                                keyword.operator.arrow.dhall
--              ^                            keyword.control.dhall
--               ^                           punctuation.section.parens.begin.dhall
--                ^^^^                       meta.label.dhall
--                     ^                     keyword.other.colon.dhall
--                         ^^                keyword.operator.arrow.dhall
--                                 ^^        keyword.operator.arrow.dhall
--                                        ^  punctuation.section.parens.end.dhall
--               ^^^^^^^^^^^^^^^^^^^^^^^^^^  meta.parens.dhall meta.parens.dhall
--          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^  meta.parens.dhall
            ->  Natural/fold n list (cons x)
--          ^^                                keyword.operator.arrow.dhall
--              ^^^^^^^^^^^^                  entity.name.function
--                                  ^         punctuation.section.parens.begin.dhall
--                                         ^  punctuation.section.parens.end.dhall
--                                  ^^^^^^^^  meta.parens.dhall meta.parens.dhall
--          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^  meta.parens.dhall
            )
--          ^  punctuation.section.parens.end.dhall
-- ^^^^^^^^^^  meta.parens.dhall

in  let compose
--  ^^^          keyword.other.let.dhall
--      ^^^^^^^  variable.other.constant.dhall
        : forall(a : Type) -> forall(b : Type) -> forall(c : Type)
--      ^                                                           meta.declaration.expression.let.dhall
--        ^^^^^^                                                    storage.modifier.universal-quantifier.dhall
--              ^                                                   punctuation.section.parens.begin.dhall
--               ^                                                  meta.label.dhall
--                 ^                                                keyword.other.colon.dhall
--                   ^^^^                                           keyword.other.dhall
--                       ^                                          punctuation.section.parens.end.dhall
--              ^^^^^^^^^^                                          meta.parens.dhall
--                         ^^                                       keyword.operator.arrow.dhall
--                            ^^^^^^                                storage.modifier.universal-quantifier.dhall
--                                  ^                               punctuation.section.parens.begin.dhall
--                                   ^                              meta.label.dhall
--                                     ^                            keyword.other.colon.dhall
--                                       ^^^^                       keyword.other.dhall
--                                           ^                      punctuation.section.parens.end.dhall
--                                  ^^^^^^^^^^                      meta.parens.dhall
--                                             ^^                   keyword.operator.arrow.dhall
--                                                ^^^^^^            storage.modifier.universal-quantifier.dhall
--                                                      ^           punctuation.section.parens.begin.dhall
--                                                       ^          meta.label.dhall
--                                                         ^        keyword.other.colon.dhall
--                                                           ^^^^   keyword.other.dhall
--                                                               ^  punctuation.section.parens.end.dhall
--                                                      ^^^^^^^^^^  meta.parens.dhall
        -> (a -> b) -> (b -> c) -> (a -> c)
--      ^^                                   keyword.operator.arrow.dhall
--         ^                                 punctuation.section.parens.begin.dhall
--            ^^                             keyword.operator.arrow.dhall
--                ^                          punctuation.section.parens.end.dhall
--         ^^^^^^^^                          meta.parens.dhall
--                  ^^                       keyword.operator.arrow.dhall
--                     ^                     punctuation.section.parens.begin.dhall
--                        ^^                 keyword.operator.arrow.dhall
--                            ^              punctuation.section.parens.end.dhall
--                     ^^^^^^^^              meta.parens.dhall
--                              ^^           keyword.operator.arrow.dhall
--                                 ^         punctuation.section.parens.begin.dhall
--                                    ^^     keyword.operator.arrow.dhall
--                                        ^  punctuation.section.parens.end.dhall
--                                 ^^^^^^^^  meta.parens.dhall

        =  λ(A : Type)   -> λ(B : Type)   -> λ(C : Type)
--      ^                                                 keyword.operator.assignment.dhall
--         ^                                              keyword.control.dhall
--          ^                                             punctuation.section.parens.begin.dhall
--           ^                                            meta.label.dhall
--             ^                                          keyword.other.colon.dhall
--               ^^^^                                     keyword.other.dhall
--                   ^                                    punctuation.section.parens.end.dhall
--          ^^^^^^^^^^                                    meta.parens.dhall
--                       ^^                               keyword.operator.arrow.dhall
--                          ^                             keyword.control.dhall
--                           ^                            punctuation.section.parens.begin.dhall
--                            ^                           meta.label.dhall
--                              ^                         keyword.other.colon.dhall
--                                ^^^^                    keyword.other.dhall
--                                    ^                   punctuation.section.parens.end.dhall
--                           ^^^^^^^^^^                   meta.parens.dhall
--                                        ^^              keyword.operator.arrow.dhall
--                                           ^            keyword.control.dhall
--                                            ^           punctuation.section.parens.begin.dhall
--                                             ^          meta.label.dhall
--                                               ^        keyword.other.colon.dhall
--                                                 ^^^^   keyword.other.dhall
--                                                     ^  punctuation.section.parens.end.dhall
--                                            ^^^^^^^^^^  meta.parens.dhall
        -> λ(f : A -> B) -> λ(g : B -> C) -> λ(x : A)
--      ^^                                             keyword.operator.arrow.dhall
--         ^                                           keyword.control.dhall
--          ^                                          punctuation.section.parens.begin.dhall
--           ^                                         meta.label.dhall
--             ^                                       keyword.other.colon.dhall
--                 ^^                                  keyword.operator.arrow.dhall
--                     ^                               punctuation.section.parens.end.dhall
--          ^^^^^^^^^^^^                               meta.parens.dhall
--                       ^^                            keyword.operator.arrow.dhall
--                          ^                          keyword.control.dhall
--                           ^                         punctuation.section.parens.begin.dhall
--                            ^                        meta.label.dhall
--                              ^                      keyword.other.colon.dhall
--                                  ^^                 keyword.operator.arrow.dhall
--                                      ^              punctuation.section.parens.end.dhall
--                           ^^^^^^^^^^^^              meta.parens.dhall
--                                        ^^           keyword.operator.arrow.dhall
--                                           ^         keyword.control.dhall
--                                            ^        punctuation.section.parens.begin.dhall
--                                             ^       meta.label.dhall
--                                               ^     keyword.other.colon.dhall
--                                                  ^  punctuation.section.parens.end.dhall
--                                            ^^^^^^^  meta.parens.dhall
        -> g (f x)
--      ^^          keyword.operator.arrow.dhall
--           ^      punctuation.section.parens.begin.dhall
--               ^  punctuation.section.parens.end.dhall
--           ^^^^^  meta.parens.dhall

in  let Nesting : Type = < Inline : {} | Nested : Text >
--  ^^^                                                   keyword.other.let.dhall
--      ^^^^^^^                                           variable.other.constant.dhall
--              ^                                         meta.declaration.expression.let.dhall
--                ^^^^                                    keyword.other.dhall
--                     ^                                  keyword.operator.assignment.dhall
--                       ^                                keyword.operator.union.begin.dhall
--                         ^^^^^^                         constant.other.attribute-name.dhall
--                                ^                       punctuation.separator.dictionary.key-value.dhall
--                                  ^                     keyword.operator.record.begin.dhall
--                                   ^                    keyword.operator.record.end.dhall
--                                  ^^                    meta.declaration.data.record.block.dhall
--                                     ^                  punctuation.separator.dictionary.pair.dhall
--                                       ^^^^^^           constant.other.attribute-name.dhall
--                                              ^         punctuation.separator.dictionary.key-value.dhall
--                                                ^^^^    meta.declaration.data.union.type.dhall
--                                                     ^  keyword.operator.union.end.dhall
--                       ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^  meta.declaration.data.union.block.dhall

in  let Tagged : Type → Type
--  ^^^                       keyword.other.let.dhall
--      ^^^^^^                variable.other.constant.dhall
--             ^              meta.declaration.expression.let.dhall
--               ^^^^         keyword.other.dhall
--                    ^       keyword.operator.arrow.dhall
--                      ^^^^  keyword.other.dhall
        = λ(a : Type) → {field : Text, nesting : ./Nesting, contents : a}
--      ^                                                                  keyword.operator.assignment.dhall
--        ^                                                                keyword.control.dhall
--         ^                                                               punctuation.section.parens.begin.dhall
--          ^                                                              meta.label.dhall
--            ^                                                            keyword.other.colon.dhall
--              ^^^^                                                       keyword.other.dhall
--                  ^                                                      punctuation.section.parens.end.dhall
--         ^^^^^^^^^^                                                      meta.parens.dhall
--                    ^                                                    keyword.operator.arrow.dhall
--                      ^                                                  keyword.operator.record.begin.dhall
--                       ^^^^^                                             constant.other.attribute-name.dhall
--                             ^                                           punctuation.separator.dictionary.key-value.dhall
--                               ^^^^                                      support.class.dhall
--                                   ^                                     punctuation.separator.dictionary.pair.dhall
--                                     ^^^^^^^                             constant.other.attribute-name.dhall
--                                             ^                           punctuation.separator.dictionary.key-value.dhall
--                                               ^^^^^^^^^                 meta.path.file.dhall
--                                                        ^                punctuation.separator.dictionary.pair.dhall
--                                                          ^^^^^^^^       constant.other.attribute-name.dhall
--                                                                   ^     punctuation.separator.dictionary.key-value.dhall
--                                                                      ^  keyword.operator.record.end.dhall
--                      ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^  meta.declaration.data.record.block.dhall

in  {=} : {}
--  ^         keyword.operator.record.begin.dhall
--   ^        punctuation.separator.dictionary.key-value.dhall
--    ^       keyword.operator.record.end.dhall
--  ^^^       meta.declaration.data.record.block.dhall
--      ^     keyword.other.colon.dhall
--        ^   keyword.operator.record.begin.dhall
--         ^  keyword.operator.record.end.dhall
--        ^^  meta.declaration.data.record.block.dhall
