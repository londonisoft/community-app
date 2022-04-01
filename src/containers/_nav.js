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
            name: 'Category',
            to: '/other/category-list',
            icon: 'cil-list',
            items: [],
            permission: 'category-list'
        },
        {
            _name: 'CSidebarNavItem',
            name: 'Channel',
            to: '/other/channel-list',
            icon: 'cil-ban',
            items: [],
            permission: 'channel-list'
        },
        {
            _name: 'CSidebarNavItem',
            name: 'Settings',
            to: '/other/setting',
            icon: 'cil-settings',
            items: [],
            permission: 'setting'
        },
        {
            _name: 'CSidebarNavDropdown',
            name: 'User Management',
            route: '/app-users',
            icon: 'cil-user',
            permission: 'app-user-list',
            items: [
                {
                    _name: 'CSidebarNavItem',
                    name: 'Admin Users',
                    to: '/app-management/admin-users',
                    icon: 'cil-people',
                    items: [],
                    permission: 'admin-user-list'
                  },
                  {
                    _name: 'CSidebarNavItem',
                    name: 'Roles',
                    to: '/app-management/roles',
                    icon: 'cil-list',
                    items: [],
                    permission: 'role-list'
                  },
                  {
                    _name: 'CSidebarNavItem',
                    name: 'Permissions',
                    to: '/app-management/permissions',
                    icon: 'cil-list',
                    items: [],
                    permission: 'permission-list'
                  }
            ]
        },
    ]
}]