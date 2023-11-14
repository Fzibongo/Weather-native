import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const fetchData = async () => {
    try {
      const apiKey = '294df0b6708e2266c157f1fa28ba0e96';
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
      );
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (text) => {
    setCity(text);
  };

  const handleSubmit = () => {
    fetchData();
  };

  const getWeatherIcon = (iconCode) => {
    return `http://openweathermap.org/img/w/${iconCode}.png`;
  };

  const getBackgroundStyle = () => {
    if (weatherData) {
      const weatherMain = weatherData.weather[0].main.toLowerCase();
      if (weatherMain.includes('clear')) {
        return styles.clearBackground;
      } else if (weatherMain.includes('rain')) {
        return styles.rainBackground;
      } else if (weatherMain.includes('cloud')) {
        return styles.cloudBackground;
      } else if (weatherMain.includes('thunderstorm')) {
        return styles.thunderstormBackground;
      } else {
        return styles.defaultBackground;
      }
    }
    return styles.defaultBackground;
  };

  return (
    <View style={{ ...styles.container, ...getBackgroundStyle() }}>
      <TextInput
        style={styles.input}
        placeholder="Enter city name"
        value={city}
        onChangeText={handleInputChange}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={{ color: 'white' }}>Get Weather</Text>
      </TouchableOpacity>
      {weatherData ? (
        <View style={styles.weatherInfo}>
          <Text style={{ fontSize: 20 }}>{weatherData.name}</Text>
          <Text>Temperature: {weatherData.main.temp}°C</Text>
          <Text>Description: {weatherData.weather[0].description}</Text>
          <Image
            source={{ uri: getWeatherIcon(weatherData.weather[0].icon) }}
            style={styles.weatherIcon}
          />
          <Text>Feels like: {weatherData.main.feels_like}°C</Text>
          <Text>Humidity: {weatherData.main.humidity}%</Text>
          <Text>Pressure: {weatherData.main.pressure}</Text>
          <Text>Wind Speed: {weatherData.wind.speed}m/s</Text>
        </View>
      ) : (
        <Text>Loading weather data...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3498db',
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: '#2980b9',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  weatherInfo: {
    alignItems: 'center',
  },
  weatherIcon: {
    width: 50,
    height: 50,
    marginVertical: 10,
  },
  defaultBackground: {
    backgroundColor: '#3498db',
  },
  clearBackground: {
    backgroundColor: '#3498db',
  },
  rainBackground: {
    backgroundColor: '#2980b9',
  },
  cloudBackground: {
    backgroundColor: '#7f8c8d',
  },
  thunderstormBackground: {
    backgroundColor: '#2c3e50',
  },
});

export default Weather;
