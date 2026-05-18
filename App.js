import React, { useEffect, useState } from "react";
import { View, Text, TextInput, FlatList, Image, StyleSheet} from "react-native";

import { getMovies } from "./services/api";

export default function App() {

  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");

  async function loadMovies(text = "") {
    const data = await getMovies(text);
    setMovies(data);
  }

  useEffect(() => {
    loadMovies();
  }, []);

  return (
    <View style={styles.container}>
    
      <TextInput
        style={styles.input}
        placeholder="Buscar filme..."
        placeholderTextColor="#888"
        value={search}
        onChangeText={(text) => {
          setSearch(text);
          loadMovies(text);
        }}
      />

      <FlatList
        data={movies}
        horizontal
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 10 }}
        ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
        renderItem={({ item }) => (
          <View style={styles.card}>

            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`
              }}
              style={styles.image}
            />

            <Text style={styles.title} numberOfLines={1}>
              {item.title}
            </Text>

            <Text style={styles.text}>
              {item.release_date}
            </Text>

            <Text style={styles.text}>
              ⭐ {item.vote_average}
            </Text>

          </View>
        )}
      />

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#111",
    paddingTop: 50,
  },

  input: {
    backgroundColor: "#222",
    color: "white",
    padding: 12,
    margin: 10,
    borderRadius: 10,
  },

  card: {
    width: 140,
  },

  image: {
    width: 140,
    height: 210,
    borderRadius: 12,
  },

  title: {
    color: "white",
    fontSize: 13,
    marginTop: 6,
    fontWeight: "bold",
  },

  text: {
    color: "#aaa",
    fontSize: 11,
    marginTop: 2,
  }

});
