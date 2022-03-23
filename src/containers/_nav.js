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
            _name: 'CSidebarNavDropdown',
            name: 'Withdraw',
            route: '/withdraw',
            icon: 'cil-dollar',
            permission: 'withdraw-list',
            items: [{
                    name: 'Pending List',
                    to: '/withdraw/pending',
                    permission: 'withdraw-pending-list'
                },
                {
                    name: 'Approve List',
                    to: '/withdraw/approve',
                    permission: 'withdraw-approve-list',
                },
                {
                    name: 'Reject List',
                    to: '/withdraw/reject',
                    permission: 'withdraw-reject-list'
                },
                {
                    name: 'All List',
                    to: '/withdraw/all',
                    permission: 'withdraw-all-list'
                }
            ]
        },
        {
            _name: 'CSidebarNavDropdown',
            name: 'Users',
            route: '/users',
            icon: 'cil-user',
            permission: 'user-list',
            items: [{
                    name: 'All Users',
                    to: '/users/all',
                    permission: 'user-all-list'
                },
                {
                    name: 'Active Users',
                    to: '/users/active',
                    permission: 'user-active-list'
                },
                {
                    name: 'Block Users',
                    to: '/users/block',
                    permission: 'user-block-list'
                },
                {
                    name: 'Exclusive Users',
                    to: '/users/exclusive',
                    permission: 'user-exclusive-list'
                }
            ]
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
        {
            _name: 'CSidebarNavItem',
            name: 'Package',
            to: '/other/package',
            icon: 'cil-list',
            items: [],
            permission: 'package-list'
        },
        {
            _name: 'CSidebarNavItem',
            name: 'Purchase Package',
            to: '/other/purchase-package',
            icon: 'cil-list',
            items: [],
            permission: 'purchase-package-list'
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
            _name: 'CSidebarNavItem',
            name: 'App Update',
            to: '/other/update',
            icon: 'cil-ban',
            items: [],
            permission: 'app-update'
        },
        {
            _name: 'CSidebarNavItem',
            name: 'Payment Method',
            to: '/other/payment-method',
            icon: 'cil-ban',
            items: [],
            permission: 'payment-method'
        },
        {
            _name: 'CSidebarNavItem',
            name: 'Transfer List',
            to: '/other/transfer-list',
            icon: 'cil-ban',
            items: [],
            permission: 'transfer-list'
        },
        {
            _name: 'CSidebarNavItem',
            name: 'Add Wallet',
            to: '/other/add-wallet',
            icon: 'cil-ban',
            items: [],
            permission: 'add-wallet'
        },
        {
            _name: 'CSidebarNavItem',
            name: 'Posts',
            to: '/other/post-list',
            icon: 'cil-ban',
            items: [],
            permission: 'post-list'
        }
    ]
}]