import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, FlatList, Image } from 'react-native';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// 네비게이션 스택에 정의된 타입
type RootStackParamList = {
  Home: undefined;
  FashionShowScreen: undefined;
  SearchScreen: undefined;
  MyPageScreen: undefined;
  CartScreen: undefined;

  ProductDetailScreen: {
    productName: string;
    productDescription: string;
    productImage: string;
    productPrice: string;
  };
  
  BrandDetailScreen: {
    brandName: string;
    brandDescription: string;
    brandImage: string;
    bestItems: Array<{ id: string; name: string; image: string }>;
  };
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const { width, height } = Dimensions.get('window');

// 데이터 타입 정의
type DataItem = {
  id: string;
  title: string;
  views: string;
  loves: string;
  image: { uri: string };
  brandName: string;
};

type ProductItem = {
  id: string;
  name: string;
  description: string;
  price: string;
  image: { uri: string };
  detailDescription: string;
  detailImage: { uri: string };
};

const data: DataItem[] = [
  {
    id: '1',
    title: 'Fashion Show 1',
    views: '99.2K views',
    loves: '870 loves',
    image: { uri: 'https://via.placeholder.com/300x200' },
    brandName: 'BrandName1',
  },
  {
    id: '2',
    title: 'Fashion Show 2',
    views: '99.2K views',
    loves: '870 loves',
    image: { uri: 'https://via.placeholder.com/300x200' },
    brandName: 'BrandName2',
  },
  {
    id: '3',
    title: 'Fashion Show 3',
    views: '99.2K views',
    loves: '870 loves',
    image: { uri: 'https://via.placeholder.com/300x200' },
    brandName: 'BrandName3',
  },
  {
    id: '4',
    title: 'Fashion Show 4',
    views: '99.2K views',
    loves: '870 loves',
    image: { uri: 'https://via.placeholder.com/300x200' },
    brandName: 'BrandName4',
  },
  {
    id: '5',
    title: 'Fashion Show 5',
    views: '99.2K views',
    loves: '870 loves',
    image: { uri: 'https://via.placeholder.com/300x200' },
    brandName: 'BrandName5',
  },
];

// 카테고리별 상품 데이터
const categoryProducts: { [key: string]: ProductItem[] } = {
  의상: [
    { 
      id: '1', name: '의상 1', description: '강아지 의상 아이템 1', price: '20,000원', 
      image: { uri: 'https://via.placeholder.com/100x100' }, 
      detailDescription: '의상 1의 상세 설명입니다.', 
      detailImage: { uri: 'https://via.placeholder.com/300x300' } 
    },
    { 
      id: '2', name: '의상 2', description: '강아지 의상 아이템 2', price: '30,000원', 
      image: { uri: 'https://via.placeholder.com/100x100' }, 
      detailDescription: '의상 2의 상세 설명입니다.', 
      detailImage: { uri: 'https://via.placeholder.com/300x300' } 
    },
    { 
      id: '3', name: '의상 3', description: '강아지 의상 아이템 3', price: '25,000원', 
      image: { uri: 'https://via.placeholder.com/100x100' }, 
      detailDescription: '의상 3의 상세 설명입니다.', 
      detailImage: { uri: 'https://via.placeholder.com/300x300' } 
    },
    { 
      id: '4', name: '의상 4', description: '강아지 의상 아이템 4', price: '35,000원', 
      image: { uri: 'https://via.placeholder.com/100x100' }, 
      detailDescription: '의상 4의 상세 설명입니다.', 
      detailImage: { uri: 'https://via.placeholder.com/300x300' } 
    },
    { 
      id: '5', name: '의상 5', description: '강아지 의상 아이템 5', price: '22,000원', 
      image: { uri: 'https://via.placeholder.com/100x100' }, 
      detailDescription: '의상 5의 상세 설명입니다.', 
      detailImage: { uri: 'https://via.placeholder.com/300x300' } 
    },
  ],
  악세사리: [
    { 
      id: '6', name: '악세사리 1', description: '강아지 악세사리 아이템 1', price: '15,000원', 
      image: { uri: 'https://via.placeholder.com/100x100' }, 
      detailDescription: '악세사리 1의 상세 설명입니다.', 
      detailImage: { uri: 'https://via.placeholder.com/300x300' } 
    },
    { 
      id: '7', name: '악세사리 2', description: '강아지 악세사리 아이템 2', price: '25,000원', 
      image: { uri: 'https://via.placeholder.com/100x100' }, 
      detailDescription: '악세사리 2의 상세 설명입니다.', 
      detailImage: { uri: 'https://via.placeholder.com/300x300' } 
    },
    { 
      id: '8', name: '악세사리 3', description: '강아지 악세사리 아이템 3', price: '18,000원', 
      image: { uri: 'https://via.placeholder.com/100x100' }, 
      detailDescription: '악세사리 3의 상세 설명입니다.', 
      detailImage: { uri: 'https://via.placeholder.com/300x300' } 
    },
    { 
      id: '9', name: '악세사리 4', description: '강아지 악세사리 아이템 4', price: '28,000원', 
      image: { uri: 'https://via.placeholder.com/100x100' }, 
      detailDescription: '악세사리 4의 상세 설명입니다.', 
      detailImage: { uri: 'https://via.placeholder.com/300x300' } 
    },
    { 
      id: '10', name: '악세사리 5', description: '강아지 악세사리 아이템 5', price: '19,000원', 
      image: { uri: 'https://via.placeholder.com/100x100' }, 
      detailDescription: '악세사리 5의 상세 설명입니다.', 
      detailImage: { uri: 'https://via.placeholder.com/300x300' } 
    },
  ],
  하네스: [
    { 
      id: '11', name: '하네스 1', description: '강아지 하네스 아이템 1', price: '40,000원', 
      image: { uri: 'https://via.placeholder.com/100x100' }, 
      detailDescription: '하네스 1의 상세 설명입니다.', 
      detailImage: { uri: 'https://via.placeholder.com/300x300' } 
    },
    { 
      id: '12', name: '하네스 2', description: '강아지 하네스 아이템 2', price: '50,000원', 
      image: { uri: 'https://via.placeholder.com/100x100' }, 
      detailDescription: '하네스 2의 상세 설명입니다.', 
      detailImage: { uri: 'https://via.placeholder.com/300x300' } 
    },
    { 
      id: '13', name: '하네스 3', description: '강아지 하네스 아이템 3', price: '45,000원', 
      image: { uri: 'https://via.placeholder.com/100x100' }, 
      detailDescription: '하네스 3의 상세 설명입니다.', 
      detailImage: { uri: 'https://via.placeholder.com/300x300' } 
    },
    { 
      id: '14', name: '하네스 4', description: '강아지 하네스 아이템 4', price: '55,000원', 
      image: { uri: 'https://via.placeholder.com/100x100' }, 
      detailDescription: '하네스 4의 상세 설명입니다.', 
      detailImage: { uri: 'https://via.placeholder.com/300x300' } 
    },
    { 
      id: '15', name: '하네스 5', description: '강아지 하네스 아이템 5', price: '48,000원', 
      image: { uri: 'https://via.placeholder.com/100x100' }, 
      detailDescription: '하네스 5의 상세 설명입니다.', 
      detailImage: { uri: 'https://via.placeholder.com/300x300' } 
    },
  ],
};

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [selectedCategory, setSelectedCategory] = useState<string>('의상');
  const [products, setProducts] = useState<ProductItem[]>(categoryProducts['의상']);

  const handleCategoryPress = (category: string) => {
    setSelectedCategory(category);
    setProducts(categoryProducts[category]);
  };

  const handleFashionShowPress = (brandName: string) => {
  let brandDetails: {
    brandName: string;
    brandDescription: string;
    brandImage: string;
    bestItems: Array<{ id: string; name: string; image: string }>;
  } | undefined;

    switch (brandName) {
      case 'BrandName1':
        brandDetails = {
          brandName: 'BrandName1',
          brandDescription: 'TailTrend는 반려견에게 최고의 스타일과 편안함을, 세심한 손길로 제작된 프리미엄 의류를 자랑합니다. 특별한 순간을 선사해줄 테일트렌드의 쇼에 참여하세요.',
          brandImage: 'https://via.placeholder.com/300x500',
          bestItems: [
            { id: '1', name: 'Best Item 1A', image: 'https://via.placeholder.com/100x100' },
            { id: '2', name: 'Best Item 1B', image: 'https://via.placeholder.com/100x100' },
          ],
        };
        break;
      case 'BrandName2':
        brandDetails = {
          brandName: 'BrandName2',
          brandDescription: 'BrandName2의 독특한 스타일은 반려견에게 새로운 경험을 제공합니다. 최고급 소재로 만들어진 제품을 지금 확인하세요.',
          brandImage: 'https://via.placeholder.com/300x500',
          bestItems: [
            { id: '3', name: 'Best Item 2A', image: 'https://via.placeholder.com/100x100' },
            { id: '4', name: 'Best Item 2B', image: 'https://via.placeholder.com/100x100' },
          ],
        };
        break;
      case 'BrandName3':
        brandDetails = {
          brandName: 'BrandName3',
          brandDescription: 'BrandName3는 반려견에게 편안함과 스타일을 동시에 제공합니다. 최신 패션 트렌드를 지금 만나보세요.',
          brandImage: 'https://via.placeholder.com/300x500',
          bestItems: [
            { id: '5', name: 'Best Item 3A', image: 'https://via.placeholder.com/100x100' },
            { id: '6', name: 'Best Item 3B', image: 'https://via.placeholder.com/100x100' },
          ],
        };
        break;
      case 'BrandName4':
        brandDetails = {
          brandName: 'BrandName4',
          brandDescription: 'BrandName4의 혁신적인 디자인은 반려견에게 완벽한 착용감을 선사합니다. 이제껏 경험하지 못한 편안함을 선사합니다.',
          brandImage: 'https://via.placeholder.com/300x500',
          bestItems: [
            { id: '7', name: 'Best Item 4A', image: 'https://via.placeholder.com/100x100' },
            { id: '8', name: 'Best Item 4B', image: 'https://via.placeholder.com/100x100' },
          ],
        };
        break;
      case 'BrandName5':
        brandDetails = {
          brandName: 'BrandName5',
          brandDescription: 'BrandName5는 반려견 패션의 선두주자입니다. 최고급 소재로 만들어진 특별한 의류를 지금 만나보세요.',
          brandImage: 'https://via.placeholder.com/300x500',
          bestItems: [
            { id: '9', name: 'Best Item 5A', image: 'https://via.placeholder.com/100x100' },
            { id: '10', name: 'Best Item 5B', image: 'https://via.placeholder.com/100x100' },
          ],
        };
        break;
    }

    if (brandDetails) {
      navigation.navigate('BrandDetailScreen', brandDetails);
    }
  };
  const renderItem = ({ item }: { item: ProductItem }) => (
    <TouchableOpacity
      style={styles.productContainer}
      onPress={() =>
        navigation.navigate('ProductDetailScreen', {
          productName: item.name,
          productDescription: item.detailDescription,
          productImage: item.detailImage.uri,
          productPrice: item.price,
        })
      }
    >
      <Image source={item.image} style={styles.itemBox} />
      <Text style={styles.itemText}>{item.name}</Text>
      <Text style={styles.itemSubText}>{item.description}</Text>
      <Text style={styles.itemPrice}>{item.price}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* 상단 헤더 부분 */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Icon name="notifications-outline" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>PET IN UNIVERSE</Text>
        <TouchableOpacity onPress={() => navigation.navigate('CartScreen')}>
          <Icon name="cart-outline" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* 상단 임시 버튼들 */}
      <View style={styles.topButtonsContainer}>
        <TouchableOpacity style={[styles.topButton, styles.userButton]}>
          <Text style={styles.topButtonText}>유저정보</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.topButton, styles.characterButton]}>
          <Text style={styles.topButtonText}>케릭터정보</Text>
        </TouchableOpacity>
      </View>

      {/* 스크롤 가능한 배너 */}
      <View style={styles.carouselContainer}>
        <Swiper
          autoplay
          dot={<View style={styles.dot} />}
          activeDot={<View style={styles.activeDot} />}
          paginationStyle={styles.pagination}
        >
          {data.map((item) => (
            <TouchableOpacity key={item.id} style={styles.slide} onPress={() => handleFashionShowPress(item.brandName)}>
              <Image source={item.image} style={styles.slideImage} />
              <View style={styles.overlay}>
                <Text style={styles.slideTitle}>{item.title}</Text>
                <Text style={styles.slideDetails}>
                  {item.views} • {item.loves}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </Swiper>
      </View>

      {/* 카테고리 필터 및 버튼들 */}
      <View style={styles.filterContainer}>
        <Icon name="filter-outline" size={24} color="#fff" />
        <TouchableOpacity
          style={[styles.categoryButton, selectedCategory === '의상' && styles.selectedCategoryButton]}
          onPress={() => handleCategoryPress('의상')}
        >
          <Text style={styles.categoryButtonText}>의상</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.categoryButton, selectedCategory === '악세사리' && styles.selectedCategoryButton]}
          onPress={() => handleCategoryPress('악세사리')}
        >
          <Text style={styles.categoryButtonText}>악세사리</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.categoryButton, selectedCategory === '하네스' && styles.selectedCategoryButton]}
          onPress={() => handleCategoryPress('하네스')}
        >
          <Text style={styles.categoryButtonText}>하네스</Text>
        </TouchableOpacity>
      </View>

      {/* 상품 리스트 */}
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.productList}
      />

      {/* 하단 네비게이터 */}
      <View style={styles.navbar}>
        <TouchableOpacity style={styles.navButton} onPress={() => alert('Home')}>
          <View style={styles.navCircle}>
            <Icon name="home" size={24} color="#000" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('FashionShowScreen')}>
          <View style={styles.navCircle}>
            <Icon name="shirt-outline" size={24} color="#000" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('SearchScreen')}>
          <View style={styles.navCircle}>
            <Icon name="search-outline" size={24} color="#000" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('MyPageScreen')}>
          <View style={styles.navCircle}>
            <Icon name="person-outline" size={24} color="#000" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
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
  topButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
    marginHorizontal: 16, // 전체 컨테이너와 동일한 좌우 여백
  },
  topButton: {
    backgroundColor: '#b2ff00',
    paddingVertical: 50,
    borderRadius: 15,
    borderWidth: 4, // 테두리 두께 증가
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userButton: {
    flex: 2, // 유저정보 버튼이 더 작음
  },
  characterButton: {
    flex: 3, // 캐릭터정보 버튼이 더 큼
    marginLeft: 8, // 버튼 간 간격 조절
  },
  topButtonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  carouselContainer: {
    height: 200,
    marginBottom: 20,
  },
  slide: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000', // 배경색 변경
  },
  slideImage: {
    width: width - 40,
    height: 200,
    borderRadius: 10,
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // 배경색 수정 가능
    padding: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  slideTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  slideDetails: {
    fontSize: 14,
    color: '#fff',
  },
  pagination: {
    bottom: -25, // 이미지 밖 바로 아래로 이동
  },
  dot: {
    backgroundColor: 'rgba(255,255,255,.2)',
    width: 20,
    height: 8,
    borderRadius: 4,
    margin: 3,
  },
  activeDot: {
    backgroundColor: '#b2ff00', // 활성화된 dot 색 변경
    width: 20,
    height: 8,
    borderRadius: 4,
    margin: 3,
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  categoryButton: {
    backgroundColor: '#333',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 35,
  },
  selectedCategoryButton: {
    backgroundColor: '#b2ff00',
  },
  categoryButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  productList: {
    paddingHorizontal: 1,
  },
  productContainer: {
    flex: 1,
    margin: 8,
    backgroundColor: '#1c1c1c',
    borderRadius: 10,
    padding: 10,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  itemBox: {
    width: '100%',
    height: height * 0.18,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  itemText: {
    color: '#fff',
    marginTop: 10,
    fontSize: 14,
    fontWeight: 'bold',
  },
  itemSubText: {
    color: '#888',
    fontSize: 12,
    marginTop: 5,
  },
  itemPrice: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#b2ff00',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  navButton: {
    alignItems: 'center',
  },
  navCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
