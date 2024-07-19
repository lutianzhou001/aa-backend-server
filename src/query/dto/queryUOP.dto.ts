import { BuildUserOpParams } from 'account-abstraction-wallet-sdk';
import { IsNotEmpty } from 'class-validator';

export class QueryUOPDto {
  @IsNotEmpty()
  readonly chainId: number;

  @IsNotEmpty()
  readonly sub: string;

  @IsNotEmpty()
  readonly buildUserOpParams: BuildUserOpParams;
}

export class QueryAAInfoDto {
  @IsNotEmpty()
  readonly sub: string;
}
