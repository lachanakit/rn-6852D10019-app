import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

function calculateFare(km: number, waitMinutes: number): number {
  if (!km || km <= 0) return 0;
  let fare = 35;

  if (km > 1) {
    const ranges = [
      { max: 10, rate: 6.5 },
      { max: 20, rate: 7.0 },
      { max: 40, rate: 8.0 },
      { max: 60, rate: 8.5 },
      { max: 80, rate: 9.0 },
      { max: Infinity, rate: 10.5 },
    ];
    let remaining = km - 1;
    let prev = 1;
    for (const range of ranges) {
      if (remaining <= 0) break;
      const chunk = Math.min(remaining, range.max - prev);
      fare += chunk * range.rate;
      remaining -= chunk;
      prev = range.max;
    }
  }

  fare += (waitMinutes || 0) * 3;
  return Math.round(fare * 100) / 100;
}

export default function TaxiFareScreen() {
  const router = useRouter();
  const [distance, setDistance] = useState("");
  const [waitTime, setWaitTime] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const [errors, setErrors] = useState<{ distance?: string; waitTime?: string }>({});

  function validate(): boolean {
    const e: { distance?: string; waitTime?: string } = {};
    if (!distance || isNaN(Number(distance)) || Number(distance) <= 0) {
      e.distance = "กรุณากรอกระยะทางให้ถูกต้อง";
    }
    if (waitTime !== "" && (isNaN(Number(waitTime)) || Number(waitTime) < 0)) {
      e.waitTime = "กรุณากรอกเวลารอให้ถูกต้อง";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleCalculate() {
    if (!validate()) return;
    const fare = calculateFare(Number(distance), Number(waitTime) || 0);
    setResult(fare);
  }

  function handleReset() {
    setDistance("");
    setWaitTime("");
    setResult(null);
    setErrors({});
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>Taxi Fare</Text>
        </View>

        {/* Taxi Image */}
        <View style={styles.imageContainer}>
          <Image
            source={require("../../assets/images/taxi.png")}
            style={styles.taxiImage}
            resizeMode="contain"
          />
        </View>

        {/* Form */}
        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>คำนวณค่าโดยสารแท็กซี่</Text>

          {/* Distance Input */}
          <Text style={styles.label}>ระยะทาง (กิโลเมตร) 📍</Text>
          <TextInput
            style={[styles.input, errors.distance ? styles.inputError : null]}
            placeholder="กรุณากรอกระยะทาง"
            placeholderTextColor="#bbb"
            keyboardType="decimal-pad"
            value={distance}
            onChangeText={(val) => {
              setDistance(val);
              setResult(null);
              setErrors((prev) => ({ ...prev, distance: undefined }));
            }}
          />
          {errors.distance ? (
            <Text style={styles.errorText}>{errors.distance}</Text>
          ) : null}

          {/* Wait Time Input */}
          <Text style={[styles.label, { marginTop: 14 }]}>เวลารถติด (นาที) 🕐</Text>
          <TextInput
            style={[styles.input, errors.waitTime ? styles.inputError : null]}
            placeholder="กรุณากรอกเวลารถติด"
            placeholderTextColor="#bbb"
            keyboardType="decimal-pad"
            value={waitTime}
            onChangeText={(val) => {
              setWaitTime(val);
              setResult(null);
              setErrors((prev) => ({ ...prev, waitTime: undefined }));
            }}
          />
          {errors.waitTime ? (
            <Text style={styles.errorText}>{errors.waitTime}</Text>
          ) : null}

          {/* Calculate Button */}
          <TouchableOpacity
            style={styles.calcButton}
            activeOpacity={0.8}
            onPress={handleCalculate}
          >
            <Text style={styles.calcButtonText}>คำนวณค่าโดยสาร</Text>
          </TouchableOpacity>

          {/* Reset Button */}
          <TouchableOpacity
            style={styles.resetButton}
            activeOpacity={0.8}
            onPress={handleReset}
          >
            <Text style={styles.resetButtonText}>ยกเลิก</Text>
          </TouchableOpacity>
        </View>

        {/* Result Card */}
        <View style={styles.resultCard}>
          <Text style={styles.resultLabel}>ค่าโดยสารแท็กซี่</Text>
          <Text style={styles.resultValue}>
            {result !== null ? result.toFixed(2) : "0.00"}
          </Text>
          <Text style={styles.resultUnit}>บาท</Text>
        </View>

        {/* Back Button */}
        <TouchableOpacity
          style={styles.backButton}
          activeOpacity={0.7}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>← กลับหน้าหลัก</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: "#f7f7f7",
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    backgroundColor: "#F5A623",
    paddingVertical: 18,
    alignItems: "center",
  },
  headerText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },
  imageContainer: {
    backgroundColor: "#fff",
    alignItems: "center",
    paddingVertical: 20,
  },
  taxiImage: {
    width: 180,
    height: 120,
  },
  formContainer: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  formTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: "#555",
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#fafafa",
    borderWidth: 1.5,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    color: "#333",
  },
  inputError: {
    borderColor: "#e74c3c",
  },
  errorText: {
    color: "#e74c3c",
    fontSize: 12,
    marginTop: 4,
  },
  calcButton: {
    backgroundColor: "#F5A623",
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 20,
  },
  calcButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  resetButton: {
    backgroundColor: "#888",
    borderRadius: 10,
    paddingVertical: 13,
    alignItems: "center",
    marginTop: 10,
  },
  resetButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  resultCard: {
    margin: 20,
    backgroundColor: "#FFF9E6",
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#F5C518",
    paddingVertical: 24,
    alignItems: "center",
  },
  resultLabel: {
    fontSize: 14,
    color: "#888",
    marginBottom: 4,
  },
  resultValue: {
    fontSize: 40,
    fontWeight: "700",
    color: "#F5A623",
  },
  resultUnit: {
    fontSize: 14,
    color: "#aaa",
    marginTop: 2,
  },
  backButton: {
    marginHorizontal: 20,
    borderWidth: 1.5,
    borderColor: "#F5A623",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
  },
  backButtonText: {
    color: "#F5A623",
    fontSize: 15,
    fontWeight: "600",
  },
});