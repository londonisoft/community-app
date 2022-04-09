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
            name: 'Customers',
            to: '/other/customer-list',
            icon: 'cil-list',
            items: [],
            permission: 'customer-list'
        },
        {
            _name: 'CSidebarNavItem',
            name: 'Payments',
            to: '/other/payment-list',
            icon: 'cil-ban',
            items: [],
            permission: 'payment-list'
        },
        {
            _name: 'CSidebarNavItem',
            name: 'Due Report',
            to: '/other/due-report',
            icon: 'cil-ban',
            items: [],
            permission: 'due-report'
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
        }
        // {
        //     _name: 'CSidebarNavItem',
        //     name: 'Settings',
        //     to: '/other/setting',
        //     icon: 'cil-settings',
        //     items: [],
        //     permission: 'setting'
        // }
    ]
}]