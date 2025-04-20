import { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { icons } from "@/constants/icons";
import { getSavedMovies } from "@/services/appwrite";

const Save = () => {
  const [savedMovies, setSavedMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMovies = async () => {
      const movies = await getSavedMovies();
      setSavedMovies(movies);
      setLoading(false);
    };

    getMovies();
  }, []);

  const SavedMovieCard = ({
    title,
    rating,
    poster_url,
  }: {
    title: string;
    rating: number;
    poster_url: string;
  }) => (
    <TouchableOpacity className="w-[30%]">
      <Image
        source={{ uri: poster_url }}
        className="w-32 h-48 rounded-lg"
        resizeMode="cover"
      />
      <Text className="text-sm font-bold text-white mt-2" numberOfLines={1}>
        {title}
      </Text>
      <View className="flex-row items-center gap-x-1 mt-1">
        <Text className="text-xs text-white font-medium">⭐</Text>
        <Text className="text-xs text-white font-bold">{rating}/10</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <SafeAreaView className="bg-primary flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#fff" />
      </SafeAreaView>
    );
  }

  if (savedMovies.length === 0) {
    return (
      <SafeAreaView className="bg-primary flex-1 px-10">
        <View className="flex justify-center items-center flex-1 flex-col gap-5">
          <Image source={icons.save} className="size-10" tintColor="#fff" />
          <Text className="text-gray-500 text-base">No saved movies yet</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="bg-primary flex-1 px-5 pt-5">
      <FlatList
        data={savedMovies}
        numColumns={3}
        keyExtractor={(item) => item.$id}
        columnWrapperStyle={{
          justifyContent: "space-between",
          marginBottom: 20,
        }}
        renderItem={({ item }) => (
          <SavedMovieCard
            title={item.title}
            rating={item.ratings}
            poster_url={item.poster_url}
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Save;
