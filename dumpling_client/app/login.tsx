import { Text, View, TextInput, TouchableOpacity, Image, Alert } from "react-native";
import styles from "../styles/styles";
import React, { useState, useEffect } from "react";
import { Link, useRouter } from "expo-router";
import { auth } from "../scripts/firebaseConfig.mjs";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";

const logo = require("../assets/images/Dumpling.png");

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        Alert.alert("Login successful");
        router.push("./(tabs)");
      })
      .catch((error) => {
        Alert.alert("Email or password is incorrect")
      });
  }

  useEffect(() =>{
    const unsubscribe = onAuthStateChanged(auth,(user) => {
      if(user){
        router.push("/(tabs)");
      }
    })
    return () => unsubscribe();
  },[]);

  return (
      <View style={styles.container2}>
        <Image source={logo} />
        <Text style={styles.header}>Login</Text>
        <Text>Don't have an account? <Link href="/signup">Sign up</Link></Text>
        <View style={styles.form_group}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none" />
        </View>
        <View style={styles.form_group}>
          <Text style={styles.label}>Password</Text>
          <TextInput style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry />
        </View>
        <View></View>
        <View>
          <TouchableOpacity style={styles.btn_main_md} onPress={handleLogin}>
            <Text style={styles.whitefont}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
  );

}