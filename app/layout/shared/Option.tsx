import React, { useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { IconSizes } from '../../constants';
import { AppContext } from '../../context';
import { Typography } from '../../theme';
import { ThemeColors } from '../../types/theme';

const { FontWeights, FontSizes } = Typography;

interface OptionProps {
  label?: string,
  iconName: string,
  onPress?: any,
  children?: any
};

const Option: React.FC<OptionProps> = ({ label, iconName, onPress, children }) => {
  const { theme } = useContext(AppContext);

  if (children)
    return (
      <View style={styles().container}>
        <Ionicons name={iconName} size={IconSizes.x5} color={theme.text01} />
        {children}
      </View>
    );

  return (
    <TouchableOpacity style={styles().container} activeOpacity={0.9} onPress={onPress}>
      <Ionicons name={iconName} size={IconSizes.x5} color={theme.text01} />
      <Text style={styles(theme).label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = (theme = {} as ThemeColors) => StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6
  },
  label: {
    ...FontWeights.Light,
    ...FontSizes.Body,
    color: theme.text01,
    marginLeft: 10
  }
});

export default Option;