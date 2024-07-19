import {
  convertToHex,
  OKXSmartAccountSDK,
  remoteSigner,
  SigType,
} from 'account-abstraction-wallet-sdk';
import { arbitrum } from 'viem/chains';
import { JWT_VALIDATOR_TEMPLATE } from 'account-abstraction-wallet-sdk/dist/packages/common/constants';
import { QueryUOPDto } from './dto/queryUOP.dto';
import { Address, erc20Abi, formatEther, toHex } from 'viem';

export class QueryService {
  constructor() {}

  async queryAAInfo(subject: string) {
    const credential = toHex(subject);
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
        chain: arbitrum,
        // chain: 421614,
        signer: new remoteSigner(credential, JWT_VALIDATOR_TEMPLATE as Address),
        index: 999n,
      });

    const aa = await okxSmartContractAccount.getAddress();
    const tokenBalance = await okxSmartContractAccount.rpcProvider.readContract(
      {
        address: '0x060BcB804Afdbbf95D2fD49974bd16D02aC6646d',
        abi: erc20Abi,
        functionName: 'balanceOf',
        args: [aa],
      },
    );

    const balance = await okxSmartContractAccount.rpcProvider.getBalance({
      address: aa,
    });
    return {
      address: aa,
      balance: formatEther(balance),
      tokenBalance: formatEther(tokenBalance),
    };
  }

  async queryUOP(dto: QueryUOPDto) {
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
        chain: dto.chainId | 42161,
        // chain: 421614,
        signer: new remoteSigner(
          dto.credential,
          JWT_VALIDATOR_TEMPLATE as Address,
        ),
        index: 0n,
      });

    const builtUop = await okxSmartContractAccount.buildUserOp(
      dto.buildUserOpParams,
    );
    const uopSignedHash = await okxSmartContractAccount.getUOPSignedHash(
      SigType.EIP712,
      builtUop,
    );

    return {
      uopSignedHash: uopSignedHash,
      uop: convertToHex(builtUop),
    };
  }
}
