import { APPLICATION_ROUTERS } from '@/routers';
import { StatusListType } from '@/types';

export const SIDEBAR_MENU_LIST = {
  versions: ['1.0.1', '1.1.0-alpha', '2.0.0-beta1'],
  navMain: [
    {
      title: 'Dashboard',
      url: APPLICATION_ROUTERS.DASHBOARD,
      items: []
    },
    {
      title: 'Access',
      url: APPLICATION_ROUTERS.DASHBOARD,
      items: [
        {
          title: 'Permission',
          url: APPLICATION_ROUTERS.ACCESS.PERMISSION
        },
        {
          title: 'Features',
          url: APPLICATION_ROUTERS.ACCESS.FEATURE
        },
        {
          title: 'Roles',
          url: APPLICATION_ROUTERS.ACCESS.ROLES
        }
      ]
    },
    {
      title: 'Category',
      url: '#',
      items: [
        {
          title: 'Department',
          url: APPLICATION_ROUTERS.CATEGORY.DEPARTMENT
        },
        {
          title: 'User Tags',
          url: APPLICATION_ROUTERS.CATEGORY.USER_TAGS
        }
      ]
    },
    {
      title: 'Media',
      url: '#',
      items: [
        {
          title: 'Images',
          url: APPLICATION_ROUTERS.MEDIA.IMAGES
        },
        {
          title: 'Videos',
          url: APPLICATION_ROUTERS.MEDIA.VIDEOS
        },
        {
          title: 'Documents',
          url: APPLICATION_ROUTERS.MEDIA.DOCUMENTS
        },
        {
          title: 'Icons',
          url: APPLICATION_ROUTERS.MEDIA.ICONS
        }
      ]
    },
    {
      title: 'Projects',
      url: APPLICATION_ROUTERS.PROJECTS,
      items: []
    },
    {
      title: 'Task',
      url: '#',
      items: [
        {
          title: 'Task Categories',
          url: APPLICATION_ROUTERS.TASK.TASK_CATEGORIES
        },
        {
          title: 'Tags',
          url: APPLICATION_ROUTERS.TASK.TAGS
        },
        {
          title: 'Task List',
          url: APPLICATION_ROUTERS.TASK.TASK_LIST
        }
      ]
    },
    {
      title: 'Members',
      url: '#',
      items: [
        {
          title: 'All Members',
          url: APPLICATION_ROUTERS.MEMBERS.ALL_MEMBERS
        },
        {
          title: 'Owners',
          url: APPLICATION_ROUTERS.MEMBERS.OWNERS
        },
        {
          title: 'Employees',
          url: APPLICATION_ROUTERS.MEMBERS.EMPLOYEES
        },
        {
          title: 'Teams',
          url: APPLICATION_ROUTERS.MEMBERS.TEAMS
        }
      ]
    },
    {
      title: 'Employee Management',
      url: '#',
      items: [
        {
          title: 'Time Sheet',
          url: APPLICATION_ROUTERS.EMPLOYEE_MANAGEMENT.TIME_SHEET
        },
        {
          title: 'Holiday',
          url: APPLICATION_ROUTERS.EMPLOYEE_MANAGEMENT.HOLIDAY
        },
        {
          title: 'Leave Management',
          url: APPLICATION_ROUTERS.EMPLOYEE_MANAGEMENT.LEAVE_MANAGEMENT
        },
        {
          title: 'Work Hours',
          url: APPLICATION_ROUTERS.EMPLOYEE_MANAGEMENT.WORK_HOURS
        }
      ]
    },
    {
      title: 'Announcements',
      url: APPLICATION_ROUTERS.ANNOUNCEMENTS,
      items: []
    },
    {
      title: 'Social Media',
      url: APPLICATION_ROUTERS.SOCIAL_MEDIA,
      items: []
    },
    {
      title: 'Bin',
      url: APPLICATION_ROUTERS.RECYCLE_BIN,
      items: []
    }
  ]
};

export const TABLE_FILTER_OPERATIONS = [
  { value: 'equals', label: 'Equals' },
  { value: 'not_equals', label: 'Not Equals' },
  { value: 'contains', label: 'Contains' },
  { value: 'does_not_contain', label: 'Does Not Contain' },
  { value: 'starts_with', label: 'Starts With' },
  { value: 'ends_with', label: 'Ends With' },
  { value: 'greater_than', label: 'Greater Than' },
  { value: 'greater_than_or_equal_to', label: 'Greater Than or Equal To' },
  { value: 'less_than', label: 'Less Than' },
  { value: 'less_than_or_equal_to', label: 'Less Than or Equal To' },
  { value: 'between', label: 'Between' },
  { value: 'is_empty', label: 'Is Empty' },
  { value: 'is_not_empty', label: 'Is Not Empty' },
  { value: 'in_list', label: 'In List' },
  { value: 'not_in_list', label: 'Not In List' }
];

export const STATUS_LIST: StatusListType[] = [
  { label: 'Active', status: 'success', value: true },
  { label: 'In Active', status: 'danger', value: false }
];

export const BinDropDownList = [
  { label: 'Roles', value: 'roles' },
  { label: 'Permissions', value: 'permissions' }
];
