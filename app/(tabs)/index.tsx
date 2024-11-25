import Slider from "@react-native-community/slider";
import { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import * as Clipboard from "expo-clipboard";
import { Alert } from "@/components/toast/toast";

export default function HomeScreen() {
  const [red, setRed] = useState<number>(255);
  const [green, setGreen] = useState<number>(255);
  const [blue, setBlue] = useState<number>(255);

  const backgroundColor = `rgb(${red}, ${green}, ${blue})`;
  const hexColor = `#${((1 << 24) + (red << 16) + (green << 8) + blue)
    .toString(16)
    .slice(1)
    .toUpperCase()}`;

  const textColor =
    [red, green, blue].filter((color) => color < 100).length >= 2
      ? "#FFF"
      : "#000";

  const handleRedChange = (newText: string) => {
    const parsedValue = parseInt(newText, 10);
    setRed(isNaN(parsedValue) ? 0 : parsedValue);
  };
  const handleGreenChange = (newText: string) => {
    const parsedValue = parseInt(newText, 10);
    setGreen(isNaN(parsedValue) ? 0 : parsedValue);
  };
  const handleBlueChange = (newText: string) => {
    const parsedValue = parseInt(newText, 10);
    setBlue(isNaN(parsedValue) ? 0 : parsedValue);
  };

  const copyToClipboard = async (text: string) => {
    await Clipboard.setStringAsync(text);
    Alert("Cor copiada!", 1000);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={[styles.container, { backgroundColor }]}>
        <Text
          style={[styles.colorCode, { color: textColor }]}
          onLongPress={() => copyToClipboard(hexColor)}
        >
          {hexColor}
        </Text>

        <View style={styles.allSlidersContainer}>
          <View style={styles.sliderContainer}>
            <View style={styles.sliderContainerHeader}>
              <Text style={{ color: textColor }}>R:</Text>
              <TextInput
                style={{ height: 40, color: textColor }}
                keyboardType="numeric"
                onChangeText={handleRedChange}
                defaultValue={red.toString()}
              />
            </View>
            <Slider
              style={styles.verticalSlider}
              minimumValue={0}
              maximumValue={255}
              step={1}
              value={red}
              minimumTrackTintColor="red"
              onValueChange={setRed}
            />
          </View>

          <View style={styles.sliderContainer}>
            <View style={styles.sliderContainerHeader}>
              <Text style={{ color: textColor }}>G:</Text>
              <TextInput
                style={{ height: 40, color: textColor }}
                keyboardType="numeric"
                onChangeText={handleGreenChange}
                defaultValue={green.toString()}
              />
            </View>
            <Slider
              style={styles.verticalSlider}
              minimumValue={0}
              maximumValue={255}
              step={1}
              value={green}
              minimumTrackTintColor="green"
              onValueChange={setGreen}
            />
          </View>

          <View style={styles.sliderContainer}>
            <View style={styles.sliderContainerHeader}>
              <Text style={{ color: textColor }}>B:</Text>
              <TextInput
                style={{ height: 40, color: textColor }}
                keyboardType="numeric"
                onChangeText={handleBlueChange}
                defaultValue={blue.toString()}
              />
            </View>
            <Slider
              style={styles.verticalSlider}
              minimumValue={0}
              maximumValue={255}
              step={1}
              value={blue}
              minimumTrackTintColor="blue"
              onValueChange={setBlue}
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  colorCode: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  allSlidersContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  sliderContainerHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  sliderContainer: {
    alignItems: "center",
  },
  verticalSlider: {
    width: 200,
    height: 40,
    marginTop: 90,
    transform: [{ rotate: "-90deg" }],
  },
});
