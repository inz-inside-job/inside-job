/* This file is generated by Ziggy. */
declare module 'ziggy-js' {
  interface RouteList {
    "sanctum.csrf-cookie": [],
    "home": [],
    "companies": [],
    "jobs": [],
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
    "storage.local": [
        {
            "name": "path",
            "required": true
        }
    ]
}
}
export {};
