import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
    getHello(): string {
        return 'Hello World!'
    }

    getHey(firstName: string, lastName: string): string {
        return `Hey there ${firstName} ${lastName}!`
    }
}
