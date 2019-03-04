let MakeItem : List ./Node.dhall → ./Item.dhall
    =   λ(xs : List ./Node.dhall)
    →   λ(Node : Type)
    →   λ(Item : Type)
    →   λ(Items : Item → Node)
    →   λ(Div  : Node → Node)
    →   λ(Lit : Text → Node)
    →   λ(MakeItem : List Node → Item)
    →   let List/map = https://raw.githubusercontent.com/dhall-lang/dhall-lang/0a7f596d03b3ea760a96a8e03935f4baa64274e1/Prelude/List/map
    in  let f = λ(x : ./Node.dhall) → x Node Item Items Div Lit MakeItem
    in  MakeItem (List/map ./Node.dhall Node f xs)
  
in  MakeItem