# Dumpling-Recipe-App

Method for Pantry function ( Shawnelle ):









Method for Recipes function ( Shuting ):
1. getRecipes() ; 
    inoput: string (foodname)  
    output: List<Recipe> ( recipes which contain this food)
2. matchRecipes();
    input:  List<Recipe> （recipes for all the foods）, List<Food> （Foods in the pantry） ,List<Food> （ the Foodlist based the eating habit in profile）
    output: List<Recipe> 
3. void addRecipeToCart();
    input: Recipe ()
4. void deleteRecipeFromCart();
    input: string ( recipeId)
5. getRecipesFoods();
    input: List<Recipe> (recipes list in the cart)
    output: List<Food> (a set of foods from all the recipes int the cart list)


Method for Grocery List function ( Yingying ):
1.generateGroceryList(recipeFoods: string[], pantryFoods: string[]): string[]
    Input:
        recipeFoods: string[] (list of foods required by the recipes)
        pantryFoods: string[] (list of foods already in the pantry)
    Output: string[] (list of foods that need to be bought)
2. viewGroceryList(groceryList: string[]): string[]
    Input: groceryList: string[]
    Output: string[] (return the current grocery list)
3. updateGroceryList(groceryList: string[], item: string): string[]
    Input:
        groceryList: string[] (current grocery list)
        item: string (item to add or update in the list)
    Output: string[] (updated grocery list)
4. deleteItemFromGroceryList(groceryList: string[], item: string): string[]
    Input:
        groceryList: string[] (current grocery list)
        item: string (item to delete from the list)
    Output: string[] (updated grocerylist)



