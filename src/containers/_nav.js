export default [{
    _name: 'CSidebarNav',
    _children: [{
            _name: 'CSidebarNavItem',
            name: 'sidebar.dashboard',
            to: '/dashboard',
            icon: 'cil-speedometer',
            items: []
        },
        // {
        //     _name: 'CSidebarNavDropdown',
        //     name: 'Withdraw',
        //     route: '/withdraw',
        //     icon: 'cil-dollar',
        //     items: [{
        //             name: 'Pending List',
        //             to: '/withdraw/pending'
        //         },
        //         {
        //             name: 'Approve List',
        //             to: '/withdraw/approve'
        //         },
        //         {
        //             name: 'Reject List',
        //             to: '/withdraw/reject'
        //         },
        //         {
        //             name: 'All List',
        //             to: '/withdraw/all'
        //         }
        //     ]
        // },
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
            _name: 'CSidebarNavItem',
            name: 'Add Video',
            to: '/other/package',
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
        }
    ]
}]