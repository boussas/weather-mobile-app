# 🌦️ Weather Forecast App (React Native)

A mobile weather application built using **React Native** and **Expo**. 
This app provides weather data and city search capabilities, powered by the OpenWeatherMap API.

-----
# 📱 App Screenshots
<img src="https://github.com/user-attachments/assets/fa5cad82-61e9-4a4f-beb8-14dbbd56eb4b" style="width:20%;" />
<img src="https://github.com/user-attachments/assets/f024d9d9-6529-436c-9e6a-3b66a4343514" style="width:20%;" />
<img src="https://github.com/user-attachments/assets/45d6cf30-faf1-4daa-925a-df46e38bc1df" style="width:20%;" />

-----


## ✨ Features

  * **Current Location Detection:** Fetches weather for the user's current geographical location (requires permission).
  * **Current Weather:** Displays temperature, "feels like" temperature, humidity, pressure, wind speed, wind direction, sunrise, and sunset times.
  * **5-Day Forecast:** Shows an aggregated daily forecast for the next five days, including average temperature and cloud conditions.
  * **City Search:** A convenient interface for searching cities globally.
  * **Data Persistence:** Saves the last selected city to quickly load data on the next launch.
-----

## 🛠️ Technology Stack

| Category | Technology | Purpose |
| :--- | :--- | :--- |
| **Framework** | React Native, Expo | Mobile application development and file-based routing. |
| **Language** | TypeScript | Strong typing and better developer experience. |
| **API** | OpenWeatherMap | Fetching real-time and forecast weather data. |
| **Networking** | Axios | Promise-based HTTP client for API requests. |
| **Utilities** | `expo-location`, `moment`, `AsyncStorage` | Location services, date/time formatting, and local data storage. |
| **UI/UX** | `expo-linear-gradient`, `react-native-gesture-handler`, `react-native-heroicons` | Background effects, enhanced touch gestures, and icons. |

-----

## 🚀 Installation and Setup

Follow these steps to get a local copy of the project running on your device or simulator.

### Prerequisites

  * Node.js (LTS recommended)
  * npm or yarn
  * Expo CLI (`npm install -g expo-cli`)

### Steps

1.  **Clone the Repository**

    ```bash
    git clone https://github.com/boussas/weather-mobile-app/
    cd weather-mobile-app
    ```

2.  **Install Dependencies**

    ```bash
    npm install
    # or
    yarn install
    ```

3.  **OpenWeatherMap API Key**
    This project relies on the OpenWeatherMap API. The API key is used within `service/weather.api.ts`.

      * Get a free API key from OpenWeatherAPI.
      * Create .env file with you Api key `WEATHER_API_KEY`

4.  **Run the Application**
    Start the Expo development server:

    ```bash
    npx expo start
    ```

    This will open a new tab in your browser with the Expo Developer Tools. From there, you can:

      * Scan the QR code with the **Expo Go** app on your phone.
      * Run on an iOS Simulator (`i`) or Android Emulator (`a`).

-----

## 📂 Project Structure

The project follows the standard Expo Router file-based routing structure, organized into logical components and services.

```
|
├── app
│   ├── home.styles.ts      # Styles for the home screen
│   ├── home.tsx            # Main application logic and UI
│   ├── index.tsx           # Redirect to home screen
│   └── _layout.tsx         # Root layout for Expo Router
├── app.json                # Configuration file
├── assets                  # Static assets (images, icons)
│   └── images
│       └── ... (various weather icons and background)
├── components              # Reusable UI components
│   ├── bottomSheet
│   │   └── BottomSheet.tsx   # Custom modal
│   ├── button
│   │   └── component.tsx     # Reusable Button
│   ├── forecast
│   │   └── component.tsx     # Forecast card
│   ├── input
│   │   └── component.tsx     # Reusable Input field
│   └── weather
│       ├── component.tsx     # Current weather detail cards (Humidity, Pressure, etc.)
│       └── WindSunCard.tsx   # Component for wind, sunrise, and sunset data
├── constants               # General application constants (mostly theme-related)
├── hooks                   # Custom React Hooks
├── package.json            # Project dependencies and scripts
├── service                 # API 
│   └── weather.api.ts      # Functions for calling OpenWeather API
├── theme                   # Styling and theme
│   ├── colors.ts
│   ├── font-size.ts
│   ├── scale.ts
│   └── typography.ts
├── tsconfig.json           # TypeScript configuration
├── types
│   └── weather.types.ts    # TypeScript interfaces for weather data structures
└── utils                   # Utility functions (UI helpers)
```
# 🎯 **Future Enhancements and Adjustments**

In order to further improve this project, there are still a few remaining tasks to complete:

- [ ] **Responsiveness Enhancements:** Improve layout and design adaptability across different devices and screen sizes.
- [ ] **Bug Fixes:** Address minor issues and optimizations.
- [ ] **Dynamic Backgrounds:** Implement dynamic changes to the background image or gradient based on the current weather condition (e.g., sunny, rainy, cloudy) or time of day (day/night).
- [ ] **Hourly Forecast:** Extend the forecast view to include detailed hourly predictions for the current day.
- [ ] **Unit Switching:** Allow users to switch between Celsius (°C), Fahrenheit (°F), and kilometers per hour (km/h) / miles per hour (mph).
- [ ] **Loading/Skeleton States:** Add a visual loading indicator or skeleton view to improve the user experience while fetching data.

