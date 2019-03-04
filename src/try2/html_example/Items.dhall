let Items : ./Item.dhall → ./Node.dhall
    =   λ(x : ./Item.dhall)
    →   λ(Node : Type)
    →   λ(Item : Type)
    →   λ(Items : Item → Node)
    →   λ(Div  : Node → Node)
    →   λ(Lit : Text → Node)
    →   λ(MakeItem : List Node → Item)
    →   Items (x Node Item Items Div Lit MakeItem)

in  Items