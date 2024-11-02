import { useState, useEffect } from 'react';
import api from '../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import toast, { toastApiError } from '../../helpers/toast';
import { Buffer } from 'buffer';
import {router} from 'expo-router'

export default function useAuth() {
   const [isAuth, setIsAuth] = useState(false);
   const [user, setUser] = useState({});
   const [loading, setLoading] = useState(false);

   const handleLogin = async (email:string, senha:string) => {
      setLoading(true);
      await handleLogout();

      try {
         const base64Credentials = Buffer.from(`${email}:${senha}`).toString('base64');
         const resp = await api
            .post('auth/login', {}, { headers: { authorization: `Basic ${base64Credentials}` } })
            .then((resp) => resp)
            .catch((e) => {
               throw e;
            });
         const { data } = resp;
         await AsyncStorage.setItem('access_token', data.access_token);
         api.defaults.headers.Authorization = `Bearer ${data.access_token}`;
         setUser({ ...data.usuario });
         setIsAuth(true);
         router.navigate("/(tabs)/");

      } catch (err) {
         toastApiError(err);
      } finally {
         setLoading(false);
      }
   };



   const handleLogout = async () => {
      await AsyncStorage.clear();
      setIsAuth(false);
      setUser({});
      api.defaults.headers.Authorization = null;
      router.navigate("/screens/Login")
   };
   api.interceptors.request.use(
      async (config) => {
         const access_token = await AsyncStorage.getItem('access_token');
         if (access_token) {
            config.headers['Authorization'] = `Bearer ${access_token}`;
            setIsAuth(true);
         }
         return config;
      },
      (error) => {
         Promise.reject(error);
      }
   );

   api.interceptors.response.use(
      (response) => response,
      async (error) => {
         const originalRequest = error.config;
         if (error?.response?.status === 401) {
            if (!originalRequest._retry) {
               originalRequest._retry = true;
               const { data } = await api.post('auth/refresh');
               if (data) {
                  setUser({ ...data.user });
                  setIsAuth(true);
                  await AsyncStorage.setItem('access_token', data.access_token);
                  api.defaults.headers.Authorization = `Bearer ${data.access_token}`;
               }
               return api(originalRequest);
            } else await handleLogout();
         }
         return Promise.reject(error);
      }
   );

   return { isAuth, user, loading, handleLogin, handleLogout, setUser };
}