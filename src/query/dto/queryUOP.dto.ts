import { Hex } from 'viem';
import { BuildUserOpParams } from 'account-abstraction-wallet-sdk';
import { IsNotEmpty } from 'class-validator';

export class QueryUOPDto {
  @IsNotEmpty()
  readonly credential: Hex;

  @IsNotEmpty()
  readonly buildUserOpParams: BuildUserOpParams;
}

export class QueryAAInfoDto {
  @IsNotEmpty()
  readonly subject: string;
}
