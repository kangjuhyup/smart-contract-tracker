import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Contract, EventPayload, WebSocketProvider } from 'ethers';

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
        private readonly configService: ConfigService,
    ) {
        console.info('[constructor]');
        const endPoint = configService.get<string>('END_POINT')
        this.provider = new WebSocketProvider(endPoint)
        this._setContract();
        this.startTracking();
    }

    async startTracking() {
        console.info('[startTracking]');
        const scAbi = JSON.parse(this.configService.get<string>('SC_ABI'));
        const events = scAbi
            .abi
            .filter((abi: any) => abi.type === 'event')
            

        events.map( async (event: Event) => {
            
            this.sc.on(event.name,(log:Array<any>) => {
                console.log(log);
            })
            
            // this.sc.on(event.name, this._eventListener);
        })
        // eventNames.map( async (eventName: string) => {
        //     this.sc.on(eventName, (event: any) => {
        //         console.log('[eventListener]');
                
        //     });
        // })
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

    _setContract() {
        console.info('[_setContract]');
        const scAddress: string = this.configService.get('SC_ADDRESS');
        const scAbi = JSON.parse(this.configService.get<string>('SC_ABI'));
        this.sc = new Contract(scAddress, scAbi.abi, this.getProvider());
    }

    _eventListener (from: string, to: string, value: BigInt, event: any) {
        console.info('[_eventListener]');
        console.log('from : ', from);
        console.log('to : ', to);
        console.log('value : ', value);
        console.log('event : ', event);        
    }
}
