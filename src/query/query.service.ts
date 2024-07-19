import {
  convertToHex,
  OKXSmartAccountSDK,
  remoteSigner,
  SigType,
} from 'account-abstraction-wallet-sdk';
import { arbitrum } from 'viem/chains';
import { QueryUOPDto } from './dto/queryUOP.dto';
import { Address, erc20Abi, formatEther, padHex, toHex } from "viem";

export class QueryService {
  constructor() {}

  async queryAAInfo(sub: string) {
    console.log('in query aa info', sub);
    const subject = toHex(sub);
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
        signer: new remoteSigner(
          subject,
          '0x98c43cCc7F515Bebe8E161B2B7A301f3B8d2c7ae' as Address,
        ),
        index: 888n,
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

    console.log('query...');
    console.log({
      address: aa,
      balance: formatEther(balance),
      tokenBalance: formatEther(tokenBalance),
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

    console.log('in query uop', dto.sub);
    const okxSmartContractAccount =
      await okxSmartContractAccountSDK.createOKXSmartContractAccount({
        chain: dto.chainId | 42161,
        // chain: 421614,
        signer: new remoteSigner(
          toHex(dto.sub),
          '0x98c43cCc7F515Bebe8E161B2B7A301f3B8d2c7ae' as Address,
        ),
        index: 888n,
      });

    console.log('in query uop', await okxSmartContractAccount.getAddress());
    const args = {
      ...dto.buildUserOpParams,
      uopAndPaymasterOverrides: {
        callGasLimit: BigInt(1900000),
        verificationGasLimit: BigInt(1900000),
        // verificationGasLimit: BigInt(453286),
      },
    };
    console.log(args);
    const builtUop = await okxSmartContractAccount.buildUserOp(args);
    builtUop.signature = padHex('0x', { size: 33 });
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
