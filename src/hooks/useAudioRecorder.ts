import { useState, useEffect } from "react";
import { Audio } from "expo-av";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function useAudioRecorder() {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [audioList, setAudioList] = useState<
    { uri: string; id: string; name: string }[]
  >([]);
  const [isRecording, setIsRecording] = useState(false);
  const [pendingUri, setPendingUri] = useState<string | null>(null);
  const [isNameModalVisible, setNameModalVisible] = useState(false);

  useEffect(() => {
    const loadAudioList = async () => {
      try {
        const storedAudios = await AsyncStorage.getItem("audioList");
        if (storedAudios) setAudioList(JSON.parse(storedAudios));
      } catch (error) {
        console.error("Erro ao carregar áudios salvos:", error);
      }
    };
    loadAudioList();
  }, []);

  const startRecording = async () => {
    if (isRecording) return;

    try {
      console.log("🎙️ Iniciando gravação...");
      const { granted } = await Audio.requestPermissionsAsync();
      if (!granted) {
        alert("Permissão de áudio negada.");
        return;
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const newRecording = new Audio.Recording();
      await newRecording.prepareToRecordAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      await newRecording.startAsync();

      setRecording(newRecording);
      setIsRecording(true);
    } catch (err) {
      console.error("Erro ao iniciar gravação:", err);
    }
  };

  const stopRecording = async () => {
    if (!recording) return;

    console.log("🛑 Parando gravação...");
    setIsRecording(false);
    await recording.stopAndUnloadAsync();

    const uri = recording.getURI();
    setRecording(null);

    if (uri) {
      setPendingUri(uri);
      setNameModalVisible(true);
    }
  };

  const playRecording = async (uri: string) => {
    console.log("▶️ Reproduzindo gravação...");
    const { sound } = await Audio.Sound.createAsync({ uri });
    await sound.playAsync();
    sound.setOnPlaybackStatusUpdate((status) => {
      if (status.isLoaded && status.didJustFinish) {
        sound.unloadAsync();
      }
    });
  };

  const deleteRecording = async (id: string) => {
    console.log(`🗑️ Removendo gravação ${id}...`);

    const updatedList = audioList.filter((audio) => audio.id !== id);

    setAudioList(updatedList);
    await AsyncStorage.setItem("audioList", JSON.stringify(updatedList));

    console.log("✅ Áudio removido com sucesso!");
  };

  const addAudioToListWithName = async (uri: string, name: string) => {
    const newAudio = { uri, id: Date.now().toString(), name };
    const updatedList = [...audioList, newAudio];

    setAudioList(updatedList);
    await AsyncStorage.setItem("audioList", JSON.stringify(updatedList));
  };

  return {
    startRecording,
    stopRecording,
    playRecording,
    deleteRecording,
    audioList,
    isRecording,
    pendingUri,
    setPendingUri,
    addAudioToListWithName,
  };
}
