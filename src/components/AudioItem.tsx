import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

type Props = {
  name: string;
  uri: string;
  onPlay: () => void;
  onDelete: () => void;
};

export function AudioItem({ name, onPlay, onDelete }: Props) {
  return (
    <View style={styles.audioItem}>
      <Text style={styles.audioText}>{name}</Text>
      <View style={styles.actions}>
        <TouchableOpacity onPress={onPlay}>
          <Text style={styles.icon}>▶️</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onDelete}>
          <Text style={styles.icon}>🗑️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  audioItem: {
    padding: 12,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  audioText: { fontSize: 16 },
  actions: { flexDirection: "row", gap: 10 },
  icon: { fontSize: 20 },
});
