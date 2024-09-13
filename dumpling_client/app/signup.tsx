import { Text, View, TextInput, TouchableOpacity, Image, Alert } from "react-native";
import styles from "../styles/styles";
import React, { useState } from "react";
import { Link, useRouter } from "expo-router";
import { auth } from "../scripts/firebaseConfig.mjs";
import { createUserWithEmailAndPassword } from "firebase/auth";

const logo = require("../assets/images/Dumpling.png");

export default function Signup() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const router = useRouter();

  const handleSignup = () => {
    if (password !== confirmPassword) {
      Alert.alert(confirmPassword);
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        Alert.alert("Sign up successful");
        router.push("/login");
      })
      .catch(error => {
        Alert.alert("Sign up failed", error.message);
      })

  }
  return (
    <View style={styles.container2}>
      <Image source={logo} />
      <Text style={styles.header}>Sign up</Text>
      <Text>Already have an account? <Link href="/login">Login</Link></Text>
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
        />
      </View>
      <View style={styles.form_group}>
        <Text style={styles.label}>Confirm Password</Text>
        <TextInput style={styles.input}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      </View>
      <View style={styles.form_group}>
        <TouchableOpacity style={styles.btn_main_md} onPress={handleSignup}>
          <Text style={styles.whitefont}>Sign up</Text>
        </TouchableOpacity>
      </View>

    </View>
  );

}