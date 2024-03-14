import {
    NavigationContainer,
    ThemeProvider,
    DarkTheme,
    DefaultTheme,
    useTheme,
  } from "@react-navigation/native";
  

  import AppStack from "./AppStack";

const Navigation = () => {
    const theme = useTheme();
    return (
        <ThemeProvider value={theme}>
            <NavigationContainer>
                <AppStack />
            </NavigationContainer>
        </ThemeProvider>
    );
};

export default Navigation;
