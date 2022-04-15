export default [{
    _name: 'CSidebarNav',
    _children: [{
            _name: 'CSidebarNavItem',
            name: 'sidebar.dashboard',
            to: '/dashboard',
            icon: 'cil-speedometer',
            items: [],
            permission: 'dashboard'
        },
        {
            _name: 'CSidebarNavItem',
            name: 'Category (Console)',
            to: '/other/category-list',
            icon: 'cil-list',
            items: [],
            permission: 'category-list'
        },
        {
            _name: 'CSidebarNavItem',
            name: 'Ads List',
            to: '/other/channel-list',
            icon: 'cil-ban',
            items: [],
            permission: 'channel-list'
        }
    ]
}]