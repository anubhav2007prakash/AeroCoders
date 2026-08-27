import {
  CurrentWeather,
  DailyForecastItem,
  HourlyForecastItem,
  WeatherAlert,
  LocationItem,
  FavouriteItem,
  NotificationItem,
  CrowdReportItem,
  UserSettings,
  RadarData,
  RainTimelineData,
  CycloneData,
  LightningData,
  AviationData,
  AgrometData,
  RouteNowcastData,
} from "@/types/weather";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";

async function fetchAPI<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options?.headers || {}),
      },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`API error: ${res.status} ${res.statusText}`);
    }

    return await res.json();
  } catch (err) {
    console.error(`Failed to fetch ${endpoint}:`, err);
    throw err;
  }
}

export const WeatherAPI = {
  // Weather
  getCurrentWeather: (location?: string, lat?: number, lon?: number) => {
    const params = new URLSearchParams();
    if (location) params.append("location", location);
    if (lat !== undefined) params.append("lat", lat.toString());
    if (lon !== undefined) params.append("lon", lon.toString());
    const query = params.toString() ? `?${params.toString()}` : "";
    return fetchAPI<CurrentWeather>(`/api/weather/current${query}`);
  },

  getDailyForecast: (lat?: number, lon?: number) => {
    const params = new URLSearchParams();
    if (lat !== undefined) params.append("lat", lat.toString());
    if (lon !== undefined) params.append("lon", lon.toString());
    const query = params.toString() ? `?${params.toString()}` : "";
    return fetchAPI<DailyForecastItem[]>(`/api/weather/forecast${query}`);
  },

  getHourlyForecast: (lat?: number, lon?: number) => {
    const params = new URLSearchParams();
    if (lat !== undefined) params.append("lat", lat.toString());
    if (lon !== undefined) params.append("lon", lon.toString());
    const query = params.toString() ? `?${params.toString()}` : "";
    return fetchAPI<HourlyForecastItem[]>(`/api/weather/hourly${query}`);
  },

  getAlerts: (lat?: number, lon?: number) => {
    const params = new URLSearchParams();
    if (lat !== undefined) params.append("lat", lat.toString());
    if (lon !== undefined) params.append("lon", lon.toString());
    const query = params.toString() ? `?${params.toString()}` : "";
    return fetchAPI<WeatherAlert[]>(`/api/weather/alerts${query}`);
  },

  // Locations
  searchLocations: (q: string) => {
    return fetchAPI<LocationItem[]>(`/api/locations/search?q=${encodeURIComponent(q)}`);
  },

  getDefaultLocation: () => {
    return fetchAPI<LocationItem>(`/api/locations/default`);
  },

  // Favourites
  getFavourites: () => {
    return fetchAPI<FavouriteItem[]>(`/api/favourites`);
  },

  addFavourite: (data: Partial<FavouriteItem>) => {
    return fetchAPI<FavouriteItem>(`/api/favourites`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  removeFavourite: (id: number) => {
    return fetchAPI<{ message: string; id: number }>(`/api/favourites/${id}`, {
      method: "DELETE",
    });
  },

  // Notifications
  getNotifications: () => {
    return fetchAPI<NotificationItem[]>(`/api/notifications`);
  },

  markNotificationRead: (id: number) => {
    return fetchAPI<{ message: string; id: number }>(`/api/notifications/${id}/read`, {
      method: "PUT",
    });
  },

  // Radar
  getRadarData: () => {
    return fetchAPI<RadarData>(`/api/radar`);
  },

  // Rain Alert
  getRainAlertData: () => {
    return fetchAPI<RainTimelineData>(`/api/rain-alert`);
  },

  // Cyclone
  getCycloneData: () => {
    return fetchAPI<CycloneData>(`/api/cyclone`);
  },

  // Lightning
  getLightningData: () => {
    return fetchAPI<LightningData>(`/api/lightning`);
  },

  // Aviation
  getAviationData: () => {
    return fetchAPI<AviationData>(`/api/aviation`);
  },

  // Agromet
  getAgrometData: (district?: string) => {
    const query = district ? `?district=${encodeURIComponent(district)}` : "";
    return fetchAPI<AgrometData>(`/api/agromet${query}`);
  },

  // Route Nowcast
  getRouteNowcast: (origin: string = "Delhi", destination: string = "Ghaziabad") => {
    return fetchAPI<RouteNowcastData>(
      `/api/route-nowcast?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}`
    );
  },

  // Crowd Source
  getCrowdReports: () => {
    return fetchAPI<CrowdReportItem[]>(`/api/crowd-source`);
  },

  submitCrowdReport: (report: {
    location_name: string;
    condition: string;
    severity: string;
    description: string;
    reporter_name?: string;
  }) => {
    return fetchAPI<CrowdReportItem>(`/api/crowd-source`, {
      method: "POST",
      body: JSON.stringify(report),
    });
  },

  // Settings
  getSettings: () => {
    return fetchAPI<UserSettings>(`/api/settings`);
  },

  updateSettings: (settings: Partial<UserSettings>) => {
    return fetchAPI<UserSettings>(`/api/settings`, {
      method: "PUT",
      body: JSON.stringify(settings),
    });
  },
};
