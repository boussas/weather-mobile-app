import { colors } from "@/theme/colors";
import { scale } from "@/theme/scale";
import { renderMarginBottom } from "@/utils/ui-utils";
import React from "react";
import { Image, Text, View } from "react-native";
import * as Icons from "react-native-heroicons/solid";
import { createStyles } from "./weather.styles";
interface IWeatherCard {
  label: string;
  value: string;
}
const WeatherCard = ({ label, value }: IWeatherCard) => {
  const styles = createStyles();

  const getIcon = (label: string) => {
    switch (label.toLowerCase()) {
      case "feels like":
        return (
          <Image
            source={require("@/assets/images/feels.png")}
            style={styles.iconImage}
            resizeMode="contain"
          />
        );
      case "humidity":
        return (
          <Image
            source={require("@/assets/images/humidity-.png")}
            style={styles.iconImage}
            resizeMode="contain"
          />
        );
      case "pressure":
        return (
          <Image
            source={require("@/assets/images/pressure.png")}
            style={styles.iconImage}
            resizeMode="contain"
          />
        ); 
      default:
        return <Icons.SunIcon size={scale(24)} color={colors.black} />;
    }
  };

  return (
    <View style={styles.card}>
      {getIcon(label)}
      {renderMarginBottom(6)}
      <Text style={styles.dailyLabel}>{label}</Text>
      {renderMarginBottom(2)}
      <Text style={styles.dailyValue}>{value}</Text>
    </View>
  );
};

export default WeatherCard;
