import * as bcrypt from 'bcrypt';

export abstract class CryptUtils {
  static async generateSalt(): Promise<string> {
    return await bcrypt.genSalt();
  }

  static async hashPassword(password: string, salt: string): Promise<string> {
    return await bcrypt.hash(password, salt);
  }

  static async validatePassword(
    passwordPlain: string,
    passwordCrypt: string,
    salt: string,
  ): Promise<boolean> {
    const hash = await this.hashPassword(passwordPlain, salt);
    return hash === passwordCrypt;
  }
}
