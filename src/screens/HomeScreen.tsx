import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useAudioRecorder } from "../hooks/useAudioRecorder";
import { RecordButton } from "../components/RecordButton";
import { AudioList } from "../components/AudioList";
import { NameModal } from "../components/NameModal";

export default function HomeScreen() {
  const {
    startRecording,
    stopRecording,
    playRecording,
    deleteRecording,
    audioList,
    isRecording,
    pendingUri,
    setPendingUri,
    addAudioToListWithName,
  } = useAudioRecorder();

  const [audioName, setAudioName] = useState("");

  const handleSave = async () => {
    if (pendingUri && audioName.trim()) {
      await addAudioToListWithName(pendingUri, audioName);
      setPendingUri(null);
      setAudioName("");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎙️ Expo-Soundlab</Text>
      <RecordButton
        isRecording={isRecording}
        onPress={isRecording ? stopRecording : startRecording}
      />
      <AudioList
        data={audioList}
        onPlay={playRecording}
        onDelete={deleteRecording}
      />
      <NameModal
        visible={!!pendingUri}
        value={audioName}
        onChange={setAudioName}
        onSave={handleSave}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
    backgroundColor: "#fff",
    display: "flex",
    alignItems: "center",
  },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
});
