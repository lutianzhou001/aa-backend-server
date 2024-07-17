import { BuildUserOpParams } from 'account-abstraction-wallet-sdk';
import { IsNotEmpty } from 'class-validator';
import { Hex } from 'viem';

export class QueryUOPDto {
  @IsNotEmpty()
  readonly chainId: number;

  @IsNotEmpty()
  readonly credential: Hex;

  @IsNotEmpty()
  readonly buildUserOpParams: BuildUserOpParams;
}

export class QueryAAInfoDto {
  @IsNotEmpty()
  readonly subject: string;
}
