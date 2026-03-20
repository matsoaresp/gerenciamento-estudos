import * as bcrypt from 'bcryptjs';
import { HashingService } from "./hashing.service";


export class BcryptService extends HashingService {
    compare(password: string, passwordHash: string): Promise<boolean> {
        return bcrypt.compare(password,passwordHash)
    }
    async hash(password: string): Promise<string> {
        const salt = await bcrypt.genSalt();
        return bcrypt.hash(password, salt)
    }
}