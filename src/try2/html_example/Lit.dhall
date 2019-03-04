let Lit : Text → ./Node.dhall
    =   λ(x : Text)
    →   λ(Node : Type)
    →   λ(Item : Type)
    →   λ(Items : Item → Node)
    →   λ(Div  : Node → Node)
    →   λ(Lit : Text → Node)
    →   λ(MakeItem : List Node → Item)
    →   Lit x

in  Lit