import { Injectable } from '@nestjs/common';
import { SendUOPDto } from './dto/sendUOP.dto';
import {
  OKXSmartAccountSDK,
  remoteSigner,
  convertToBigInt,
} from 'account-abstraction-wallet-sdk';
import { Address, toHex } from 'viem';

@Injectable()
export class ExecutionService {
  async sendUOP(dto: SendUOPDto) {
    // begin to get the uop via sdk
    // now we create an instance which contains: a rpcProvider(publicClient), a signer(in this case, it is a walletClientSigner), the name and version of the smart account, and the index of it)
    const okxSmartContractAccountSDK = new OKXSmartAccountSDK({
      bundlerClientUrl: 'https://www.okx.com',
      paymasterClientUrl: 'https://www.okx.com',
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
          toHex(dto.sub),
          '0x98c43cCc7F515Bebe8E161B2B7A301f3B8d2c7ae' as Address,
        ),
        index: 777n,
      });
    console.log('successfully received the uop', convertToBigInt(dto.uop));
    const uopHash = await okxSmartContractAccount.sendUserOp(
      convertToBigInt(dto.uop),
    );
    const transactionHash =
      await okxSmartContractAccount.bundlerClient.waitForConfirm(uopHash);
    console.log(transactionHash);
    return String('https://arbiscan.io/tx/' + transactionHash.txHash);
  }
}
