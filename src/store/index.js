const state = {
	commonObj: {
		hasDropdownLoaded: true,
		permissions: [],
		permissionList: [],
		roleList: [],
		categoryList: []
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
        unitOfTime: 'day',
        perPage: 10
	},
	list: []
} 
export default state