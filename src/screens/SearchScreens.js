import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { Colors, Fonts } from "../contants";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import axios from "axios";
import RestaurantCard from "../components/RestaurantCard";
import { RestaurantService, StaticImageService } from "../services";
import { ApiContants, Separator, Display } from "../utils";

const SearchScreens = ({ navigation }) => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [allRestaurants, setAllRestaurants] = useState([]);

  const fetchAllRestaurants = async () => {
    try {
      setLoading(true);
      console.log("Fetching all restaurants...");
      const response = await axios.get(`http://localhost:3000/api/restaurant`);

      if (response.status === 200) {
        setAllRestaurants(response.data.restaurants || []);
        console.log("Fetched all restaurants:", response.data.restaurants);
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu tất cả nhà hàng:", error);
    } finally {
      setLoading(false);
    }
  };

  const searchRestaurants = (keyword) => {
    console.log("Searching restaurants with keyword:", keyword);
    if (!keyword) {
      setFilteredRestaurants(allRestaurants || []);
    } else {
      const filtered = allRestaurants?.filter((restaurant) =>
        restaurant?.name.toLowerCase().includes(keyword.toLowerCase())
      );
      setFilteredRestaurants(filtered || []);
      console.log("Filtered restaurants:", filtered);
    }
  };

  useEffect(() => {
    fetchAllRestaurants();
  }, []);

  useEffect(() => {
    if (searchKeyword) {
      searchRestaurants(searchKeyword);
    }
  }, [searchKeyword]);

  const renderRestaurantItem = ({ item }) => (
    <RestaurantCard
      {...item}
      navigate={(restaurantId) =>
        navigation.navigate("Restaurant", { restaurantId })
      }
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchSection}>
          <Ionicons
            name="search-outline"
            size={25}
            color={Colors.DEFAULT_GREY}
          />
          <TextInput
            style={styles.searchText}
            placeholder="Tìm kiếm..."
            placeholderTextColor={Colors.DEFAULT_GREY}
            onChangeText={(text) => setSearchKeyword(text)}
          />
        </View>
        <Feather
          name="sliders"
          size={20}
          color={Colors.DEFAULT_YELLOW}
          style={{ marginRight: 10 }}
        />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color={Colors.DEFAULT_YELLOW} />
      ) : filteredRestaurants.length === 0 ? (
        <Text style={styles.noResultsText}>Không tìm thấy kết quả</Text>
      ) : (
        <FlatList
          data={filteredRestaurants}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderRestaurantItem}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.SECONDARY_WHITE,
    padding: 20,
  },
  searchContainer: {
    backgroundColor: Colors.DEFAULT_WHITE,
    height: 45,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  searchSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchText: {
    color: Colors.DEFAULT_GREY,
    fontSize: 16,
    lineHeight: 16 * 1.4,
    fontFamily: Fonts.POPPINS_MEDIUM,
    marginLeft: 10,
    flex: 1,
  },
  noResultsText: {
    fontSize: 16,
    fontFamily: Fonts.POPPINS_MEDIUM,
    color: Colors.DEFAULT_BLACK,
    textAlign: "center",
    marginTop: 20,
  },
});

export default SearchScreens;
