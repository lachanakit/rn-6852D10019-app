import { useRouter } from "expo-router";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Image
          source={require("../../assets/images/taxi.png")}
          style={styles.taxiImage}
          resizeMode="contain"
        />
        <Text style={styles.title}>Taxi Fare Calculator</Text>
        <Text style={styles.subtitle}>คำนวณค่าโดยสารแท็กซี่</Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.8}
        onPress={() => router.push("/taxi_fare")}
      >
        <Text style={styles.buttonText}>เริ่มคำนวณ</Text>
      </TouchableOpacity>

      <View style={styles.profileSection}>

        <Image
          source={require("../../assets/images/me.jpg")}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>ลชนา กิตกุลทรัพย์</Text>
        <Text style={styles.profileId}>รหัสนักศึกษา 6852D10019</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 60,
    paddingHorizontal: 24,
  },
  topSection: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  taxiImage: {
    width: 200,
    height: 140,
    marginBottom: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#F5A623",
    marginBottom: 6,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 15,
    color: "#888",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#F5A623",
    paddingVertical: 14,
    paddingHorizontal: 60,
    borderRadius: 12,
    shadowColor: "#F5A623",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
    marginBottom: 40,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  profileSection: {
    alignItems: "center",
  },
  profileImage: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginBottom: 8,
    backgroundColor: "#eee",
  },
  profileName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  profileId: {
    fontSize: 13,
    color: "#F5A623",
    marginTop: 2,
  },
});