import { ethers } from "ethers";
import { CONTRACT_ABI } from "~/types/contract";

const contractAddress = "0xA7987fC6c75CfE26FC9F3EB144FFCE556dCCFaaA";

export function getContract(providerOrSigner: ethers.Provider | ethers.Signer) {
    if (!contractAddress.startsWith("0x")) {
        throw new Error(
            "Contract address must be a valid hex address starting with 0x",
        );
    }

    console.log("Creating contract instance with address:", contractAddress);
    return new ethers.Contract(contractAddress, CONTRACT_ABI, providerOrSigner);
}
