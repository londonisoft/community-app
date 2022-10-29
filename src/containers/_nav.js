export default [{
    _name: 'CSidebarNav',
    _children: [{
            _name: 'CSidebarNavItem',
            name: 'ড্যাশবোর্ড',
            to: '/dashboard',
            icon: 'cil-speedometer',
            items: [],
            permission: 'dashboard'
        },
        {
            _name: 'CSidebarNavItem',
            name: 'গ্রাহকদের তালিকা',
            to: '/other/customer-list',
            icon: 'cil-list',
            items: [],
            permission: 'customer-list'
        },
        {
            _name: 'CSidebarNavItem',
            name: 'পেমেন্ট গ্রহণ',
            to: '/other/payment-list',
            icon: 'cil-ban',
            items: [],
            permission: 'payment-list'
        },
        {
            _name: 'CSidebarNavItem',
            name: 'পেমেন্ট রিপোর্ট',
            to: '/other/due-report',
            icon: 'cil-ban',
            items: [],
            permission: 'due-report'
        },
        {
            _name: 'CSidebarNavDropdown',
            name: 'সফ্টওয়্যার ব্যবহারকারী',
            route: '/app-users',
            icon: 'cil-user',
            permission: 'app-user-list',
            items: [
                {
                    _name: 'CSidebarNavItem',
                    name: 'অ্যাডমিন তালিকা',
                    to: '/app-management/admin-users',
                    icon: 'cil-people',
                    items: [],
                    permission: 'admin-user-list'
                  },
                  {
                    _name: 'CSidebarNavItem',
                    name: 'রোল',
                    to: '/app-management/roles',
                    icon: 'cil-list',
                    items: [],
                    permission: 'role-list'
                  },
                  {
                    _name: 'CSidebarNavItem',
                    name: 'অনুমতি তালিকা',
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