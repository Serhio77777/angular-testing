import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RequestService } from './request.service';

const mockData = {id: 1, country : 'United states of america', zipcode: '56743'};

describe('Request service:', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RequestService],
      imports: [HttpClientTestingModule]
    });
    // HttpClientTestingModule - Extended interactions between a data service and the HttpClient can be complex
    // and difficult to mock with spies.
   //  The HttpClientTestingModule can make these testing scenarios more manageable.
  });
  describe(':', () => {

    function setup() {
      return { 
        requestService: TestBed.get(RequestService), 
        httpTestingController: TestBed.get(HttpTestingController)
      };
    }

    it('Should call the data', () => {
      const { requestService, httpTestingController } = setup();

      requestService.getData()
        .subscribe(data => {
          expect(data.mapData).toEqual(mockData);
        });

      const req = httpTestingController.expectOne('https:www.google.com/googleMapData');

      expect(req.request.method).toBe('GET');

      req.flush({
        mapData: mockData
      });
    });

    it('Should call the data from promise', async() => {
      const { requestService, httpTestingController } = setup();


      requestService.getDataPromise()
        .then(data => {
          console.log(req.request);
          expect(data.mapData).toEqual(mockData);
        });

      const req = httpTestingController.expectOne('https:test.request.unknown/data');

      expect(req.request.method).toBe('GET');

      req.flush({
        mapData: mockData
      });
    });

    it('private methods testing', () => {
      const { requestService } = setup();
      spyOn<any>(requestService, 'someMethod').and.returnValue('qwerty');
      expect(requestService.testMethod()).toEqual('qwerty');
      expect(requestService.someMethod).toHaveBeenCalled();
    })

    afterEach(() => {
      const { httpTestingController } = setup();
      httpTestingController.verify();
    });
  });
});
