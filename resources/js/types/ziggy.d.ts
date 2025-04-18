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
    "companies.submitClaim": [
        {
            "name": "company",
            "required": true,
            "binding": "slug"
        }
    ],
    "companies.reviews.store": [
        {
            "name": "company",
            "required": true,
            "binding": "slug"
        }
    ],
    "companies.follow": [
        {
            "name": "company",
            "required": true,
            "binding": "slug"
        }
    ],
    "companies.unfollow": [
        {
            "name": "company",
            "required": true,
            "binding": "slug"
        }
    ],
    "companies.submit": [],
    "jobs": [],
    "jobs.show": [
        {
            "name": "slug",
            "required": true
        }
    ],
    "jobs.apply": [
        {
            "name": "slug",
            "required": true
        }
    ],
    "jobs.apply.store": [
        {
            "name": "job",
            "required": true,
            "binding": "slug"
        }
    ],
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
    "admin.submissions": [],
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
    "admin.claims": [],
    "admin.claim": [
        {
            "name": "claim",
            "required": true,
            "binding": "id"
        }
    ],
    "admin.claim.update": [
        {
            "name": "claim",
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
