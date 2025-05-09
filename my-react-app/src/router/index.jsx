import {BrowserRouter, Routes, Route} from 'react-router-dom';

import { HomeScreen, LoginScreen, RegisterScreen, CompleteScreen } from '../pages';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginScreen />} />
                <Route path="/register" element={<RegisterScreen />} />
                <Route path="/home" element={<HomeScreen />} />
                <Route path="/complete-screen" element={<CompleteScreen />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;