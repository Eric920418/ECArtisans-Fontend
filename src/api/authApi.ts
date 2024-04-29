// authApi.ts
import { $axios } from './index';
import { type UserData } from '../type/userType';


export async function logIn(mail: string, password: string): Promise<any> {
    console.log("使用login API")
    try {
        const res = await $axios.post('/auth/shop-login', { mail, password });
        console.log(res.data);
        return res.data; 
    } catch (error) {
        console.error('登入錯誤:', error);
        throw error; 
    }
}

export async function signUp(userData:UserData): Promise<any> {
    console.log("使用shop-signUp API")
    try {
        const res = await $axios.post('/auth/shop-signUp',  userData );
        console.log(res.data);
        return res.data; 
    } catch (error) {
        console.error('註冊錯誤:', error);
        throw error; 
    }
}
