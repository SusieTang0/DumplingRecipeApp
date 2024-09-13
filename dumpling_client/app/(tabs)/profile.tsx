import React, { useState, useEffect } from 'react';
import { Alert, Image, Platform, View, Text, TouchableOpacity } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import styles from "../../styles/styles";
import { Link, useRouter } from 'expo-router';
import { auth, db } from "../../scripts/firebaseConfig.mjs";
import { ref, get } from "firebase/database";
import { signOut } from 'firebase/auth';

const profImg = require("../../assets/images/profileimg.png");


export default function ProfileScreen() {
  const [username, setUsername] = useState<string>("");
  const [favCuisines, setFavCuisines] = useState<string[]>([]);
  const [myDiet, setMyDiet] = useState<string[]>([]);
  const [favDishes, setFavDishes] = useState<string[]>([]);
  const [intolerances, setIntolerances] = useState<string[]>([]);
  const router = useRouter();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        Alert.alert("Logout successful");
        router.push("/login");
      })
      .catch((error) => {
        Alert.alert("Error logging out. Please try again.");
      })
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
          } else {
            Alert.alert("User needs to set up their profile.");
          }
        } catch (error) {
          Alert.alert("Error fetching user data");
        }
      } else {
        Alert.alert("No user signed in");
      }
    }
    fetchUserData();
  }, []);

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
      <View style={styles.container2}>
        <Image source={profImg} />
      </View >
      <ThemedView style={styles.titleContainer}>
        <ThemedText style={styles.header}>Hey, {username} </ThemedText>
      </ThemedView>
      <View><Text style={styles.blacktext}>Let's have a look at your profile!</Text></View>

      <View style={styles.view}>
        <ThemedText style={styles.subtitle}>Allergies</ThemedText>
        {intolerances.length > 0 ? (
          intolerances.map((intolerance, index) => (
            <Text style={styles.blacktext} key={index}>{intolerance}</Text>
          ))
        ) : (
          <Text style={styles.blacktext}>None</Text>
        )}
      </View>
      <View style={styles.view}>
        <Text style={styles.subtitle}>Diet</Text>
        {myDiet.length > 0 ? (
          myDiet.map((diet, index) => (
            <Text style={styles.blacktext} key={index}>{diet}</Text>
          ))
        ) : (
          <Text style={styles.blacktext}>None</Text>
        )}
      </View>

      <View style={styles.view}>
        <Text style={styles.subtitle}>Favourite Cuisines</Text>
        {favCuisines.length > 0 ? (
          favCuisines.map((cuisine, index) => (
            <Text style={styles.blacktext} key={index}>{cuisine}</Text>
          ))
        ) : (
          <Text style={styles.blacktext}>None</Text>
        )}
      </View>

      <View style={styles.view}>
        <Text style={styles.subtitle}>Favourite Dishes</Text>
        {favDishes.length > 0 ? (
          favDishes.map((dish, index) => (
            <Text style={styles.blacktext} key={index}>{dish}</Text>
          ))
        ) : (
          <Text style={styles.blacktext}>None</Text>
        )}
      </View>
      <View style={styles.view} >
        <Link href="../../forms/editprofile"><Text style={styles.colorfont}>Edit profile</Text></Link>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.colorfont}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ParallaxScrollView>
  );
}

