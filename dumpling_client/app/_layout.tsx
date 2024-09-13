import { MyProvider } from "@/components/MyContext";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
   <MyProvider>
    <Stack>
      <Stack.Screen 
      name="index" 
      options={{headerShown:false}}/>
      <Stack.Screen name="login" 
      options={{
        headerBackVisible:true,
        headerTitle:"",
        headerStyle:{backgroundColor:"transparent"},
        headerTintColor:"#011627",
        headerBackTitleVisible:false,
        }}/>
      <Stack.Screen name="signup" 
      options={{
        headerBackVisible:true,
        headerTitle:"",
        headerStyle:{backgroundColor:"transparent"},
        headerTintColor:"#011627",
        headerBackTitleVisible:false,
        }}/>
       
        
        <Stack.Screen name="(tabs)" 
      options={{
        headerBackVisible:true,
        headerTitle:"",
        headerStyle:{backgroundColor:"transparent"},
        headerTintColor:"#011627",
        headerBackTitleVisible:false,
        headerShown:false,
        }}/>
    </Stack>
    </MyProvider>
  );
}
