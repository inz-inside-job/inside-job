/* This file is generated by Ziggy. */
declare module 'ziggy-js' {
  interface RouteList {
    "sanctum.csrf-cookie": [],
    "home": [],
    "companies": [],
    "companies.show": [
        {
            "name": "slug",
            "required": true
        }
    ],
    "companies.reviews.store": [
        {
            "name": "company",
            "required": true,
            "binding": "slug"
        }
    ],
    "jobs": [],
    "search": [],
    "profile.edit": [],
    "profile.update": [],
    "profile.destroy": [],
    "password.edit": [],
    "password.update": [],
    "register": [],
    "login": [],
    "password.request": [],
    "password.email": [],
    "password.reset": [
        {
            "name": "token",
            "required": true
        }
    ],
    "password.store": [],
    "verification.notice": [],
    "verification.verify": [
        {
            "name": "id",
            "required": true
        },
        {
            "name": "hash",
            "required": true
        }
    ],
    "verification.send": [],
    "password.confirm": [],
    "logout": [],
    "admin.dashboard": [],
    "admin.submission": [
        {
            "name": "submission",
            "required": true,
            "binding": "id"
        }
    ],
    "admin.submission.update": [
        {
            "name": "submission",
            "required": true,
            "binding": "id"
        }
    ],
    "storage.local": [
        {
            "name": "path",
            "required": true
        }
    ]
}
}
export {};
