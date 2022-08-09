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
            name: 'Account',
            route: '/account',
            icon: 'cil-user',
            items: [{
                    name: 'All Account',
                    to: '/account/all'
                },
                {
                    name: 'Active Account',
                    to: '/account/active'
                },
                {
                    name: 'Block Account',
                    to: '/account/block'
                }
            ]
        },
        {
            _name: 'CSidebarNavItem',
            name: 'Add Video',
            to: '/other/package',
            icon: 'cil-list',
            items: []
        },
        {
            _name: 'CSidebarNavItem',
            name: 'Video Warehouse',
            to: '/other/video-warehouse',
            icon: 'cil-list',
            items: []
        },
        {
            _name: 'CSidebarNavItem',
            name: 'Work Completed',
            to: '/other/work-completed',
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
            name: 'Notice',
            to: '/other/notice',
            icon: 'cil-settings',
            items: []
        }
    ]
}]