import { Appbar,Avatar, IconButton } from "react-native-paper";
import {TouchableOpacity,Text, View} from 'react-native'

type Props = {
  goBack?: () => void;
  title?: string;
};

const Header = ({goBack,title}:Props) => {
  if (title === undefined) title = ''

  return(
    <Appbar.Header className="h-12">
      <View className="flex-row items-center w-full">
        <IconButton
            icon="arrow-left-thin"
            size={40}
            onPress={goBack}
        /> 
        <Text className="font-semibold text-xl">{title}</Text>
      </View>
    </Appbar.Header>
  )
};

export default Header;
