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
			appId: '*******',
			masterKey: '******',
			serverURL: 'https://parseapi.back4app.com',
		},
	}

}
