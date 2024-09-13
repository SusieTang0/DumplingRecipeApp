import React, { useState, useEffect } from 'react';
import { Image, Text, Platform, View, Button, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import styles from "../styles/styles";
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';


type Recipe = {
  id: number;
  title: string;
  summary: string;
  image: string;
  servings: number;
  readyInMinutes: number;
  extendedIngredients: { name: string; original: string ;image:string}[];
  analyzedInstructions: { number: number; steps: string;}[];
}

const RecipeDetails: React.FC = () => {
  const router = useRouter();
  const { recipeId:recipeParam } = useLocalSearchParams();
  const [recipeData, setRecipeData] = useState<Recipe | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    console.log(recipeParam);
    const fetchRecipe = async () => {
      if (recipeParam != null) {
        
          try {
            const decodedRecipeId = decodeURIComponent(recipeParam as string);
            const recipeIds = JSON.parse(decodedRecipeId);
            const response = await axios.get(`https://api.spoonacular.com/recipes/${recipeIds}/information`, {
              params: {
                apiKey: '53b84dc3adc445898ab9b81020960a4a'
              }
            });
            
            const thisRecipe:Recipe= {
              id: response.data.id,
              title: response.data.title,
              image: response.data.image,
              servings: response.data.servings,
              readyInMinutes: response.data.readyInMinutes,
              summary: response.data.summary,
              extendedIngredients: response.data.extendedIngredients.map((ingredient: any) => ({
                  name: ingredient.name,
                  original: ingredient.original,
                  image: ingredient.image
              })),
              analyzedInstructions: response.data.analyzedInstructions[0].steps.map((step: any) => ({
                number: step.number,
                steps: step.step,
              }))
            }
            setRecipeData(thisRecipe);
        } catch (e) {
            setError("Failed to parse recipe data.");
        }
      }
    };

  fetchRecipe();
}, [recipeParam]);

    if (!recipeData) {
      return <Text>No recipe selected</Text>;
    }

    return (
        <>
            <ScrollView >
              <View style={styles.container}>
                <Image source={{uri:recipeData.image}} style={style.image} />
                
                    <Text style={styles.subtitle}>{recipeData.title}</Text>
                    <View style={styles.view}>
                        {/* <Text style={styles.blacktext}>{recipeData.summary}</Text> */}
                        <View style={style.card}>
                        <Text style={styles.blacktext}>Serves: {recipeData.servings}</Text>
                        <Text style={styles.blacktext}>Ready in: {recipeData.readyInMinutes}</Text>
                        </View>
                        <View style={style.card}>
                            <Text style={styles.blacktextbold}>Ingredients</Text>
                            {recipeData.extendedIngredients.map((ingredient, index) => (
                                <View key={index}>
                                    <Text style={styles.blacktext}>{ingredient.original}</Text>
                                </View>
                            ))}
                        </View>
                        <View style={style.card}>
                            <Text style={styles.blacktextbold}>Instructions</Text>
                            {recipeData.analyzedInstructions.map((step, index) => (
                                <View key={index}>
                                    <Text style={styles.blacktext}>Step: {step.number}</Text>
                                    <Text style={styles.blacktext}>{step.steps}</Text>
                                </View>

                            ))}
                        </View>
                    </View>

                    <View></View>
                </View>
            </ScrollView>
            
        </>
    );
};

const style = StyleSheet.create({
    card: {
        margin: 10,
        padding: 5,
        borderRadius: 10,
        shadowColor: "grey",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5
    },
    image: {
        width: "100%",
        height: 350,
        borderRadius: 12,
    }

})
export default RecipeDetails;