import { APPLICATION_ROUTERS } from '../routers';

export const permissionStatic = {
  view: {
    title: 'View Permission',
    description: 'You can view the permission details here. Editing is disabled.',
    disabled: true
  },
  create: {
    title: 'Create New Permission',
    description: 'Set up new permissions here. Click "Save" to confirm your changes.',
    disabled: false
  },
  edit: {
    title: 'Edit Permission',
    description: 'Modify the permission details here. Click "Save" to confirm your changes.',
    disabled: false
  }
};

export const featuresStatic = {
  view: {
    title: 'View Feature',
    description: 'You can view the feature details here. Editing is disabled.',
    disabled: true
  },
  create: {
    title: 'Create New Feature',
    description: 'Set up new features here. Click "Save" to confirm your changes.',
    disabled: false
  },
  edit: {
    title: 'Edit Feature',
    description: 'Modify the feature details here. Click "Save" to confirm your changes.',
    disabled: false
  }
};

export const rolesStatic = {
  read: {
    action: "read",
    title: 'View Role',
    description: 'You can view role details here. Editing is disabled.',
    cancelClick: APPLICATION_ROUTERS.ACCESS.ROLES,
    disabled: true
  },
  create: {
    action: "create",
    title: 'Create a New Role',
    description:
      "Set up a new role here. Click 'Save' to confirm, or 'Save & Add' to create another role.",
    cancelClick: APPLICATION_ROUTERS.ACCESS.ROLES,
    disabled: false
  },
  update: {
    action: "update",
    title: 'Edit Role',
    description: "Modify role details here. Click 'Save' to confirm your changes.",
    cancelClick: APPLICATION_ROUTERS.ACCESS.ROLES,
    disabled: false
  }
};


export const departmentStatic = {
  view: {
    title: 'View Department',
    description: 'You can view the department details here. Editing is disabled.',
    disabled: true
  },
  create: {
    title: 'Create New Department',
    description: 'Set up new department here. Click "Save" to confirm your changes.',
    disabled: false
  },
  edit: {
    title: 'Edit Department',
    description: 'Modify the department details here. Click "Save" to confirm your changes.',
    disabled: false
  }
};

export const userTagsStatic = {
  view: {
    title: 'View User Tags',
    description: 'You can view the user tags details here. Editing is disabled.',
    disabled: true
  },
  create: {
    title: 'Create New User Tags',
    description: 'Set up new user tags here. Click "Save" to confirm your changes.',
    disabled: false
  },
  edit: {
    title: 'Edit User Tags',
    description: 'Modify the user tags details here. Click "Save" to confirm your changes.',
    disabled: false
  }
};