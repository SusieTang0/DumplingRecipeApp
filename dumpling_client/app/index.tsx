import { Text, View, Image, Pressable, TouchableOpacity } from "react-native";
import styles from "../styles/styles";
import { Link } from "expo-router";
import { ThemedView } from "@/components/ThemedView";

const logo = require("../assets/images/Dumpling.png");
const mascot = require("../assets/images/mascot.png")

export default function Welcome() {

  return (
    <Link href="/login">
    <View style={styles.container}>

        <Image source={logo} style={styles.mainLogo} />
        <Image source={mascot}/>
        <Text>Click anywhere to continue</Text>
    </View>
    </Link>
  );
}


