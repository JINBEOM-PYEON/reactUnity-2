import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  Animated,
  ScrollView,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// 네비게이션 스택에 정의된 타입
type RootStackParamList = {
  BrandDetailScreen: { brandName: string; brandDescription: string; brandImage: string; bestItems: Array<{ id: string; name: string; image: string }> };
  FashionShowScreen: undefined;
  Home: undefined;
  CartScreen: undefined;
};

type FashionShowScreenNavigationProp = StackNavigationProp<RootStackParamList, 'FashionShowScreen'>;

const { width } = Dimensions.get('window');

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

const FashionShowScreen = () => {
  const [scrollX, setScrollX] = useState(new Animated.Value(0));
  const [searchText, setSearchText] = useState('');
  const navigation = useNavigation<FashionShowScreenNavigationProp>();

  const filteredFashionShows = fashionShows.filter(show =>
    show.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleNavigateToDetail = (brandName: string, brandDescription: string, brandImage: string, bestItems: Array<{ id: string; name: string; image: string }>) => {
    navigation.navigate('BrandDetailScreen', { brandName, brandDescription, brandImage, bestItems });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>PET IN UNIVERSE</Text>
        <TouchableOpacity onPress={() => navigation.navigate('CartScreen')}>
          <Icon name="cart-outline" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* 진행중인 패션쇼 */}
        <View style={styles.carouselContainer}>
          <Animated.FlatList
            data={filteredFashionShows.length > 0 ? filteredFashionShows : fashionShows}
            renderItem={({ item, index }) => {
              const inputRange = [
                (index - 1) * width * 0.8,
                index * width * 0.8,
                (index + 1) * width * 0.8,
              ];
              const scale = scrollX.interpolate({
                inputRange,
                outputRange: [0.8, 1, 0.8],
                extrapolate: 'clamp',
              });
              const opacity = scrollX.interpolate({
                inputRange,
                outputRange: [0.5, 1, 0.5],
                extrapolate: 'clamp',
              });

              let bestItems: Array<{ id: string; name: string; image: string }> = [];

              if (item.name === 'BrandName1') {
                bestItems = [
                  { id: '1', name: 'Best Item 1A', image: 'https://via.placeholder.com/100x100' },
                  { id: '2', name: 'Best Item 1B', image: 'https://via.placeholder.com/100x100' }
                ];
              } else if (item.name === 'BrandName2') {
                bestItems = [
                  { id: '3', name: 'Best Item 2A', image: 'https://via.placeholder.com/100x100' },
                  { id: '4', name: 'Best Item 2B', image: 'https://via.placeholder.com/100x100' }
                ];
              } else if (item.name === 'BrandName3') {
                bestItems = [
                  { id: '5', name: 'Best Item 3A', image: 'https://via.placeholder.com/100x100' },
                  { id: '6', name: 'Best Item 3B', image: 'https://via.placeholder.com/100x100' }
                ];
              } else if (item.name === 'BrandName4') {
                bestItems = [
                  { id: '7', name: 'Best Item 4A', image: 'https://via.placeholder.com/100x100' },
                  { id: '8', name: 'Best Item 4B', image: 'https://via.placeholder.com/100x100' }
                ];
              } else if (item.name === 'BrandName5') {
                bestItems = [
                  { id: '9', name: 'Best Item 5A', image: 'https://via.placeholder.com/100x100' },
                  { id: '10', name: 'Best Item 5B', image: 'https://via.placeholder.com/100x100' }
                ];
              }

              return (
                <TouchableOpacity
                  onPress={() => handleNavigateToDetail(
                    item.name,
                    item.description,
                    item.image.uri,
                    bestItems
                  )}
                >
                  <Animated.View
                    style={[
                      styles.carouselItem,
                      { transform: [{ scale }], opacity },
                    ]}
                  >
                    <Image source={item.image} style={styles.carouselImage} />
                    <Text style={styles.carouselText}>{item.name}</Text>
                  </Animated.View>
                </TouchableOpacity>
              );
            }}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToAlignment="center"
            decelerationRate="fast"
            snapToInterval={width * 0.8}
            bounces={false}
            contentContainerStyle={styles.carouselContent}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: true }
            )}
            scrollEventThrottle={16}
          />
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Icon name="search" size={20} color="#fff" />
          <TextInput
            style={styles.searchInput}
            placeholder="패션쇼, 상품 검색"
            placeholderTextColor="#fff"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        {/* Fashion Shows */}
        <FlatList
          data={filteredFashionShows}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleNavigateToDetail(
                item.name,
                item.description,
                item.image.uri,
                [
                  { id: '1', name: 'Best Item 1A', image: 'https://via.placeholder.com/100x100' },
                  { id: '2', name: 'Best Item 1B', image: 'https://via.placeholder.com/100x100' }
                ]
              )}
            >
              <View style={styles.fashionShowContainer}>
                <Image source={item.image} style={styles.fashionShowImage} />
                <Text style={styles.fashionShowText}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.fashionShowList}
        />

        {/* Recent Items */}
        <Text style={styles.recentItemsTitle}>최근 입어본 상품</Text>
        <FlatList
          data={fashionShows}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleNavigateToDetail(
                item.name,
                item.description,
                item.image.uri,
                [
                  { id: '1', name: 'Best Item 1A', image: 'https://via.placeholder.com/100x100' },
                  { id: '2', name: 'Best Item 1B', image: 'https://via.placeholder.com/100x100' }
                ]
              )}
            >
              <View style={styles.recentItemContainer}>
                <Image source={item.image} style={styles.recentItemImage} />
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.recentItemList}
        />

        {/* Popular Fashion Show Items */}
        <Text style={styles.recentItemsTitle}>인기 패션쇼 아이템</Text>
        <FlatList
          data={popularItems}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleNavigateToDetail(
                item.name,
                '인기 패션쇼 상품 설명',
                item.image.uri,
                [
                  { id: '1', name: 'Best Item 1A', image: 'https://via.placeholder.com/100x100' },
                  { id: '2', name: 'Best Item 1B', image: 'https://via.placeholder.com/100x100' }
                ]
              )}
            >
              <View style={styles.popularItemContainer}>
                <Image source={item.image} style={styles.popularItemImage} />
                <Text style={styles.popularItemText}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.popularItemList}
        />
      </ScrollView>

      {/* Footer Button */}
      <View style={styles.footerContainer}>
        <TouchableOpacity style={styles.footerButton}>
          <Text style={styles.footerButtonText}>아바타 설정하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingBottom: 90, // "아바타 설정하기" 버튼 공간 확보
  },
  header: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 50,
  },
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
    marginRight: 0, // 오른쪽 마진 제거
  },
  carouselContainer: {
    height: 300,
    marginTop: 20,
  },
  carouselContent: {
    alignItems: 'center',
    paddingHorizontal: (width - width * 0.8) / 2, // 양측 간격 조정
  },
  carouselItem: {
    width: width * 0.8, // 각 아이템의 너비 조정
    height: 300, // 높이 조정
    borderRadius: 15,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  carouselImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  carouselText: {
    position: 'absolute',
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 5,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    borderRadius: 10,
    marginTop: 20,
    paddingHorizontal: 10,
    marginHorizontal: 16,
    height: 50,
  },
  searchInput: {
    color: '#fff',
    flex: 1,
    paddingLeft: 20,
  },
  fashionShowList: {
    marginTop: 20,
  },
  fashionShowContainer: {
    marginRight: 10,
  },
  fashionShowImage: {
    width: 120,
    height: 180,
    borderRadius: 10,
  },
  fashionShowText: {
    color: '#fff',
    marginTop: 5,
    textAlign: 'center',
  },
  recentItemsTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    marginHorizontal: 16,
  },
  recentItemContainer: {
    marginRight: 10,
  },
  recentItemImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  recentItemList: {
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  popularItemContainer: {
    marginRight: 10,
  },
  popularItemImage: {
    width: 120,
    height: 180,
    borderRadius: 10,
  },
  popularItemText: {
    color: '#fff',
    marginTop: 5,
    textAlign: 'center',
  },
  popularItemList: {
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  footerContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#000',
  },
  footerButton: {
    backgroundColor: '#b2ff00',
    borderRadius: 10,
    alignItems: 'center',
    paddingVertical: 15,
    marginHorizontal: 16,
    marginVertical: 10,
  },
  footerButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  scrollViewContent: {
    paddingBottom: 100, // 스크롤을 위한 여유 공간
  },
});

export default FashionShowScreen;
