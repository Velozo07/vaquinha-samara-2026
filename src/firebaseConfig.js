import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Suas credenciais reais
const firebaseConfig = {
  apiKey: "AIzaSyDFov3KTeUQos8usHVA74tl8kfS2U0_yJA",
  authDomain: "vaquinha-solidaria-samara.firebaseapp.com",
  databaseURL: "https://vaquinha-solidaria-samara-default-rtdb.firebaseio.com",
  projectId: "vaquinha-solidaria-samara",
  storageBucket: "vaquinha-solidaria-samara.firebasestorage.app",
  messagingSenderId: "759185354507",
  appId: "1:759185354507:web:5ae58d0f5cd002620f7c0e",
  measurementId: "G-733V1LTTNP"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);

