import { BreadcrumbItemType } from "@/context/breadcrumb-context";
import { APPLICATION_ROUTERS } from "@/routers";


type breadcrumbDefaultType = {
    ROOT: BreadcrumbItemType[],
    CREATE: BreadcrumbItemType[],
    UPDATE: BreadcrumbItemType[],
    READ: BreadcrumbItemType[],
}


// TODO: DEFAULT_BREADCRUMB_ROOT is a default home page breadcrumb
const DEFAULT_BREADCRUMB_ROOT: BreadcrumbItemType[] = [
    {
        label: "Home",
        url: APPLICATION_ROUTERS.ROOT,
    }
]


// NOTE: BREADCRUMB_DASHBOARD_ITEMS is a dashboard page breadcrumb
export const BREADCRUMB_DASHBOARD_ITEMS: BreadcrumbItemType[] = [
    ...DEFAULT_BREADCRUMB_ROOT,
    {
        label: "Dashboard",
        url: APPLICATION_ROUTERS.DASHBOARD,
    }
]

// TODO: DEFAULT_BREADCRUMB_ACCESS is a common access dropdown breadcrumb
const DEFAULT_BREADCRUMB_ACCESS: BreadcrumbItemType[] = [
    {
        label: "Access",
        url: APPLICATION_ROUTERS.ACCESS.ROLES
    }
]

// NOTE: BREADCRUMB_PERMISSION_ITEMS is a permission page breadcrumb
export const BREADCRUMB_PERMISSION_ITEMS: breadcrumbDefaultType = {
    "ROOT": [
        ...DEFAULT_BREADCRUMB_ROOT,
        ...DEFAULT_BREADCRUMB_ACCESS,
        {
            label: "Permission",
            url: APPLICATION_ROUTERS.ACCESS.FEATURE
        },
    ],
    "READ": [],
    "CREATE": [],
    "UPDATE": [],
}


// NOTE: BREADCRUMB_FEATURES_ITEMS is a features page breadcrumb
export const BREADCRUMB_FEATURES_ITEMS: breadcrumbDefaultType = {
    "ROOT": [
        ...DEFAULT_BREADCRUMB_ROOT,
        ...DEFAULT_BREADCRUMB_ACCESS,
        {
            label: "Features",
            url: APPLICATION_ROUTERS.ACCESS.FEATURE
        },
    ],
    "READ": [],
    "CREATE": [],
    "UPDATE": [],
}


// NOTE: BREADCRUMB_ROLES_ITEMS is a roles page breadcrumb
export const BREADCRUMB_ROLES_ITEMS: breadcrumbDefaultType = {
    "ROOT": [
        ...DEFAULT_BREADCRUMB_ROOT,
        ...DEFAULT_BREADCRUMB_ACCESS,
        {
            label: "Roles",
            url: APPLICATION_ROUTERS.ACCESS.ROLES
        }
    ],
    "CREATE": [
        ...DEFAULT_BREADCRUMB_ROOT,
        ...DEFAULT_BREADCRUMB_ACCESS,
        {
            label: "Roles",
            url: APPLICATION_ROUTERS.ACCESS.ROLES
        },
        {
            label: "Create",
            url: `${APPLICATION_ROUTERS.ACCESS.ROLES}/${APPLICATION_ROUTERS.OPERATIONS.CREATE}`
        },
    ],
    "READ": [
        ...DEFAULT_BREADCRUMB_ROOT,
        ...DEFAULT_BREADCRUMB_ACCESS,
        {
            label: "Roles",
            url: APPLICATION_ROUTERS.ACCESS.ROLES
        },
        {
            label: "View",
            url: `${APPLICATION_ROUTERS.ACCESS.ROLES}/${APPLICATION_ROUTERS.OPERATIONS.READ}`
        },
    ],
    "UPDATE": [
        ...DEFAULT_BREADCRUMB_ROOT,
        ...DEFAULT_BREADCRUMB_ACCESS,
        {
            label: "Roles",
            url: APPLICATION_ROUTERS.ACCESS.ROLES
        },
        {
            label: "Edit",
            url: `${APPLICATION_ROUTERS.ACCESS.ROLES}/${APPLICATION_ROUTERS.OPERATIONS.UPDATE}`
        },
    ]
}


export const BREADCRUMB_CATEGORY_DEPARTMENT: BreadcrumbItemType[] = [
    ...DEFAULT_BREADCRUMB_ROOT,
    ...DEFAULT_BREADCRUMB_ACCESS,
    {
        label: "Department",
        url: APPLICATION_ROUTERS.CATEGORY.DEPARTMENT
    }
]

export const BREADCRUMB_CATEGORY_USER_TAGS: BreadcrumbItemType[] = [
    ...DEFAULT_BREADCRUMB_ROOT,
    ...DEFAULT_BREADCRUMB_ACCESS,
    {
        label: "User Tags",
        url: APPLICATION_ROUTERS.CATEGORY.USER_TAGS
    }
]



// NOTE: BREADCRUMB_RECYCLE_BIN_ITEMS is a roles page breadcrumb
export const BREADCRUMB_RECYCLE_BIN_ITEMS: breadcrumbDefaultType = {
    "ROOT": [
        ...DEFAULT_BREADCRUMB_ROOT,
        {
            label: "Bin",
            url: APPLICATION_ROUTERS.RECYCLE_BIN
        }
    ],
    "CREATE": [],
    "READ": [],
    "UPDATE": [],
}