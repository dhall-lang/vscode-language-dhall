
let items = ./Items.dhall
(   ./MakeItem.dhall
    [   ./Lit.dhall "ABC"
    ,   ./Div.dhall
        (   ./Items.dhall
            (   ./MakeItem.dhall
                [   ./Lit.dhall "DEF"
                ,   ./Lit.dhall "GHI"
                ]
            )
        )
    ]
)
-- now we get monoid in the category of problems:
let itemToNode = \(item: Text) -> 
    ''
      <li>
        ${item}
      </li>
    ''
let divToNode  = \(node: Text) -> 
                 ''
                 <div>
                   ${node}
                 </div>
                 ''
let litToText  = λ(lit : Text ) -> 

''
${lit}
''
let concat = http://prelude.dhall-lang.org/Text/concat
      
let makeItems = λ(makeItem : List Text) -> 
  let 
     zs = concat makeItem 
  in ''
     <ul>
       ${zs}
     </ul>
     ''
in items Text Text itemToNode  divToNode litToText makeItems