import { useEffect, useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform, View, TextInput, TouchableOpacity, Text, Alert, FlatList } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { auth, db } from "../../scripts/firebaseConfig.mjs";
import { ref, set, remove, onValue, push } from "firebase/database";

import styles from "../../styles/styles";
import { useRouter } from 'expo-router';

export default function PantryScreen() {
  const [newItem, setNewItem] = useState<string>("");
  const [pantryItems, setPantryItems] = useState<{ key: string; name: string }[]>([]);

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const pantryRef = ref(db, `users/${user.uid}/pantry`);
      const unsubscribe = onValue(pantryRef, (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const items = Object.entries(data).map(([key, value]) => ({
            key,
            name: value as string
          }));
          setPantryItems(items);
        } else {
          setPantryItems([]);
        }
      });
      return () => unsubscribe();
    }
  }, []);

  const addItem = async () => {
    const user = auth.currentUser;
    if (user) {
      if (newItem == "") {
        Alert.alert("Enter an item.");
        return;
      }
      const pantryRef = ref(db, `users/${user.uid}/pantry`);
      const newItemRef = push(pantryRef);
      await set(newItemRef, newItem.trim());
      setNewItem("");
    } else {
      Alert.alert("Please enter an item.");
    }
  }

  const removeItem = async (key: string) => {
    const user = auth.currentUser;
    if (user) {
      const itemRef = ref(db, `users/${user.uid}/pantry/${key}`);
      await remove(itemRef);
    } else {
      Alert.alert("You need to log in to change this information.")
    }
  }
  return (
    <>
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
        <View >
          
          <ThemedView style={styles.view}>
            <ThemedText style={styles.subtitle}>Pantry Items</ThemedText>
            <FlatList
              data={pantryItems}
              keyExtractor={(item) => item.key}
              renderItem={({ item }) => (
                <View style={style.pantryItem}>
                  <Text style={styles.blacktext}>{item.name}</Text>
                  <TouchableOpacity onPress={() => removeItem(item.key)}>
                    <Ionicons name="trash-outline" size={24} color="red" />
                  </TouchableOpacity>
                </View>
              )}
            />
          </ThemedView>
          <ThemedView style={style.form}>
            <View style={styles.form_group}>
              <ThemedText style={styles.blacktext}>Add Pantry Item</ThemedText>
              <TextInput
                style={style.input}
                value={newItem}
                onChangeText={setNewItem}
                autoCapitalize="none" />
            </View>
            <TouchableOpacity style={styles.btn_main_sm} onPress={addItem}>
                <Text style={styles.whitefont}>+</Text>
              </TouchableOpacity>
          </ThemedView>
        </View>
      </ParallaxScrollView>

    </>
  );
}

const style = StyleSheet.create({
  pantryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
    borderBottomColor: "#F59D56",
    borderBottomWidth: .5
  },
  form:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems:"center"
  },
  input: {
    width: 250,
    height: 55,
    borderColor: "rgba(245, 157, 86, 0.5)",
    borderWidth: 1,
    borderRadius: 8,
    fontSize: 18,
    padding: 5,
}

})
