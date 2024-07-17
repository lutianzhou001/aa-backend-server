import { Injectable } from '@nestjs/common';
import { SendUOPDto } from './dto/sendUOP.dto';
import {
  OKXSmartAccountSDK,
  remoteSigner,
  convertToBigInt,
} from 'account-abstraction-wallet-sdk';
import { JWT_VALIDATOR_TEMPLATE } from 'account-abstraction-wallet-sdk/dist/packages/common/constants';
import { Address } from 'viem';

@Injectable()
export class ExecutionService {
  async sendUOP(dto: SendUOPDto) {
    // begin to get the uop via sdk
    // now we create an instance which contains: a rpcProvider(publicClient), a signer(in this case, it is a walletClientSigner), the name and version of the smart account, and the index of it)
    const okxSmartContractAccountSDK = new OKXSmartAccountSDK({
      bundlerClientUrl: 'https://www.okx.org',
      paymasterClientUrl: 'https://www.okx.org',
      mainnetClientUrl:
        'https://eth-mainnet.g.alchemy.com/v2/DB0JapVSxzovPY3RaQSydinyWXPlpzi-',
      rpcUrl:
        'https://arb-mainnet.g.alchemy.com/v2/47SxM1HQgXWeKVL9rYVS6A4LZ8B_Ktk0',
    });

    const okxSmartContractAccount =
      await okxSmartContractAccountSDK.createOKXSmartContractAccount({
        chain: dto.chainId,
        // chain: 421614,
        signer: new remoteSigner(
          dto.credential,
          JWT_VALIDATOR_TEMPLATE as Address,
        ),
        index: 0n,
      });
    return await okxSmartContractAccount.sendUserOp(convertToBigInt(dto.uop));
  }
}
