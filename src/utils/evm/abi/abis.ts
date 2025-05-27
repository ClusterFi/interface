import { ComptrollerABI } from './ComptrollerABI';
import { CTokenAbi } from './CTokenABI';
import { erc20ABI } from './ERC20ABI';
import {OracleABI} from "@/utils/evm/abi/OracleABI";
import {CLG_ABI} from "@/utils/evm/abi/CLG";

export const ABIS = {
  ComptrollerABI: ComptrollerABI,
  CTokenABI: CTokenAbi,
  ERC20ABI: erc20ABI,
  OracleABI: OracleABI,
  CLG: CLG_ABI,
};
