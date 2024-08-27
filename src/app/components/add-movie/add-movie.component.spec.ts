import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMovieComponent } from './add-movie.component';

describe('AddMovieComponent', () => {
  let component: AddMovieComponent;
  let fixture: ComponentFixture<AddMovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMovieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});




// fdescribe('AddMovieComponent', () => {
//   let component: AddMovieComponent;
//   let fixture: ComponentFixture<AddMovieComponent>;
//   let mockMovieBookingService:jasmine.SpyObj<MovieBookingService>;
//   let mockRouter:jasmine.SpyObj<Router>;
//   let originalReload:any;

//   beforeEach(async () => {
//     mockMovieBookingService=jasmine.createSpyObj('MovieBookingService',['addMovie']);
//     mockRouter=jasmine.createSpyObj('Router',['navigate']);
//     mockRouter.navigate.and.returnValue(Promise.resolve(true));
//     await TestBed.configureTestingModule({
//       declarations: [ AddMovieComponent ],
//       providers:[{provide:MovieBookingService,useValue:mockMovieBookingService},{provide:Router,useValue:mockRouter}]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(AddMovieComponent);
//     component = fixture.componentInstance;
//     originalReload=window.location.reload;
//     window.location.reload=jasmine.createSpy('reload');

//     fixture.detectChanges();
//   });

//   afterEach(()=>{
//     window.location.reload=originalReload;
//   })

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
//   fit('should call addMovie and navigate on form submission',async ()=>{
//     const movie={
//       id:{
//         movieName:'kgf',
//         theatherName:'pvr'
//       },allotedSeats:5
//     };
//     mockMovieBookingService.addMovie.and.returnValue(of(movie));
//     component.movie=movie;
//    // mockRouter.navigate.and.returnValue(Promise.resolve(true));
//     component.onSubmit();
//     await fixture.whenStable();

//     expect(mockMovieBookingService.addMovie).toHaveBeenCalledWith(movie);
//     expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
//     expect(component.doReload).toHaveBeenCalled();
//   });
//   fit('should not reload the window during testing',()=>{component.reloadWindow();
//     expect(component.doReload).toHaveBeenCalled();
//   });
// });
