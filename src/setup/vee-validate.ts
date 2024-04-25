import * as AllRules from '@vee-validate/rules'; // 规则
import {
	defineRule,
	Form as VForm,
	Field as VField,
	ErrorMessage,
	configure,
} from 'vee-validate'; // 元件
import { localize } from '@vee-validate/i18n'; // 多語系資料
import zh_TW from '@/locales/zh_TW.json'; // 讀取本地語言資料

Object.keys(AllRules).forEach(rule => {
	// 定義規則(全部加入)
	defineRule(rule, (AllRules as any)[rule]); // 使用 AllRules 定义规则
});

localize({ zh_TW }); // 使用加载的语言包

configure({
	// 配置驗證行為
	generateMessage: localize('zh_TW'), // 使用中文（台湾）
	validateOnInput: true, // 在輸入時驗證開啟
});

const onSubmit = (values: any) => {
	// 送出後會再驗證
	console.log('Submitted values:', values);
};

// 其他驗證方法 --------------------------------------------START

function isPhone(value: any): string | boolean {
	const phoneNumber = /^(09)[0-9]{8}$/;
	return phoneNumber.test(value) ? true : '需要正確的電話號碼';
}
// 將自定義規則添加到 vee-validate
defineRule('phone', isPhone);

// 其他驗證方法 --------------------------------------------END

// 匯出元件和配置
export { VForm, VField, ErrorMessage, onSubmit, isPhone };