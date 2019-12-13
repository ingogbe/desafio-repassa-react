export const devMode = process.env.NODE_ENV === 'development' ? true : false;

export const drawerWidth = 240;
export const host = devMode ? "http://localhost:5000" : "https://desafio-repassa.firebaseapp.com";