let Item : Type
    =   ∀(Node : Type)
    →   ∀(Item : Type)
    →   ∀(Items : Item → Node)
    →   ∀(Div  : Node → Node)
    →   ∀(Lit : Text → Node)
    →   ∀(MakeItem : List Node → Item)
    →   Item

in  Item