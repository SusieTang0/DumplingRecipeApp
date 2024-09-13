import React, { useState, useEffect } from 'react';
import { Image, Text, Platform, View, Button, TouchableOpacity, Alert, FlatList } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import styles from "../../styles/styles";
import { Link, useNavigation, useRouter } from 'expo-router';
const logo = require("../../assets/images/partial-react-logo.png");
import { auth, db } from "../../scripts/firebaseConfig.mjs";
import { ref, get } from "firebase/database";
import RecipeCard from '@/components/RecipeCard';
import axios from 'axios';



// Basically a class for Recipe

type Recipe = {
  id: number;
  title: string;
  image: string;
}

export default function HomeScreen() {
  const [username, setUsername] = useState<string>("");
  const [favCuisines, setFavCuisines] = useState<string[]>([]);
  const [myDiet, setMyDiet] = useState<string[]>([]);
  const [favDishes, setFavDishes] = useState<string[]>([]);
  const [intolerances, setIntolerances] = useState<string[]>([]);
  const [pantry,setPantry] = useState<string[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  //passes the selected recipe information to RecipeDetails
  const handlePress = (recipeId: number) => {
    const data = encodeURIComponent(JSON.stringify(recipeId));
    router.push(`../RecipeDetails?recipeId=${data}`);
    // router.push(`../../components/RecipeDetails?recipe=${data}`);
  }

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const userRef = ref(db, `users/${user.uid}`);
          const snapshot = await get(userRef);

          if (snapshot.exists()) {
            const data = snapshot.val();

            setUsername(data.username || "");
            setFavCuisines(data.favCuisines || []);
            setMyDiet(data.myDiet || []);
            setFavDishes(data.favDishes || []);
            setIntolerances(data.intolerances || []);
            setPantry(data.pantry|| []);
            
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

    const fetchRandomRecipes = async () => {
      try {
        /* ----------- use the spoonacular Apis ----------------*/
        const response = await axios.get('https://api.spoonacular.com/recipes/random', {
          params: {
            apiKey: "cc65630bf2074ce5adbafef9be645fcf",
            number:4
          }
        });
        
        const allRecipes: Recipe[]=response.data.map((item: any) => ({
          id: item.id,
          title: item.title,
          image: item.image,
        }));


      setRecipes(allRecipes);
      } catch (error) {
        setError('Error fetching recipes here');
      }
    };

    const fetchRecipes = async () => {
      try {
        const thisIntolerances: String = Object.values(intolerances).join(',');
        const thisDiet: String = Object.values(myDiet).join(',');
        /* ----------- use the spoonacular Apis ----------------*/
        const response = await axios.get('https://api.spoonacular.com/recipes/complexSearch', {
          params: {
            apiKey: "53b84dc3adc445898ab9b81020960a4a",
            intolerances:thisIntolerances,
            diet:thisDiet,
            number:1
          }
        });
        const allRecipes: Recipe[] = response.data.results.map((item: any) => ({
          id: item.id,
          title: item.title,
          image: item.image,
        }));
        setRecipes(allRecipes);

       
      } catch (error) {
        setError('Error fetching recipes here');
      }
    };

    fetchUserData();
    if( myDiet == null && intolerances == null){
      fetchRandomRecipes();
    }else{
      fetchRecipes();
    }
    
  }, []);

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
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText  type="title" style={styles.header}>Welcome, {username}</ThemedText>
      </ThemedView>
      <ThemedText style={styles.blacktext}>Here are a few recipe suggestions to get you started.</ThemedText>
      <View style={styles.container2}>
      <FlatList
        data={recipes}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePress(item.id)} >
            <RecipeCard recipe={item} />
          </TouchableOpacity>
        )}
      />
      </View>
    </ParallaxScrollView>
  );
};
function setError(arg0: string) {
  throw new Error('Function not implemented.');
}

