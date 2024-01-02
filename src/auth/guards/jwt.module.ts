import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        JwtModule.register({
            secret: 'your_secret_key', // Replace this with your secret key
            signOptions: { expiresIn: '1h' }, // Optional: set your token expiration time
        }),
        // ... other modules
    ],
    // ... other module properties
})
export class YourModule { }
