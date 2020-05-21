export interface WeatherResponse {
    data: WeatherInterface
}

interface WeatherInterface {
    main: WeatherMainProperties    
}

interface WeatherMainProperties {
    temp: number
}