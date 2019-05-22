
{- COMMENTS -}

    -- foo

    {- bar -}

    {- lorem {- ipsum -} dolor -}
    -- consectetur {- adipisicing

    {- sit -- amet -}


{- DEFINITIONS -}

    let replicateUnicode : Natural → ∀(a : Type) → a → List a
        =   λ(n : Natural) → λ(a : Type) → λ(x : a)
        →   List/build a
            (   λ(list : Type)
            →   λ(cons : a → list → list)
            →   Natural/fold n list (cons x)
            )


in  let replicateAscii : Natural -> forall(a : Type) -> a -> List a
        =   \(n : Natural) -> \(a : Type) -> \(x : a)
        ->  List/build a
            (   \(list : Type)
            ->  \(cons : a -> list -> list)
            ->  Natural/fold n list (cons x)
            )

in  let compose
        : forall(a : Type) -> forall(b : Type) -> forall(c : Type)
        -> (a -> b) -> (b -> c) -> (a -> c)

        =  λ(A : Type)   -> λ(B : Type)   -> λ(C : Type)
        -> λ(f : A -> B) -> λ(g : B -> C) -> λ(x : A)
        -> g (f x)

in  let Nesting : Type = < Inline : {} | Nested : Text >

in  let Tagged : Type → Type
        = λ(a : Type) → {field : Text, nesting : ./Nesting, contents : a}

in  {=} : {}
