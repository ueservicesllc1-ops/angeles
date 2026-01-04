export const DASHBOARD_ROUTES = {
    client: [
        { name: 'Dashboard', path: '/client/dashboard', icon: 'Dashboard' },
        { name: 'My Cases', path: '/client/cases', icon: 'Folder' },
        { name: 'Documents', path: '/client/docs', icon: 'Description' },
        { name: 'Profile', path: '/client/profile', icon: 'Person' },
    ],
    staff: [
        { name: 'Workspace', path: '/staff/dashboard', icon: 'Dashboard' },
        { name: 'Case Queue', path: '/staff/cases', icon: 'Assignment' },
        { name: 'Client Docs', path: '/staff/documents', icon: 'FolderOpen' },
    ],
    admin: [
        { name: 'Overview', path: '/admin/dashboard', icon: 'Analytics' },
        { name: 'Messages', path: '/admin/messages', icon: 'Email' },
        { name: 'Staff', path: '/admin/staff', icon: 'Badge' },
        { name: 'User Management', path: '/admin/users', icon: 'People' },
        { name: 'All Cases', path: '/admin/cases', icon: 'FolderShared' },
        { name: 'Audit Logs', path: '/admin/audit', icon: 'Security' },
    ],
};
