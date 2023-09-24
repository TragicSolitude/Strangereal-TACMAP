import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MarkerDetailsComponent } from './marker-details.component';

describe('MarkerDetailsComponent', () => {
    let component: MarkerDetailsComponent;
    let fixture: ComponentFixture<MarkerDetailsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MarkerDetailsComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(MarkerDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
