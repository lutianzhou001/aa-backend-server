import { Hex } from 'viem';
import { IsNotEmpty } from 'class-validator';
import { UserOperation } from 'permissionless/types/userOperation';

export class SendUOPDto {
  @IsNotEmpty()
  readonly chainId: number;

  @IsNotEmpty()
  readonly sub: string;

  @IsNotEmpty()
  readonly uop: UserOperation<'v0.7'>;
}
