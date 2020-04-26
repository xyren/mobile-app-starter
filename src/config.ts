import { Injectable } from '@angular/core';

@Injectable()

export class Configuration {
	
	// choices 
	public ENV: string = 'development';

	public parse: any = {
		development: {
			appId: 'myAppId',
			masterKey: 'masterKey',
			serverURL: 'http://localhost:1337/parse',
		},
		production: {
			appId: '9UcrqJaBvZpPO6LKrf2x3ajTaUmYxWNAMCONw1nQ',
			masterKey: 'Ylfo7XhEXuEl84M1do4oS3tChgbIWqaK6FTj0kjJ',
			serverURL: 'https://parseapi.back4app.com',
		},
	}
	public SUPERADMIN: any = {
		username: 'superadmin',
		password: 'developer'
	}

}
