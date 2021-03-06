import React,{useState} from 'react';
import {Provider, useSelector} from 'react-redux';
import App from './App';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import {applyMiddleware, createStore} from 'redux';
import rootReducer, {rootSaga} from './store';
import SplashScreen from 'react-native-splash-screen';
import {
    Text
} from 'react-native';
import {
    NavigationContainer,
    DefaultTheme as NavigationDefaultTheme,
    DarkTheme as NavigationDarkTheme
} from '@react-navigation/native';

import {
    Provider as PaperProvider,
    DefaultTheme as PaperDefaultTheme,
    DarkTheme as PaperDarkTheme
} from 'react-native-paper';
import Loader from './component/Loader';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer,composeWithDevTools(
    applyMiddleware(sagaMiddleware)
));
sagaMiddleware.run(rootSaga);


const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
        ...NavigationDefaultTheme.colors,
        ...PaperDefaultTheme.colors,
        background: '#ffffff',
        text: '#333333',
        ridaTheme:'#0ec269'
    },
    fonts:{
        noto:'NotoSansKR-Regular'
    }
}

const theme = CustomDefaultTheme;

const AppWrapper = () => {

    const [isSplashScreen, setIsSplashScreen] = useState(false)

    setTimeout(() => {
        setIsSplashScreen(true);
        SplashScreen.hide();
    }, 100);

    return (
        <PaperProvider theme={theme}>
            <Provider store={store}>
                {isSplashScreen && (<App/>)}
            </Provider>
        </PaperProvider>
    );
};

export default AppWrapper;
