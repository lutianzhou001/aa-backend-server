import { BuildUserOpParams } from 'account-abstraction-wallet-sdk';
import { IsNotEmpty } from 'class-validator';

export class QueryUOPDto {
  @IsNotEmpty()
  readonly chainId: number;

  @IsNotEmpty()
  readonly subject: string;

  @IsNotEmpty()
  readonly buildUserOpParams: BuildUserOpParams;
}

export class QueryAAInfoDto {
  @IsNotEmpty()
  readonly subject: string;
}
