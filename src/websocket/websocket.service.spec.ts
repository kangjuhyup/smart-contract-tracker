import { Test, TestingModule } from '@nestjs/testing';
import { WebsocketService } from './websocket.service';
import { ConfigModule } from '@nestjs/config';

jest.setTimeout(6 * 60 * 1000);

describe('WebsocketService', () => {
  let service: WebsocketService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
      ],
      providers: [WebsocketService],
    }).compile();

    service = module.get<WebsocketService>(WebsocketService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('getListenr', async () => {
    const sc = service.getSmartContract();
    const listners = await sc.listenerCount();
    expect(listners).toEqual(0);
  })

  it('startTracking', async () => {
    service.startTracking();
  
    // expect(consoleLogSpy).toHaveBeenCalled();
  })
});
