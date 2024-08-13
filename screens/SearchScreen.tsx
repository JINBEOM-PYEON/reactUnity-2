import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// 네비게이션 스택에 정의된 타입
type RootStackParamList = {
  Home: undefined;
  FashionShowScreen: undefined;
  BrandDetailScreen: {
    brandName: string;
    brandDescription: string;
    brandImage: string;
    bestItems: Array<{ id: string; name: string; image: string }>;
  };
  ProductDetailScreen: {
    productName: string;
    productDescription: string;
    productImage: string;
    productPrice: string;
  };
  SearchScreen: undefined;
};

type SearchScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SearchScreen'>;

// 기존 패션쇼와 홈 화면의 데이터를 가져옵니다.
const fashionShows = [
  { 
    id: '1', 
    name: 'BrandName1', 
    description: 'TailTrend는 반려견에게 최고의 스타일과 편안함을, 세심한 손길로 제작된 프리미엄 의류를 자랑합니다. 특별한 순간을 선사해줄 테일트렌드의 쇼에 참여하세요.', 
    image: { uri: 'https://via.placeholder.com/300x500' } 
  },
  { 
    id: '2', 
    name: 'BrandName2', 
    description: 'BrandName2의 독특한 스타일은 반려견에게 새로운 경험을 제공합니다. 최고급 소재로 만들어진 제품을 지금 확인하세요.', 
    image: { uri: 'https://via.placeholder.com/300x500' } 
  },
  { 
    id: '3', 
    name: 'BrandName3', 
    description: 'BrandName3는 반려견에게 편안함과 스타일을 동시에 제공합니다. 최신 패션 트렌드를 지금 만나보세요.', 
    image: { uri: 'https://via.placeholder.com/300x500' } 
  },
  { 
    id: '4', 
    name: 'BrandName4', 
    description: 'BrandName4의 혁신적인 디자인은 반려견에게 완벽한 착용감을 선사합니다. 이제껏 경험하지 못한 편안함을 선사합니다.', 
    image: { uri: 'https://via.placeholder.com/300x500' } 
  },
  { 
    id: '5', 
    name: 'BrandName5', 
    description: 'BrandName5는 반려견 패션의 선두주자입니다. 최고급 소재로 만들어진 특별한 의류를 지금 만나보세요.', 
    image: { uri: 'https://via.placeholder.com/300x500' } 
  },
];

const popularItems = [
  { id: '6', name: 'PopularItem1', image: { uri: 'https://via.placeholder.com/300x500' } },
  { id: '7', name: 'PopularItem2', image: { uri: 'https://via.placeholder.com/300x500' } },
  { id: '8', name: 'PopularItem3', image: { uri: 'https://via.placeholder.com/300x500' } },
];

const combinedData = [
  ...fashionShows.map(show => ({
    id: show.id,
    title: show.name,
    type: 'fashionShow',
    image: show.image.uri,
    detail: {
      brandName: show.name,
      brandDescription: show.description,
      brandImage: show.image.uri,
      bestItems: popularItems.filter(item => item.id === show.id)
    }
  })),
  ...popularItems.map(item => ({
    id: item.id,
    title: item.name,
    type: 'product',
    image: item.image.uri,
    detail: {
      productName: item.name,
      productDescription: `${item.name}의 상세 설명입니다.`,
      productImage: item.image.uri,
      productPrice: '100,000원'
    }
  }))
];

const SearchScreen: React.FC = () => {
  const navigation = useNavigation<SearchScreenNavigationProp>();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(combinedData);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query) {
      const filtered = combinedData.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(combinedData);
    }
  };

  const handleItemPress = (item: any) => {
    if (item.type === 'product') {
      navigation.navigate('ProductDetailScreen', item.detail);
    } else if (item.type === 'fashionShow') {
      navigation.navigate('BrandDetailScreen', item.detail);
    }
  };

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.resultItem} onPress={() => handleItemPress(item)}>
      <Image source={{ uri: item.image }} style={styles.resultImage} />
      <Text style={styles.resultText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>

      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#333',
    color: '#fff',
    marginLeft: 10,
    borderRadius: 8,
    paddingHorizontal: 15,
    height: 40,
  },
  resultItem: {
    flex: 1,
    margin: 10,
    backgroundColor: '#1c1c1c',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resultImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  resultText: {
    color: '#fff',
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
});

export default SearchScreen;
