import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, Image,Alert, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import styles from '@/styles/styles';
import { auth, db } from "../../scripts/firebaseConfig.mjs";
import { get, push, ref, remove, set } from 'firebase/database';
import RecipeCard from '@/components/RecipeCard';
import RecipeCardSmall from '@/components/RecipeCardSmall';
import MyContext from '@/components/MyContext';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
// Define the Recipe type

type Ingredient = {
  id: number;
  name: string;
  image: string;
  amount: number;
  unit: string;
};


type Recipe = {
    id: number;
    title: string;
    image: string;
    usedIngredientCount: number;
    missedIngredientCount: number;
    missedIngredients: Ingredient[];
  };


export default function RecipesScreen() {
  const [pantry,setPantry] = useState<string[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [newItem, setNewItem] = useState<string>("");
 


  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const userRef = ref(db, `users/${user.uid}`);
          const snapshot = await get(userRef);

          if (snapshot.exists()) {
            const data = snapshot.val();
            setPantry(data.pantry|| []);
            console.log("get pantry:" + data.pantry);
          } else {
            Alert.alert("User needs to set up their profile.");
          }
        } catch (error) {
          Alert.alert("Error fetching user data");
        }
      } else {
        Alert.alert("No user signed in");
      }
    };

    const fetchRecipes = async () => {
      try {
        const thisPantry: String = Object.values(pantry).join(','); 
        /* ----------- use the spoonacular Apis : findByIngredients ----------------*/
        const response = await axios.get('https://api.spoonacular.com/recipes/findByIngredients', {
          params: {
            apiKey: '53b84dc3adc445898ab9b81020960a4a',
            ingredients:thisPantry,
            ranking:2,
            number:1
          }
        });

        setRecipes(response.data);
        const allRecipes = response.data.results.map((item: any) => {
          return {
            id: item.id,
            title: item.title,
            image: item.image,
            usedIngredientCount: item.usedIngredientCount,
            missedIngredientCount: item.missedIngredientCount,
            missedIngredients: item.missedIngredients.map((ingredient: any) => ({
              id: ingredient.id,
              name: ingredient.name,
              image: ingredient.image,
              amount: ingredient.amount,
              unit: ingredient.unitShort
            }))
          };
        });
        setRecipes(allRecipes);
      } catch (error) {
        setError('Error fetching recipes here');
      }
    };
    fetchUserData();
    fetchRecipes();

  }, []);

  // function handlePress(item: Recipe): void {
  //   throw new Error('Function not implemented.');
  // }
  const router = useRouter();
  //passes the selected recipe information to RecipeDetails
  const handlePress = (recipeId: number) => {
    const data = encodeURIComponent(JSON.stringify(recipeId));
    router.push(`../RecipeDetails?recipeId=${data}`);
  }

  const addItem= async (recipe: Recipe) => {
    const user = auth.currentUser;
    if (user) {
      if (newItem == null) {
        Alert.alert("Enter an item.");
        return;
      }
      const groceryRef = ref(db, `users/${user.uid}/groceryList/${recipe.id}`);
      const newItemRef = push(groceryRef);
      const ingredients = recipe.missedIngredients.map((item: { name: string }) => item.name);
     
      await set(newItemRef,  ingredients);

      setNewItem("");
    } else {
      Alert.alert("Please enter an item.");
    }
  }
  const removeItem = async (id: number) => {
    const user = auth.currentUser;
    if (user) {
      const itemRef = ref(db, `users/${user.uid}/groceryList/${id}`);
      await remove(itemRef);
    } else {
      Alert.alert("You need to log in to change this information.")
    }
  }

  return (
    <ParallaxScrollView
    headerBackgroundColor={{ light: '#', dark: '#353636' }}
    headerImage={
      <View style={styles.container}>
          <ThemedView style={styles.divider} />
          <Image
            source={require('@/assets/images/react-logo.png')}
            style={styles.reactLogo}
          />
           {/* <TouchableOpacity style={styles.reactButton} >
            <Text style={styles.whitefont}>+</Text>
          </TouchableOpacity> */}
          <ThemedView style={styles.divider2} />
          
        </View>
    }>
    <ThemedView style={styles.titleContainer}>
      <ThemedText style={styles.subtitle}>My Recipes</ThemedText>
    </ThemedView>
    <ThemedText style={styles.blacktext}>Here are a few recipe suggestions to get you started.</ThemedText>
    <View >

      {error && <Text>{error}</Text>}
        <FlatList
          data={recipes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View >
                <TouchableOpacity onPress={() => handlePress(item.id)}>
                  <RecipeCardSmall recipe={item} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => removeItem(item.id)}>
                <Ionicons name="trash-outline" size={24} color="red" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.btn_recipe_sm} onPress={() => addItem(item)}>
                <Text style={styles.whitefont}>+</Text>
              </TouchableOpacity>
            </View>
          )}  />

       
    </View>
  </ParallaxScrollView>
   
  );

  
}
const style={
  container: {
    padding:10,
    width:'100%',
    height:'100%',
    flexDirection: 'row', 
    alignItems: 'center', 
    borderRadius: 10,
    shadowColor:"grey",
    shadowOffset:{width:0, height:4},
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation:5
  },
 
  
}