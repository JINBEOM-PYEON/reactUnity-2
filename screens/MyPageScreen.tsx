import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, NavigationProp } from '@react-navigation/native';

// 네비게이션 스택에 정의된 타입
type RootStackParamList = {
  MyPageScreen: undefined;
  CartScreen: undefined;
  // 필요한 다른 화면들도 추가할 수 있습니다.
};

type MyPageScreenNavigationProp = NavigationProp<RootStackParamList, 'MyPageScreen'>;

const MyPageScreen = () => {
  const navigation = useNavigation<MyPageScreenNavigationProp>();
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>PET IN UNIVERSE</Text>
        <TouchableOpacity onPress={() => navigation.navigate('CartScreen')}>
          <Icon name="cart-outline" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Text style={styles.username}>홍길동님</Text>
        <Text style={styles.email}>abcd@kakao.com</Text>
      </View>

      {/* Account Linking Section */}
      <View style={styles.accountLinking}>
        <TouchableOpacity style={styles.linkedAccount}>
          <Image
            source={{ uri: 'https://via.placeholder.com/40x40' }} // 임시 아이콘 URL
            style={styles.icon}
          />
          <Text style={styles.linkText}>연결해제</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.unlinkedAccount}>
          <Image
            source={{ uri: 'https://via.placeholder.com/40x40' }} // 같은 임시 아이콘 URL
            style={styles.icon}
          />
          <Text style={styles.linkText}>연동하기</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.unlinkedAccount}>
          <Image
            source={{ uri: 'https://via.placeholder.com/40x40' }} // 같은 임시 아이콘 URL
            style={styles.icon}
          />
          <Text style={styles.linkText}>연동하기</Text>
        </TouchableOpacity>
      </View>

      {/* Menu Items */}
      <View style={styles.menuSection}>
        <Text style={styles.menuItemTitle}>계정 관리</Text>
        <TouchableOpacity style={styles.menuItem} onPress={() => toggleSection('account')}>
          <Text style={styles.menuItemText}>회원정보 수정</Text>
          <Icon name={expandedSection === 'account' ? 'chevron-down' : 'chevron-forward'} size={24} color="#fff" />
        </TouchableOpacity>
        {expandedSection === 'account' && (
          <View style={styles.expandedContent}>
            <Text style={styles.expandedText}>회원정보 수정 페이지로 이동할 수 있는 옵션을 제공합니다.</Text>
          </View>
        )}

        <Text style={styles.menuItemTitle}>고객 센터</Text>
        <TouchableOpacity style={styles.menuItem} onPress={() => toggleSection('support')}>
          <Text style={styles.menuItemText}>공지사항</Text>
          <Icon name={expandedSection === 'support' ? 'chevron-down' : 'chevron-forward'} size={24} color="#fff" />
        </TouchableOpacity>
        {expandedSection === 'support' && (
          <View style={styles.expandedContent}>
            <Text style={styles.expandedText}>공지사항을 확인할 수 있습니다.</Text>
            <Text style={styles.expandedText}>FAQ를 확인할 수 있습니다.</Text>
            <Text style={styles.expandedText}>1:1 문의를 할 수 있습니다.</Text>
          </View>
        )}

        <Text style={styles.menuItemTitle}>약관</Text>
        <TouchableOpacity style={styles.menuItem} onPress={() => toggleSection('terms')}>
          <Text style={styles.menuItemText}>서비스 이용약관</Text>
          <Icon name={expandedSection === 'terms' ? 'chevron-down' : 'chevron-forward'} size={24} color="#fff" />
        </TouchableOpacity>
        {expandedSection === 'terms' && (
          <View style={styles.expandedContent}>
            <Text style={styles.expandedText}>서비스 이용약관 내용입니다.</Text>
            <Text style={styles.expandedText}>개인정보 처리방침 내용입니다.</Text>
          </View>
        )}

        <Text style={styles.menuItemTitle}>기타</Text>
        <TouchableOpacity style={styles.menuItem} onPress={() => toggleSection('others')}>
          <Text style={styles.menuItemText}>로그아웃</Text>
          <Icon name={expandedSection === 'others' ? 'chevron-down' : 'chevron-forward'} size={24} color="#fff" />
        </TouchableOpacity>
        {expandedSection === 'others' && (
          <View style={styles.expandedContent}>
            <Text style={styles.expandedText}>로그아웃을 할 수 있습니다.</Text>
            <Text style={styles.expandedText}>회원탈퇴를 할 수 있습니다.</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 50,
  },
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  profileSection: {
    marginTop: 30,
    alignItems: 'center',
  },
  username: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  email: {
    color: '#fff',
    fontSize: 16,
    marginTop: 5,
  },
  accountLinking: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 30,
  },
  linkedAccount: {
    alignItems: 'center',
  },
  unlinkedAccount: {
    alignItems: 'center',
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  linkText: {
    color: '#fff',
    fontSize: 14,
    marginTop: 10,
  },
  menuSection: {
    marginTop: 40,
  },
  menuItemTitle: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 10,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  menuItemText: {
    color: '#fff',
    fontSize: 16,
  },
  expandedContent: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#111',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  expandedText: {
    color: '#ccc',
    fontSize: 14,
    marginBottom: 5,
  },
});

export default MyPageScreen;
