import React from "react";
import { Pressable, Text } from "react-native";
import { IButtonProps } from "./IButton.props";
import { createStyles } from "./button.styles";

const Button = ({
  text,
  textStyles,
  buttonStyles,
  onPress,
  component,
}: IButtonProps) => {
  const styles = createStyles();
  return (
    <Pressable onPress={onPress} style={[styles.container, buttonStyles]}>
      {component}
      <Text style={[styles.text, textStyles]}>{text}</Text>
    </Pressable>
  );
};

export default Button;
