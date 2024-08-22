import { useLocalSearchParams } from "expo-router";
import { Link } from "expo-router";
import { View, Text, StyleSheet } from "react-native";

export default function Usuario() {
  const { id } = useLocalSearchParams();
  return (
    <View style={styles.container}>
        <Text>Informação do ususario</Text>
        <Link href="/">Ir pra home</Link>
    </View>
  )
}
