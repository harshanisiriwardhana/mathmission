import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './styles/global.css'

import SplashScreen from './screens/SplashScreen'
import AccessKeyScreen from './screens/AccessKeyScreen'
import ChildNameScreen from './screens/ChildNameScreen'
import WorldMapScreen from './screens/WorldMapScreen'
import LessonScreen from './screens/LessonScreen'
import StarAwardScreen from './screens/StarAwardScreen'
import BadgeScreen from './screens/BadgeScreen'
import ParentDashboard from './screens/ParentDashboard'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/access" element={<AccessKeyScreen />} />
        <Route path="/name" element={<ChildNameScreen />} />
        <Route path="/worlds" element={<WorldMapScreen />} />
        <Route path="/lesson" element={<LessonScreen />} />
        <Route path="/stars" element={<StarAwardScreen />} />
        <Route path="/badge" element={<BadgeScreen />} />
        <Route path="/parent" element={<ParentDashboard />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)