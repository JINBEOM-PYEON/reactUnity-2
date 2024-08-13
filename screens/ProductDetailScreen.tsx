import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

type RootStackParamList = {
  ProductDetailScreen: {
    productName: string;
    productDescription: string;
    productImage: string;
    productPrice: string;
  };
  CartScreen: undefined;
};

type ProductDetailScreenRouteProp = RouteProp<RootStackParamList, 'ProductDetailScreen'>;
type ProductDetailScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ProductDetailScreen'>;

const { width } = Dimensions.get('window');

const ProductDetailScreen = () => {
  const route = useRoute<ProductDetailScreenRouteProp>();
  const navigation = useNavigation<ProductDetailScreenNavigationProp>();

  const { productName, productDescription, productImage, productPrice } = route.params;

  return (
    <View style={styles.container}>
      {/* 상단 헤더 부분 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>PET IN UNIVERSE</Text>
        <TouchableOpacity onPress={() => navigation.navigate('CartScreen')}>
          <Icon name="cart-outline" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Product Image */}
        <Image source={{ uri: productImage }} style={styles.image} />

        {/* Product Details */}
        <View style={styles.productDetails}>
          <Text style={styles.productName}>{productName}</Text>
          <Text style={styles.price}>{productPrice}</Text>
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>

        {/* Size Options */}
        <View style={styles.sizeOptions}>
          {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
            <TouchableOpacity key={size} style={styles.sizeButton}>
              <Text style={styles.sizeButtonText}>{size}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Product Description */}
        <View style={styles.descriptionContainer}>
          <Text style={styles.sectionTitle}>상품 정보</Text>
          <Text style={styles.description}>{productDescription}</Text>
        </View>

        {/* Footer Actions */}
        <View style={styles.footerActions}>
          <TouchableOpacity style={styles.footerButton}>
            <Text style={styles.footerButtonText}>리뷰</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerButton}>
            <Text style={styles.footerButtonText}>문의</Text>
          </TouchableOpacity>
        </View>

        {/* Purchase Button */}
        <TouchableOpacity style={styles.purchaseButton}>
          <Text style={styles.purchaseButtonText}>구매 하기</Text>
        </TouchableOpacity>
      </ScrollView>
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
    marginBottom: 20,
  },
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
    marginRight: 0, // 오른쪽 마진 제거
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  image: {
    width: width,
    height: 400,
    resizeMode: 'contain',
  },
  productDetails: {
    padding: 16,
    alignItems: 'center',
  },
  productName: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  price: {
    color: '#b2ff00',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: '#b2ff00',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  addButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  sizeOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
  },
  sizeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sizeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  descriptionContainer: {
    padding: 16,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    color: '#fff',
    fontSize: 16,
    lineHeight: 24,
  },
  footerActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  footerButton: {
    alignItems: 'center',
  },
  footerButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  purchaseButton: {
    backgroundColor: '#b2ff00',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 20,
  },
  purchaseButtonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProductDetailScreen;
