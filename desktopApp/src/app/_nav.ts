interface NavAttributes {
  [propName: string]: any;
}
interface NavWrapper {
  attributes: NavAttributes;
  element: string;
}
interface NavBadge {
  text: string;
  variant: string;
}
interface NavLabel {
  class?: string;
  variant: string;
}

export interface NavData {
  name?: string;
  url?: string;
  icon?: string;
  badge?: NavBadge;
  title?: boolean;
  children?: NavData[];
  variant?: string;
  attributes?: NavAttributes;
  divider?: boolean;
  class?: string;
  label?: NavLabel;
  wrapper?: NavWrapper;
}

export const navItems: NavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer'
  },
  {
    name: 'Observationslip',
    url: '/observationslip',
    icon: 'icon-doc',
    children: [
      {
        name: 'Add Observationslip',
        url: '/observationslip/add-observationslip',
        icon: 'icon-pencil'
      },
      {
        name: 'Edit Observationslip',
        url: '/observationslip/edit-observationslip',
        icon: 'icon-note'
      },
      {
        name: 'View Observationslip',
        url: '/observationslip/view-observationslip',
        icon: 'icon-book-open'
      }
    ]
  },
  {
    name: 'Import Data (CSV)',
    url: '/import-data/import-data',
    icon: 'icon-paper-clip'
  },
  // {
  //   name: 'Notifications',
  //   url: '/notifications',
  //   icon: 'icon-bell',
  //   children: [
  //     {
  //       name: 'Alerts',
  //       url: '/notifications/alerts',
  //       icon: 'icon-bell'
  //     }
  //   ]
  // },
  // {
  //   name: 'User Management',
  //   url: '/Users',
  //   icon: 'icon-user',
  //   children: [
  //     {
  //       name: 'Add User',
  //       url: '/Users/register',
  //       icon: 'icon-note'
  //     },
  //     {
  //       name: 'Edit User Details',
  //       url: '/Users/edit',
  //       icon: 'icon-pencil'
  //     },
     
  //     {
  //       name: 'View Wdr Users',
  //       url: '/Users/view-wdr-users',
  //       icon: 'icon-book-open'
  //     }
  //   ]
  // },
];

export const ObservernavItems: NavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer'
  },
  {
    name: 'Observationslip',
    url: '/observationslip',
    icon: 'icon-doc',
    children: [
      {
        name: 'Add Observationslip',
        url: '/observationslip/add-observationslip',
        icon: 'icon-pencil'
      },
      {
        name: 'Edit Observationslip',
        url: '/observationslip/edit-observationslip',
        icon: 'icon-note'
      },
      {
        name: 'View Observationslip',
        url: '/observationslip/view-observationslip',
        icon: 'icon-book-open'
      }
    ]
  },
 
];
