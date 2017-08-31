import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { Store } from '@ngrx/store';

import { MockStore, TEST_DATA } from '../../../../testing';
import { ProfileActions } from './.';
import { Profile } from '../model';
import { ProfileService } from './profile.service';

describe('Service: ProfileService', () => {
  let profileList: Profile[] = [...TEST_DATA.profile.published, ...TEST_DATA.profile.published, ...TEST_DATA.profile.published];
  let MAX_SAMPLE_Qs_COUNT = 4;
  let afDbMock = {
    "list": () => Observable.of(profileList),
    "object": () => null
  };

  //Define intial state and test state
  let _initialState = {};

  beforeEach(() => TestBed.configureTestingModule({
        providers: [
          ProfileService, ProfileActions,
          { "provide": Store, "useValue": new MockStore(_initialState) },
          { "provide": AngularFireDatabase, "useValue": afDbMock }
        ]
      })

  );

  it('Call getProfile to return Observable of Profile',
      inject([
            ProfileService
          ],
          (service: ProfileService) => {

            let qObs = service.getProfile();

            qObs.subscribe(profile => {
              expect(profile.length).toEqual(profileList.length);
              expect(profile[0]).toEqual(profileList[0]);
            });

          })
  );

  it('Call getUnpublishedProfile to return Observable of Profile',
      inject([
            ProfileService
          ],
          (service: ProfileService) => {

            let qObs = service.getUnpublishedProfile();

            qObs.subscribe(profile => {
              expect(profile.length).toEqual(profileList.length);
              expect(profile[0]).toEqual(profileList[0]);
            });

          })
  );

  it('Call getSampleProfile to return Observable of sample profile',
      inject([
            ProfileService, AngularFireDatabase
          ],
          (service: ProfileService, db: AngularFireDatabase) => {

            spyOn(db, 'list')
                .and.returnValue(Observable.of(profileList.slice(0, 4)));
            let qObs = service.getSampleProfile();

            qObs.subscribe(profile => {
              expect(profile.length).toBeLessThanOrEqual(MAX_SAMPLE_Qs_COUNT);
            });
          })
  );

  it('Call getUserProfile to return Observable of Profile',
      inject([
            ProfileService, AngularFireDatabase
          ],
          (service: ProfileService, db: AngularFireDatabase) => {

            let qids = TEST_DATA.profile.published.map(q => q.id);
            spyOn(db, 'list')
                .and.returnValue(Observable.of(qids));
            spyOn(db, 'object')
                .and.returnValue(Observable.of(TEST_DATA.profile.published[0]));

            let qObs = service.getUserProfile(TEST_DATA.userList[0]);

            qObs.subscribe(profile => {
              expect(profile.length).toEqual(TEST_DATA.profile.published.length);
              expect(profile[0].uid).toEqual(TEST_DATA.profile.published[0].id);
            });
          })
  );

  it('Call saveProfile to save a profile',
      inject([
            ProfileService, AngularFireDatabase
          ],
          (service: ProfileService, db: AngularFireDatabase) => {

            let profile = TEST_DATA.profile.published[0];
            spyOn(db, 'list')
                .and.returnValue({ "push": () => Promise.resolve(profile) });

            let qObs = service.saveProfile(TEST_DATA.profile.published[0]);
            expect(db.list).toHaveBeenCalled();
          })
  );

  it('Call approveProfile to save a profile',
      inject([
            ProfileService, AngularFireDatabase
          ],
          (service: ProfileService, db: AngularFireDatabase) => {

            let profile = TEST_DATA.profile.published[0];
            spyOn(db, 'object')
                .and.returnValue({ "update": () => Promise.resolve(profile),
              "remove": () => null });

            let qObs = service.approveProfile(TEST_DATA.profile.published[0]);
            expect(db.object).toHaveBeenCalled();
          })
  );

});
