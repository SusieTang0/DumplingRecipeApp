import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform, View, Text, FlatList, Alert, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import styles from "../../styles/styles";

import { auth, db } from "../../scripts/firebaseConfig.mjs";
import { ref, get } from "firebase/database";


// Type for pantry items
type PantryItem = {
  name: string;
  // quantity: string;
};

export default function grocery() {
  const [pantry, setPantry] = useState<PantryItem[]>([]);
  const [grocery, setGrocery] = useState<PantryItem[]>([]);
  // Function to fetch pantry data from Firebase
  useEffect(() => {
    const fetchPantryData = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
         
          const groceryRef = ref(db, `users/${user.uid}/groceryList`);
          
          const snapshot = await get(groceryRef);
          if (snapshot.exists()) {
            const groceryData = snapshot.val();
      
            const formattedData = Object.entries(groceryData).map(([key,value]) => ({
              key,
              name: value as string[]
             }));

            const list: string[] = [];
            for (let index = 0; index < formattedData.length; index++) {
              const item = formattedData[index];
              for (const key in item.name) {
                if (Object.prototype.hasOwnProperty.call(item.name, key)) {
                  const ingredients = item.name[key]; // This is an array of strings
                  list.push(...ingredients); // Spread operator to add elements to the list
                }
              }
            }
            const set: Set<string> = new Set(list);
            const uniqueArrayAlt: string[] = [...set];

            // setPantry(pantryData || []);
            const pantryItems: PantryItem[] = uniqueArrayAlt.map(name => ({
              name
            }));
            setPantry(pantryItems);
           

          } else {
            Alert.alert("No pantry data found.");
          }

        } catch (error) {
          Alert.alert("Error fetching pantry data");
        }
      } else {
        Alert.alert("No user signed in");
      }
    };

    fetchPantryData();
  }, []);

  // Render pantry items in a FlatList
  const renderPantryItem = ({ item }: { item: PantryItem }) => (
    <View style={style.pantryItem}>
      <Text style={style.pantryItemText}>{item.name}</Text>
      {/* <Text style={styles.pantryItemQuantity}>{item.quantity}</Text> */}
    </View>
  );
  
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#ffffff', dark: '#353636' }}
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

       {/* Thisis the start of edit area */}
        {/* Title */}
      <ThemedView style={styles.titleContainer}>
        <ThemedText style={styles.header} >Grocery List</ThemedText>
      </ThemedView>

      {/* Adding the GroceryList component to display the list */}
      <ThemedView style={style.container}>
        <FlatList
            data={pantry}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderPantryItem}

          />
      </ThemedView>
    </ParallaxScrollView>
  );
}

const style = StyleSheet.create({
  // pantryItem: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   padding: 5,
  //   borderBottomColor: "#F59D56",
  //   borderBottomWidth: .5
  // },
  // form:{
  //   flexDirection: 'row',
  //   justifyContent: 'center',
  //   alignItems:"center"
  // },

  container: {
    flexDirection: 'row',
    flex: 1,
    padding: 10,
    backgroundColor: '#ffffff',
  },
  pantryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', // Center items vertically
    padding: 15,
    marginVertical: 5,
    backgroundColor: '#ffffff', // Background color of each item
    borderRadius: 8, // Rounded corners
    shadowColor: '#000', // Shadow color for elevation effect
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.1, // Shadow opacity
    shadowRadius: 4, // Shadow radius
    elevation: 2, // For Android shadow
  },
  pantryItemText: {
    fontSize: 16,
    color: '#333', // Text color
  },

})

