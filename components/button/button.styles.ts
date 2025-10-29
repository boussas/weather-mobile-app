import { colors } from "@/theme/colors";
import { StyleSheet } from "react-native";
import { FontSize } from "../../theme/font-size";
import { scale } from "../../theme/scale";

export const createStyles = () =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.button.primary,
      borderRadius: scale(30),
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: scale(14),
    },
    text: {
      color: colors.white,
      fontSize: FontSize.FONT_16Px,
      fontWeight: "400",
    },
  });
