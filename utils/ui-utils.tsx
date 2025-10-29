import React from "react";
import { View } from "react-native";
import { scale } from "../theme/scale";

export const UI_Constants = {
  paddingH: scale(10),
  borderRadius: scale(8),
  HeaderIconSize: scale(26),
};
const renderMarginBottom = (value: number) => {
  return <View style={{ marginBottom: scale(value || 0) }} />;
};

export { renderMarginBottom };
