import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Contract, EventFragment, EventPayload, Fragment, InterfaceAbi, WebSocketProvider } from 'ethers';

interface Event {
    anonymous: boolean,
    inputs: {
        indexed: boolean,
        internalType: string,
        name: string,
        type: string,
    }[],
    name: string,
    type: string,
}


@Injectable()
export class WebsocketService {

    private provider: WebSocketProvider;
    private sc: Contract;
    constructor(
        endPoint: string,
        abi: InterfaceAbi,
        contract_address: string,
    ) {
        console.info('[constructor]');
        this.provider = new WebSocketProvider(endPoint)
        this._setContract(contract_address, abi);
    }

    async startTracking() {
        console.info('[startTracking]');
        const scAbi = this.sc.interface;
        scAbi.forEachEvent(async (event: EventFragment) => {
            this.sc.on(event.name, this._eventListener);
        })
    }

    getProvider(): WebSocketProvider {
        console.info('[getProvider]');
        if (!this.provider) throw Error('Provider is not set.')
        return this.provider;
    }

    getSmartContract() {
        console.info('[getSmartContract]');
        return this.sc;
    }

    _setContract(
        contract_address: string,
        abi: InterfaceAbi,
    ) {
        console.info('[_setContract]');
        this.sc = new Contract(contract_address, abi, this.getProvider());
    }

    _eventListener(from: string, to: string, value: BigInt, event: any) {
        console.info('[_eventListener]');
        console.log('from : ', from);
        console.log('to : ', to);
        console.log('value : ', value);
        console.log('event : ', event);
    }
}
