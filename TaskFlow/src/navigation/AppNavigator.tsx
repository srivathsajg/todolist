import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home, Calendar, PieChart, User, Plus } from 'lucide-react-native';

import { OnboardingScreen } from '../screens/OnboardingScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { AnalyticsScreen } from '../screens/AnalyticsScreen';
import { AddTaskScreen } from '../screens/AddTaskScreen';
import { TaskDetailsScreen } from '../screens/TaskDetailsScreen';

import { colors, layout } from '../theme';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const EmptyScreen = () => <View style={{ flex: 1, backgroundColor: colors.background }} />;

const CustomTabBarButton = ({ children, onPress }: any) => (
  <TouchableOpacity
    style={{
      top: -20,
      justifyContent: 'center',
      alignItems: 'center',
    }}
    onPress={onPress}
  >
    <View style={{
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: colors.primary,
    }}>
      {children}
    </View>
  </TouchableOpacity>
);

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 0,
          backgroundColor: colors.white,
          height: 80,
          borderTopWidth: 0,
          borderTopLeftRadius: layout.radius.large,
          borderTopRightRadius: layout.radius.large,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.05,
          shadowRadius: 10,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textLight,
      }}
    >
      <Tab.Screen 
        name="HomeTab" 
        component={HomeScreen} 
        options={{
          tabBarIcon: ({ color }) => <Home size={24} color={color} />
        }}
      />
      <Tab.Screen 
        name="CalendarTab" 
        component={EmptyScreen} // Placeholder for calendar view
        options={{
          tabBarIcon: ({ color }) => <Calendar size={24} color={color} />
        }}
      />
      <Tab.Screen 
        name="AddTab" 
        component={EmptyScreen} // Dummy, handled by custom button or stack
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate('AddTask');
          },
        })}
        options={{
          tabBarIcon: () => <Plus size={32} color={colors.white} />,
          tabBarButton: (props) => <CustomTabBarButton {...props} />
        }}
      />
      <Tab.Screen 
        name="AnalyticsTab" 
        component={AnalyticsScreen} 
        options={{
          tabBarIcon: ({ color }) => <PieChart size={24} color={color} />
        }}
      />
      <Tab.Screen 
        name="ProfileTab" 
        component={ProfileScreen} 
        options={{
          tabBarIcon: ({ color }) => <User size={24} color={color} />
        }}
      />
    </Tab.Navigator>
  );
};

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Main" component={TabNavigator} />
        <Stack.Screen name="AddTask" component={AddTaskScreen} options={{ presentation: 'modal' }} />
        <Stack.Screen name="TaskDetails" component={TaskDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
