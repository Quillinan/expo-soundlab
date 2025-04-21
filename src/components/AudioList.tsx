import React from "react";
import { FlatList } from "react-native";
import { AudioItem } from "./AudioItem";

type Audio = {
  id: string;
  uri: string;
  name: string;
};

type Props = {
  data: Audio[];
  onPlay: (uri: string) => void;
  onDelete: (id: string) => void;
};

export function AudioList({ data, onPlay, onDelete }: Props) {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      style={{ marginTop: 20, width: "100%" }}
      renderItem={({ item }) => (
        <AudioItem
          name={item.name}
          uri={item.uri}
          onPlay={() => onPlay(item.uri)}
          onDelete={() => onDelete(item.id)}
        />
      )}
    />
  );
}
