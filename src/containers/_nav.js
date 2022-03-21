export default [{
    _name: 'CSidebarNav',
    _children: [{
            _name: 'CSidebarNavItem',
            name: 'sidebar.dashboard',
            to: '/dashboard',
            icon: 'cil-speedometer',
            items: []
        },
        {
            _name: 'CSidebarNavDropdown',
            name: 'Withdraw',
            route: '/withdraw',
            icon: 'cil-dollar',
            items: [{
                    name: 'Pending List',
                    to: '/withdraw/pending'
                },
                {
                    name: 'Approve List',
                    to: '/withdraw/approve'
                },
                {
                    name: 'Reject List',
                    to: '/withdraw/reject'
                },
                {
                    name: 'All List',
                    to: '/withdraw/all'
                }
            ]
        },
        {
            _name: 'CSidebarNavDropdown',
            name: 'Users',
            route: '/users',
            icon: 'cil-user',
            items: [{
                    name: 'All Users',
                    to: '/users/all'
                },
                {
                    name: 'Active Users',
                    to: '/users/active'
                },
                {
                    name: 'Block Users',
                    to: '/users/block'
                },
                {
                    name: 'Exclusive Users',
                    to: '/users/exclusive'
                }
            ]
        },
        {
            _name: 'CSidebarNavDropdown',
            name: 'User Management',
            route: '/users',
            icon: 'cil-user',
            permission: 'user-list',
            items: [
                {
                    _name: 'CSidebarNavItem',
                    name: 'Users',
                    to: '/app-management/admin-users',
                    icon: 'cil-people',
                    items: [],
                    permission: 'user-list'
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
        {
            _name: 'CSidebarNavItem',
            name: 'Package',
            to: '/other/package',
            icon: 'cil-list',
            items: []
        },
        {
            _name: 'CSidebarNavItem',
            name: 'Purchase Package',
            to: '/other/purchase-package',
            icon: 'cil-list',
            items: []
        },
        {
            _name: 'CSidebarNavItem',
            name: 'Settings',
            to: '/other/setting',
            icon: 'cil-settings',
            items: []
        },
        {
            _name: 'CSidebarNavItem',
            name: 'App Update',
            to: '/other/update',
            icon: 'cil-ban',
            items: []
        },
        {
            _name: 'CSidebarNavItem',
            name: 'Payment Method',
            to: '/other/payment-method',
            icon: 'cil-ban',
            items: []
        },
        {
            _name: 'CSidebarNavItem',
            name: 'Transfer List',
            to: '/other/transfer-list',
            icon: 'cil-ban',
            items: []
        },
        {
            _name: 'CSidebarNavItem',
            name: 'Add Wallet',
            to: '/other/add-wallet',
            icon: 'cil-ban',
            items: []
        },
        {
            _name: 'CSidebarNavItem',
            name: 'Posts',
            to: '/other/post-list',
            icon: 'cil-ban',
            items: []
        }
    ]
}]