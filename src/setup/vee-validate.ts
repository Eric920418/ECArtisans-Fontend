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

// 其他驗證方法 --------------------------------------------START

// 驗證 姓名
function isName(value: any): string | boolean {
	if (!value || value.trim() === '') {
		return '姓名為必填';
	}

	const nameRegex = /^([\u4e00-\u9fa5]{1,20}|[a-zA-Z.,_-\s]{1,20})$/; // 中文和英文字符
	return nameRegex.test(value) ? true : '只能輸入含中文或英文字符';
}

function isShopName(value: any): string | boolean {
	if (!value || value.trim() === '') {
		return '商家名稱為必填';
	}

	const shopNameRegex = /^[\u4e00-\u9fa5a-zA-Z0-9.,_-\s]{1,20}$/; // 允许中文、英文、数字、逗号、下划线、连字符、空格，最大长度 20 个字符
	return shopNameRegex.test(value) ? true : '不可輸入特殊符號';
}

// 驗證 密碼
function isPassword(value: any): string | boolean {
	if (!value || value.trim() === '') {
		return '密碼為必填';
	}

	const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/; // (?=.*[a-zA-Z]) 至少包含一个字母和一个数字，最少8个字符
	return passwordRegex.test(value)
		? true
		: '密碼必須包含英文和數字，且長度最少8個字';
}

// 驗證 密碼不一致
function isConfirmed(
	value: any,
	[target]: any,
	ctx: { form: { [x: string]: any } }
): string | boolean {
	if (value === ctx.form[target]) {
		return true;
	}

	return '密碼不一致';
}

// 驗證 手機
function isPhone(value: any): string | boolean {
	if (value === null || value === undefined || value.trim() === '') {
		return '手機為必填'; // 返回自定义消息
	}

	const phoneNumber = /^(09)[0-9]{8}$/;
	return phoneNumber.test(value) ? true : '需要正確的手機號碼';
}

// 驗證 地址
function isAddress(value: any): string | boolean {
	if (value && value.trim() !== '') {
		const countyOrCityRegex = /(\d{3}).*(縣|市)/; //驗證是否前三碼郵遞區號，後面包含縣、市的名稱
		const isValid = countyOrCityRegex.test(value); //符合兩個條件

		return isValid ? true : '請輸入3碼郵遞區號與地址';
	}
	return true;
}

// 驗證 性別
function isGender(value: any): string | boolean {
	if (!value || value.trim() === '' || value === '請選擇性別') {
		return '性別為必選';
	}

	return true;
}

// 驗證 勾選
function isPolicy(value: any): string | boolean {
	if (value === 'on') {
		return false;
	}
	return true; // 如果value为true，表示复选框被勾选
}

// 驗證 生日
function isBirthday(value: any): string | boolean {
	const today = new Date().setHours(0, 0, 0, 0);
	const birthday = new Date(value).setHours(0, 0, 0, 0);

	if (!value || value.trim() === '') {
		return '生日為必填';
	}

	if (birthday >= today) {
		return '日期不可以是今天或未來';
	}
	return true;
}

// 驗證 帳戶
function isCollection(value: any): string | boolean {
	if (!value || value.trim() === '') {
		return '收款帳戶為必填';
	}
	// 先不驗證銀行代碼

	return /^[0-9]{10,16}$/.test(value)
		? true
		: '請填入正確的帳戶 10 ~ 16 位數字';
}

// 驗證 起訖日期
function isStartDate(value: string): string | boolean {
	const sDate = new Date(value);
	const today = new Date();
	sDate.setHours(0, 0, 0, 0);
	today.setHours(0, 0, 0, 0);
	if (sDate <= today) {
		return '起始日期請大於今天';
	}
	return true;
}

// 驗證 起訖日期
function isEndDate(
	value: string,
	[target]: string,
	ctx: { form: { [x: string]: any } }
): string | boolean {
	const sDate = new Date(ctx.form[target]);
	const eDate = new Date(value);
	sDate.setHours(0, 0, 0, 0);
	eDate.setHours(23, 59, 59, 999); //設置為當天的 23:59:59.999
	if (sDate >= eDate) {
		return '起始日期必須小於結束日期';
	}
	return true;
}

// 將自定義規則添加到 vee-validate
defineRule('name', isName);
defineRule('phone', isPhone);
defineRule('address', isAddress);
defineRule('password', isPassword);
defineRule('confirmed', isConfirmed);
defineRule('shopName', isShopName);
defineRule('gender', isGender);
defineRule('policy', isPolicy);
defineRule('birthday', isBirthday);
defineRule('collection', isCollection);
defineRule('startDate', isStartDate);
defineRule('endDate', isEndDate);
// 其他驗證方法 --------------------------------------------END

// 匯出元件和配置
export {
	VForm,
	VField,
	ErrorMessage,
	isName,
	isPhone,
	isAddress,
	isPassword,
	isGender,
	isConfirmed,
	isShopName,
	isPolicy,
	isBirthday,
	isCollection,
	isStartDate,
	isEndDate,
};
