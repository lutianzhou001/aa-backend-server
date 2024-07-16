import { Hex } from 'viem';
import { IsNotEmpty } from 'class-validator';
import { UserOperation } from 'permissionless/types/userOperation';

export class SendUOPDto {
  @IsNotEmpty()
  readonly credential: Hex;

  @IsNotEmpty()
  readonly uop: UserOperation<'v0.7'>;
}
