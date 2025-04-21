import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";

type Props = {
  name: string;
  uri: string;
  onPlay: () => void;
  onDelete: () => void;
};

export function AudioItem({ name, onPlay, onDelete }: Props) {
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.nameContainer}
        contentContainerStyle={{
          paddingRight: 10,
          justifyContent: "center",
          flexGrow: 1,
        }}
        nestedScrollEnabled
        showsVerticalScrollIndicator={true}
      >
        <Text style={styles.name}>{name}</Text>
      </ScrollView>

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

const { width } = Dimensions.get("window");
const ITEM_WIDTH = width * 0.8;

const styles = StyleSheet.create({
  container: {
    width: ITEM_WIDTH,
    height: 50,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    overflow: "hidden",
  },
  nameContainer: {
    width: "40%",
    height: "100%",
  },
  name: {
    fontSize: 16,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    flex: 1,
    gap: 10,
  },
  icon: {
    fontSize: 22,
  },
});
