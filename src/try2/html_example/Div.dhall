let Div : ./Node.dhall → ./Node.dhall
    =   λ(x : ./Node.dhall)
    →   λ(Node : Type)
    →   λ(Item : Type)
    →   λ(Items : Item → Node)
    →   λ(Div  : Node → Node)
    →   λ(Lit : Text → Node)
    →   λ(MakeItem : List Node → Item)
    →   Div (x Node Item Items Div Lit MakeItem)

in  Div