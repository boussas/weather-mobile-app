import { createStyles } from "@/app/home.styles";
import { BottomSheet } from "@/components/bottomSheet/BottomSheet";
import ForeCastCard from "@/components/forecast/component";
import InputComponent from "@/components/input/component";
import WeatherCard from "@/components/weather/component";
import {
  getCityBySearch,
  getWeatherByCity,
  getWeatherByCityForecast,
} from "@/service/weather.api";
import { colors } from "@/theme/colors";
import { scale } from "@/theme/scale";
import { WeatherData } from "@/types/weather.types";
import { debounce } from "@/utils";
import { renderMarginBottom } from "@/utils/ui-utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import * as Location from "expo-location";
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import {
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import * as Icons from "react-native-heroicons/solid";

import WindSunCard from "@/components/weather/WindSunCard";
import background from "../assets/images/background.jpg";
export default function IndexScreen() {
  const styles = createStyles();
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchResult, setSearchResult] = useState<any[]>([]);

  useEffect(() => {
    initializeWeather();
  }, []);
  const getCurrentLocation = async (): Promise<{
    lat: number;
    lon: number;
  }> => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        throw new Error("Location permission not granted");
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
      });

      return {
        lat: location.coords.latitude,
        lon: location.coords.longitude,
      };
    } catch (error) {
      console.error("Failed to get location:", error);
      return { lat: 33.5731, lon: -7.5898 };
    }
  };
  const initializeWeather = async () => {
    try {
      const storedCity = await AsyncStorage.getItem("lastChosenCity");
      if (storedCity) {
        const city = JSON.parse(storedCity);
        getWeather(city.lat, city.lon);
        return;
      }
      const location = await getCurrentLocation();
      getWeather(location.lat, location.lon);
    } catch (error) {
      console.error("Error getting location:", error);
      getWeather(33.5731, -7.5898);
    }
  };

  const getWeather = async (lat: number, lon: number) => {
    setLoading(true);
    try {
      const data = await getWeatherByCity(lat, lon);
      if (data) {
        setWeather(data);
        getForeCast(data.coord.lat, data.coord.lon);
      }
    } catch (error) {
      console.error("Error fetching weather:", error);
    } finally {
      setLoading(false);
    }
  };
  const getForeCast = async (lat: number, lon: number) => {
    setLoading(true);
    try {
      const forecastData = await getWeatherByCityForecast(lat, lon);
      const dailyForecast = aggregateDailyForecast(forecastData.list || []);
      setForecast(dailyForecast);
    } catch (error) {
      console.log("Forecast error:", error);
    } finally {
      setLoading(false);
    }
  };
  const aggregateDailyForecast = (list: any[]) => {
    const days: Record<string, any[]> = {};

    list.forEach((item) => {
      const date = moment.unix(item.dt).format("YYYY-MM-DD");
      if (!days[date]) days[date] = [];
      days[date].push(item);
    });

    const result = Object.entries(days).map(([date, entries]) => {
      const temps = entries.map((e) => e.main.temp);
      const clouds = entries.map((e) => e.clouds.all);
      const avgTemp = temps.reduce((a, b) => a + b, 0) / (temps.length || 1);
      const avgCloud = clouds.reduce((a, b) => a + b, 0) / (clouds.length || 1);
      const mainWeather = entries[Math.floor(entries.length / 2)].weather[0];

      return {
        dt: moment(date).unix(),
        date,
        main: { temp: avgTemp },
        clouds: { all: avgCloud },
        weather: [mainWeather],
      };
    });

    return result.slice(1, 6);
  };

  const searchCity = async (text: string) => {
    if (text.length <= 1) return;
    try {
      const searchData = await getCityBySearch(text);
      if (searchData?.list) {
        setSearchResult(searchData.list);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const debounceSearch = useCallback(
    debounce((text: string) => {
      searchCity(text);
    }, 800),
    []
  );

  const handleSearch = (text: string) => {
    setSearchText(text);
    debounceSearch(text);
  };
  const [currentLocationName, setCurrentLocationName] =
    useState<string>("Current Location");

  const date = moment.unix(weather?.dt ?? 0).format("ddd, DD MMMM");
  const defaultCities = [
    { name: "Berrechid", country: "MA", lat: 33.2655, lon: -7.5875 },
    { name: "Meknes", country: "MA", lat: 33.9776, lon: -5.525 },
    { name: "Rabat", country: "MA", lat: 33.9911, lon: -6.8401 },
    { name: "Casablanca", country: "MA", lat: 33.57311, lon: -7.589843 },
    { name: "Paris", country: "FR", lat: 48.856613, lon: 2.352222 },
    { name: "London", country: "GB", lat: 51.507351, lon: -0.127758 },
    { name: "New York", country: "US", lat: 40.712776, lon: -74.005974 },
    { name: "Tokyo", country: "JP", lat: 35.689487, lon: 139.691711 },
    { name: "Mitte", country: "DE", lat: 52.520008, lon: 13.404954 },
    { name: "Sydney", country: "AU", lat: -33.86882, lon: 151.209296 },
    { name: "Moscow", country: "RU", lat: 55.755825, lon: 37.617298 },
    { name: "Beijing", country: "CN", lat: 39.904202, lon: 116.407394 },
    { name: "Toronto", country: "CA", lat: 43.653225, lon: -79.383186 },
    { name: "Dubai", country: "AE", lat: 25.204849, lon: 55.270783 },
    { name: "Rio de Janeiro", country: "BR", lat: -22.906847, lon: -43.172897 },
    { name: "Buenos Aires", country: "AR", lat: -34.603722, lon: -58.381592 },
    { name: "Bangkok", country: "TH", lat: 13.756331, lon: 100.501762 },
    { name: "Istanbul", country: "TR", lat: 41.008238, lon: 28.978359 },
    { name: "Singapore", country: "SG", lat: 1.352083, lon: 103.819836 },
    { name: "Ciutat Vella", country: "ES", lat: 41.385064, lon: 2.173404 },
    { name: "Amsterdam", country: "NL", lat: 52.367573, lon: 4.904138 },
    { name: "Los Angeles", country: "US", lat: 34.052235, lon: -118.243683 },
  ];

  return (
    <ImageBackground source={background} style={styles.background}>
      <View style={styles.container}>
        <LinearGradient
          colors={[
            "rgba(135,206,250,0.8)",
            "rgba(255,228,196,0.3)",
            "rgba(255,140,0,0.1)",
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          locations={[0, 0.6, 1]}
          style={[StyleSheet.absoluteFill]}
          pointerEvents="box-none"
        >
          <ScrollView style={styles.content}>
            <View style={styles.header}>
              <View>
                {/*  <Text style={styles.headerText}>Hello!</Text> */}
                <Text style={styles.headerDate}>{date}</Text>
              </View>
              <Pressable
                onPress={() => setShowSearch(true)}
                style={styles.hamburger}
              >
                <Icons.MagnifyingGlassIcon
                  color={colors.white}
                  size={scale(24)}
                />
              </Pressable>
            </View>

            {weather && (
              <View style={styles.main}>
                <View style={styles.tempContainer}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: scale(10),
                    }}
                  >
                    <Icons.MapPinIcon color={colors.black} size={scale(22)} />
                    <Text style={[styles.cityText, { marginLeft: scale(6) }]}>
                      {weather.name}
                    </Text>
                  </View>
                  <Text style={styles.tempText}>
                    {Math.ceil(weather.main.temp)}
                    <Text style={styles.degree}>°</Text>
                  </Text>
                  <Text style={styles.tempInfo}>
                    {weather.weather?.[0]?.description}
                  </Text>
                </View>

                {/*                   {renderMarginBottom(40)}
                 */}
                <LinearGradient
                  style={styles.br24}
                  colors={[colors.card.primary, colors.card.secondary]}
                >
                  <View style={styles.cardContainer}>
                    <WeatherCard
                      label="Feels like"
                      value={`${Math.ceil(weather.main.feels_like)} °C`}
                    />
                    <WeatherCard
                      label="Humidity"
                      value={`${weather.main.humidity} %`}
                    />
                    <WeatherCard
                      label="Pressure"
                      value={`${weather.main.pressure} hPa`}
                    />
                  </View>
                </LinearGradient>

                {renderMarginBottom(25)}

                <View style={styles.cardVertical}>
                  <LinearGradient
                    pointerEvents="none"
                    style={StyleSheet.absoluteFill}
                    colors={[colors.card.primary, colors.card.secondary]}
                  />
                  <Text style={styles.dailyLabel}>Next Days</Text>
                  <FlatList
                    horizontal
                    scrollEnabled={false}
                    showsHorizontalScrollIndicator={false}
                    data={forecast}
                    keyExtractor={(item, index) => `${item.dt}-${index}`}
                    contentContainerStyle={{
                      paddingHorizontal: scale(6),
                      paddingVertical: scale(8),
                      gap: scale(3),
                    }}
                    renderItem={({ item }) => (
                      <ForeCastCard
                        cloud={item.clouds?.all ?? 0}
                        temp={Math.round(item.main?.temp ?? 0)}
                        date={moment.unix(item.dt ?? 0).format("ddd")}
                        description={item.weather?.[0]?.description}
                      />
                    )}
                  />
                </View>
                {renderMarginBottom(20)}
                <WindSunCard
                  windSpeed={weather.wind.speed}
                  windDeg={weather.wind.deg}
                  sunrise={weather.sys.sunrise}
                  sunset={weather.sys.sunset}
                />
              </View>
            )}
          </ScrollView>
        </LinearGradient>

        <BottomSheet visible={showSearch} setVisible={setShowSearch}>
          <LinearGradient
            colors={[colors.card.primary, colors.card.secondary]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.searchContainer}
          >
            <InputComponent
              value={searchText}
              containerStyle={styles.inputContainer}
              onChangeText={handleSearch}
              placeholder="Search..."
            />
            {renderMarginBottom(12)}
            <View style={styles.searchView}>
              {searchResult.length === 0 && (
                <Text
                  style={{
                    color: colors.white,
                    fontSize: scale(14),
                    marginBottom: scale(6),
                    textAlign: "center",
                  }}
                >
                  Popular Cities
                </Text>
              )}

              <FlatList
                data={[
                  { name: "Current Location", isCurrentLocation: true },
                  ...(searchResult.length > 0 ? searchResult : defaultCities),
                ]}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => `${item.name}-${index}`}
                renderItem={({ item }) => (
                  <Pressable
                    onPress={async () => {
                      if (item.isCurrentLocation) {
                        const location = await getCurrentLocation();
                        await getWeather(location.lat, location.lon);
                        await getForeCast(location.lat, location.lon);
                        await AsyncStorage.setItem(
                          "lastChosenCity",
                          JSON.stringify({
                            name: "Current Location",
                            lat: location.lat,
                            lon: location.lon,
                          })
                        );
                      } else if (item.coord) {
                        setWeather(item);
                        getForeCast(item.coord.lat, item.coord.lon);
                        await AsyncStorage.setItem(
                          "lastChosenCity",
                          JSON.stringify({
                            name: item.name,
                            country: item.sys?.country,
                            lat: item.coord.lat,
                            lon: item.coord.lon,
                          })
                        );
                      } else {
                        await getWeather(item.lat, item.lon);
                        await getForeCast(item.lat, item.lon);
                        await AsyncStorage.setItem(
                          "lastChosenCity",
                          JSON.stringify({
                            name: item.name,
                            country: item.country,
                            lat: item.lat,
                            lon: item.lon,
                          })
                        );
                      }

                      setSearchText("");
                      setSearchResult([]);
                      setShowSearch(false);
                    }}
                    style={styles.searchResult}
                  >
                    <Text style={styles.searchText}>
                      {item.isCurrentLocation
                        ? "📍 Current Location"
                        : `${item.name} ${item.country || item.sys?.country}`}
                    </Text>
                    {item.main?.temp && (
                      <Text style={[styles.searchText, styles.searchTemp]}>
                        {Math.round(item.main?.temp)} °C
                      </Text>
                    )}
                  </Pressable>
                )}
              />
            </View>
          </LinearGradient>
        </BottomSheet>
      </View>
    </ImageBackground>
  );
}
