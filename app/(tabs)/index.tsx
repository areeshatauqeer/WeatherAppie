import React, { useState } from "react";
import { Keyboard } from "react-native";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

export default function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getWeather = async () => {
    Keyboard.dismiss();3
    if (!city.trim()) {
      setError("Please enter a city");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=3ccef347c142441d953165856261107&q=${city}&aqi=no`
      );

      const data = await response.json();

      if (data.error) {
        setError(data.error.message);
        setWeather(null);
      } else {
        setWeather(data);
      }
    } catch (err) {
      setError("Failed to fetch weather");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>🌤 Weather App</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter city"
        value={city}
        onChangeText={setCity}
      />

      <TouchableOpacity style={styles.button} onPress={getWeather}>
        <Text style={styles.buttonText}>Get Weather</Text>
      </TouchableOpacity>

      {loading && (
        <ActivityIndicator size="large" color="#2196F3" />
      )}

      {error ? (
        <Text style={styles.error}>{error}</Text>
      ) : null}

      {weather && (
        <View style={styles.card}>
          <Text style={styles.city}>
            📍 {weather.location.name}
          </Text>

          <Text style={styles.info}>
            🌡 Temperature: {weather.current.temp_c}°C
          </Text>

          <Text style={styles.info}>
            ☁ Condition: {weather.current.condition.text}
          </Text>

          <Text style={styles.info}>
            💧 Humidity: {weather.current.humidity}%
          </Text>

          <Text style={styles.info}>
            💨 Wind: {weather.current.wind_kph} km/h
          </Text>

          <Text style={styles.info}>
            🌍 Country: {weather.location.country}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    justifyContent: "center",
    padding: 20,
  },

  heading: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 25,
  },

  input: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
  },

  button: {
    backgroundColor: "#2196F3",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },

  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },

  error: {
    color: "red",
    textAlign: "center",
    marginBottom: 15,
  },

  card: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 15,
    elevation: 5,
  },

  city: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },

  info: {
    fontSize: 18,
    marginVertical: 5,
  },
});
