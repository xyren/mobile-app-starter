# mobile-app-starter
Ionic V3 and Parse-Server

This project Tied-up with Parse-Server-Local


# Configuration Parse Server Connection
```
file: src/config.ts
```

Change the ENV to deploy
```
public ENV: string = 'development';
```
SuperAdmin access
```
public SUPERADMIN: any = {
	username: 'superadmin',
	password: 'developer'
}
```

Public Access
* Welcome Page (Landing Page)
* Loading Initialization Handler Page
* Login
* Logout
* Forgot Password
* Homepage

Private Access Level (User should logged-in)
* Change Password
* User Profile
	-- Edit Profile
	-- Upload Profile Photo
 	-- 

Administrative Access Level
* User  (complete)
	- Add User Role
	- Edit User Role
	- Delete User Role
	- List User Role
	** Auto Sync if Error sync found

* Invitations (complete)
	- Send Invitation
	- Resend Invitation
	- Edit Invitation
	- Delete Invitation

* Users
	- Users List
	- Edit User Info
	- View User Info
	- Delete User Info
	- Block / Banned / Lock Account

SuperAdmin Access (Fixed username and password see configuration file)
* Installation
	- Create Admin Account
	- Allow Public Registration
* Format Users Account
* Format Invitation




NOTES:
DO NOT create a codes under the constructor - bec its always loaded on the startup of application - that will make your apps crash - sometimes


