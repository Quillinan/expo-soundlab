import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

type Props = {
  isRecording: boolean;
  onPress: () => void;
};

export function RecordButton({ isRecording, onPress }: Props) {
  return (
    <TouchableOpacity style={[styles.button]} onPress={onPress}>
      <FontAwesome
        name={isRecording ? "stop" : "microphone"}
        size={20}
        color={isRecording ? "red" : "white"}
        style={{ marginRight: 8 }}
      />
      <Text style={styles.buttonText}>
        {isRecording ? "Parar Gravação" : "Iniciar Gravação"}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#0b93d2",
    padding: 15,
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "60%",
  },
  buttonText: { color: "#fff", fontSize: 16 },
});
