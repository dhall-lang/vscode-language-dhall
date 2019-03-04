let Node : Type
    =   ∀(Node : Type)
    →   ∀(Item : Type)
    →   ∀(Items : Item → Node)
    →   ∀(Div  : Node → Node)
    →   ∀(Lit : Text → Node)
    →   ∀(MakeItem : List Node → Item)
    →   Node

in  Node