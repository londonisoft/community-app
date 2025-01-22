const state = {
	commonObj: {
		hasDropdownLoaded: true,
		withdrawMethodList: [],
		adsNetWorkList: [],
		withdrawMethodList: []
	},
	token: localStorage.getItem('access_token') || '',
	user: '',
	sidebarMinimize: false,
	lang: 'en', 
	allMessage:[],
	static: {
		loading: false,
		listReload: false,
        dateFormat: 'DD/MM/YYYY',
        fiscaleYear: 'YYYY-YYYY',
        timeFormat: 'h:m',
        unitOfTime: 'day'
	},
	list: []
} 
export default state